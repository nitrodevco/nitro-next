import { NitroLogger } from '@nitrodevco/nitro-api';

/** What `ExtraDataManager` needs of a photo furni: `FurnitureExternalImageVisualization`. */
export interface IExtraDataClient {
    getExternalImageUUID(): string | undefined;
    getExtraDataUrl(): string | undefined;
    onUrlFromExtraDataService(url: string): void;
}

/** One row of the extra data service's answer. */
interface IExtraDataResult {
    id?: string;
    url?: string;
    status?: string;
}

/**
 * Port of Flash `ExtraDataManager`: photo furni that only carry an image id (`{ "id": ... }` in
 * their furni data) ask the extra data service (`extra_data_service_url`) for the picture's url.
 * Rather than one request per furni, the requests queue up and every 200ms up to 50 ids go out
 * in one `POST` of a JSON array; the answer is an array of `{ id, url, status }`, and a
 * `REJECTED` status is handed back in place of the url.
 */
export class ExtraDataManager {
    public static STATUS_REJECTED: string = 'REJECTED';

    private static BATCH_MAX_QUERY_AMOUNT: number = 50;
    private static BATCH_INTERVAL: number = 200;

    private static _instance: ExtraDataManager | undefined = undefined;

    private _inputQueue: IExtraDataClient[] = [];
    private _outputQueue: IExtraDataClient[] = [];

    constructor() {
        setInterval(() => this.handleBatch(), ExtraDataManager.BATCH_INTERVAL);
    }

    private static getInstance(): ExtraDataManager {
        if (!ExtraDataManager._instance) ExtraDataManager._instance = new ExtraDataManager();

        return ExtraDataManager._instance;
    }

    public static requestExtraDataUrl(client: IExtraDataClient): void {
        ExtraDataManager.getInstance()._inputQueue.push(client);
    }

    public static furnitureDisposed(client: IExtraDataClient): void {
        // Flash made the manager here too; there is nothing to remove from one that never existed.
        ExtraDataManager._instance?.removeFurniFromManager(client);
    }

    private removeFurniFromManager(client: IExtraDataClient): void {
        const input = this._inputQueue.indexOf(client);

        if (input !== -1) this._inputQueue.splice(input, 1);

        const output = this._outputQueue.indexOf(client);

        if (output !== -1) this._outputQueue.splice(output, 1);
    }

    private handleBatch(): void {
        if (!this._inputQueue.length) return;

        const ids: string[] = [];
        let url: string | undefined = undefined;

        for (let index = 0; index < ExtraDataManager.BATCH_MAX_QUERY_AMOUNT; index++) {
            const client = this._inputQueue.shift();

            if (!client) break;

            ids.push(client.getExternalImageUUID() ?? '');
            url = client.getExtraDataUrl();

            this._outputQueue.push(client);
        }

        if (!ids.length || !url) return;

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ids),
        })
            .then((response) => {
                if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

                return response.text();
            })
            .then(text => this.onExtraDataLoaded(text))
            .catch(error => NitroLogger.warn('Failed to load ExtraData batch', error));
    }

    private onExtraDataLoaded(text: string): void {
        if (!text || !text.length) return;

        let results: IExtraDataResult[];

        try {
            results = JSON.parse(text) as IExtraDataResult[];
        } catch {
            NitroLogger.warn('Failed to read JSON from ExtraData service');

            return;
        }

        if (!Array.isArray(results)) return;

        for (const result of results) {
            for (const client of [ ...this._outputQueue ]) {
                if (client.getExternalImageUUID() !== result.id) continue;

                client.onUrlFromExtraDataService((result.status === ExtraDataManager.STATUS_REJECTED) ? ExtraDataManager.STATUS_REJECTED : (result.url ?? ''));

                this.removeFurniFromManager(client);
            }
        }
    }
}
