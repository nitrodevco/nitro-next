/**
 * `wired_setup.uibuilder.presets.PaddedContainerPreset` - one child inset by `left`, `top`,
 * `right` and `bottom`, optionally inside a border:
 * `PresetManager.createSurroundingBorderContainerPreset` passes the style's border
 * (`WiredStyle.createSurroundingBorder`, the `border` template restyled to
 * `surroundingBorderStyleId` when the style names one), which is `bordered` here.
 *
 * `stretch` is the constructor's last argument (`_stretchMode`): the container is as wide as its
 * content plus the padding - a static width - instead of filling.
 */
import { ReactNode } from 'react';

import { Border, Box, BoxLayout } from '#base/theme';

import { useWiredDisabled, wiredDisabledAlpha } from './useWiredDisabled';
import { useWiredFillLayout } from './useWiredFillLayout';
import { WiredFlow } from './WiredFlow';
import { useWiredStyle } from './WiredStyleContext';

export interface WiredPaddedContainerProps {
    left: number;
    top: number;
    right: number;
    bottom: number;
    /** Draws the style's surrounding border behind the content (`createSurroundingBorderContainerPreset`). */
    bordered?: boolean;
    /**
     * With `bordered`: the style's plain `border` (`WiredStyle.createBorder`, what `BorderSection`
     * passes) instead of the surrounding one - no `surroundingBorderStyleId` restyle.
     */
    plainBorder?: boolean;
    /** `_stretchMode` - as wide as the content instead of filling. */
    stretch?: boolean;
    children?: ReactNode;
}

export const WiredPaddedContainer = ({ left, top, right, bottom, bordered = false, plainBorder = false, stretch = false, children }: WiredPaddedContainerProps) => {
    const style = useWiredStyle();
    const fillLayout = useWiredFillLayout(stretch ? 'content' : undefined);
    const disabled = useWiredDisabled();
    const layout: BoxLayout = { flexDirection: 'column', paddingLeft: left, paddingTop: top, paddingRight: right, paddingBottom: bottom, flexShrink: 0, ...fillLayout };
    const content = (
        <WiredFlow direction="column">
            {children}
        </WiredFlow>
    );

    if (!bordered) return <Box layout={layout}>{content}</Box>;

    const border = style.templates.border;

    return (
        <Border
            variant={(!plainBorder && (style.surroundingBorderStyleId > 0)) ? String(style.surroundingBorderStyleId) : border.variant}
            tintColor={border.color ?? undefined}
            blend={wiredDisabledAlpha(disabled)}
            layout={layout}
        >
            {content}
        </Border>
    );
};
