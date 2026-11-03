import type { EcosystemEntry } from './types'

export const tools: EcosystemEntry[] = [
  {
    id: 'simple-ddnet-automapper',
    name: 'SimpleDDNetAutomapper',
    description: 'An application for creating DDNet automappers.',
    category: 'tools',
    url: 'https://github.com/AssassinTee/SimpleDDNetAutomapper',
    repository: 'https://github.com/AssassinTee/SimpleDDNetAutomapper',
    icon: 'i-lucide-map',
    tags: ['Maps', 'Automapping'],
  },
  {
    id: 'teeview',
    name: 'teeview',
    description: 'Renders Teeworlds and DDNet skin files in your browser.',
    category: 'tools',
    url: 'https://teeview.meeu.me/',
    repository: 'https://github.com/meeuchan/teeview',
    icon: 'i-lucide-palette',
    tags: ['Skins', 'Rendering'],
  },
  {
    id: 'demo-to-ghost',
    name: 'demo_to_ghost',
    description: 'Converts DDNet demos into ghost files.',
    category: 'tools',
    url: 'https://github.com/Teero888/demo_to_ghost',
    repository: 'https://github.com/Teero888/demo_to_ghost',
    icon: 'i-lucide-film',
    tags: ['Demos', 'Ghosts', 'Conversion'],
  },
]
