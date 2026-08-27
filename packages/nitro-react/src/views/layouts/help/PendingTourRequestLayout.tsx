import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2917_pending_tour_request_xml` (layout "pending_tour_request", 369x137) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PendingTourRequestLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onCloseButton?: () => void;
}

export const PendingTourRequestLayout = ({ layout, onClose, onCloseButton }: PendingTourRequestLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="pending_request"
            name="pending_request"
            params={32769}
            caption={t('guide.pending.tour.title')}
            onClose={onClose}
            layout={{ width: 369, height: 137, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={8536080}
                    layout={{ position: 'absolute', left: 8, top: 2, flexDirection: 'column', gap: 3 }}
                >
                    <Region
                        params={16}
                        layout={{ width: 185, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('guide.pending.tour.subtitle')}
                            textStyle="text-style-il-heading-1"
                            textOptions={{ fill: '#c30000' }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ width: 295, height: 24, flexShrink: 0, minWidth: 295, maxWidth: 295, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('guide.pending.tour.description')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 295 }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ width: 370, height: 52, flexShrink: 0 }}
                    >
                        <Button
                            variant="101"
                            name="close_button"
                            params={131281}
                            tintColor="#bbbbbb"
                            onPointerTap={onCloseButton}
                            layout={{ position: 'absolute', left: '50%', marginLeft: -70, width: 140, top: 0, height: 48 }}
                        >
                            {t('alert.close.button')}
                        </Button>
                        <ThemeImage
                            params={1040}
                            src={layoutImage('help_illustrations_tour.png')}
                            layout={{ position: 'absolute', left: 222, width: 147, bottom: -4, height: 109 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
