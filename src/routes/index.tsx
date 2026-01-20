import { createFileRoute, Link } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import type { PostMeta } from "@/lib/posts"

const getPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { getAllPosts } = await import("@/lib/posts.server")
  return getAllPosts()
})

export const Route = createFileRoute("/")({
  loader: () => getPosts(),
  component: HomePage,
})

function HomePage() {
  const posts = Route.useLoaderData()

  return (
    <div>
      <h2 className="text-lg font-semibold text-amber-800 mb-8">Posts</h2>
      <ul className="space-y-6">
        {posts.map((post: PostMeta) => (
          <li key={post.slug}>
            <Link
              to="/posts/$slug"
              params={{ slug: post.slug }}
              className="group block"
            >
              <h3 className="text-amber-700 group-hover:text-amber-900 group-hover:underline">
                {post.title}
              </h3>
              <p className="text-xs text-amber-600/70 mt-1">
                {post.created} · {post.tags.join(", ")}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
