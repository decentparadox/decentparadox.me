import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, m as maybeRenderHead } from './astro/server_Ct51mKd-.mjs';
import { jsx } from 'react/jsx-runtime';
import 'react';
import { Slot } from 'radix-ui';
import { c as cn } from './consts_Czx1ZRm3.mjs';
import { ChevronRight } from 'lucide-react';
import { a as $$Icon } from './Header_CdGDBaNI.mjs';

function Breadcrumb({ ...props }) {
  return /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", "data-slot": "breadcrumb", ...props });
}
function BreadcrumbList({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "ol",
    {
      "data-slot": "breadcrumb-list",
      className: cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      ),
      ...props
    }
  );
}
function BreadcrumbItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "breadcrumb-item",
      className: cn("inline-flex items-center gap-1.5", className),
      ...props
    }
  );
}
function BreadcrumbLink({
  asChild,
  className,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "a";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "breadcrumb-link",
      className: cn("hover:text-foreground transition-colors", className),
      ...props
    }
  );
}
function BreadcrumbPage({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      "data-slot": "breadcrumb-page",
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: cn("text-foreground font-normal", className),
      ...props
    }
  );
}
function BreadcrumbSeparator({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      "aria-hidden": "true",
      className: cn("[&>svg]:size-3.5", className),
      ...props,
      children: children ?? /* @__PURE__ */ jsx(ChevronRight, {})
    }
  );
}

const $$Astro = createAstro("https://astro-erudite.vercel.app");
const $$Breadcrumbs = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Breadcrumbs;
  const { items } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Breadcrumb", Breadcrumb, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "BreadcrumbList", BreadcrumbList, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "BreadcrumbItem", BreadcrumbItem, {}, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "BreadcrumbLink", BreadcrumbLink, { "href": "/" }, { "default": ($$result5) => renderTemplate` ${renderComponent($$result5, "Icon", $$Icon, { "name": "lucide:home", "class": "size-4 shrink-0" })} ` })} ` })} ${items.map((item, index) => renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "BreadcrumbSeparator", BreadcrumbSeparator, {})} ${renderComponent($$result4, "BreadcrumbItem", BreadcrumbItem, {}, { "default": ($$result5) => renderTemplate`${index === items.length - 1 ? renderTemplate`${renderComponent($$result5, "BreadcrumbPage", BreadcrumbPage, {}, { "default": ($$result6) => renderTemplate` ${maybeRenderHead()}<span class="flex items-center gap-x-2"> ${item.icon && renderTemplate`${renderComponent($$result6, "Icon", $$Icon, { "name": item.icon, "class": "size-4 shrink-0" })}`} <span>${item.label}</span> </span> ` })}` : renderTemplate`${renderComponent($$result5, "BreadcrumbLink", BreadcrumbLink, { "href": item.href }, { "default": ($$result6) => renderTemplate` <span class="flex items-center gap-x-2"> ${item.icon && renderTemplate`${renderComponent($$result6, "Icon", $$Icon, { "name": item.icon, "class": "size-4 shrink-0" })}`} <span>${item.label}</span> </span> ` })}`}` })} ` })}`)}` })} ` })}`;
}, "E:/astro-erudite/src/components/Breadcrumbs.astro", void 0);

export { $$Breadcrumbs as $ };
