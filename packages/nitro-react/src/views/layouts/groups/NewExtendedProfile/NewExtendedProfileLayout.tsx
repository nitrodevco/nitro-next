import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Frame, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { NewExtendedProfileLayoutBlockedContainer, NewExtendedProfileLayoutBlockedContainerProps } from './NewExtendedProfileLayoutBlockedContainer';
import { NewExtendedProfileLayoutBottomContainer, NewExtendedProfileLayoutBottomContainerProps } from './NewExtendedProfileLayoutBottomContainer';
import { NewExtendedProfileLayoutMiddle, NewExtendedProfileLayoutMiddleProps } from './NewExtendedProfileLayoutMiddle';
import { NewExtendedProfileLayoutTop, NewExtendedProfileLayoutTopProps } from './NewExtendedProfileLayoutTop';

/** Generated from `1194_new_extended_profile_xml` (layout "new_extended_profile", 521x537) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewExtendedProfileLayoutProps {
    blockedContainer?: NewExtendedProfileLayoutBlockedContainerProps;
    bottomContainer?: NewExtendedProfileLayoutBottomContainerProps;
    layout?: BoxLayout;
    middle?: NewExtendedProfileLayoutMiddleProps;
    onBlockButton?: () => void;
    onClose?: () => void;
    spacer?: ReactNode;
    spacer2?: ReactNode;
    top?: NewExtendedProfileLayoutTopProps;
    visibleBlockedContainer?: boolean;
}

export const NewExtendedProfileLayout = ({ blockedContainer, bottomContainer, layout, middle, onBlockButton, onClose, spacer, spacer2, top, visibleBlockedContainer }: NewExtendedProfileLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('extendedprofile.caption')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 521, height: 537, minWidth: 521, minHeight: 537, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 6, width: 500, top: -1, height: 495, flexDirection: 'column', gap: 6 }}>
                <NewExtendedProfileLayoutTop {...top} />
                <Region
                    name="spacer"
                    backgroundColor="#afafaf"
                    layout={{ width: 512, height: 1, flexShrink: 0 }}
                >
                    {spacer}
                </Region>
                <NewExtendedProfileLayoutMiddle {...middle} />
                <Region
                    name="spacer"
                    backgroundColor="#afafaf"
                    layout={{ width: 512, height: 1, flexShrink: 0 }}
                >
                    {spacer2}
                </Region>
                <NewExtendedProfileLayoutBottomContainer {...bottomContainer} />
            </Region>
            <ContainerButton
                variant="7"
                name="block_button"
                dynamicStyle="button"
                onPointerTap={onBlockButton}
                layout={{ position: 'absolute', left: 481, width: 24, top: 4, height: 24 }}
            >
                <ThemeImage
                    src={layoutImage('extended_profile_block_icon.png')}
                    layout={{ position: 'absolute', left: 4, width: 16, top: 4, height: 16 }}
                />
            </ContainerButton>
            {(visibleBlockedContainer ?? false) && (
                <NewExtendedProfileLayoutBlockedContainer {...blockedContainer} />
            )}
        </Frame>
    );
};
