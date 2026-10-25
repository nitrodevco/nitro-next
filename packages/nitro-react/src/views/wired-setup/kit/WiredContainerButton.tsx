/**
 * `wired_setup.uibuilder.presets.ContainerButtonPreset` - the style's `container_button` with a
 * preset inside it, padded by the style's `containerButtonPaddingLeft` /
 * `containerButtonPaddingTop` (a `PaddedContainerPreset` whose window is the button).
 *
 * `stretch` is the constructor's third argument and defaults to `true` as Flash's does: the
 * button is as wide as its content plus the padding; `false` makes it fill.
 */
import { ReactNode } from 'react';

import { Box, ContainerButton } from '#base/theme';

import { useWiredDisabled, wiredDisabledAlpha } from './useWiredDisabled';
import { useWiredFillLayout } from './useWiredFillLayout';
import { WiredFlow } from './WiredFlow';
import { useWiredStyle } from './WiredStyleContext';

export interface WiredContainerButtonProps {
    onPress: () => void;
    /** `_stretchMode`. Default `true`. */
    stretch?: boolean;
    disabled?: boolean;
    children?: ReactNode;
}

export const WiredContainerButton = ({ onPress, stretch = true, disabled = false, children }: WiredContainerButtonProps) => {
    const style = useWiredStyle();
    const isDisabled = useWiredDisabled(disabled);
    const fillLayout = useWiredFillLayout(stretch ? 'content' : undefined);

    return (
        <Box
            alpha={wiredDisabledAlpha(isDisabled)}
            layout={{ flexDirection: 'row', flexShrink: 0, ...fillLayout }}
        >
            <ContainerButton
                variant={style.templates.containerButton.variant}
                disabled={isDisabled}
                onPointerTap={onPress}
                layout={{
                    flexDirection: 'column',
                    flexGrow: stretch ? 0 : 1,
                    paddingLeft: style.containerButtonPaddingLeft,
                    paddingRight: style.containerButtonPaddingLeft,
                    paddingTop: style.containerButtonPaddingTop,
                    paddingBottom: style.containerButtonPaddingTop,
                }}
            >
                <WiredFlow direction="column">
                    {children}
                </WiredFlow>
            </ContainerButton>
        </Box>
    );
};
