export type Blog = {
  title: string
  description: string
  date: string
  slug: string
  views?: number
}

export type Project = {
  name: string
  description: string
  link: string
  logo: string
  role: string
  tech: string[]
}

export type Talk = {
  title: string
  description: string
  event: string
  date: string
  link?: string
  recording?: string
  slides?: string
}

export type Social = {
  platform: 'github' | 'twitter' | 'linkedin'
  url: string
  icon: string
}

export type Navigation = {
  href: string
  label: string
  external?: boolean
}
