# GCGF Meeting Reports · 会议记录报告

Bilingual reports from the Australian Clean Energy Summit: 11 reports, 41 Highlights and 28 original photographs.

- English is the default. `?lang=zh` opens Chinese directly; `?lang=en` opens English.
- Each report offers a brief, the full Summary and Highlights with original images.
- AI Suggestions and mind maps are excluded from the website.
- Language choice is carried in links and reflected in page titles. No database or API keys are needed.

## Local development

Use Node.js 22.13 or later (Node 22 LTS recommended).

```sh
npm ci
npm run dev
```

Open the local address printed by the server.

```sh
npm run check
npm run check:content
npm run build
```

## Cloudflare Workers

This project uses Vinext and the Cloudflare Vite plugin. Deploy it as a **Worker**, with the server and static assets together. It is not a Pages static export.

Connect this GitHub repository in Cloudflare Workers & Pages → Create → Import a repository. Use:

| Setting | Value |
| --- | --- |
| Root directory | Repository root |
| Build command | `npm run build` |
| Deploy command | `npm run deploy` |
| Worker name | `gcgf-meeting-reports` |
| Node version | 22.13+ |

The build generates `dist/server/wrangler.json`; the deploy script explicitly uses that configuration, including the `dist/client` assets. The input is `wrangler.jsonc`. No account ID, secret or site-provider credential is committed. The legacy `.openai/hosting.json` records the earlier Sites project but is not used by this Cloudflare configuration.

For a manual deployment, after authenticating with your own Cloudflare account:

```sh
npx wrangler login
npm ci
npm run build
npm run deploy
```

Deploying is an explicit action. Development and builds do not publish. The standalone Worker does not include the earlier Sites owner-only access gate; configure Cloudflare Access if private viewing is required.

[Cloudflare Vite plugin deployment documentation](https://developers.cloudflare.com/workers/vite-plugin/get-started/)

## Content

`lib/data/briefings.json` contains all content needed to run and build the site. Original photos are in `public/library`, and the supplied logo is in `public/media/logo.png`. Source wording, names and numerical claims are retained; translation checks do not independently verify the underlying conference claims.

The optional importer `node scripts/import-library.mjs` reads the adjacent `../Plaud_Library` archive, including its manifest, four Markdown versions and translation records. This external archive is not required for a normal clone/build/deploy. The importer keeps bold Chinese labels compatible with Markdown and excludes AI Suggestions and mind maps. After importing, run the checks above and commit the updated data and photos.
