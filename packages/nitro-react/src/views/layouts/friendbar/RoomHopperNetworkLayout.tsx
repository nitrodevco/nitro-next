import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `21_room_hopper_network_xml` (layout "room_hopper_network", 250x218) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomHopperNetworkLayoutProps {
    captionHeader?: string;
    captionInfo?: string;
    captionTitle?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    spacing?: ReactNode;
    srcBitmap?: string;
    srcBorderBar?: string;
    srcHdrLine?: string;
}

export const RoomHopperNetworkLayout = ({ captionHeader, captionInfo, captionTitle, layout, onButton, spacing, srcBitmap, srcBorderBar, srcHdrLine }: RoomHopperNetworkLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 250, height: 218, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 218, maxWidth: 250 }}
            >
                <ThemeImage
                    name="border_bar"
                    src={srcBorderBar ?? layoutImage('illumina_light_border_top_center.png')}
                    layout={{ position: 'absolute', left: 0, width: 12, top: 10, height: 4 }}
                />
                <Region
                    name="title"
                    layout={{ position: 'absolute', left: 18, width: 174, top: 4, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTitle ?? t('landing.view.roomhoppernetwork.title')}
                        textStyle="text-style-il-heading-3"
                    />
                </Region>
                <ThemeImage
                    name="hdr_line"
                    src={srcHdrLine ?? layoutImage('illumina_light_border_top_center.png')}
                    layout={{ position: 'absolute', left: 167, width: 100, top: 10, height: 4 }}
                />
                <Region layout={{ position: 'absolute', left: 0, width: 250, top: 20, height: 198, flexDirection: 'column' }}>
                    <Region
                        name="header"
                        layout={{ width: 341, height: 24, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionHeader ?? t('landing.view.roomhoppernetwork.caption')}
                            textStyle="text-style-il-heading-1"
                        />
                    </Region>
                    <Region
                        name="spacing"
                        layout={{ width: 30, height: 6, flexShrink: 0 }}
                    >
                        {spacing}
                    </Region>
                    <Region
                        backgroundColor="#000000"
                        layout={{ width: 250, height: 120, flexShrink: 0 }}
                    >
                        <ThemeImage
                            name="bitmap"
                            src={srcBitmap ?? '${image.library.url}reception/catalog_teaser_set_mnstr_gothic.png'}
                            layout={{ position: 'absolute', left: 126, width: 120, top: 0, height: 120 }}
                        />
                        <Region
                            name="info"
                            layout={{ position: 'absolute', left: 0, width: 124, top: 0, height: 120, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionInfo ?? t('landing.view.roomhoppernetwork.info')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 124 }}
                            />
                        </Region>
                    </Region>
                    <Button
                        variant="100"
                        name="button"
                        onPointerTap={onButton}
                        layout={{ width: 271, height: 48, flexShrink: 0, minHeight: 48, maxHeight: 48 }}
                    >
                        {t('landing.view.roomhoppernetwork.gotoroom')}
                    </Button>
                </Region>
            </Region>
        </Region>
    );
};
