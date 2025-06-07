# AGENT.md - Development Guidelines

## Commands
- **Build**: `npm run build` (Next.js build)
- **Dev**: `npm run dev` (development server)
- **Lint**: `npm run lint` (ESLint)
- **DB Push**: `npm run db:push` (Drizzle database push)

## Code Style
- **TypeScript**: Strict mode enabled, use explicit types
- **Imports**: React first, then local components, then types/utils using `@/` alias
- **Components**: PascalCase files (e.g., `TodoList.tsx`), default exports
- **Server Actions**: Use 'use server' directive, return error objects `{ error: string }`
- **Types**: Define in `/types/index.ts`, export interfaces with PascalCase
- **Error Handling**: Try-catch blocks, console.error for logging, return error objects
- **Props**: Destructure in function parameters, use TypeScript interfaces
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **Database**: Drizzle ORM with PostgreSQL, use db from `@/db`
- **Client Components**: Use 'use client' directive when needed
- **Icons**: Store in `/components/icons/` directory

## Project Structure
- Next.js 15 with TypeScript, Tailwind CSS, and Drizzle ORM
- Use path aliases `@/*` for `./src/*`
