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

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

```
