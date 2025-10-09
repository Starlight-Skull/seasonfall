# Seasonfall

[![Webpack](https://github.com/Starlight-Skull/seasonfall/actions/workflows/webpack.yml/badge.svg)](https://github.com/Starlight-Skull/seasonfall/actions/workflows/webpack.yml)
[![CodeQL](https://github.com/Starlight-Skull/seasonfall/actions/workflows/codeql-analysis.yml/badge.svg?branch=development)](https://github.com/Starlight-Skull/seasonfall/actions/workflows/codeql-analysis.yml)

[![Seasonfall](./assets/Banner.png)](https://github.com/Starlight-Skull/seasonfall#readme)

> [Play current *stable* version: v1.2.0](https://starlight-skull.github.io/seasonfall/)
>
> Development for native releases is on hold for the time being.

## Project Status

Replacing spaghetti code with noodle code.

v2.0.0 todo list:

- [x] new world data system
- [x] rebuild ui using React
- [x] implement world editor
- [x] mobile support
- [x] improved collision system
- [ ] improved weather system
- [ ] improved combat system
- [x] improved render system

## Local development

### Install

_Requirements: [git](https://git-scm.com/downloads), [npm](https://nodejs.org/en/download/)_

```sh
git clone https://github.com/starlight-skull/seasonfall.git
cd seasonfall
npm ci
```

### Dev server

```sh
npm run start
```

### Build

Webpack builds are bundled and target ES2016. Production builds are also minified.

```sh
npm run build:dev
npm run build:prod
cd dist
```
