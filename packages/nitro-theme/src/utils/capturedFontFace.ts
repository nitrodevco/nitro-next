/** The captured faces (`textStyles.ts` `FLASH_FACES`' keys) by the face folded to lower case without spaces, `_` or `-`, with Flash's `italic` beside `Italics`. */
const CAPTURED_FACE_NAMES: Readonly<Record<string, string>> = {
    ubuntu: 'Ubuntu',
    ubuntubold: 'UbuntuBold',
    ubuntuitalic: 'UbuntuItalics',
    ubuntuitalics: 'UbuntuItalics',
    ubuntubolditalic: 'UbuntuBoldItalics',
    ubuntubolditalics: 'UbuntuBoldItalics',
    ubuntucondensed: 'UbuntuCondensed',
    volter: 'Volter',
    volterbold: 'VolterBold',
};

/**
 * The captured face a layout's `font_face` (or a theme's) names, whatever its case and spacing:
 * Flash's layouts write `Ubuntu bold` and `Ubuntu condensed`, a theme as easily `Ubuntu Bold` or
 * `UbuntuBold`, and all of them are the one face the client ships. `undefined` for a face none of
 * the captured ones is (a device font such as `Courier`, or one a theme loads itself).
 */
export const capturedFontFace = (face: string): string | undefined => CAPTURED_FACE_NAMES[face.toLowerCase().replace(/[\s_-]+/g, '')];
