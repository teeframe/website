export type EcosystemCategory = 'projects' | 'tools' | 'libraries' | 'clients' | 'client-server-mods' | 'server-side-mods' | 'documentation'

export type EcosystemStatus = 'maintained' | 'unclassified' | 'abandoned'

export type EcosystemLanguage = 'Rust' | 'Ruby' | 'Python' | 'JavaScript / TypeScript' | 'AngularJS' | 'C#' | 'C'

export interface EcosystemEntry {
  id: string
  name: string
  description: string
  category: EcosystemCategory
  status: EcosystemStatus
  url: string
  repository?: string
  teeframe: boolean
  language?: EcosystemLanguage
  icon: string

}
