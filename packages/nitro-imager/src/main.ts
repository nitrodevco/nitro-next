import { existsSync } from 'node:fs';

import { installNodeEnvironment } from './environment/installNodeEnvironment';

/**
 * Starts the imager. The Node stand-ins for the browser go in before anything of the renderer
 * is loaded, so every module of it finds them as it would find the browser's.
 */
const start = async () => {
    const envFile = new URL('../.env', import.meta.url);

    // The process's own environment wins over the file's: `loadEnvFile` leaves a set variable alone.
    if (existsSync(envFile)) process.loadEnvFile(envFile);

    installNodeEnvironment();

    const { startImager } = await import('./startImager');

    await startImager(process.env);
};

start().catch((err: unknown) => {
    console.error('The imager could not start:', err);

    process.exit(1);
});
