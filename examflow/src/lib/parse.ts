// Server-side Parse instance (for API routes only)
import Parse from 'parse';

// Lazy initialization - only initialize when first used (at runtime, not build time)
let isInitialized = false;

function initializeParse() {
  if (isInitialized) return;

  // These env vars do NOT have NEXT_PUBLIC_ prefix (server-side only)
  const appId = process.env.BACK4APP_APP_ID;
  const jsKey = process.env.BACK4APP_JS_KEY;

  if (!appId || !jsKey) {
    throw new Error('Missing Back4App environment variables. Make sure BACK4APP_APP_ID and BACK4APP_JS_KEY are set.');
  }

  // Initialize Parse for server-side use (works in Node.js API routes)
  Parse.initialize(appId, jsKey);
  Parse.serverURL = 'https://parseapi.back4app.com/';
  
  isInitialized = true;
}

// Create a Proxy to initialize Parse on first use
const ParseProxy = new Proxy(Parse, {
  get(target, prop) {
    initializeParse();
    return target[prop as keyof typeof Parse];
  }
});

export default ParseProxy;