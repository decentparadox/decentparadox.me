import { N as NOOP_MIDDLEWARE_HEADER, v as decodeKey } from './chunks/astro/server_Ct51mKd-.mjs';
import 'clsx';

var dist = {};

var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;
	Object.defineProperty(dist, "__esModule", { value: true });
	dist.parse = parse;
	dist.serialize = serialize;
	/**
	 * RegExp to match cookie-name in RFC 6265 sec 4.1.1
	 * This refers out to the obsoleted definition of token in RFC 2616 sec 2.2
	 * which has been replaced by the token definition in RFC 7230 appendix B.
	 *
	 * cookie-name       = token
	 * token             = 1*tchar
	 * tchar             = "!" / "#" / "$" / "%" / "&" / "'" /
	 *                     "*" / "+" / "-" / "." / "^" / "_" /
	 *                     "`" / "|" / "~" / DIGIT / ALPHA
	 *
	 * Note: Allowing more characters - https://github.com/jshttp/cookie/issues/191
	 * Allow same range as cookie value, except `=`, which delimits end of name.
	 */
	const cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
	/**
	 * RegExp to match cookie-value in RFC 6265 sec 4.1.1
	 *
	 * cookie-value      = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )
	 * cookie-octet      = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
	 *                     ; US-ASCII characters excluding CTLs,
	 *                     ; whitespace DQUOTE, comma, semicolon,
	 *                     ; and backslash
	 *
	 * Allowing more characters: https://github.com/jshttp/cookie/issues/191
	 * Comma, backslash, and DQUOTE are not part of the parsing algorithm.
	 */
	const cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
	/**
	 * RegExp to match domain-value in RFC 6265 sec 4.1.1
	 *
	 * domain-value      = <subdomain>
	 *                     ; defined in [RFC1034], Section 3.5, as
	 *                     ; enhanced by [RFC1123], Section 2.1
	 * <subdomain>       = <label> | <subdomain> "." <label>
	 * <label>           = <let-dig> [ [ <ldh-str> ] <let-dig> ]
	 *                     Labels must be 63 characters or less.
	 *                     'let-dig' not 'letter' in the first char, per RFC1123
	 * <ldh-str>         = <let-dig-hyp> | <let-dig-hyp> <ldh-str>
	 * <let-dig-hyp>     = <let-dig> | "-"
	 * <let-dig>         = <letter> | <digit>
	 * <letter>          = any one of the 52 alphabetic characters A through Z in
	 *                     upper case and a through z in lower case
	 * <digit>           = any one of the ten digits 0 through 9
	 *
	 * Keep support for leading dot: https://github.com/jshttp/cookie/issues/173
	 *
	 * > (Note that a leading %x2E ("."), if present, is ignored even though that
	 * character is not permitted, but a trailing %x2E ("."), if present, will
	 * cause the user agent to ignore the attribute.)
	 */
	const domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
	/**
	 * RegExp to match path-value in RFC 6265 sec 4.1.1
	 *
	 * path-value        = <any CHAR except CTLs or ";">
	 * CHAR              = %x01-7F
	 *                     ; defined in RFC 5234 appendix B.1
	 */
	const pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
	const __toString = Object.prototype.toString;
	const NullObject = /* @__PURE__ */ (() => {
	    const C = function () { };
	    C.prototype = Object.create(null);
	    return C;
	})();
	/**
	 * Parse a cookie header.
	 *
	 * Parse the given cookie header string into an object
	 * The object has the various cookies as keys(names) => values
	 */
	function parse(str, options) {
	    const obj = new NullObject();
	    const len = str.length;
	    // RFC 6265 sec 4.1.1, RFC 2616 2.2 defines a cookie name consists of one char minimum, plus '='.
	    if (len < 2)
	        return obj;
	    const dec = options?.decode || decode;
	    let index = 0;
	    do {
	        const eqIdx = str.indexOf("=", index);
	        if (eqIdx === -1)
	            break; // No more cookie pairs.
	        const colonIdx = str.indexOf(";", index);
	        const endIdx = colonIdx === -1 ? len : colonIdx;
	        if (eqIdx > endIdx) {
	            // backtrack on prior semicolon
	            index = str.lastIndexOf(";", eqIdx - 1) + 1;
	            continue;
	        }
	        const keyStartIdx = startIndex(str, index, eqIdx);
	        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
	        const key = str.slice(keyStartIdx, keyEndIdx);
	        // only assign once
	        if (obj[key] === undefined) {
	            let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
	            let valEndIdx = endIndex(str, endIdx, valStartIdx);
	            const value = dec(str.slice(valStartIdx, valEndIdx));
	            obj[key] = value;
	        }
	        index = endIdx + 1;
	    } while (index < len);
	    return obj;
	}
	function startIndex(str, index, max) {
	    do {
	        const code = str.charCodeAt(index);
	        if (code !== 0x20 /*   */ && code !== 0x09 /* \t */)
	            return index;
	    } while (++index < max);
	    return max;
	}
	function endIndex(str, index, min) {
	    while (index > min) {
	        const code = str.charCodeAt(--index);
	        if (code !== 0x20 /*   */ && code !== 0x09 /* \t */)
	            return index + 1;
	    }
	    return min;
	}
	/**
	 * Serialize data into a cookie header.
	 *
	 * Serialize a name value pair into a cookie string suitable for
	 * http headers. An optional options object specifies cookie parameters.
	 *
	 * serialize('foo', 'bar', { httpOnly: true })
	 *   => "foo=bar; httpOnly"
	 */
	function serialize(name, val, options) {
	    const enc = options?.encode || encodeURIComponent;
	    if (!cookieNameRegExp.test(name)) {
	        throw new TypeError(`argument name is invalid: ${name}`);
	    }
	    const value = enc(val);
	    if (!cookieValueRegExp.test(value)) {
	        throw new TypeError(`argument val is invalid: ${val}`);
	    }
	    let str = name + "=" + value;
	    if (!options)
	        return str;
	    if (options.maxAge !== undefined) {
	        if (!Number.isInteger(options.maxAge)) {
	            throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
	        }
	        str += "; Max-Age=" + options.maxAge;
	    }
	    if (options.domain) {
	        if (!domainValueRegExp.test(options.domain)) {
	            throw new TypeError(`option domain is invalid: ${options.domain}`);
	        }
	        str += "; Domain=" + options.domain;
	    }
	    if (options.path) {
	        if (!pathValueRegExp.test(options.path)) {
	            throw new TypeError(`option path is invalid: ${options.path}`);
	        }
	        str += "; Path=" + options.path;
	    }
	    if (options.expires) {
	        if (!isDate(options.expires) ||
	            !Number.isFinite(options.expires.valueOf())) {
	            throw new TypeError(`option expires is invalid: ${options.expires}`);
	        }
	        str += "; Expires=" + options.expires.toUTCString();
	    }
	    if (options.httpOnly) {
	        str += "; HttpOnly";
	    }
	    if (options.secure) {
	        str += "; Secure";
	    }
	    if (options.partitioned) {
	        str += "; Partitioned";
	    }
	    if (options.priority) {
	        const priority = typeof options.priority === "string"
	            ? options.priority.toLowerCase()
	            : undefined;
	        switch (priority) {
	            case "low":
	                str += "; Priority=Low";
	                break;
	            case "medium":
	                str += "; Priority=Medium";
	                break;
	            case "high":
	                str += "; Priority=High";
	                break;
	            default:
	                throw new TypeError(`option priority is invalid: ${options.priority}`);
	        }
	    }
	    if (options.sameSite) {
	        const sameSite = typeof options.sameSite === "string"
	            ? options.sameSite.toLowerCase()
	            : options.sameSite;
	        switch (sameSite) {
	            case true:
	            case "strict":
	                str += "; SameSite=Strict";
	                break;
	            case "lax":
	                str += "; SameSite=Lax";
	                break;
	            case "none":
	                str += "; SameSite=None";
	                break;
	            default:
	                throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
	        }
	    }
	    return str;
	}
	/**
	 * URL-decode string value. Optimized to skip native call when no %.
	 */
	function decode(str) {
	    if (str.indexOf("%") === -1)
	        return str;
	    try {
	        return decodeURIComponent(str);
	    }
	    catch (e) {
	        return str;
	    }
	}
	/**
	 * Determine if value is a Date.
	 */
	function isDate(val) {
	    return __toString.call(val) === "[object Date]";
	}
	
	return dist;
}

requireDist();

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

/* es-module-lexer 1.7.0 */
var ImportType;!function(A){A[A.Static=1]="Static",A[A.Dynamic=2]="Dynamic",A[A.ImportMeta=3]="ImportMeta",A[A.StaticSourcePhase=4]="StaticSourcePhase",A[A.DynamicSourcePhase=5]="DynamicSourcePhase",A[A.StaticDeferPhase=6]="StaticDeferPhase",A[A.DynamicDeferPhase=7]="DynamicDeferPhase";}(ImportType||(ImportType={}));1===new Uint8Array(new Uint16Array([1]).buffer)[0];const E=()=>{return A="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GzYCHAtBAEEAKAKwCkECajYCsAoCQAJAAkACQEEAECkiAUHhAEYNACABQfcARg0BQQAoArAKIQEMAgtBACgCsAoiAUECakHACEEKEC8NAUEGIQIMAgtBACgCsAoiAS8BAkHpAEcNACABLwEEQfQARw0AQQQhAiABLwEGQegARg0BC0EAIAFBfmo2ArAKDwtBACABIAJBAXRqNgKwCgJAQQEQKUH7AEYNAEEAIAE2ArAKDwtBACgCsAoiACECA0BBACACQQJqNgKwCgJAAkACQEEBECkiAkEiRg0AIAJBJ0cNAUEnEBpBAEEAKAKwCkECajYCsApBARApIQIMAgtBIhAaQQBBACgCsApBAmo2ArAKQQEQKSECDAELIAIQLCECCwJAIAJBOkYNAEEAIAE2ArAKDwtBAEEAKAKwCkECajYCsAoCQEEBECkiAkEiRg0AIAJBJ0YNAEEAIAE2ArAKDwsgAhAaQQBBACgCsApBAmo2ArAKAkACQEEBECkiAkEsRg0AIAJB/QBGDQFBACABNgKwCg8LQQBBACgCsApBAmo2ArAKQQEQKUH9AEYNAEEAKAKwCiECDAELC0EAKALwCSIBIAA2AhAgAUEAKAKwCkECajYCDAttAQJ/AkACQANAAkAgAEH//wNxIgFBd2oiAkEXSw0AQQEgAnRBn4CABHENAgsgAUGgAUYNASAAIQIgARAoDQJBACECQQBBACgCsAoiAEECajYCsAogAC8BAiIADQAMAgsLIAAhAgsgAkH//wNxC6sBAQR/AkACQEEAKAKwCiICLwEAIgNB4QBGDQAgASEEIAAhBQwBC0EAIAJBBGo2ArAKQQEQKSECQQAoArAKIQUCQAJAIAJBIkYNACACQSdGDQAgAhAsGkEAKAKwCiEEDAELIAIQGkEAQQAoArAKQQJqIgQ2ArAKC0EBECkhA0EAKAKwCiECCwJAIAIgBUYNACAFIARBACAAIAAgAUYiAhtBACABIAIbEAILIAMLcgEEf0EAKAKwCiEAQQAoArQKIQECQAJAA0AgAEECaiECIAAgAU8NAQJAAkAgAi8BACIDQaR/ag4CAQQACyACIQAgA0F2ag4EAgEBAgELIABBBGohAAwACwtBACACNgKwChAlQQAPC0EAIAI2ArAKQd0AC0kBA39BACEDAkAgAkUNAAJAA0AgAC0AACIEIAEtAAAiBUcNASABQQFqIQEgAEEBaiEAIAJBf2oiAg0ADAILCyAEIAVrIQMLIAMLC+wBAgBBgAgLzgEAAHgAcABvAHIAdABtAHAAbwByAHQAZgBvAHIAZQB0AGEAbwB1AHIAYwBlAHIAbwBtAHUAbgBjAHQAaQBvAG4AcwBzAGUAcgB0AHYAbwB5AGkAZQBkAGUAbABlAGMAbwBuAHQAaQBuAGkAbgBzAHQAYQBuAHQAeQBiAHIAZQBhAHIAZQB0AHUAcgBkAGUAYgB1AGcAZwBlAGEAdwBhAGkAdABoAHIAdwBoAGkAbABlAGkAZgBjAGEAdABjAGYAaQBuAGEAbABsAGUAbABzAABB0AkLEAEAAAACAAAAAAQAAEA5AAA=","undefined"!=typeof Buffer?Buffer.from(A,"base64"):Uint8Array.from(atob(A),(A=>A.charCodeAt(0)));var A;};WebAssembly.compile(E()).then(WebAssembly.instantiate).then((({exports:A})=>{}));

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///E:/astro-erudite/","cacheDir":"file:///E:/astro-erudite/node_modules/.astro/","outDir":"file:///E:/astro-erudite/dist/","srcDir":"file:///E:/astro-erudite/src/","publicDir":"file:///E:/astro-erudite/public/","buildClientDir":"file:///E:/astro-erudite/dist/","buildServerDir":"file:///E:/astro-erudite/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"api/letterboxd.json","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/letterboxd.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/letterboxd\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"letterboxd.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/letterboxd.json.ts","pathname":"/api/letterboxd.json","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"authors/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/authors","isIndex":true,"type":"page","pattern":"^\\/authors\\/?$","segments":[[{"content":"authors","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/authors/index.astro","pathname":"/authors","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"currently/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/currently","isIndex":true,"type":"page","pattern":"^\\/currently\\/?$","segments":[[{"content":"currently","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/currently/index.md","pathname":"/currently","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"projects/bi0smeetups/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/projects/bi0smeetups","isIndex":true,"type":"page","pattern":"^\\/projects\\/bi0smeetups\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}],[{"content":"bi0smeetups","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects/bi0smeetups/index.astro","pathname":"/projects/bi0smeetups","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"projects/kalser/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/projects/kalser","isIndex":true,"type":"page","pattern":"^\\/projects\\/kalser\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}],[{"content":"kalser","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects/kalser/index.astro","pathname":"/projects/kalser","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"projects/orca/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/projects/orca","isIndex":true,"type":"page","pattern":"^\\/projects\\/orca\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}],[{"content":"orca","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects/orca/index.astro","pathname":"/projects/orca","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"projects/piratedpixels/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/projects/piratedpixels","isIndex":true,"type":"page","pattern":"^\\/projects\\/piratedpixels\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}],[{"content":"piratedpixels","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects/piratedpixels/index.astro","pathname":"/projects/piratedpixels","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"projects/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/projects","isIndex":true,"type":"page","pattern":"^\\/projects\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects/index.astro","pathname":"/projects","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"robots.txt","links":[],"scripts":[],"styles":[],"routeData":{"route":"/robots.txt","isIndex":false,"type":"endpoint","pattern":"^\\/robots\\.txt\\/?$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/robots.txt.ts","pathname":"/robots.txt","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"tags/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tags","isIndex":true,"type":"page","pattern":"^\\/tags\\/?$","segments":[[{"content":"tags","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tags/index.astro","pathname":"/tags","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.12.8_@netlify+blobs_8b303a1effb43419bbd41a22603d4267/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.DY1WELDj.css"}],"routeData":{"route":"/guestbook","isIndex":false,"type":"page","pattern":"^\\/guestbook\\/?$","segments":[[{"content":"guestbook","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/guestbook.astro","pathname":"/guestbook","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://astro-erudite.vercel.app","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["E:/astro-erudite/src/pages/guestbook.astro",{"propagation":"in-tree","containsHead":true}],["E:/astro-erudite/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["E:/astro-erudite/src/pages/about.astro",{"propagation":"in-tree","containsHead":true}],["E:/astro-erudite/src/pages/authors/[...id].astro",{"propagation":"in-tree","containsHead":true}],["E:/astro-erudite/src/pages/authors/index.astro",{"propagation":"in-tree","containsHead":true}],["E:/astro-erudite/src/pages/blog/[...id].astro",{"propagation":"in-tree","containsHead":true}],["E:/astro-erudite/src/pages/blog/[...page].astro",{"propagation":"in-tree","containsHead":true}],["E:/astro-erudite/src/pages/currently/index.md",{"propagation":"in-tree","containsHead":true}],["E:/astro-erudite/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["E:/astro-erudite/src/pages/projects/bi0smeetups/index.astro",{"propagation":"in-tree","containsHead":true}],["E:/astro-erudite/src/pages/projects/index.astro",{"propagation":"in-tree","containsHead":true}],["E:/astro-erudite/src/pages/projects/kalser/index.astro",{"propagation":"in-tree","containsHead":true}],["E:/astro-erudite/src/pages/projects/orca/index.astro",{"propagation":"in-tree","containsHead":true}],["E:/astro-erudite/src/pages/projects/piratedpixels/index.astro",{"propagation":"in-tree","containsHead":true}],["E:/astro-erudite/src/pages/tags/[...id].astro",{"propagation":"in-tree","containsHead":true}],["E:/astro-erudite/src/pages/tags/index.astro",{"propagation":"in-tree","containsHead":true}],["E:/astro-erudite/src/components/Header.astro",{"propagation":"in-tree","containsHead":false}],["E:/astro-erudite/src/layouts/Layout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/about@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/authors/[...id]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/authors/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[...id]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/currently/index@_@md",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/projects/bi0smeetups/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/projects/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/projects/kalser/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/projects/orca/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/projects/piratedpixels/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/tags/[...id]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/tags/index@_@astro",{"propagation":"in-tree","containsHead":false}],["E:/astro-erudite/src/layouts/ServerPageLayout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/guestbook@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["E:/astro-erudite/src/lib/data-utils.ts",{"propagation":"in-tree","containsHead":false}],["E:/astro-erudite/src/components/BlogCard.astro",{"propagation":"in-tree","containsHead":false}],["E:/astro-erudite/src/components/PostHead.astro",{"propagation":"in-tree","containsHead":false}],["E:/astro-erudite/src/components/SubpostsHeader.astro",{"propagation":"in-tree","containsHead":false}],["E:/astro-erudite/src/components/SubpostsSidebar.astro",{"propagation":"in-tree","containsHead":false}],["E:/astro-erudite/src/components/TOCSidebar.astro",{"propagation":"in-tree","containsHead":false}],["E:/astro-erudite/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.12.8_@netlify+blobs_8b303a1effb43419bbd41a22603d4267/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/letterboxd.json@_@ts":"pages/api/letterboxd.json.astro.mjs","\u0000@astro-page:src/pages/authors/index@_@astro":"pages/authors.astro.mjs","\u0000@astro-page:src/pages/authors/[...id]@_@astro":"pages/authors/_---id_.astro.mjs","\u0000@astro-page:src/pages/blog/[...id]@_@astro":"pages/blog/_---id_.astro.mjs","\u0000@astro-page:src/pages/blog/[...page]@_@astro":"pages/blog/_---page_.astro.mjs","\u0000@astro-page:src/pages/currently/index@_@md":"pages/currently.astro.mjs","\u0000@astro-page:src/pages/guestbook@_@astro":"pages/guestbook.astro.mjs","\u0000@astro-page:src/pages/projects/bi0smeetups/index@_@astro":"pages/projects/bi0smeetups.astro.mjs","\u0000@astro-page:src/pages/projects/kalser/index@_@astro":"pages/projects/kalser.astro.mjs","\u0000@astro-page:src/pages/projects/orca/index@_@astro":"pages/projects/orca.astro.mjs","\u0000@astro-page:src/pages/projects/piratedpixels/index@_@astro":"pages/projects/piratedpixels.astro.mjs","\u0000@astro-page:src/pages/projects/index@_@astro":"pages/projects.astro.mjs","\u0000@astro-page:src/pages/robots.txt@_@ts":"pages/robots.txt.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@ts":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/tags/index@_@astro":"pages/tags.astro.mjs","\u0000@astro-page:src/pages/tags/[...id]@_@astro":"pages/tags/_---id_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BRiBmFg2.mjs","E:\\astro-erudite\\.astro\\content-assets.mjs":"chunks/content-assets_DWoRanIV.mjs","E:\\astro-erudite\\.astro\\content-modules.mjs":"chunks/content-modules_Ddr1Q9Ug.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content__TpK1A0d.mjs","E:/astro-erudite/node_modules/.pnpm/node-fetch-native@1.6.7/node_modules/node-fetch-native/dist/chunks/multipart-parser.mjs":"chunks/multipart-parser_B-ZtXriq.mjs","E:/astro-erudite/src/content/blog/fragment-scam/index.mdx?astroPropagatedAssets":"chunks/index_C1MqYNKK.mjs","E:/astro-erudite/src/content/blog/fragment-scam/index.mdx":"chunks/index_B5QjLkAV.mjs","@/components/ui/pagination":"_astro/pagination.i-ED85Zw.js","@/components/Projects":"_astro/Projects.DLKIFJJ2.js","@/components/ui/avatar":"_astro/avatar.ByWUEnj_.js","@/components/ui/mobile-menu":"_astro/mobile-menu.DHyHfwAx.js","@/components/Currently":"_astro/Currently.d8g4f1gm.js","@/components/ui/scroll-area":"_astro/scroll-area.DJzuMe5J.js","@astrojs/react/client.js":"_astro/client.BehWwaQW.js","E:/astro-erudite/src/pages/blog/[...id].astro?astro&type=script&index=0&lang.ts":"_astro/_...id_.astro_astro_type_script_index_0_lang.CUt0JIuy.js","E:/astro-erudite/src/components/SubpostsHeader.astro?astro&type=script&index=0&lang.ts":"_astro/SubpostsHeader.astro_astro_type_script_index_0_lang.DfS3TIa6.js","E:/astro-erudite/src/components/SubpostsSidebar.astro?astro&type=script&index=0&lang.ts":"_astro/SubpostsSidebar.astro_astro_type_script_index_0_lang.u7U-ndjG.js","E:/astro-erudite/src/components/TOCHeader.astro?astro&type=script&index=0&lang.ts":"_astro/TOCHeader.astro_astro_type_script_index_0_lang.CKMLAwWj.js","E:/astro-erudite/src/components/TOCSidebar.astro?astro&type=script&index=0&lang.ts":"_astro/TOCSidebar.astro_astro_type_script_index_0_lang.CH3g5lys.js","E:/astro-erudite/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts":"_astro/ThemeToggle.astro_astro_type_script_index_0_lang.D87KqPzU.js","E:/astro-erudite/node_modules/.pnpm/astro@5.12.8_@netlify+blobs_8b303a1effb43419bbd41a22603d4267/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.DZnDNxNb.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["E:/astro-erudite/src/pages/blog/[...id].astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"astro:page-load\",()=>{const o=document.getElementById(\"scroll-to-top\"),t=document.querySelector(\"footer\");o&&t&&(o.addEventListener(\"click\",()=>{window.scrollTo({top:0,behavior:\"smooth\"})}),window.addEventListener(\"scroll\",()=>{const e=t.getBoundingClientRect().top<=window.innerHeight;o.classList.toggle(\"hidden\",window.scrollY<=300||e)}))});"],["E:/astro-erudite/src/components/SubpostsHeader.astro?astro&type=script&index=0&lang.ts","class m{scrollArea=null;detailsElement=null;headerScrollArea=null;reset(){this.scrollArea=null,this.detailsElement=null,this.headerScrollArea=null}}const e=new m;class i{static update(){if(!e.scrollArea||!e.headerScrollArea)return;const{scrollTop:t,scrollHeight:l,clientHeight:r}=e.scrollArea,s=5,a=t<=s,c=t>=l-r-s;e.headerScrollArea.classList.toggle(\"mask-t-from-80%\",!a),e.headerScrollArea.classList.toggle(\"mask-b-from-80%\",!c)}}class n{static toActive(){if(!e.scrollArea)return;const t=e.scrollArea.querySelector(\".mobile-subposts-active-item\");if(!t)return;const{top:l,height:r}=e.scrollArea.getBoundingClientRect(),{top:s,height:a}=t.getBoundingClientRect(),c=s-l+e.scrollArea.scrollTop,u=Math.max(0,Math.min(c-(r-a)/2,e.scrollArea.scrollHeight-e.scrollArea.clientHeight));e.scrollArea.scrollTop=u}static setupInteraction(){const t=document.getElementById(\"mobile-subposts-container\");if(!t)return;e.scrollArea=t.querySelector(\"[data-radix-scroll-area-viewport]\"),e.detailsElement=t.querySelector(\"details\"),e.headerScrollArea=t.querySelector(\"[data-subposts-header-scroll]\");const l=t.querySelectorAll(\".mobile-subposts-link\");e.scrollArea&&e.scrollArea.addEventListener(\"scroll\",i.update,{passive:!0}),e.detailsElement&&e.detailsElement.addEventListener(\"toggle\",()=>{e.detailsElement?.open&&requestAnimationFrame(()=>{n.toActive(),setTimeout(i.update,100)})}),l.forEach(r=>{r.addEventListener(\"click\",()=>{e.detailsElement&&(e.detailsElement.open=!1)})})}}class o{static init(){e.reset(),n.setupInteraction()}static cleanup(){e.scrollArea&&e.scrollArea.removeEventListener(\"scroll\",i.update),e.reset()}}document.addEventListener(\"astro:page-load\",()=>o.init());document.addEventListener(\"astro:after-swap\",()=>{o.cleanup(),o.init()});document.addEventListener(\"astro:before-swap\",()=>o.cleanup());"],["E:/astro-erudite/src/components/SubpostsSidebar.astro?astro&type=script&index=0&lang.ts","class u{scrollArea=null;sidebarScrollArea=null;reset(){this.scrollArea=null,this.sidebarScrollArea=null}}const e=new u;class n{static update(){if(!e.scrollArea||!e.sidebarScrollArea)return;const{scrollTop:t,scrollHeight:a,clientHeight:o}=e.scrollArea,r=5,c=t<=r,i=t>=a-o-r;e.sidebarScrollArea.classList.toggle(\"mask-t-from-90%\",!c),e.sidebarScrollArea.classList.toggle(\"mask-b-from-90%\",!i)}}class A{static toActive(){if(!e.scrollArea)return;const t=e.scrollArea.querySelector(\".subposts-sidebar-active-item\");if(!t)return;const{top:a,height:o}=e.scrollArea.getBoundingClientRect(),{top:r,height:c}=t.getBoundingClientRect(),i=r-a+e.scrollArea.scrollTop,d=Math.max(0,Math.min(i-(o-c)/2,e.scrollArea.scrollHeight-e.scrollArea.clientHeight));e.scrollArea.scrollTop=d}}class l{static init(){e.reset();const t=document.getElementById(\"subposts-sidebar-container\");t&&(e.scrollArea=t.querySelector(\"[data-radix-scroll-area-viewport]\"),e.sidebarScrollArea=t.querySelector(\"[data-subposts-sidebar-scroll]\"),e.scrollArea&&e.scrollArea.addEventListener(\"scroll\",n.update,{passive:!0}),requestAnimationFrame(()=>{A.toActive(),setTimeout(n.update,100)}))}static cleanup(){e.scrollArea&&e.scrollArea.removeEventListener(\"scroll\",n.update),e.reset()}}document.addEventListener(\"astro:page-load\",()=>l.init());document.addEventListener(\"astro:after-swap\",()=>{l.cleanup(),l.init()});document.addEventListener(\"astro:before-swap\",()=>l.cleanup());"],["E:/astro-erudite/src/components/TOCSidebar.astro?astro&type=script&index=0&lang.ts","class f{links=document.querySelectorAll(\"[data-heading-link]\");activeIds=[];headings=[];regions=[];scrollArea=null;tocScrollArea=null;reset(){this.links=document.querySelectorAll(\"#toc-sidebar-container [data-heading-link]\"),this.activeIds=[],this.headings=[],this.regions=[];const t=document.getElementById(\"toc-sidebar-container\");this.scrollArea=t?.querySelector(\"[data-radix-scroll-area-viewport]\")||null,this.tocScrollArea=t?.querySelector(\"[data-toc-scroll-area]\")||null}}const e=new f;class c{static build(){if(e.headings=Array.from(document.querySelectorAll(\".prose h2, .prose h3, .prose h4, .prose h5, .prose h6\")),e.headings.length===0){e.regions=[];return}e.regions=e.headings.map((t,o)=>{const i=e.headings[o+1];return{id:t.id,start:t.offsetTop,end:i?i.offsetTop:document.body.scrollHeight}})}static getVisibleIds(){if(e.headings.length===0)return[];const t=window.scrollY+80,o=window.scrollY+window.innerHeight,i=new Set,l=(s,r)=>s>=t&&s<=o||r>=t&&r<=o||s<=t&&r>=o;return e.headings.forEach(s=>{const r=s.offsetTop+s.offsetHeight;l(s.offsetTop,r)&&i.add(s.id)}),e.regions.forEach(s=>{if(s.start<=o&&s.end>=t){const r=document.getElementById(s.id);if(r){const a=r.offsetTop+r.offsetHeight;s.end>a&&(a<o||t<s.end)&&i.add(s.id)}}}),Array.from(i)}}class h{static update(){if(!e.scrollArea||!e.tocScrollArea)return;const{scrollTop:t,scrollHeight:o,clientHeight:i}=e.scrollArea,l=5,s=t<=l,r=t>=o-i-l;e.tocScrollArea.classList.toggle(\"mask-t-from-90%\",!s),e.tocScrollArea.classList.toggle(\"mask-b-from-90%\",!r)}}class g{static update(t){e.links.forEach(o=>{o.classList.remove(\"text-foreground\")}),t.forEach(o=>{if(o){const i=document.querySelector(`#toc-sidebar-container [data-heading-link=\"${o}\"]`);i&&i.classList.add(\"text-foreground\")}}),this.scrollToActive(t)}static scrollToActive(t){if(!e.scrollArea||!t.length)return;const o=document.querySelector(`#toc-sidebar-container [data-heading-link=\"${t[0]}\"]`);if(!o)return;const{top:i,height:l}=e.scrollArea.getBoundingClientRect(),{top:s,height:r}=o.getBoundingClientRect(),a=s-i+e.scrollArea.scrollTop,u=Math.max(0,Math.min(a-(l-r)/2,e.scrollArea.scrollHeight-e.scrollArea.clientHeight));Math.abs(u-e.scrollArea.scrollTop)>5&&(e.scrollArea.scrollTop=u)}}class d{static handleScroll(){const t=c.getVisibleIds();JSON.stringify(t)!==JSON.stringify(e.activeIds)&&(e.activeIds=t,g.update(e.activeIds))}static handleTOCScroll=()=>h.update();static handleResize(){c.build();const t=c.getVisibleIds();JSON.stringify(t)!==JSON.stringify(e.activeIds)&&(e.activeIds=t,g.update(e.activeIds)),h.update()}static init(){if(e.reset(),c.build(),e.headings.length===0){g.update([]);return}this.handleScroll(),setTimeout(h.update,100);const t={passive:!0};window.addEventListener(\"scroll\",this.handleScroll,t),window.addEventListener(\"resize\",this.handleResize,t),e.scrollArea?.addEventListener(\"scroll\",this.handleTOCScroll,t)}static cleanup(){window.removeEventListener(\"scroll\",this.handleScroll),window.removeEventListener(\"resize\",this.handleResize),e.scrollArea?.removeEventListener(\"scroll\",this.handleTOCScroll),Object.assign(e,{activeIds:[],headings:[],regions:[],scrollArea:null,tocScrollArea:null})}}document.addEventListener(\"astro:page-load\",()=>d.init());document.addEventListener(\"astro:after-swap\",()=>{d.cleanup(),d.init()});document.addEventListener(\"astro:before-swap\",()=>d.cleanup());"],["E:/astro-erudite/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts","function a(){const e=document.documentElement,n=e.getAttribute(\"data-theme\")===\"dark\"?\"light\":\"dark\";e.classList.add(\"[&_*]:transition-none\"),e.setAttribute(\"data-theme\",n),e.classList.remove(\"scheme-dark\",\"scheme-light\"),e.classList.add(n===\"dark\"?\"scheme-dark\":\"scheme-light\"),window.getComputedStyle(e).getPropertyValue(\"opacity\"),requestAnimationFrame(()=>{e.classList.remove(\"[&_*]:transition-none\")}),localStorage.setItem(\"theme\",n)}function s(){const e=document.getElementById(\"theme-toggle\");e&&e.addEventListener(\"click\",a)}s();document.addEventListener(\"astro:after-swap\",()=>{const e=localStorage.getItem(\"theme\")||\"light\",t=document.documentElement;t.classList.add(\"[&_*]:transition-none\"),window.getComputedStyle(t).getPropertyValue(\"opacity\"),t.setAttribute(\"data-theme\",e),t.classList.remove(\"scheme-dark\",\"scheme-light\"),t.classList.add(e===\"dark\"?\"scheme-dark\":\"scheme-light\"),requestAnimationFrame(()=>{t.classList.remove(\"[&_*]:transition-none\")}),s()});"]],"assets":["/_astro/ec.5ofwu.css","/_astro/ec.8zarh.js","/_astro/lightOG.uyyTSWnx.png","/_astro/1200x630.B23UTw3w.png","/_astro/1200x630.D7F7VbI_.png","/_astro/about.BepbUrDH.css","/_astro/about.DY1WELDj.css","/android-chrome-192x192.png","/android-chrome-512x512.png","/apple-touch-icon.png","/browserconfig.xml","/favicon-16x16.png","/favicon-32x32.png","/favicon.ico","/GeistMonoVF.woff2","/GeistVF.woff2","/mstile-150x150.png","/safari-pinned-tab.svg","/site.webmanifest","/fonts/InclusiveSans-Italic-VariableFont_wght.ttf","/fonts/InclusiveSans-VariableFont_wght.ttf","/fonts/PPEditorialNew-Italic.ttf","/fonts/PPEditorialNew-Regular.ttf","/static/1200x630.png","/static/logo.png","/static/logo.svg","/static/twitter-card.png","/_astro/avatar.ByWUEnj_.js","/_astro/button.DIfePEFQ.js","/_astro/client.BehWwaQW.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.DZnDNxNb.js","/_astro/Currently.d8g4f1gm.js","/_astro/index.2yJIXLcc.js","/_astro/index.6Ub1wXf1.js","/_astro/index.BC8ZEHzV.js","/_astro/index.C36jcWHI.js","/_astro/index.CXtDRhHU.js","/_astro/index.DgytOAfk.js","/_astro/index.DPBraiPM.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/mobile-menu.DHyHfwAx.js","/_astro/pagination.i-ED85Zw.js","/_astro/Projects.DLKIFJJ2.js","/_astro/scroll-area.DJzuMe5J.js","/_astro/TOCHeader.astro_astro_type_script_index_0_lang.CKMLAwWj.js","/fonts/supply-mono/PPSupplyMono-Bold.ttf","/fonts/supply-mono/PPSupplyMono-Medium.ttf","/fonts/supply-mono/PPSupplyMono-Regular.ttf","/fonts/supply-mono/PPSupplyMono-Ultralight.ttf","/static/images/BarcodeIG.svg","/static/images/bi0s.png","/static/images/discord-badges.svg","/static/images/engine.svg","/static/images/engineDark.svg","/static/images/evanix.png","/static/images/Footer.svg","/static/images/FooterDark.svg","/static/images/International.svg","/static/images/kalser.png","/static/images/KeepScrolling.svg","/static/images/letterboxd.svg","/static/images/logoAccent.svg","/static/images/mascot-wide.svg","/static/images/mascot.png","/static/images/mascot.svg","/static/images/noise.gif","/static/images/NoiseLoop.gif","/static/images/orca.png","/static/images/piratedPixels.png","/static/images/Restricted.svg","/static/images/twitter-card.png","/static/images/bi0s-meetups/1200x630.png","/static/images/bi0s-meetups/designScheme.png","/static/images/bi0s-meetups/mobile-mockup.png","/static/images/bi0s-meetups/mobile-mockup.svg","/static/images/fragment-scam/abuse_report.png","/static/images/fragment-scam/Scam_convo.png","/static/images/fragment-scam/tma_ui.png","/404.html","/about/index.html","/api/letterboxd.json","/authors/index.html","/currently/index.html","/projects/bi0smeetups/index.html","/projects/kalser/index.html","/projects/orca/index.html","/projects/piratedpixels/index.html","/projects/index.html","/robots.txt","/rss.xml","/tags/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"xu/m5E4J7UjpY/hfpEPgszYNXR6UhzRPdW3oojxQr/U=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_CCAPN1aR.mjs').then(n => n.n);

export { manifest };
