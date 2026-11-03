import { projects } from './ecosystem/projects'
import { tools } from './ecosystem/tools'
import { libraries } from './ecosystem/libraries'
import { clients } from './ecosystem/clients'
import { clientServerMods } from './ecosystem/client-server-mods'
import { serverSideMods } from './ecosystem/server-side-mods'
import type { EcosystemCategory, EcosystemEntry, EcosystemLanguage } from './ecosystem/types'

export type { EcosystemCategory, EcosystemEntry, EcosystemLanguage } from './ecosystem/types'

export const ecosystemCategories = [
  { id: 'projects', label: 'Projects', icon: 'i-lucide-orbit' },
  { id: 'tools', label: 'Tools', icon: 'i-lucide-wrench' },
  { id: 'libraries', label: 'Libraries', icon: 'i-lucide-code' },
  { id: 'clients', label: 'Clients', icon: 'i-lucide-monitor' },
  { id: 'client-server-mods', label: 'Client-server mods', icon: 'i-lucide-blocks' },
  { id: 'server-side-mods', label: 'Server-side mods', icon: 'i-lucide-server' },
] satisfies { id: EcosystemCategory; label: string; icon: string }[]

export const ecosystemLanguages: EcosystemLanguage[] = [
  'Rust',
  'Ruby',
  'Python',
  'JavaScript / TypeScript',
  'AngularJS',
  'C#',
  'C',
]

export const ecosystemEntries: EcosystemEntry[] = [
  ...projects,
  ...tools,
  ...libraries,
  ...clients,
  ...clientServerMods,
  ...serverSideMods,
]
