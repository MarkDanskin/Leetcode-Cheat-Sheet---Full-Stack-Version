import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Determine __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

export default app;
