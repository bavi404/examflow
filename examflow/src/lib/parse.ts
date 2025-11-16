// Server-side Parse instance (for API routes only)
import Parse from 'parse';

// These env vars do NOT have NEXT_PUBLIC_ prefix (server-side only)
const appId = process.env.BACK4APP_APP_ID;
const jsKey = process.env.BACK4APP_JS_KEY;

if (!appId || !jsKey) {
  throw new Error('Missing Back4App environment variables');
}

// Initialize Parse for server-side use (works in Node.js API routes)
Parse.initialize(appId, jsKey);
Parse.serverURL = 'https://parseapi.back4app.com/';

export default Parse;