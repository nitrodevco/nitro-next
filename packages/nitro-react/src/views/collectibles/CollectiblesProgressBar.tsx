/**
 * The time bar of `collectible_view.xml` - `progress_bar` (`#112e31`) holding `progress_padded_bar`,
 * whose `progress_bar_top` / `progress_bar_bottom` halves the tab widens by code, and the
 * `progress_bar_text` over it. The minting preview's (`mint_info_container`) and the collection's
 * completion box (`padded_cont`) are the same windows at two widths.
 *
 * The halves are `background` containers, so the colour a tab sets is their whole fill, alpha
 * included (`WindowController.color`): the collection view's running-timer colours carry no alpha
 * byte, and its bar shows empty until the claim period has ended.
 */
import { Region, ThemeText } from '#base/theme';

import { toCollectiblesCssColor } from './collectiblesColors';

export interface CollectiblesProgressBarProps {
    left: number;
    top: number;
    /** `progress_bar`'s width; `progress_padded_bar` is 2 narrower in the completion box, as wide in the minting one. */
    width: number;
    paddedWidth: number;
    /** The halves' width, as the tab set it. */
    fillWidth: number;
    /** The halves' fill, `0xAARRGGBB`. */
    topColor: number;
    bottomColor: number;
    text: string;
    /** `progress_bar_text`'s width. */
    textWidth: number;
}

export const CollectiblesProgressBar = ({ left, top, width, paddedWidth, fillWidth, topColor, bottomColor, text, textWidth }: CollectiblesProgressBarProps) => (
    <Region
        name="progress_bar"
        backgroundColor="#112e31"
        layout={{ position: 'absolute', left, width, top, height: 18, overflow: 'hidden' }}
    >
        <Region
            name="progress_padded_bar"
            layout={{ position: 'absolute', left: 1, width: paddedWidth, top: 1, height: 16 }}
        >
            {(fillWidth > 0) && (
                <>
                    <Region
                        name="progress_bar_top"
                        backgroundColor={toCollectiblesCssColor(topColor)}
                        backgroundAlpha={(topColor >>> 24) / 255}
                        layout={{ position: 'absolute', left: 0, width: fillWidth, top: 0, height: 8 }}
                    />
                    <Region
                        name="progress_bar_bottom"
                        backgroundColor={toCollectiblesCssColor(bottomColor)}
                        backgroundAlpha={(bottomColor >>> 24) / 255}
                        layout={{ position: 'absolute', left: 0, width: fillWidth, top: 8, height: 8 }}
                    />
                </>
            )}
        </Region>
        <ThemeText
            text={text}
            textStyle="u_regular"
            textOptions={{ fill: '#ffffff', fontSize: 11, align: 'center' }}
            name="progress_bar_text"
            verticalAlign="top"
            layout={{ position: 'absolute', left: 0, width: textWidth, top: 1 }}
        />
    </Region>
);
