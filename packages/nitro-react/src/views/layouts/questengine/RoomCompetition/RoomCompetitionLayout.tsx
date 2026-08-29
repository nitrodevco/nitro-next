import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { RoomCompetitionLayoutFurniContainerItem } from './RoomCompetitionLayoutFurniContainerItem';

/** Generated from `134_RoomCompetition_xml` (layout "RoomCompetition", 448x86) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomCompetitionLayoutProps {
    captionButtonInfoTxt?: string;
    captionCaptionTxt?: string;
    captionDontShowAgainTxt?: string;
    captionDontShowInfoTxt?: string;
    captionInfoTxt?: string;
    colorableTextColor?: string;
    dontShowAgainRegion?: ReactNode;
    itemsRequiredFurnisItemgrid?: ReactNode;
    layout?: BoxLayout;
    onActionButton?: () => void;
    onCloseRegion?: () => void;
    onDontShowAgainRegion?: () => void;
    onInfoRegion?: () => void;
    srcCloseIcon?: string;
    srcSubmitImage?: string;
    srcVoteImage?: string;
}

export const RoomCompetitionLayout = ({ captionButtonInfoTxt, captionCaptionTxt, captionDontShowAgainTxt, captionDontShowInfoTxt, captionInfoTxt, colorableTextColor, dontShowAgainRegion, itemsRequiredFurnisItemgrid, layout, onActionButton, onCloseRegion, onDontShowAgainRegion, onInfoRegion, srcCloseIcon, srcSubmitImage, srcVoteImage }: RoomCompetitionLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 448, height: 86, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Border
                    variant="1"
                    name="dont_show_again_container"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}
                >
                    <Region
                        name="dont_show_info_txt"
                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 205, top: 24, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionDontShowInfoTxt ?? 'You will see this again adad adada ad'}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: colorableTextColor ?? '#bbbbbb' }}
                        />
                    </Region>
                    <Region
                        name="dont_show_again_txt"
                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 247, alignSelf: 'center', marginTop: 5.5, marginBottom: -5.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionDontShowAgainTxt ?? t('roomcompetition.dontshowagain.dontshow')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: colorableTextColor ?? '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="dont_show_again_region"
                        onPointerTap={onDontShowAgainRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 46, height: 21 }}
                    >
                        {dontShowAgainRegion}
                    </Region>
                </Border>
                <Border
                    variant="104"
                    name="normal_container"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 96 }}
                >
                    <Region
                        name="caption_txt"
                        layout={{ position: 'absolute', left: 57, right: 141, top: 14, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCaptionTxt ?? 'Caption txt PH'}
                            textStyle="text-style-il-heading-2"
                            textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                        />
                    </Region>
                    <Region
                        name="info_region"
                        layout={{ position: 'absolute', left: 57, width: 250, top: 46, height: 50, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        onPointerTap={onInfoRegion}
                        cursor="pointer"
                    >
                        <ThemeText
                            text={captionInfoTxt ?? 'Link text ph'}
                            textOptions={{ fill: colorableTextColor, wordWrap: true, wordWrapWidth: 250 }}
                        />
                    </Region>
                    <Button
                        variant="100"
                        name="action_button"
                        onPointerTap={onActionButton}
                        layout={{ position: 'absolute', right: 3, width: 150, top: 24, height: 55, minWidth: 150, maxWidth: 150 }}
                    >
                        Submit Btn PH
                    </Button>
                    <Region
                        name="close_region"
                        onPointerTap={onCloseRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', right: 6, width: 11, top: 5, height: 12 }}
                    >
                        <ThemeImage
                            name="close_icon"
                            src={srcCloseIcon ?? layoutImage('icons_close.png')}
                            layout={{ position: 'absolute', left: 0, width: 11, top: 0, height: 12 }}
                        />
                    </Region>
                    <ThemeImage
                        name="vote_image"
                        src={srcVoteImage ?? '${image.library.url}reception/vote_placeholder.png'}
                        layout={{ position: 'absolute', left: 3, width: 55, top: 16, height: 52 }}
                    />
                    <ThemeImage
                        name="submit_image"
                        src={srcSubmitImage ?? '${image.library.url}reception/your_room_placeholder.png'}
                        layout={{ position: 'absolute', left: 2, width: 55, top: 9, height: 60 }}
                    />
                    <Region
                        name="required_furnis_itemgrid"
                        layout={{ position: 'absolute', right: 18, minWidth: 115, top: 32, minHeight: 36, flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}
                    >
                        {itemsRequiredFurnisItemgrid ?? (
                            <RoomCompetitionLayoutFurniContainerItem />
                        )}
                    </Region>
                    <Region
                        name="button_info_txt"
                        layout={{ position: 'absolute', right: 1, width: 153, top: 16, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionButtonInfoTxt ?? 'kjhlk jh lkj hklj'}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
