import type { EcosystemEntry } from './types'

export const clients: EcosystemEntry[] = [
  {
    id: 'taterclient',
    name: 'TaterClient',
    description: 'A modified DDNet Teeworlds client.',
    category: 'clients',
    url: 'https://github.com/sjrc6/TaterClient-ddnet',
    repository: 'https://github.com/sjrc6/TaterClient-ddnet',
    icon: 'i-lucide-monitor',
    tags: ['DDNet', 'Gameplay'],
  },
  {
    id: 'chillerbot-ux',
    name: 'chillerbot-ux',
    description: 'A DDNet-based client with a password manager, block warlist and chat automation.',
    category: 'clients',
    url: 'https://github.com/chillerbot/chillerbot-ux',
    repository: 'https://github.com/chillerbot/chillerbot-ux',
    icon: 'i-lucide-monitor',
    tags: ['Chat automation', 'Passwords', 'Block warlist'],
  },
]
