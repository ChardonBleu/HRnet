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
