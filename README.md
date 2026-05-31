# build-test-inputs

Minimal packages for templ-sites build pipeline integration tests. Each subdirectory under `packages/` triggers a specific build behaviour.

| Package | Tests |
|---------|-------|
| `packages/minimal-node` | Pipeline sanity — no deps, bare build |
| `packages/ssh-git-dep` | SSH→HTTPS git URL rewrite (`github:` shorthand) |
| `packages/native-deps` | Native module compilation (node-gyp, python3, g++) |
| `packages/nuxt-basic` | Minimal Nuxt install and build |
