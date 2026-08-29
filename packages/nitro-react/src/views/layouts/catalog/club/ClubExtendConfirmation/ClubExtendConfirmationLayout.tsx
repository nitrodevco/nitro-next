import { ReactNode } from 'react';

import { BoxLayout, Frame, Icon, Region, ThemeImage } from '#base/theme';

import { ClubExtendConfirmationLayoutItemlistVertical, ClubExtendConfirmationLayoutItemlistVerticalProps } from './ClubExtendConfirmationLayoutItemlistVertical';

/** Generated from `1625_club_extend_confirmation_xml` (layout "extend_confirmation", 450x235) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubExtendConfirmationLayoutProps {
    backgroundContainer?: ReactNode;
    itemlistVertical?: ClubExtendConfirmationLayoutItemlistVerticalProps;
    layout?: BoxLayout;
    onClose?: () => void;
    srcClubTeaser?: string;
    tintClubTeaser?: string;
}

export const ClubExtendConfirmationLayout = ({ backgroundContainer, itemlistVertical, layout, onClose, srcClubTeaser, tintClubTeaser }: ClubExtendConfirmationLayoutProps) => {
    return (
        <Frame
            variant="3"
            id="frame_title"
            name="frame_title"
            tintColor="#007a98"
            onClose={onClose}
            layout={{ width: 450, height: 235, minWidth: 450, minHeight: 235, ...layout }}
        >
            <Region
                name="background_container"
                backgroundColor="#bcbdbc"
                layout={{ position: 'absolute', left: 1, width: 448, top: 0, height: 25 }}
            >
                {backgroundContainer}
            </Region>
            <Icon
                variant="18"
                name="club_level_icon"
                layout={{ position: 'absolute', left: 25, width: 85, top: 25, height: 40 }}
            />
            <ClubExtendConfirmationLayoutItemlistVertical {...itemlistVertical} />
            <ThemeImage
                name="club_teaser"
                src={srcClubTeaser}
                tint={tintClubTeaser}
                layout={{ position: 'absolute', right: 397, width: 40, bottom: -60, height: 144 }}
            />
        </Frame>
    );
};
