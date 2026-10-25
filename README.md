# Omar Boghdady Portfolio

A React, TypeScript, and Vite portfolio with an admin dashboard at `/admin`.

## Static portfolio content

The public Projects and Certificates sections are loaded from `src/data/projects.ts` and `src/data/certificates.ts`. Store their images in `public/projects/` or `public/certificates/` and set the matching public URL in the data, for example `/projects/dashboard.jpg`.

The `/admin` page remains available for managing the legacy browser-stored projects and certificates. Its **Settings** tab can export those IndexedDB records and image contents to `omar-portfolio-export.json`. The export does not change or remove the saved data. Static portfolio content must be maintained in the source files and public image folders; browser-stored admin changes do not automatically appear on the public site.

## Development

```sh
npm install
npm run dev
```

Run `npm run build` to type-check and build the production site, and `npm run lint` to run Oxlint.
