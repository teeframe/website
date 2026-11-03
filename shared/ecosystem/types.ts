export type EcosystemCategory = 'projects' | 'tools' | 'libraries' | 'clients' | 'client-server-mods' | 'server-side-mods'

export type EcosystemLanguage = 'Rust' | 'Ruby' | 'Python' | 'JavaScript / TypeScript' | 'AngularJS' | 'C#' | 'C'

export interface EcosystemEntry {
  id: string
  name: string
  description: string
  category: EcosystemCategory
  url: string
  repository?: string
  language?: EcosystemLanguage
  icon: string
  tags: string[]
}
