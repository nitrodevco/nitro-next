import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `839_share_room_xml` (layout "share_room", 457x196) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ShareRoomLayoutProps {
    captionEmbedInfoDirectTxt?: string;
    captionEmbedInfoHdln?: string;
    captionEmbedInfoTxt?: string;
    captionEmbedSrcTxt?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    srcThumbnailImage?: string;
}

export const ShareRoomLayout = ({ captionEmbedInfoDirectTxt, captionEmbedInfoHdln, captionEmbedInfoTxt, captionEmbedSrcTxt, layout, onClose, srcThumbnailImage }: ShareRoomLayoutProps) => {
    const t = useTranslation();
    const [ embedSrcDirectTxtValue, setEmbedSrcDirectTxtValue ] = useState('');

    return (
        <Frame
            variant="3"
            caption={t('navigator.embed.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 457, height: 250, minWidth: 457, minHeight: 250, ...layout }}
        >
            <Region
                name="thumbnail_edges"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 18, width: 112, top: 19, height: 112 }}
            >
                <ThemeImage
                    name="thumbnail_image"
                    src={srcThumbnailImage ?? layoutImage('newnavigator_default_room.png')}
                    layout={{ position: 'absolute', left: 1, width: 110, top: 1, height: 110 }}
                />
            </Region>
            <Region
                name="embed_info"
                layout={{ position: 'absolute', right: 10, width: 285, top: 10, height: 240 }}
            >
                <ThemeText
                    text={captionEmbedInfoHdln ?? t('navigator.embed.headline')}
                    textStyle="text-style-u-bold"
                    textOptions={{ wordWrap: true, wordWrapWidth: 281 }}
                    name="embed_info_hdln"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, right: 4, top: 0, height: 26 }}
                />
                <ThemeText
                    text={captionEmbedInfoTxt ?? t('navigator.embed.info')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 286 }}
                    name="embed_info_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, right: -1, top: 28, height: 75 }}
                />
                <ThemeText
                    text={captionEmbedSrcTxt ?? `${t('url.prefix')}/room/%roomId%`}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 286 }}
                    name="embed_src_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, right: -1, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 75 }}
                />
                <ThemeText
                    text={captionEmbedInfoDirectTxt ?? t('navigator.embed.direct.info')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 286 }}
                    name="embed_info_direct_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, right: -1, top: 107, height: 75 }}
                />
                <TextInput
                    value={embedSrcDirectTxtValue}
                    onChange={setEmbedSrcDirectTxtValue}
                    layout={{ position: 'absolute', left: 0, right: -5, top: 162, height: 24 }}
                />
            </Region>
        </Frame>
    );
};
