import type { EcosystemEntry } from './types'

export const clientServerMods: EcosystemEntry[] = [
  {
    id: 'minetee',
    name: 'MineTee',
    description: 'A client and server modification for Teeworlds 0.6.x.',
    category: 'client-server-mods',
    url: 'https://gitlab.com/Tardo/MineTee',
    repository: 'https://gitlab.com/Tardo/MineTee',
    icon: 'i-lucide-blocks',
    tags: ['Gameplay'],
  },
  {
    id: 'nodes',
    name: 'Nodes',
    description: 'Team base-building combat with weapon dispensers, automatic guns, teleporters and shields.',
    category: 'client-server-mods',
    url: 'https://www.teeworlds.com/forum/viewtopic.php?id=5409',
    icon: 'i-lucide-blocks',
    tags: ['Base building', 'Team combat', 'Defense'],
  },
]
