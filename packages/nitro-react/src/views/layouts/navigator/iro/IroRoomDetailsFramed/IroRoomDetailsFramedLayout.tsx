import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

import { IroRoomDetailsFramedLayoutButtonsCont, IroRoomDetailsFramedLayoutButtonsContProps } from './IroRoomDetailsFramedLayoutButtonsCont';
import { IroRoomDetailsFramedLayoutRoomDetails, IroRoomDetailsFramedLayoutRoomDetailsProps } from './IroRoomDetailsFramedLayoutRoomDetails';

/** Generated from `2999_iro_room_details_framed_xml` (layout "roominfo", 236x411) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IroRoomDetailsFramedLayoutProps {
    buttonsCont?: IroRoomDetailsFramedLayoutButtonsContProps;
    captionEmbedInfoTxt?: string;
    captionPublicSpaceDesc?: string;
    captionPublicSpaceName?: string;
    embedInfoRegion?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onEmbedInfoRegion?: () => void;
    onPublicSpaceDetails?: () => void;
    roomDetails?: IroRoomDetailsFramedLayoutRoomDetailsProps;
    srcIconWeblink?: string;
    tintIconWeblink?: string;
    visibleEmbedInfo?: boolean;
    visiblePublicSpaceDetails?: boolean;
}

export const IroRoomDetailsFramedLayout = ({ buttonsCont, captionEmbedInfoTxt, captionPublicSpaceDesc, captionPublicSpaceName, embedInfoRegion, layout, onClose, onEmbedInfoRegion, onPublicSpaceDetails, roomDetails, srcIconWeblink, tintIconWeblink, visibleEmbedInfo, visiblePublicSpaceDetails }: IroRoomDetailsFramedLayoutProps) => {
    const t = useTranslation();
    const [ embedSrcTxtValue, setEmbedSrcTxtValue ] = useState('');

    return (
        <Frame
            variant="3"
            id="event_window"
            name="event_window"
            caption={t('navigator.roomsettings.roominfo')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 236, height: 411, minWidth: 236, minHeight: 411, ...layout }}
        >
            {(visibleEmbedInfo ?? false) && (
                <Region
                    name="embed_info"
                    layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 79 }}
                >
                    <ThemeImage
                        name="icon_weblink"
                        src={srcIconWeblink}
                        tint={tintIconWeblink}
                        layout={{ position: 'absolute', left: 11, width: 17, top: 5, height: 15 }}
                    />
                    <Region layout={{ position: 'absolute', left: 29, width: 143, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('navigator.embed.caption')}
                            textStyle="text-style-u-regular"
                        />
                    </Region>
                    <Region
                        name="embed_info_txt"
                        layout={{ position: 'absolute', left: 9, width: 216, top: 20, height: 38, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionEmbedInfoTxt ?? t('navigator.embed.info')}
                            textStyle="text-style-u-small"
                            textOptions={{ wordWrap: true, wordWrapWidth: 216 }}
                        />
                    </Region>
                    <TextInput
                        value={embedSrcTxtValue}
                        onChange={setEmbedSrcTxtValue}
                        layout={{ position: 'absolute', left: 11, width: 208, top: 57, height: 15 }}
                    />
                    <Region
                        name="embed_info_region"
                        onPointerTap={onEmbedInfoRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        {embedInfoRegion}
                    </Region>
                </Region>
            )}
            {(visiblePublicSpaceDetails ?? false) && (
                <Region
                    name="public_space_details"
                    onPointerTap={onPublicSpaceDetails}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 100 }}
                >
                    <Region
                        name="public_space_name"
                        layout={{ position: 'absolute', left: 5, width: 220, top: 3, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPublicSpaceName ?? 'Public space name placeholder Diipa Daapa Zaapa'}
                            textStyle="text-style-u-bold"
                            textOptions={{ wordWrap: true, wordWrapWidth: 220 }}
                        />
                    </Region>
                    <Region
                        name="public_space_desc"
                        layout={{ position: 'absolute', left: 5, width: 220, top: 31, height: 53, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPublicSpaceDesc ?? 'PH Room Desc: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit'}
                            textStyle="text-style-u-regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 220 }}
                        />
                    </Region>
                </Region>
            )}
            <IroRoomDetailsFramedLayoutRoomDetails {...roomDetails} />
            <IroRoomDetailsFramedLayoutButtonsCont {...buttonsCont} />
        </Frame>
    );
};
