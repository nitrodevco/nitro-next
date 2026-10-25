import { Container, Sprite, Text, TextStyle, Texture } from 'pixi.js';

import { TextureUtils } from '../../../../utils';

/** Port of Flash `ExperienceData`. */
export class ExperienceData {
    private _sprite: Sprite;
    private _texture: Texture | undefined = undefined;
    private _amount: number = -1;
    private _alpha: number = 0;

    constructor(texture: Texture) {
        this._sprite = new Sprite(texture);
    }

    /**
     * The bubble for `amount`, drawn again only when the amount changes. It is asked for every frame
     * the bubble shows, and used to build a fresh text (and its canvas texture) each time without
     * freeing it, as `_amount` was never recorded.
     */
    public renderBubble(amount: number): Texture | undefined {
        if (!this._sprite) return undefined;

        if (this._texture && (this._amount === amount)) return this._texture;

        const container = new Container();

        container.addChild(this._sprite);

        const text = new Text({
            text: '+' + amount,
            style: new TextStyle({
                fontFamily: 'Arial',
                fontSize: 9,
                fill: 0xffffff,
                align: 'center',
            }),
        });

        text.anchor.x = 0.5;

        text.x = this._sprite.width / 2;
        text.y = 19;

        container.addChild(text);

        if (!this._texture) {
            this._texture = TextureUtils.generateTexture(container);
        } else {
            TextureUtils.writeToTexture(container, this._texture, true);
        }

        // The sprite is kept for the next render; the text was only needed for this one.
        container.removeChild(this._sprite);
        container.destroy({ children: true });

        this._amount = amount;

        return this._texture;
    }

    public dispose(): void {
        if (this._texture) TextureUtils.destroyTexture(this._texture);

        this._texture = undefined;

        // The bubble art is the asset manager's; only the sprite is ours.
        this._sprite.destroy();
    }

    public get amount(): number {
        return this._amount;
    }

    public set amount(amount: number) {
        this._amount = amount;
    }

    public get alpha(): number {
        return this._alpha;
    }

    public set alpha(alpha: number) {
        this._alpha = alpha;
    }
}
