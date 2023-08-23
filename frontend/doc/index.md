# Developper docs 👋

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000) [![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)

## Development environment setup

### Requirements

-   Node.JS version `18.0` or higher.

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

### Start development environment

```sh
npm run dev
```

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Start dev environment

```sh
npm run dev
```

## Documentation

Frontend documentation is automatically generated in Markdown format from [TSDoc](https://tsdoc.org/) doc comments standard with [TypeDoc](https://typedoc.org/). Documentation for Vue components is also generated from code by [vue-docgen-cli](https://vue-styleguidist.github.io/docs/docgen-cli.html).

### Generate the documentation

```sh
npm run typedoc
```

### Launch doc pages in development mode

```sh
npm run doc:dev
```

### Build Vitepress doc pages

```sh
npm run doc:build
npm run doc:preview # To view result without HTTP server.
```
