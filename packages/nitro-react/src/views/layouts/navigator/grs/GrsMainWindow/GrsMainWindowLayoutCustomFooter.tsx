import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `custom_footer` of GrsMainWindowLayout - configured through the parent's `customFooter` prop. */
export interface GrsMainWindowLayoutCustomFooterProps {
    adCont?: ReactNode;
    captionAdCaption?: string;
    captionGetEventCaption?: string;
    captionMoreRoomsCaption?: string;
    layout?: BoxLayout;
    onAdCont?: () => void;
    onAdFooter?: () => void;
    onCreateRoomBut?: () => void;
    onCustomFooter?: () => void;
    onGetEventBut?: () => void;
    onMeFooter?: () => void;
    onRoomAdsFooter?: () => void;
    srcCreateRoom?: string;
    tintCreateRoom?: string;
}

export const GrsMainWindowLayoutCustomFooter = ({ adCont, captionAdCaption, captionGetEventCaption, captionMoreRoomsCaption, layout, onAdCont, onAdFooter, onCreateRoomBut, onCustomFooter, onGetEventBut, onMeFooter, onRoomAdsFooter, srcCreateRoom, tintCreateRoom }: GrsMainWindowLayoutCustomFooterProps) => {
    const t = useTranslation();

    return (
        <Region
            name="custom_footer"
            onPointerTap={onCustomFooter}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 307, bottom: 668, height: 0, ...layout }}
        >
            <Region
                name="me_footer"
                onPointerTap={onMeFooter}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 37 }}
            >
                <Border
                    variant="0"
                    name="more_rooms_container"
                    tintColor="#cccccc"
                    layout={{ position: 'absolute', left: 0, width: 294, top: 8, height: 29 }}
                >
                    <ThemeImage
                        name="create_room"
                        src={srcCreateRoom}
                        tint={tintCreateRoom}
                        layout={{ position: 'absolute', left: 4, width: 23, top: 3, height: 23 }}
                    />
                    <Region
                        name="more_rooms_caption"
                        layout={{ position: 'absolute', left: 32, width: 146, top: 8, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionMoreRoomsCaption ?? t('navigator.moreroomscaption')}
                    </Region>
                    <Button
                        variant="0"
                        name="create_room_but"
                        onPointerTap={onCreateRoomBut}
                        layout={{ position: 'absolute', left: 187, width: 102, top: 4, height: 21, minWidth: 102, maxWidth: 102 }}
                    >
                        {t('navigator.createroom')}
                    </Button>
                </Border>
            </Region>
            <Region
                name="ad_footer"
                onPointerTap={onAdFooter}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 85 }}
            >
                <Region
                    name="ad_caption"
                    layout={{ position: 'absolute', left: 6, width: 121, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionAdCaption ?? t('navigator.adcaption')}
                </Region>
                <Region
                    name="ad_cont"
                    backgroundColor="#ffffff"
                    onPointerTap={onAdCont}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 271, top: 16, height: 68 }}
                >
                    {adCont}
                </Region>
            </Region>
            <Region
                name="room_ads_footer"
                onPointerTap={onRoomAdsFooter}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 37 }}
            >
                <Border
                    variant="0"
                    name="link_to_navigator_container"
                    tintColor="#cccccc"
                    layout={{ position: 'absolute', left: 0, width: 294, top: 8, height: 29 }}
                >
                    <Region
                        name="get_event_caption"
                        layout={{ position: 'absolute', left: 5, width: 150, top: 8, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionGetEventCaption ?? t('roomad.get.event.caption')}
                            textStyle="text-style-il-regular"
                        />
                    </Region>
                    <Button
                        variant="0"
                        name="get_event_but"
                        onPointerTap={onGetEventBut}
                        layout={{ position: 'absolute', left: 187, width: 102, top: 4, height: 21, minWidth: 102, maxWidth: 102 }}
                    >
                        {t('roomad.get.event')}
                    </Button>
                </Border>
            </Region>
        </Region>
    );
};
