/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Google Apps Script Web App URL that the visitor gate posts name+organization to */
  readonly VITE_GATE_ENDPOINT_URL: string;
  /** Your live domain, e.g. https://yashbir.dev — used in index.html meta/OG/canonical tags */
  readonly VITE_SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
