# IPEX — Igris Platform EXperience

The shared design system for Igris Labs applications. This repository will host the open-source landing page, guides, and copyable Vue components.

Project decisions live in [rules.md](./rules.md). Visual requirements live in [IPEX-Design-System.md](./IPEX-Design-System.md). Primitive API documentation lives in [akaza-ui](./akaza-ui/).

## Development

Use Node.js 22.19 or newer and pnpm 10.7.1.

```sh
pnpm install
pnpm dev
```

Installation runs `nuxt prepare`, generating Nuxt types. If those files are missing, run `pnpm exec nuxt prepare`.

## Foundation

- Tailwind CSS 4 runs through its Vite plugin. The CSS entry is `app/assets/main.css`.
- Akaza UI's Nuxt module registers primitives and loads their required structural CSS. The CSS entry reserves `akaza-reset` before Tailwind so utilities take precedence.
- Tailwind Variants' lite entry supplies recipes; `cn` resolves class conflicts. Both are exported from `app/utils/ui.ts`. Use explicit portable imports in components intended for copying.
- The light/dark theme uses shadcn token names, extended with shared text, border, inverse-surface, scrim, and feedback roles. Inter and JetBrains Mono use the existing Nuxt Fonts integration.
- Button has `xs`, `sm`, `md`, `lg`, and `xl` recipes with coordinated dimensions, padding, typography, radius, icons, and gaps. Its docs page lists the values for review.

Every public Akaza component has an IPEX wrapper, a component guide, and copyable source. The overlay provider has no visible styling. Component guides expose live size, variant, and surface-width controls where supported. Shared configuration types are extended by each installed component, so copied subsets do not require the whole catalog.

The Button recipe provides tactile primary and accent filled treatments through Tailwind utilities. Tactile is not a separate public variant. Secondary solid buttons use a flat fill. Each component owns a folder under `app/components/ui`, an exported recipe, public types, and its Vue wrapper. Use `ui.config.ts` for shared defaults; instance props take priority. Soft, subtle, outline, ghost, and link variants use their own recipes. Custom component CSS is allowed only when Tailwind cannot express the behavior.

The initial docs shell uses Akaza AppLayout and follows the layout in `pm-app/apps/docs`. `/` serves the landing page. Color Mode follows the system preference until a visitor chooses light or dark. The docs use a centered 42rem article column, 15px prose with 28px leading, and compact navigation. Navigation icons come from Content frontmatter. Dedicated prose components live in `app/components/prose`. Markdown, examples, and copied source use Speed Highlight with VS Code Light+ and Dark+ syntax colors. Vue SFCs use the local grammar adapter; Bash aliases cover shell commands. Nuxt Content’s built-in highlighter is disabled. Getting-started guides live in `content/1.getting-started`, and unnumbered component pages live in `content/3.components`. Nuxt Content's navigation tree supplies categories, pages, and their order; `.navigation.yml` supplies category titles. Component source tabs read the files used by the live examples. Shared dependencies, CSS, utilities, configuration, and types are documented in Installation. Each component's `index.ts` contains its variants, types, default-resolution configuration, and exports alongside its Vue wrapper.

The user's supplied OKLCH palette is IPEX's default base theme. Light mode uses neutral primary, blue secondary, and an optional violet accent. Dark mode retains the supplied neutral surface mixes and uses a brighter violet accent. Direct color literals use OKLCH; dark-mode `color-mix(in srgb, ...)` expressions and Tailwind OKLCH palette references preserve the supplied colors. Feedback foregrounds retain their shadcn meaning as readable text on the corresponding solid color, rather than same-hue emphasis text. Customize `--accent` and `--accent-foreground` to give accent a separate theme color. Dimmed text is intended for tertiary or disabled content; use `text-muted-foreground` for readable secondary copy. Theme authors must check text contrast when changing colors.

For a single root, merge recipe output and consumer classes with `cn`. For multipart components, do the same for each Akaza `ui` part. Tailwind Variants' lite entry does not resolve conflicting utilities itself.

## Checks

```sh
pnpm lint          # Oxlint with migrated Antfu rules
pnpm lint:fix      # Apply available lint fixes
pnpm lint:sync     # Regenerate Oxlint config from Antfu
pnpm format        # Oxfmt, including Tailwind sorting
pnpm format:check  # Check formatting without writing
pnpm typecheck     # Nuxt/Vue TypeScript checks
pnpm check         # Lint, format check, and typecheck
pnpm test          # Component coverage and Chromium interaction tests
pnpm build         # Production build
```

Before running browser tests on a new machine, run `pnpm exec playwright install chromium`. Playwright starts the dev server if one is not already available.

Oxlint runs the supported native subset of Antfu's rules. The migration source is `tooling/antfu.config.mjs`; the generated runtime configuration is `.oxlintrc.json`. Run `pnpm lint:sync` after changing the source or updating Antfu, then review the generated config and `tooling/antfu-migration.txt` for skipped rules and warnings. Edit the source rather than the generated configuration.

Antfu and ESLint are development dependencies used to resolve the migration source; ESLint does not run during linting or on save. This is not full Antfu parity: unsupported plugin, parser, and template rules are omitted. The migration source disables a type-import rule whose option schema differs in Oxlint; TypeScript's consistent-type-imports rule remains enabled.

Oxfmt owns formatting, import ordering, package.json key ordering, and Tailwind class ordering. Antfu's formatting and import-sorting presets are disabled in the migration source to avoid conflicts. JSON, YAML, TOML, and Markdown lint presets are also excluded because Oxlint does not lint those formats.

Oxlint checks the script blocks of Vue files; it does not lint Vue templates. Vue TypeScript checking remains available through `pnpm typecheck`.

Supplied Akaza documentation and the canonical design specification are excluded from linting and formatting to preserve reference material.

## Editor setup

Install the recommended workspace extensions: Oxc, Vue - Official, and Tailwind CSS IntelliSense. Workspace settings enable Oxfmt formatting and Oxlint fixes on save, including automatic saves. ESLint is disabled for this workspace. Problems without automatic fixes remain in editor diagnostics.

Other editors should run the same project-local Oxlint and Oxfmt configurations.
