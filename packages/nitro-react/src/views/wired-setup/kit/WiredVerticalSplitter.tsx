/**
 * `wired_setup.uibuilder.presets.VerticalSplitterPreset` - a one pixel wide column of the
 * style's `verticalSplitterColor`, `height` tall (`AssetButtonRowPreset` puts one after a button
 * flagged `isFollowedBySplitter`). Static width: 1.
 */
import { Region } from '#base/theme';

import { useWiredStyle } from './WiredStyleContext';

export interface WiredVerticalSplitterProps {
    height: number;
}

export const WiredVerticalSplitter = ({ height }: WiredVerticalSplitterProps) => {
    const style = useWiredStyle();

    return (
        <Region
            backgroundColor={style.verticalSplitterColor}
            layout={{ width: 1, height, flexShrink: 0 }}
        />
    );
};
