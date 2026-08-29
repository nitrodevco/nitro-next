import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `3013_doorbell_xml` (layout "doorbell", 270x182) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Doorbell_3013LayoutProps {
    cancelRegion?: Doorbell_3013LayoutCancelRegionProps;
    captionInfo?: string;
    captionRoomName?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onRing?: () => void;
}

export const Doorbell_3013Layout = ({ cancelRegion, captionInfo, captionRoomName, layout, onClose, onRing }: Doorbell_3013LayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={32769}
            caption={t('navigator.doorbell.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 270, height: 182, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="room_name"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 64, top: 14, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionRoomName ?? 'Roomname'} />
                </Region>
                <Region
                    name="info"
                    params={2192}
                    layout={{ position: 'absolute', left: 10, right: 20, top: 35, bottom: 81, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfo ?? t('navigator.doorbell.info')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 240 }}
                    />
                </Region>
                <Region
                    params={16}
                    backgroundColor="#eaece8"
                    layout={{ position: 'absolute', left: 10, width: 240, top: 108, height: 36 }}
                >
                    <Doorbell_3013LayoutCancelRegion {...cancelRegion} />
                    <Button
                        variant="3"
                        name="ring"
                        params={393233}
                        onPointerTap={onRing}
                        layout={{ position: 'absolute', right: 5, width: 190, top: 4, height: 28 }}
                    >
                        {t('navigator.doorbell.button.ring')}
                    </Button>
                </Region>
            </Region>
        </Frame>
    );
};

/** Named region `cancel_region` of Doorbell_3013Layout - configured through the parent's `cancelRegion` prop. */
export interface Doorbell_3013LayoutCancelRegionProps {
    captionCancel?: string;
    layout?: BoxLayout;
    onCancelRegion?: () => void;
}

export const Doorbell_3013LayoutCancelRegion = ({ captionCancel, layout, onCancelRegion }: Doorbell_3013LayoutCancelRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="cancel_region"
            params={131221}
            onPointerTap={onCancelRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 154, top: 0, height: 36, ...layout }}
        >
            <Region
                name="cancel"
                params={4194322}
                layout={{ position: 'absolute', left: 3, top: 8, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionCancel ?? t('generic.cancel')} />
            </Region>
        </Region>
    );
};
