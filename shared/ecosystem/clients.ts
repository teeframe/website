import type { EcosystemEntry } from './types'

export const clients: EcosystemEntry[] = [
  {
    id: 'taterclient',
    name: 'TaterClient',
    description: 'A modified DDNet Teeworlds client.',
    category: 'clients',
    status: 'unclassified',
    teeframe: false,
    url: 'https://github.com/sjrc6/TaterClient-ddnet',
    repository: 'https://github.com/sjrc6/TaterClient-ddnet',
    icon: 'i-lucide-monitor',
  },
  {
    id: 'chillerbot-ux',
    name: 'chillerbot-ux',
    description: 'A DDNet-based client with a password manager, block warlist and chat automation.',
    category: 'clients',
    status: 'unclassified',
    teeframe: false,
    url: 'https://github.com/chillerbot/chillerbot-ux',
    repository: 'https://github.com/chillerbot/chillerbot-ux',
    icon: 'i-lucide-monitor',
  },
]
