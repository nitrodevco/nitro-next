/**
 * `uibuilder/presets/applications/LevelXpPreviewPreset` - the "level N needs X xp" lines under a
 * level-up addon's formula: one html line per previewed level, 1px apart, with the level and
 * the xp in the style's yellow.
 *
 * `xps` is what `setPreviewXps` was given - the xp each previewed level needs, by index. A level
 * the formula never reaches (no entry) reads "Unreachable level", an xp beyond a signed 64-bit
 * integer "Out of bounds"; both literals are Flash's. Before the first preview every line shows 0.
 */
import { useTranslation } from '#base/context/system';

import { WiredHtml } from './WiredHtml';
import { WiredSimpleList } from './WiredSimpleList';
import { useWiredStyle } from './WiredStyleContext';

/** `LevelXpPreviewPreset.§_-R2F§` - `Long.MAX_VALUE` as the double Flash holds it in. */
const MAX_XP = 9223372036854776000;

export interface WiredLevelXpPreviewProps {
    /** `previewLevels` - e.g. `[ 1, 2, 3, 5, 10, 20 ]`. */
    levels: readonly number[];
    /** `setPreviewXps`; `null` until the element has computed a preview. */
    xps: readonly number[] | null;
}

export const WiredLevelXpPreview = ({ levels, xps }: WiredLevelXpPreviewProps) => {
    const t = useTranslation();
    const style = useWiredStyle();

    const yellow = (text: string): string => `<font color="${style.yellowTextColor ?? '#000000'}">${text}</font>`;

    const xpText = (index: number): string => {
        if (!xps) return '0';

        if (index >= xps.length) return 'Unreachable level';

        return (xps[index] > MAX_XP) ? 'Out of bounds' : Math.round(xps[index]).toString();
    };

    return (
        <WiredSimpleList spacing={1}>
            {levels.map((level, index) => (
                <WiredHtml
                    key={level}
                    text={t('wiredfurni.params.levelup.preview.entry', '', { lvl: yellow(String(level)), xp: yellow(xpText(index)) })}
                    mode="stretch"
                />
            ))}
        </WiredSimpleList>
    );
};
