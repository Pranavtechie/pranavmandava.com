export interface PostMeta {
  slug: string
  title: string
  description: string
  created: string
  lastModified?: string
  authors: string[]
  tags: string[]
}

export interface Post extends PostMeta {
  content: string
}
