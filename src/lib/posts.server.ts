import matter from "gray-matter"
import rehypeStringify from "rehype-stringify"
import { remark } from "remark"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import type { Post, PostMeta } from "./posts"

const postModules = import.meta.glob("/src/content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>

function parsePost(filePath: string, content: string): PostMeta {
  const slug = filePath.split("/").pop()!.replace(/\.md$/, "")
  const { data } = matter(content)

  return {
    slug,
    title: data.title,
    description: data.description,
    created:
      data.created instanceof Date
        ? data.created.toISOString().split("T")[0]
        : String(data.created),
    lastModified: data.lastModified
      ? data.lastModified instanceof Date
        ? data.lastModified.toISOString().split("T")[0]
        : String(data.lastModified)
      : undefined,
    authors: data.authors,
    tags: data.tags,
  }
}

export function getAllPosts(): PostMeta[] {
  const posts = Object.entries(postModules)
    .map(([path, content]) => parsePost(path, content))
    .sort((a, b) => (a.created > b.created ? -1 : 1))

  return posts
}

export async function getPost(slug: string): Promise<Post | null> {
  const entry = Object.entries(postModules).find(([path]) =>
    path.endsWith(`/${slug}.md`)
  )

  if (!entry) return null

  const [, rawContent] = entry
  const { data, content: markdownContent } = matter(rawContent)

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdownContent)
  const content = processedContent.toString()

  return {
    slug,
    title: data.title,
    description: data.description,
    created:
      data.created instanceof Date
        ? data.created.toISOString().split("T")[0]
        : String(data.created),
    lastModified: data.lastModified
      ? data.lastModified instanceof Date
        ? data.lastModified.toISOString().split("T")[0]
        : String(data.lastModified)
      : undefined,
    authors: data.authors,
    tags: data.tags,
    content,
  }
}

export function getAllPostSlugs(): string[] {
  return Object.keys(postModules).map((path) =>
    path.split("/").pop()!.replace(/\.md$/, "")
  )
}
