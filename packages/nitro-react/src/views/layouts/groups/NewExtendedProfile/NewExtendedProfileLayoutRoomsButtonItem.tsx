import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `rooms_button` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutRoomsButtonItemProps {
    captionRoomsLinkText?: string;
    layout?: BoxLayout;
    onRoomsButton?: () => void;
    spacer?: ReactNode;
    visibleRoomsLinkText?: boolean;
    visibleSpacer?: boolean;
}

export const NewExtendedProfileLayoutRoomsButtonItem = ({ captionRoomsLinkText, layout, onRoomsButton, spacer, visibleRoomsLinkText, visibleSpacer }: NewExtendedProfileLayoutRoomsButtonItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rooms_button"
            onPointerTap={onRoomsButton}
            cursor="pointer"
            layout={{ width: 166, height: 30, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region layout={{ position: 'absolute', width: 162, top: 0, bottom: 0, minHeight: 30, maxHeight: 30, flexDirection: 'row', gap: 6 }}>
                <ThemeImage
                    src={layoutImage('extended_profile_rooms.png')}
                    layout={{ width: 32, height: 28, flexShrink: 0 }}
                />
                {(visibleRoomsLinkText ?? true) && (
                    <ThemeText
                        text={captionRoomsLinkText ?? t('extendedprofile.rooms')}
                        textStyle="text-style-il-link-strong"
                        name="rooms_link_text"
                        layout={{ width: 124, height: 16, flexShrink: 0 }}
                    />
                )}
            </Region>
            {(visibleSpacer ?? true) && (
                <Region
                    name="spacer"
                    backgroundColor="#afafaf"
                    layout={{ position: 'absolute', left: 165, width: 1, top: -6, height: 39 }}
                >
                    {spacer}
                </Region>
            )}
        </Region>
    );
};
