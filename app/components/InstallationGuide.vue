<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

type InstallStep = {
  title: string
  commands: string[]
  note?: string
}

type InstallationGuide = TabsItem & {
  release: string
  description: string
  steps: InstallStep[]
}

const centosVersion = ref<'9' | '10'>('10')
const verificationCommands = ['php -v', 'composer --version', 'php --ri swoole']
const rpmDependencies = 'sudo dnf install php-cli php-devel php-pear composer brotli-devel gcc gcc-c++ make autoconf pkgconf-pkg-config'
const rpmSwooleSteps: InstallStep[] = [
  { title: 'Build the Swoole extension', commands: ['sudo pecl install swoole'], note: 'Press Enter to accept the default PECL options. Optional features may need additional development packages.' },
  { title: 'Enable Swoole', commands: ['echo "extension=swoole.so" | sudo tee /etc/php.d/30-swoole.ini > /dev/null'] },
]

const ubuntuSteps: InstallStep[] = [
  { title: 'Install PHP, Composer, and build tools', commands: ['sudo apt update', 'sudo apt install php php-dev php-pear composer libbrotli-dev build-essential autoconf pkg-config'] },
  { title: 'Build the Swoole extension', commands: ['sudo pecl install swoole'], note: 'Press Enter to accept the default PECL options. Optional features may need additional development packages.' },
  { title: 'Enable Swoole', commands: ['echo "extension=swoole.so" | sudo tee /etc/php/8.5/mods-available/swoole.ini > /dev/null', 'sudo phpenmod -v 8.5 swoole'], note: 'This enables Swoole for all installed PHP 8.5 configurations.' },
]

const guides = computed<InstallationGuide[]>(() => [
  {
    label: 'Ubuntu', value: 'ubuntu', release: 'Ubuntu 26.04',
    description: 'These commands use Ubuntu 26.04, which provides PHP 8.5. Older Ubuntu releases need a separate PHP 8.5 installation.',
    steps: ubuntuSteps,
  },
  {
    label: 'Fedora', value: 'fedora', release: 'Fedora 44 or newer',
    description: 'Fedora 44 provides PHP 8.5 in its official repositories. Fedora 43 ships PHP 8.4, so upgrade before following these instructions.',
    steps: [
      { title: 'Install PHP, Composer, and build tools', commands: [rpmDependencies] },
      ...rpmSwooleSteps,
    ],
  },
  {
    label: 'CentOS', value: 'centos', release: `CentOS Stream ${centosVersion.value}`,
    description: 'Use a fresh CentOS Stream installation. PHP 8.5 comes from the third-party Remi repository; EPEL and CRB provide additional dependencies.',
    steps: [
      {
        title: 'Enable repositories and install PHP 8.5',
        commands: [
          'sudo dnf install dnf-plugins-core',
          'sudo dnf config-manager --set-enabled crb',
          `sudo dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-${centosVersion.value}.noarch.rpm`,
          `sudo dnf install https://rpms.remirepo.net/enterprise/remi-release-${centosVersion.value}.rpm`,
          'sudo dnf module install php:remi-8.5',
        ],
        note: 'If PHP is already installed, use sudo dnf module switch-to php:remi-8.5 instead of module install. Switching streams affects existing PHP applications.',
      },
      { title: 'Install Composer and build tools', commands: [rpmDependencies] },
      ...rpmSwooleSteps,
    ],
  },
  {
    label: 'Arch Linux', value: 'arch', release: 'Arch Linux',
    description: 'Arch provides PHP 8.5 and Composer in its official repositories. Build Swoole from its official PECL source using the development tools included with PHP.',
    steps: [
      {
        title: 'Install PHP, Composer, and build tools',
        commands: ['sudo pacman -Syu php composer base-devel brotli curl'],
        note: 'This performs a full system upgrade. Avoid partial upgrades on Arch Linux.',
      },
      {
        title: 'Download and build Swoole',
        commands: [
          'curl -fL https://pecl.php.net/get/swoole -o swoole.tgz',
          'mkdir swoole-build',
          'tar -xzf swoole.tgz --strip-components=1 -C swoole-build',
          'cd swoole-build',
          'phpize',
          './configure',
          'make',
          'sudo make install',
        ],
        note: 'Build as your normal user; only installation needs sudo. Rebuild Swoole after a PHP version upgrade.',
      },
      { title: 'Enable Swoole', commands: ['echo "extension=swoole.so" | sudo tee /etc/php/conf.d/30-swoole.ini > /dev/null'] },
    ],
  },
  {
    label: 'Windows', value: 'windows', release: 'Windows 10 / 11 with WSL2',
    description: 'Swoole does not run natively on Windows. Use WSL2 with Ubuntu 26.04 to run TeeFrame and its dependencies.',
    steps: [
      {
        title: 'Install WSL2 in PowerShell as administrator',
        commands: ['wsl --install -d Ubuntu-26.04'],
        note: 'Restart Windows if prompted, then open Ubuntu and create your Linux username and password.',
      },
      {
        title: 'Open Ubuntu from PowerShell',
        commands: ['wsl -d Ubuntu-26.04'],
        note: 'Run all remaining commands, including verification and the TeeFrame server commands, inside this Ubuntu terminal, not PowerShell.',
      },
      ...ubuntuSteps,
    ],
  },
])
</script>

<template>
  <UModal title="Install system dependencies" description="Choose your operating system to install PHP 8.5, Composer, and Swoole." :close="{ color: 'neutral', variant: 'ghost', size: 'xs', class: 'size-8 p-0' }" :ui="{ overlay: 'z-50 bg-foreground/30', content: 'z-50 max-w-2xl rounded-md border border-line bg-white ring-0 divide-line', header: 'min-h-0 p-4 sm:p-5', wrapper: 'pr-8', title: 'text-base font-medium tracking-[-0.025em] text-foreground', description: 'mt-2 text-xs leading-6 text-muted', body: 'min-w-0 p-4 sm:p-5', close: 'top-3 right-3' }">
    <UButton label="Installation Guide" icon="i-lucide-book-open" color="neutral" variant="ghost" size="xs" class="ml-auto min-h-0 shrink-0 px-1.5 py-0.5 text-[11px] leading-4 text-accent" aria-label="Open installation guide" />

    <template #body>
      <UTabs :items="guides" default-value="ubuntu" variant="link" size="sm" :ui="{ root: 'gap-0', list: 'overflow-x-auto overflow-y-hidden p-0 border-line', indicator: 'bottom-0', trigger: 'shrink-0 px-2 py-2 rounded-sm text-xs', content: 'min-w-0 pt-5' }">
        <template #content="{ item }">
          <p class="font-mono text-[10px] tracking-[0.05em] text-accent">{{ item.release }}</p>
          <p class="mt-2 text-xs leading-6 text-muted">{{ item.description }}</p>

          <div v-if="item.value === 'centos'" class="mt-3 flex gap-2" role="group" aria-label="CentOS Stream version">
            <UButton v-for="version in (['10', '9'] as const)" :key="version" :label="'Stream ' + version" color="neutral" variant="outline" size="xs" :aria-pressed="centosVersion === version" :class="centosVersion === version ? 'border-accent/50 bg-surface text-accent' : ''" @click="centosVersion = version" />
          </div>

          <div class="mt-5 space-y-4">
            <div v-for="(step, index) in item.steps" :key="step.title" class="min-w-0">
              <h3 class="mb-2 flex items-center gap-2.5 text-xs font-medium text-foreground"><span class="font-mono text-[10px] font-normal text-accent">0{{ index + 1 }}</span>{{ step.title }}</h3>
              <pre class="overflow-x-auto rounded border border-line bg-surface px-3 py-2.5 font-mono text-[11px] leading-6 text-foreground" tabindex="0" :aria-label="step.title + ' commands'"><code>{{ step.commands.join('\n') }}</code></pre>
              <p v-if="step.note" class="mt-2 text-[11px] leading-5 text-muted">{{ step.note }}</p>
            </div>
          </div>

          <div class="mt-5 border-t border-line pt-4">
            <h3 class="mb-2 text-xs font-medium text-foreground">Verify the installation</h3>
            <pre class="overflow-x-auto rounded border border-line bg-surface px-3 py-2.5 font-mono text-[11px] leading-6 text-foreground" tabindex="0" aria-label="Dependency verification commands"><code>{{ verificationCommands.join('\n') }}</code></pre>
            <p class="mt-2 text-[11px] leading-5 text-muted">Confirm PHP 8.5, Composer, and Swoole are available before continuing. If Swoole is missing, run <code class="font-mono text-accent">php --ini</code> to check the configuration directory.</p>
          </div>
        </template>
      </UTabs>
    </template>
  </UModal>
</template>
