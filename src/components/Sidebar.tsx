import { Link } from "@tanstack/react-router"
import { GithubIcon } from "lucide-react"

export function Sidebar() {
  return (
    <aside className="w-full lg:w-[30%] lg:fixed lg:left-0 lg:top-0 lg:h-screen p-6 lg:p-12 border-b lg:border-b-0 lg:border-r border-amber-200">
      <Link to="/" className="block">
        <h1 className="text-2xl font-bold text-amber-700 mb-4">
          Pranav Mandava
        </h1>
      </Link>

      <p className="text-sm text-amber-900/80 leading-relaxed mb-4">
        M.S Computer Science at ASU (May 2027). Future Space Explorer and Computer Nerd. Seasonal Developer (trying to be a full-time one). Optimist.
      </p>

      <div className="flex gap-4 mb-6">
        <a
          href="https://github.com/pranavtechie"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-700 hover:text-amber-900"
          aria-label="GitHub"
        >
          <GithubIcon size={18} />
        </a>
        <a
          href="https://x.com/pranav_techie"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-700 hover:text-amber-900 text-lg leading-none"
          aria-label="X (Twitter)"
        >
          𝕏
        </a>
      </div>
    </aside>
  )
}
