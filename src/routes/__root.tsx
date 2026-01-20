import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router"
import { Sidebar } from "@/components/Sidebar"
import appCss from "@/styles.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Pranav Mandava" },
      { name: "description", content: "Personal website of Pranav Mandava - M.S Computer Science at ASU" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
  }),
  component: RootLayout,
})

function RootLayout() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen">
        <div className="lg:flex">
          <Sidebar />
          <main className="w-full lg:w-[70%] lg:ml-[30%] min-h-screen p-8 lg:p-12">
            <Outlet />
          </main>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
