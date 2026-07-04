import type { AvatarSetType, IAvatarFigureContainer } from "@nitrodevco/nitro-api";

export class AvatarFigureContainer implements IAvatarFigureContainer {
    private _parts: Map<string, Map<string, unknown>> = new Map();

    constructor(figure: string) {
        this.parseFigure(figure);
    }

    public getPartTypeIds(): string[] {
        return this._parts.keys().toArray();
    }

    public hasPartType(type: string): boolean {
        return !!this._parts.get(type);
    }

    public getPartSetId(type: string): number {
        return this._parts.get(type)?.get('setid') as number ?? 0;
    }

    public getPartColorIds(type: string): number[] {
        return this._parts.get(type)?.get('colorids') as number[] ?? [];
    }

    public updatePart(type: string, partSetId: number, colorIds: number[]): void {
        const set: Map<string, unknown> = new Map();

        set.set('type', type);
        set.set('setid', partSetId);
        set.set('colorids', colorIds);

        this._parts.delete(type);
        this._parts.set(type, set);
    }

    public removePart(type: string): void {
        this._parts.delete(type);
    }

    public getFigureString(): string {
        const parts: string[] = [];

        for (const key of this._parts.keys()) {
            if (!key) continue;

            let setParts: string[] = [];

            setParts.push(key);
            setParts.push(this.getPartSetId(key).toString());

            setParts = setParts.concat(this.getPartColorIds(key).map(x => x.toString()));

            parts.push(setParts.join('-'));
        }

        return parts.join('.');
    }

    private parseFigure(figure: string): void {
        if (!figure) figure = '';

        for (const part of figure.split('.')) {
            const pieces = part.split('-');

            if (pieces.length >= 2) {
                const type = pieces[0] as AvatarSetType;
                const setId = parseInt(pieces[1]);
                const colors: number[] = [];

                let index = 2;

                while (index < pieces.length) {
                    colors.push(parseInt(pieces[index]));

                    index++;
                }

                this.updatePart(type, setId, colors);
            }
        }
    }
}
