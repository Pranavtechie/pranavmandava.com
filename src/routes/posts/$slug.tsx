import type { Post } from "@/lib/posts"
import { createFileRoute, Link } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"

const fetchPost = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { getPost } = await import("@/lib/posts.server")
    const post = await getPost(data.slug)
    if (!post) throw new Error("Post not found")
    return post
  })

export const Route = createFileRoute("/posts/$slug")({
  loader: ({ params }) => fetchPost({ data: { slug: params.slug } }),
  head: ({ loaderData }) => {
    const post = loaderData as Post
    // Site URL - update this with your actual domain when deploying
    const siteUrl = process.env.SITE_URL || "https://pranavmandava.com"
    const postUrl = `${siteUrl}/posts/${post.slug}`
    const publishedDate = new Date(post.created).toISOString()
    const modifiedDate = post.lastModified ? new Date(post.lastModified).toISOString() : publishedDate

    return {
      meta: [
        { title: `${post.title} | Pranav Mandava` },
        { name: "description", content: post.description },
        { name: "author", content: post.authors.join(", ") },
        { name: "keywords", content: post.tags.join(", ") },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: postUrl },
        { property: "article:published_time", content: publishedDate },
        { property: "article:modified_time", content: modifiedDate },
        { property: "article:author", content: post.authors.join(", ") },
        { property: "article:tag", content: post.tags.join(", ") },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.description },
      ],
      links: [
        { rel: "canonical", href: postUrl },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            author: {
              "@type": "Person",
              name: post.authors.join(", "),
            },
            datePublished: publishedDate,
            dateModified: modifiedDate,
            url: postUrl,
            keywords: post.tags.join(", "),
          }),
        },
      ],
    }
  },
  component: PostPage,
})

function PostPage() {
  const post = Route.useLoaderData() as Post

  return (
    <article>
      <Link
        to="/"
        className="text-xs text-amber-600 hover:text-amber-800 hover:underline mb-6 inline-block"
      >
        ← Back to posts
      </Link>

      <header className="mb-8">
        <h1 className="text-xl font-bold text-amber-800 mb-2">{post.title}</h1>
        <p className="text-sm text-amber-600/80 mb-2">{post.description}</p>
        <p className="text-xs text-amber-600/60">
          {post.created}
          {post.lastModified && ` · Updated ${post.lastModified}`}
          {" · "}
          {post.authors.join(", ")}
        </p>
      </header>

      <div
        className="prose prose-sm prose-amber max-w-none
          prose-headings:text-amber-800 prose-headings:font-semibold
          prose-p:text-amber-900/80 prose-p:leading-relaxed
          prose-a:text-amber-700 prose-a:underline hover:prose-a:text-amber-900
          prose-strong:text-amber-800
          prose-code:text-amber-800 prose-code:bg-amber-100 prose-code:px-1 prose-code:rounded
          prose-pre:bg-amber-100 prose-pre:text-amber-900
          prose-blockquote:border-amber-300 prose-blockquote:text-amber-700
          prose-li:text-amber-900/80
          prose-table:text-sm prose-th:text-amber-800 prose-td:text-amber-900/80"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
}
