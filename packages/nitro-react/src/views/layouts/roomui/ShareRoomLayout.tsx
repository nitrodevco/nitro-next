import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `839_share_room_xml` (layout "share_room", 457x196) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ShareRoomLayoutProps {
    embedInfo?: ShareRoomLayoutEmbedInfoProps;
    layout?: BoxLayout;
    onClose?: () => void;
    thumbnailEdges?: ShareRoomLayoutThumbnailEdgesProps;
}

export const ShareRoomLayout = ({ embedInfo, layout, onClose, thumbnailEdges }: ShareRoomLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('navigator.embed.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 457, height: 250, ...layout }}
        >
            <ShareRoomLayoutThumbnailEdges {...thumbnailEdges} />
            <ShareRoomLayoutEmbedInfo {...embedInfo} />
        </Frame>
    );
};

/** Named region `thumbnail_edges` of ShareRoomLayout - configured through the parent's `thumbnailEdges` prop. */
export interface ShareRoomLayoutThumbnailEdgesProps {
    layout?: BoxLayout;
    srcThumbnailImage?: string;
}

export const ShareRoomLayoutThumbnailEdges = ({ layout, srcThumbnailImage }: ShareRoomLayoutThumbnailEdgesProps) => {
    return (
        <Region
            name="thumbnail_edges"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 18, width: 112, top: 19, height: 112, ...layout }}
        >
            <ThemeImage
                name="thumbnail_image"
                src={srcThumbnailImage ?? layoutImage('newnavigator_default_room.png')}
                layout={{ position: 'absolute', left: 1, width: 110, top: 1, height: 110 }}
            />
        </Region>
    );
};

/** Named region `embed_info` of ShareRoomLayout - configured through the parent's `embedInfo` prop. */
export interface ShareRoomLayoutEmbedInfoProps {
    captionEmbedInfoDirectTxt?: string;
    captionEmbedInfoHdln?: string;
    captionEmbedInfoTxt?: string;
    captionEmbedSrcTxt?: string;
    layout?: BoxLayout;
}

export const ShareRoomLayoutEmbedInfo = ({ captionEmbedInfoDirectTxt, captionEmbedInfoHdln, captionEmbedInfoTxt, captionEmbedSrcTxt, layout }: ShareRoomLayoutEmbedInfoProps) => {
    const t = useTranslation();
    const [ embedSrcDirectTxtValue, setEmbedSrcDirectTxtValue ] = useState('');

    return (
        <Region
            name="embed_info"
            layout={{ position: 'absolute', left: 150, width: 285, top: 10, height: 240, ...layout }}
        >
            <Region
                name="embed_info_hdln"
                layout={{ position: 'absolute', left: 0, width: 281, top: 0, height: 26, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionEmbedInfoHdln ?? t('navigator.embed.headline')}
                    textStyle="text-style-u-bold"
                    textOptions={{ wordWrap: true, wordWrapWidth: 281 }}
                />
            </Region>
            <Region
                name="embed_info_txt"
                layout={{ position: 'absolute', left: 0, width: 286, top: 28, height: 75, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionEmbedInfoTxt ?? t('navigator.embed.info')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 286 }}
                />
            </Region>
            <Region
                name="embed_src_txt"
                layout={{ position: 'absolute', left: 0, width: 286, top: 83, height: 75, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionEmbedSrcTxt ?? `${t('url.prefix')}/room/%roomId%`}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 286 }}
                />
            </Region>
            <Region
                name="embed_info_direct_txt"
                layout={{ position: 'absolute', left: 0, width: 286, top: 107, height: 75, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionEmbedInfoDirectTxt ?? t('navigator.embed.direct.info')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 286 }}
                />
            </Region>
            <TextInput
                value={embedSrcDirectTxtValue}
                onChange={setEmbedSrcDirectTxtValue}
                layout={{ position: 'absolute', left: 0, width: 290, top: 162, height: 24 }}
            />
        </Region>
    );
};
