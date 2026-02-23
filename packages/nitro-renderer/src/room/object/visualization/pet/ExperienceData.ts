import type { Texture } from 'pixi.js';
import { Container, Sprite, Text, TextStyle } from 'pixi.js';

import { TextureUtils } from '../../../../utils';

export class ExperienceData {
    private _sprite: Sprite;
    private _texture: Texture | undefined = undefined;
    private _amount: number = -1;
    private _alpha: number = 0;

    constructor(texture: Texture) {
        this._sprite = new Sprite(texture);
    }

    public renderBubble(amount: number): Texture | undefined {
        if (!this._sprite || this._amount === amount) return undefined;

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

        return this._texture;
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
