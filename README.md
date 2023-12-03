## Getting started with Next.js and Replicate

This branch uses Typescript, Tailwind and the Next.js App Router

This is a [Next.js](https://nextjs.org/) template project that's preconfigured to work with Replicate's API.

You can use this as a quick jumping-off point to build a web app using Replicate's API, or you can recreate this codebase from scratch by following the guide at [replicate.com/docs/get-started/nextjs](https://replicate.com/docs/get-started/nextjs)

## Noteworthy files

- [src/app/page.tsx](src/app/page.tsx) - The React frontend that renders the home page in the browser
- [src/app/api/predictions/route.ts](src/app/api/predictions/route.ts) - The backend API endpoint that calls Replicate's API to create a prediction
- [src/app/api/predictions/[id]/route.ts](src/app/api/predictions/[id]/route.ts) - The backend API endpoint that calls Replicate's API to get the prediction result

## Usage

Get a copy of this repo:
```console
npx create-next-app --example https://github.com/replicate/getting-started-nextjs-typescript your-project-name
cd your-project-name
```

Install dependencies:

```console
npm install
```

Add your [Replicate API token](https://replicate.com/account#token) to `.env.local`:

```
REPLICATE_API_TOKEN=<your-token-here>
```

Run the development server:

```console
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

For detailed instructions on how to create and use this template, see [replicate.com/docs/get-started/nextjs](https://replicate.com/docs/get-started/nextjs)

<img width="698" alt="iguana" src="https://github.com/replicate/getting-started-nextjs-typescript/assets/14337872/f40cf84f-f309-44d5-8429-9a1cda911d6d">
