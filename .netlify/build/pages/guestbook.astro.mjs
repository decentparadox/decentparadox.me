import { b as createAstro, c as createComponent, r as renderComponent, f as renderHead, g as renderSlot, a as renderTemplate, d as addAttribute, u as unescapeHTML, m as maybeRenderHead } from '../chunks/astro/server_Ct51mKd-.mjs';
import { $ as $$Breadcrumbs } from '../chunks/Breadcrumbs_CbS5jUEV.mjs';
import { c as $$Head, d as $$Header, e as $$Footer, f as $$Container, B as Button } from '../chunks/Header_CdGDBaNI.mjs';
import { jsx } from 'react/jsx-runtime';
import { c as cn, S as SITE } from '../chunks/consts_Czx1ZRm3.mjs';
import * as React from 'react';
/* empty css                                 */
import { neon } from '@neondatabase/serverless';
export { renderers } from '../renderers.mjs';

const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("rounded-xl border bg-background", className),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn(
        "border-input flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";

const $$Astro$1 = createAstro("https://astro-erudite.vercel.app");
const $$ServerPageLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ServerPageLayout;
  const { title, description, image } = Astro2.props;
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "Head", $$Head, { "title": `${title} | ${SITE.TITLE}`, "description": description, "image": image })}${renderHead()}</head> <body> <div class="box-border flex h-fit min-h-screen flex-col gap-y-6 bg-background font-sans antialiased dark:bg-background"> ${renderComponent($$result, "Header", $$Header, {})} <main class="flex-grow font-geist"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </div> </body></html>`;
}, "E:/astro-erudite/src/layouts/ServerPageLayout.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://astro-erudite.vercel.app");
const prerender = false;
const $$Guestbook = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Guestbook;
  const sql = neon("postgresql://neondb_owner:Nz0coe2FQPAv@ep-ancient-smoke-a5zqeju7.us-east-2.aws.neon.tech/neondb?sslmode=require");
  const req = Astro2.request;
  function sanitize(input) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  if (req.method === "POST" && req.headers.get("Content-Type") === "application/x-www-form-urlencoded") {
    const data = new URLSearchParams(await req.text());
    console.log("Searching for: " + data);
    const name = sanitize(data.get("name")?.trim() ?? "");
    const url = sanitize(data.get("link")?.trim() ?? "");
    const message = sanitize(data.get("message")?.trim() ?? "");
    const anon = data.get("anonymous") === "on";
    if (name && name?.length <= 64 && (!url || url.includes("://")) && url.length <= 128 && message.length <= 320) {
      const timestamp = Date.now();
      const result2 = await sql`
    INSERT INTO "Guestbook" ("name", "socialLink", "message", "isAnonymous", "createdAt")
    VALUES (${name}, ${url || null}, ${message}, ${anon}, ${timestamp});
  `;
      console.log(result2);
    }
  }
  const result = await sql`SELECT * FROM "Guestbook" ORDER BY "Guestbook"."createdAt" DESC`;
  console.log(result);
  return renderTemplate`${renderComponent($$result, "Layout", $$ServerPageLayout, { "title": "Guestbook", "description": SITE.DESCRIPTION }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Container", $$Container, {}, { "default": async ($$result3) => renderTemplate(_a || (_a = __template([" ", " ", '<div class="w-full pt-4 font-sans md:min-w-[36rem]"> <h1 class="mb-4 font-serifItalic text-3xl text-accent">Guestbook</h1> ', ' <ul class="grid gap-1"> ', " </ul> </div> <script>\n      const submitButton = document.querySelector('#submitButton')\n      document.forms[0].addEventListener('submit', () => {\n        submitButton.disabled = true\n      })\n    </script> "])), renderComponent($$result3, "Breadcrumbs", $$Breadcrumbs, { "items": [{ label: "Guestbook", icon: "lucide:signature" }] }), maybeRenderHead(), renderComponent($$result3, "Card", Card, { "className": "mb-8 border" }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "CardContent", CardContent, { "className": "p-2" }, { "default": async ($$result5) => renderTemplate` <form id="guestbookForm" method="post" class="card mb-4 grid w-full items-start gap-1 p-3"> ${renderComponent($$result5, "Input", Input, { "id": "name", "placeholder": "Name", "type": "text", "name": "name", "required": true })} ${renderComponent($$result5, "Input", Input, { "id": "link", "placeholder": "Link to web/social media presence", "type": "url", "name": "link" })} ${renderComponent($$result5, "Textarea", Textarea, { "placeholder": "Message", "className": " min-h-[120px]", "name": "message" })} <div class="flex items-center gap-2"> <input class="mt-0.5" type="checkbox" id="formAnonymous" name="anonymous"> <label for="formAnonymous">Submit anonymously?</label> </div> ${renderComponent($$result5, "Button", Button, { "className": "mt-3 w-full justify-self-center bg-accent text-background hover:text-foreground py-1 rounded-md", "id": "submitButton", "type": "submit", "value": "Submit" }, { "default": async ($$result6) => renderTemplate`Submit` })} </form> ` })} ` }), result?.map((e) => renderTemplate`<li class="card grid items-center gap-y-1 border border-b-0 border-l-0 border-r-0 border-t-2 py-4"> ${e.socialLink ? renderTemplate`<a class="row-start-1" rel="ugc"${addAttribute(e.socialLink, "href")} target="_blank"> <h2 class="text-h4 text-accent font-serif"> ${e.isAnonymous ? "Anonymous" : e.name} </h2> </a>` : renderTemplate`<h2 class="text-h4 row-start-1"> ${e.isAnonymous ? "Anonymous" : e.name} </h2>`} <span class="row-start-1 justify-self-end text-neutral-500 dark:text-neutral-400"> ${Intl.DateTimeFormat(void 0).format(e.createdAt)} </span> ${e.message && renderTemplate`<p>${unescapeHTML(e.message)}</p>`} </li>`)) })} ` })}`;
}, "E:/astro-erudite/src/pages/guestbook.astro", void 0);
const $$file = "E:/astro-erudite/src/pages/guestbook.astro";
const $$url = "/guestbook";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Guestbook,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
