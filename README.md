# Travel Planner

A design of the Travel Planner App

### Environmental Variables

The project's environmental variables (for the development environment) are stored in a `.env` file in the project root.

#### Required Packages and Server

Install the node dependencies:

    yarn install

Run gulp to build required assets:

    yarn run-script gulp-dist

Or to run gulp in development:

    yarn run-script gulp-dev

Start the application:

    yarn dev

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Styles

Styles are built in a modular way. Each folder houses the styles needed for it to render. The project uses camelCase naming convention.

Shared styles are housed in `assets/styles` directory. Compiled styles built from components and page styles used in production can be found in the `build/static/css/styles.chunk.css` file.

### Linting

Ensure that you run the linting tools on your code changes in order for them to pass the build when you create a PR.

```sh
yarn run format
```

## Commit emojis
🔥: new feature

📦: package update/install/uninstall

🛠️: todo

🧹: chore
