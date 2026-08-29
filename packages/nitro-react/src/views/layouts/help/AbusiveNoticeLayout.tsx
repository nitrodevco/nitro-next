import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2913_abusive_notice_xml` (layout "abusive_notice", 309x153) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AbusiveNoticeLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onCloseButton?: () => void;
}

export const AbusiveNoticeLayout = ({ layout, onClose, onCloseButton }: AbusiveNoticeLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="abusive_notice"
            name="abusive_notice"
            caption={t('help.emergency.abusive.title')}
            onClose={onClose}
            layout={{ width: 309, height: 153, minWidth: 309, minHeight: 153, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 8, top: 2, flexDirection: 'column', gap: 3 }}>
                <Region layout={{ width: 216, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('help.emergency.abusive.subtitle')}
                        textStyle="text-style-il-heading-1"
                        textOptions={{ fill: '#c30000' }}
                    />
                </Region>
                <Region layout={{ width: 291, height: 24, flexShrink: 0, minWidth: 291, maxWidth: 291, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('help.emergency.abusive.description')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 291 }}
                    />
                </Region>
                <ThemeImage
                    src={layoutImage('illumina_horizontal_separator.png')}
                    layout={{ width: 291, height: 13, flexShrink: 0 }}
                />
                <Button
                    variant="101"
                    name="close_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onCloseButton}
                    layout={{ width: 196, height: 48, flexShrink: 0 }}
                >
                    {t('help.emergency.abusive.close')}
                </Button>
            </Region>
        </Frame>
    );
};
