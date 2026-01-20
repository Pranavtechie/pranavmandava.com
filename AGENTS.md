# AGENTS.md

## Commands
- `bun dev` - Start dev server on port 3000
- `bun build` - Production build with static prerendering
- `bun test` - Run all tests (vitest)
- `bun test <file>` - Run a single test file
- `bunx tsc --noEmit` - Typecheck

## Architecture
- **Framework**: TanStack Start (React 19 + TanStack Router + Nitro SSR)
- **Styling**: TailwindCSS v4 with amber/orange theme, monospace font
- **Content**: Markdown posts in `src/content/posts/` parsed with gray-matter + remark
- **src/routes/**: File-based routing (TanStack Router convention)
- **src/components/**: Shared React components (Sidebar with 30/70 layout)
- **src/lib/posts.ts**: Post loading utilities (getAllPosts, getPost, getAllPostSlugs)
- **Static prerendering**: Enabled in vite.config.ts with crawlLinks

## Code Style
- TypeScript strict mode enabled
- Use `@/*` path alias for imports from src/
- React components: PascalCase files, named function exports
- No unused locals/parameters (enforced by tsconfig)
- ESM modules only (`"type": "module"`)
