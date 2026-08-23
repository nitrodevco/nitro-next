/** A sub-region of a shared spritesheet texture - see `Image`'s own `frame` prop, which is
 *  what actually slices it now (Pixi Texture crop / CSS `background-position`, depending on
 *  render mode). */
export interface SpriteFrame {
    x: number;
    y: number;
    width: number;
    height: number;
}
