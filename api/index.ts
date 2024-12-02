import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequestHandler } from '@expo/server/adapter/vercel';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default createRequestHandler({
  build: path.join(__dirname, '../dist/server'),
});
