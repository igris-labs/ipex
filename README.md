# IPEX

**The foundation for your design system.**

IPEX (Igris Platform EXperience) is an open-source design foundation by [Igris Labs](https://igrislabs.com) for Vue and Nuxt. Copy the components into your app, set your theme tokens, and adapt the source to your product.

[Akaza UI](https://akaza-ui.com) provides the headless primitives, keyboard navigation, and focus management. IPEX adds Tailwind CSS styling, semantic theme tokens, coordinated sizes, and shared defaults.

## What’s included

- Vue components with copyable source, interactive demos, and API guides.
- Light and dark themes using OKLCH colors and semantic CSS tokens.
- Tailwind Variants recipes with `cn` for class merging and overrides.
- Shared component defaults in `ui.config.ts`, with per-instance overrides.
- A Nuxt Content documentation site with search, highlighted code, and package-manager tabs.
- Interactive landing examples: a component gallery, a project dashboard, and an email client.

The dashboard demonstrates project filtering, delivery progress, and project details. The email example includes folders, search, a reading pane, starred messages, archiving, and composing replies. Both use local sample data; messages are never sent to an email service.

## Use the components

Run the docs locally and start with **Getting started → Installation**. It covers dependencies, the global stylesheet, shared utilities, and configuration. Then open a component guide:

1. Try its demos and options.
2. Copy its Vue wrapper and `index.ts` from Installation.
3. Use the API reference to configure it.

Components live in your application. Change the theme through CSS tokens, set common defaults in `ui.config.ts`, or customize the recipes directly. Primary and accent filled buttons use IPEX’s tactile treatment; secondary stays neutral. Supported control sizes run from `xs` through `xl`, with typography, padding, radius, and icons sized together.

## Run locally

Use Node.js 22.19 or newer and pnpm 10.7.1.

```sh
pnpm install
pnpm dev
```

Open the URL printed by Nuxt. `/` serves the landing page; `/getting-started/introduction` opens the documentation.

Installation runs `nuxt prepare` to generate framework types. If needed, regenerate them with `pnpm exec nuxt prepare`.

## Project structure

```text
app/
  assets/main.css          Global theme and Tailwind entry
  components/
    ui/                    Copyable IPEX components
      button/
        Button.vue         Vue wrapper around the Akaza primitive
        index.ts           Recipe, types, defaults, and exports
      ui.config.ts         Shared component defaults
      ui.types.ts          Shared configuration types
    prose/                 Markdown rendering components
    content/               Documentation demos and source viewers
    docs/                  Documentation search
  layouts/                 Marketing and documentation shells
  pages/                   Landing page and content routes
  utils/ui.ts              tv and cn utilities
content/
  1.getting-started/        Introduction, installation, styling, and usage
  2.design-system/          Design principles and foundations
  3.components/            Component guides, sorted by filename
akaza-ui/                  Local primitive API references
tests/                     Playwright interaction and regression checks
```

Nuxt Content builds navigation from the content tree. Category metadata lives in `.navigation.yml`; component filenames have no numeric prefixes. Each component guide follows **Demos → Installation → API**.

## Deployment

IPEX uses Nitro's static preset. `pnpm build` prerenders the homepage and crawls internal links to generate the documentation pages. Build errors, including broken page links found during prerendering, fail the build. The output includes the content database needed for browser navigation and search. Icons used in application source and Markdown are bundled locally, without runtime icon API requests.

For Cloudflare Pages, use these build settings:

| Setting                | Value            |
| ---------------------- | ---------------- |
| Build command          | `pnpm build`     |
| Build output directory | `.output/public` |

Deploy the generated output after rebuilding. Cloudflare Pages serves the generated page files directly; no Nuxt server or Pages Function is required.

`pnpm generate` also produces the static export in `.output/public`.

## Checks

```sh
pnpm check         # Lint, formatting, and Vue/TypeScript checks
pnpm test          # Chromium interaction and regression tests
pnpm build         # Production build
```

Install the test browser before the first test run:

```sh
pnpm exec playwright install chromium
```

Playwright starts a development server on port 4317 if one is not already running there.

### Linting and formatting

Oxlint handles linting through `.oxlintrc.json`, using supported rules adapted from [Antfu’s ESLint config](https://github.com/antfu/eslint-config). ESLint itself does not run during development. Unsupported plugin, parser, and template rules are omitted. Vue template type checking runs through `pnpm typecheck`.

Oxfmt owns formatting, import ordering, and Tailwind class sorting through `.oxfmtrc.json`. Oxlint handles lint rules without applying competing formatting rules.

```sh
pnpm lint          # Check lint rules
pnpm lint:fix      # Apply available fixes
pnpm format        # Format files
pnpm format:check  # Check formatting
pnpm typecheck     # Check Vue and TypeScript
```

Edit `.oxlintrc.json` to change lint rules and `.oxfmtrc.json` to change formatting.

### Editor setup

Install the recommended Oxc, Vue - Official, and Tailwind CSS IntelliSense extensions. Workspace settings run Oxfmt and available Oxlint fixes on save. ESLint is disabled for this workspace.

## Brand assets

The IPEX mark uses four asymmetric panels around an open center, with a lighter neutral panel for a monochrome identity. Use the shared `BrandLogo` component for theme-aware marks and wordmarks in the site.

- [Vector wordmark](public/brand/ipex-logo.svg)
- [Vector symbol](public/brand/ipex-symbol.svg)
- [App icon](public/brand/ipex-app-icon.png)

The site includes SVG and ICO favicons plus an Apple touch icon.

## Contributing

Read [the contribution guide](content/1.getting-started/5.contribution.md) and the design system guides in `content/2.design-system/` before changing components. Use existing IPEX components in the docs, keep styling in Tailwind recipes, and check keyboard behavior and both color modes. Include relevant checks with a pull request.

Created by [Rahul Vashishtha](https://rahulv.dev) at [Igris Labs](https://igrislabs.com). Built on [Akaza UI](https://akaza-ui.com).
