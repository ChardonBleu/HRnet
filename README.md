# ![HRNet](public/hrnet_logo.png)

# Welcome to HRnet

This app is the Projet 14 of Openclassrooms training Javascript React.
I chose to use framework mode from React Router v7, including a default template.
And I chose to use Redux Toolkit, as recommended in Redux documentation.

## Getting Started

### Installation

You can clone the whole project by doing:

```bash
git clone https://github.com/ChardonBleu/ArgentBank
```

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Checking for errors

check and fix format:

```bash
npm run fmt
```

runs linter and fix:

```bash
npm run lint
```

Check for types:

```bash
npm run typecheck
```

Check all at once:

```bash
npm run all
```

### Testing:

Launching unit and integration tests, with Vitest and testing-library, with coverage

```bash
npm run test
```

tests repport and coverage are then available at :  
`http://localhost:51204/__vitest__/#/`

Launching end-to-end tests with Cypress:

```bash
npm run dev
npx cypress open
```

## Building for Production

Create a production build:

```bash
npm run build
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

## Ressources:

- Documentation Redux [createEntityAdapter](https://redux-toolkit.js.org/api/createEntityAdapter#crud-functions)

- Victor Lillo Blog - [Build a React component library with TypeScript and Vite](https://victorlillo.dev/blog/react-typescript-vite-component-library)

- Akos blog - [React Router Vitest Example](https://akoskm.com/react-router-vitest-example/)

- Shadcn documentation [https://ui.shadcn.com/docs/installation](https://ui.shadcn.com/docs/installation)

- Storybook documentation [https://storybook.js.org/docs/get-started/install](https://storybook.js.org/docs/get-started/install)

- Grafikart tutorial about Shadcn [https://grafikart.fr/tutoriels/shadcn-ui-components-2293](https://grafikart.fr/tutoriels/shadcn-ui-components-2293)

- Grafikart tutorial about Storybook [https://grafikart.fr/tutoriels/storybook-1374](https://grafikart.fr/tutoriels/storybook-1374)

- Cypress documentation [https://docs.cypress.io/api/commands/prev](https://docs.cypress.io/api/commands/prev)

- Lighthouse documentation [https://www.theclientside.net/react/lighthouse-audits/](https://www.theclientside.net/react/lighthouse-audits/)

- Vitest documentation (french version) [https://vitest.fr/](https://vitest.fr/)

## Thanks:

Many thanks to Herbert Caffarel for his valuable advices and feedbacks.
