/**
 * `wired_setup.uibuilder.presets.AvatarImagePreset` - the `avatar_image_view` layout: a 90x120
 * box around the avatar image widget (90x130, ten pixels up, facing south). Static width: 90.
 *
 * The widget renders a figure string alone; the avatar renderer here also wants the gender, so
 * it is a prop with the widget's own default.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';

import { AvatarImage } from '#base/components';
import { Box } from '#base/theme';

import { useWiredDisabled, wiredDisabledAlpha } from './useWiredDisabled';

export interface WiredAvatarImageProps {
    /** `AvatarImagePreset.figure`. */
    figure: string;
    gender?: AvatarGenderType;
}

/** `AvatarImageWidget`'s direction list index of `south`. */
const DIRECTION_SOUTH = 3;

export const WiredAvatarImage = ({ figure, gender = AvatarGenderType.Male }: WiredAvatarImageProps) => {
    const disabled = useWiredDisabled();

    return (
        <Box
            alpha={wiredDisabledAlpha(disabled)}
            layout={{ position: 'relative', width: 90, height: 120, flexShrink: 0, overflow: 'hidden' }}
        >
            {!!figure.length && (
                <Box layout={{ position: 'absolute', left: 0, top: -10, width: 90, height: 130, justifyContent: 'center', alignItems: 'flex-end' }}>
                    <AvatarImage
                        figure={figure}
                        gender={gender}
                        direction={DIRECTION_SOUTH}
                    />
                </Box>
            )}
        </Box>
    );
};
