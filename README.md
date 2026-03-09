<div align="center">

# ⚰ Graveyard

### _A memorial for the projects that almost were._

**Every great developer has a graveyard full of abandoned ideas.**  
Most people hide them. This project celebrates them.

[![Next.js](https://img.shields.io/badge/Next.js_15-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://prisma.io)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## The Concept

Developers have graveyards. Everyone does.

That folder named `old/`. The GitHub repo switched to private. The Figma file no one opens anymore. The idea that lived only in a Notion page for three months before quietly dying.

**Graveyard** is a digital memorial and interactive portfolio for abandoned projects — built on the belief that _what we tried and failed_ matters as much as what we shipped.

Instead of erasing these projects from history, Graveyard archives them with full ritual and dignity: **epitaphs**, **death certificates**, **emotional weight classifications**, **timelines**, and **reincarnation plans**. It turns a personal graveyard of abandoned work into something beautiful, honest, and worth sharing.

> _"The projects that didn't work taught me more than the ones that did."_

---

## Why It's Different

Most developer portfolios are curated highlight reels — only the wins, only the shipped products, only the success stories.

Graveyard inverts that entirely.

| Traditional Portfolio    | Graveyard                                 |
| ------------------------ | ----------------------------------------- |
| Shows only what worked   | Celebrates everything that was tried      |
| Hides failure            | Archives it with ritual and intention     |
| Impersonal and technical | Editorial, poetic, and deeply personal    |
| Static and expected      | Narratively rich and emotionally resonant |
| A resume in disguise     | An honest document of a creative mind     |

The result is something that **stands out** in a sea of identical portfolios — and tells a far more interesting story about how a developer thinks, reflects, and grows.

---

## Stack

| Layer         | Technology                         | Why                                                      |
| ------------- | ---------------------------------- | -------------------------------------------------------- |
| Framework     | **Next.js 15** (App Router)        | RSC, streaming, nested layouts, co-located data fetching |
| Language      | **TypeScript 5**                   | End-to-end type safety, from schema to UI                |
| Styling       | **Tailwind CSS 4** + CSS Variables | Dark-only design system with semantic color tokens       |
| Components    | **shadcn/ui** + Radix UI           | Accessible, unstyled primitives — fully customized       |
| Animations    | **Framer Motion**                  | Scroll-triggered reveals, staggered entrances            |
| Database      | **PostgreSQL** + Prisma ORM        | Relational model with a rich, narrative-first schema     |
| Validation    | **Zod** + React Hook Form          | Single schema shared across API and form layers          |
| Charts        | **Recharts**                       | Analytics dashboard with responsive visualizations       |
| Dates         | **date-fns**                       | Localized date handling                                  |
| Notifications | **Sonner**                         | Non-intrusive toast notifications                        |
| Typography    | **Playfair Display** + Inter       | Editorial display meets clean body text                  |
| Theme         | **next-themes**                    | Forced dark mode — no toggle, no compromise              |

---

## Features

### ✦ Memorial Hall

A filterable, paginated archive of all buried projects. Filter by cause of death, development stage, project type, and emotional weight. Each card surfaces the project's epitaph, resurrection potential, and the stack it was built with.

### ✦ Full Obituary Pages

Each project receives a complete, long-form memorial page:

- **Death Certificate** — cause of death, emotional weight, development stage at time of death
- **Timeline** — a chronological history of birth, milestones, setbacks, pivots, and the final moment of reckoning
- **Symptoms** — early warning signs that were ignored
- **Interrupted Dreams** — what the project wanted to become
- **What Still Works** — the surviving parts worth preserving
- **Lessons Learned** — categorized by technical, business, personal, and process
- **Reincarnation Plan** — how this project might return in another form
- **Farewell Letter** — a personal note from the author to the project

### ✦ Funeral Wizard

A multi-step form for registering a new project. It guides the author through identity, classification, timeline, narrative fields, and reincarnation planning — treating the process as a ritual, not a CRUD operation.

### ✦ Analytics Dashboard

Data visualization built with Recharts: distribution of causes of death, stage breakdown, tech stack frequency, emotional weight distribution, and resurrection potential by project type.

### ✦ Reincarnation Lab

A dedicated view for projects with `HIGH` or `INEVITABLE` resurrection potential — with their reincarnation ideas, feasibility scores, and pivot type classifications.

### ✦ Manifesto

A long-form philosophical essay about the dignity of public failure, why abandoned projects deserve documentation, and what this archive represents.

---

## Architecture

```
graveyard/
├── prisma/
│   ├── schema.prisma          # 8 models, 9 enums — full narrative data model
│   └── seed.ts                # 10 fully fleshed-out example projects
│
├── src/
│   ├── app/
│   │   ├── page.tsx           # Animated landing page with concept introduction
│   │   ├── hall/              # Memorial Hall — list view + [slug] obituary detail
│   │   ├── new/               # Multi-step funeral wizard
│   │   ├── analytics/         # Recharts dashboard
│   │   ├── reincarnation/     # Resurrection lab
│   │   ├── manifesto/         # Long-form essay
│   │   └── api/               # REST endpoints — projects and analytics
│   │
│   ├── components/
│   │   ├── layout/            # Site nav + footer
│   │   ├── memorial/          # Domain-specific components (cards, badges, timeline...)
│   │   └── ui/                # shadcn/ui base components
│   │
│   ├── lib/
│   │   ├── prisma.ts          # Singleton Prisma client with global caching
│   │   ├── validations.ts     # Zod schemas — single source of truth
│   │   └── utils.ts           # Utility functions and cn()
│   │
│   └── types/
│       └── index.ts           # Domain types derived from Prisma enums
│
└── scripts/
    └── patch-prisma.mjs       # Edge compatibility patch for Prisma on Vercel
```

### Data Model Highlights

The schema is deliberately richer than a typical CRUD model. A `Project` carries:

- **Classification** — `ProjectType` (14 types), `DeathStage` (7 stages), `CauseOfDeath` (15 causes), `EmotionalWeight` (6 states), `ResurrectionPotential` (5 levels)
- **Narrative fields** — `whatItWantedToBe`, `whatWentWrong`, `whatStillWorks`, `symptoms[]`, `dreams[]`, `farewellLetter`
- **Relations** — `Tag[]`, `Artifact[]`, `Lesson[]`, `ReincarnationIdea[]`, `TimelineEvent[]`

The 15 `CauseOfDeath` variants (`NO_TIME`, `SCOPE_CREEP`, `BURNOUT`, `WRONG_TECH`, `TEAM_SPLIT`, ...) were designed by analyzing real failure patterns in software projects — not arbitrarily defined.

---

## Screenshots

| View                                            | Description                                   |
| ----------------------------------------------- | --------------------------------------------- |
| ![Landing](screenshots/landing.png)             | Hero landing page with animated project cards |
| ![Hall](screenshots/hall.png)                   | Memorial Hall with filters active             |
| ![Obituary](screenshots/obituary.png)           | Full project obituary page                    |
| ![Timeline](screenshots/timeline.png)           | Timeline strip component                      |
| ![Analytics](screenshots/analytics.png)         | Analytics dashboard with Recharts             |
| ![Reincarnation](screenshots/reincarnation.png) | Reincarnation Lab view                        |
| ![Wizard](screenshots/wizard.png)               | Multi-step funeral wizard                     |

> Screenshots are suggested placements — replace with actual captures before sharing.

---

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL (local, or hosted via [Railway](https://railway.app), [Supabase](https://supabase.com), or [Neon](https://neon.tech))

### 1. Clone and install

```bash
git clone https://github.com/gabpaesschulz/graveyard.git
cd graveyard
npm install
```

### 2. Configure environment

Create a `.env` file at the project root:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/graveyard"
```

### 3. Push schema and seed

```bash
npm run db:generate    # Generates Prisma Client
npm run db:push        # Syncs schema to the database
npm run db:seed        # Seeds 10 example projects with full narratives
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command               | Description               |
| --------------------- | ------------------------- |
| `npm run dev`         | Start development server  |
| `npm run build`       | Production build          |
| `npm run db:generate` | Generate Prisma Client    |
| `npm run db:push`     | Sync schema with database |
| `npm run db:seed`     | Seed 10 example projects  |
| `npm run db:studio`   | Open Prisma Studio        |

---

## Design Decisions

### Dark-only, by intention

The palette was designed as a night archive, not a light-mode app with an inverted theme. `#0f0d12` (Ink) evokes aged parchment by candlelight — serious, quiet, editorial. Forced dark mode isn't a missing feature: it's a creative constraint that holds the atmosphere together.

### Editorial typography over UI typography

Most developer tools use clean sans-serif throughout. Graveyard uses **Playfair Display** for all display text — project names, epitaphs, section headers — borrowing from book design and print journalism. The result feels like a literary archive, not a dashboard.

### Ritual language as UX

The vocabulary is intentional: _velório_, _epitáfio_, _certidão de óbito_, _reencarnação_. This isn't decoration — it forces a different emotional register when interacting with the app and makes the experience genuinely memorable. Users slow down. They read.

### Color semantics, not aesthetics

Each color token carries meaning, not just style:

| Token                        | Hex       | Meaning                               |
| ---------------------------- | --------- | ------------------------------------- |
| **Gold** `--primary`         | `#c9a96e` | What is valuable, what endures        |
| **Crimson**                  | `#8b3a3a` | Cause of death, loss, what hurt       |
| **Verdigris**                | `#3d7a6a` | Survival, reincarnation, what remains |
| **Parchment** `--foreground` | `#f0ece3` | Text, permanence, what was written    |

### Generous whitespace, by design

The layout reads slowly, and that's the point. Unlike dashboards optimized for information density, Graveyard uses generous spacing to make content feel considered — each project deserves to be read, not scanned.

---

## Technical Decisions

### Next.js App Router with React Server Components

Data-fetching pages (Hall, Analytics, Reincarnation Lab, individual obituaries) are Server Components. Client Components are scoped strictly to interactivity — filters, animations, form state. This keeps the bundle lean and data fetching co-located with rendering, without a separate API layer for most views.

### Prisma with a custom Edge compatibility patch

`scripts/patch-prisma.mjs` patches Prisma's generated client to resolve a known `fs` module detection issue in Next.js Edge-adjacent environments during Vercel deployments. This avoids switching to a heavier alternative while maintaining the full Prisma DX.

### Single Zod schema across layers

All validation derives from one `lib/validations.ts` file. The same Zod schema validates API route inputs server-side and powers React Hook Form client-side — no duplication, no drift between what the server accepts and what the form allows.

### Enum-driven classification for meaningful analytics

Using enums instead of free-text for `CauseOfDeath`, `EmotionalWeight`, and `ProjectType` enables meaningful aggregation in the analytics dashboard without NLP, tagging heuristics, or post-processing. The taxonomy was designed with analytics as a first-class concern from day one.

### Seed data as first-class creative content

The seed file contains 10 fully fleshed-out fictional projects — complete with narratives, timelines, lessons, and reincarnation ideas. They serve simultaneously as demo content, documentation of the data model, and genuine creative writing about the shared developer experience. No lorem ipsum.

---

## Roadmap

- [ ] **Authentication** — user accounts with private/public visibility per project
- [ ] **Shareable memorial links** — clean, copyable URLs for individual obituaries
- [ ] **GitHub import** — detect abandoned repos (last commit > 6 months, no releases) and pre-populate the funeral wizard
- [ ] **RSS feed** — subscribe to updates from a developer's graveyard
- [ ] **Collaborative memorials** — multiple contributors to the same project's obituary (for team projects)
- [ ] **Emotional timeline** — a chart of how the emotional weight of a project shifted over time
- [ ] **AI epitaph generator** — draft an epitaph from a project description using an LLM
- [ ] **Open source mode** — export your graveyard as a static site

---

<div align="center">

_"Que os projetos mortos descansem bem._  
_E que o que eles ensinaram não descanse nunca."_

<br />

Built with intention by [Gabriel](https://github.com/gabpaesschulz) · MIT License

</div>
