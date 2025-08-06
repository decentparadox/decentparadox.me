import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_BRiBmFg2.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/letterboxd.json.astro.mjs');
const _page4 = () => import('./pages/authors.astro.mjs');
const _page5 = () => import('./pages/authors/_---id_.astro.mjs');
const _page6 = () => import('./pages/blog/_---id_.astro.mjs');
const _page7 = () => import('./pages/blog/_---page_.astro.mjs');
const _page8 = () => import('./pages/currently.astro.mjs');
const _page9 = () => import('./pages/guestbook.astro.mjs');
const _page10 = () => import('./pages/projects/bi0smeetups.astro.mjs');
const _page11 = () => import('./pages/projects/kalser.astro.mjs');
const _page12 = () => import('./pages/projects/orca.astro.mjs');
const _page13 = () => import('./pages/projects/piratedpixels.astro.mjs');
const _page14 = () => import('./pages/projects.astro.mjs');
const _page15 = () => import('./pages/robots.txt.astro.mjs');
const _page16 = () => import('./pages/rss.xml.astro.mjs');
const _page17 = () => import('./pages/tags.astro.mjs');
const _page18 = () => import('./pages/tags/_---id_.astro.mjs');
const _page19 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.12.8_@netlify+blobs_8b303a1effb43419bbd41a22603d4267/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/api/letterboxd.json.ts", _page3],
    ["src/pages/authors/index.astro", _page4],
    ["src/pages/authors/[...id].astro", _page5],
    ["src/pages/blog/[...id].astro", _page6],
    ["src/pages/blog/[...page].astro", _page7],
    ["src/pages/currently/index.md", _page8],
    ["src/pages/guestbook.astro", _page9],
    ["src/pages/projects/bi0smeetups/index.astro", _page10],
    ["src/pages/projects/kalser/index.astro", _page11],
    ["src/pages/projects/orca/index.astro", _page12],
    ["src/pages/projects/piratedpixels/index.astro", _page13],
    ["src/pages/projects/index.astro", _page14],
    ["src/pages/robots.txt.ts", _page15],
    ["src/pages/rss.xml.ts", _page16],
    ["src/pages/tags/index.astro", _page17],
    ["src/pages/tags/[...id].astro", _page18],
    ["src/pages/index.astro", _page19]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "9dece667-8ab1-406e-8f82-8f14c6dafdfc"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
