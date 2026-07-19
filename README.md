# build-test-inputs

Minimal packages for templ-sites build pipeline integration tests. Each subdirectory under `packages/` triggers a specific build behaviour.

| Package | Tests |
|---------|-------|
| `packages/minimal-node` | Pipeline sanity — no deps, bare `pnpm install` |
| `packages/ssh-git-dep` | SSH→HTTPS git URL rewrite (`github:` shorthand dep) |
| `packages/native-deps` | Native module compilation (node-gyp, python3, g++) |
| `packages/nuxt-basic` | Minimal Nuxt 3 install and build |
| `packages/husky-app` | `HUSKY=0` suppresses prepare script — no git errors |
| `packages/private-dep-1-org` | Private `github:` dep from one org (single token) |
| `packages/private-dep-2-orgs` | Private deps from two orgs (two tokens) |
| `packages/private-dep-3-orgs` | Private deps from three orgs (three tokens) |
| `packages/static-site` | Custom `buildCommand` and `startCommand` — copies static files to `dist/`, serves with `serve` |
| `packages/astro-basic` | Minimal Astro 4 site — builds to `dist/`, no `start` script (exercises auto-fix deploy test) |
| `packages/ipv6-egress-test` | Runner container IPv6 egress — server hits an IPv6-only host and reports the result over HTTP |
