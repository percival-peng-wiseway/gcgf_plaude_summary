# GCGF Clean Energy Briefings

Bilingual conference library with 11 detail pages, 41 Highlights and 28 original photographs.

Run `npm run dev` for local development and `npm run build` for production.

`lib/data/briefings.json` contains the complete read-only bilingual content. Images are under `public/library`. The supplied logo is preserved in `public/media/logo.png`.

To import future material, update the adjacent Plaud_Library archive using the same four-file format, then run `node scripts/import-library.mjs`. The importer expects the archive manifest and bilingual translation records. Rebuild after importing.
