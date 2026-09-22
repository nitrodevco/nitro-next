/**
 * `wired_setup.uibuilder.presets.AssetButtonRowPreset` with `params.AssetButtonParam` - a row of
 * asset buttons with the style's `genericHorizontalSpacing` between them. A button flagged
 * `followedBySplitter` gets a vertical splitter of its own height after it (the button's height
 * once its bitmap has sized it, `useWiredAssetButtonSize`), and one flagged
 * `alignRight` takes the rest of the row and sits at its right end.
 *
 * Which button is down is the caller's: Flash reaches into `buttons[i].selected`, here it is
 * `selected` on the button's entry.
 */
import { Fragment } from 'react';

import { useWiredAssetButtonSize } from './useWiredAssetButtonSize';
import { WiredAlignRight } from './WiredAlignRight';
import { WiredAssetButton } from './WiredAssetButton';
import { WiredSimpleList } from './WiredSimpleList';
import { useWiredStyle } from './WiredStyleContext';
import { WiredVerticalSplitter } from './WiredVerticalSplitter';

/** `AssetButtonParam`. */
export interface WiredAssetButtonParam {
    /** `assetName`. */
    asset: string;
    /** `tooltip` - a literal or `${key}`. */
    tooltip?: string;
    /** `onClick`. */
    onPress: () => void;
    /** `isFollowedBySplitter`. */
    followedBySplitter?: boolean;
    /** `alignRight`. */
    alignRight?: boolean;
    /** `AssetButtonPreset.selected`. */
    selected?: boolean;
    disabled?: boolean;
}

/** The splitter after a button: `VerticalSplitterPreset` as high as that button's window. */
const WiredAssetButtonSplitter = ({ asset }: { asset: string }) => {
    const style = useWiredStyle();
    const { height } = useWiredAssetButtonSize(style, asset);

    return <WiredVerticalSplitter height={height} />;
};

export interface WiredAssetButtonRowProps {
    buttons: WiredAssetButtonParam[];
}

export const WiredAssetButtonRow = ({ buttons }: WiredAssetButtonRowProps) => {
    const style = useWiredStyle();

    return (
        <WiredSimpleList
            vertical={false}
            spacing={style.genericHorizontalSpacing}
        >
            {buttons.map((button, index) => {
                const element = (
                    <WiredAssetButton
                        asset={button.asset}
                        tooltip={button.tooltip}
                        selected={button.selected}
                        disabled={button.disabled}
                        onPress={button.onPress}
                    />
                );

                return (
                    <Fragment key={index}>
                        {button.alignRight ? <WiredAlignRight>{element}</WiredAlignRight> : element}
                        {button.followedBySplitter && <WiredAssetButtonSplitter asset={button.asset} />}
                    </Fragment>
                );
            })}
        </WiredSimpleList>
    );
};
