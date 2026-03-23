/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GOOGLE_GENERATIVE_AI_API_KEY: string
  readonly WAKATIME_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
