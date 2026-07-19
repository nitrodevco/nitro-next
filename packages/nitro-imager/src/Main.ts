import 'dotenv/config';
import '@pixi/node';

import { serve } from '@hono/node-server';
import { NitroLogger } from '@nitrodevco/nitro-api';
import { GetRoomEngine, PrepareRenderer } from '@nitrodevco/nitro-renderer';

import { GetHono } from './GetHono';
import { AvatarLoader } from './loaders/AvatarLoader';

NitroLogger.LOG_DEBUG = true;
NitroLogger.LOG_ERROR = true;

const init = async () => {
    try {
        NitroLogger.log(`Preparing Imager`);
        await PrepareRenderer({});
        await AvatarLoader();

        await GetRoomEngine().init();

        serve({
            fetch: GetHono().fetch,
            port: Number(process.env.WEB_PORT) || 3000,
        }, info => {
            console.log(`listening!`)
        });
    } catch (err) {
        NitroLogger.error(err);
    }
}

void init();