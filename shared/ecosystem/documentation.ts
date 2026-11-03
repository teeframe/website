import type { EcosystemEntry } from './types'

export const documentation: EcosystemEntry[] = [
  {
    id: 'libtw2-documentation',
    name: 'libtw2 documentation',
    description: 'Technical references for Teeworlds networking, snapshots, compression, map files, and demos.',
    category: 'documentation',
    status: 'unclassified',
    teeframe: false,
    url: 'https://github.com/heinrich5991/libtw2/tree/master/doc',
    repository: 'https://github.com/heinrich5991/libtw2',
    icon: 'i-lucide-book-open',
  },
  {
    id: 'chillerdragon-protocol-documentation',
    name: 'ChillerDragon’s protocol documentation',
    description: 'A community reference covering the Teeworlds 0.6 network protocol and DDNet extensions.',
    category: 'documentation',
    status: 'unclassified',
    teeframe: false,
    url: 'https://chillerdragon.github.io/teeworlds-protocol/',
    icon: 'i-lucide-network',
  },
]
