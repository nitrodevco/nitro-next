import { useTranslation } from '#base/context';
import { BoxLayout, Frame, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1676_vip_benefits_xml` (layout "vip_benefits", 457x450) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VipBenefitsLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
}

export const VipBenefitsLayout = ({ layout, onClose }: VipBenefitsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('vip.benefits.caption')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 457, height: 450, minWidth: 457, minHeight: 450, ...layout }}
        >
            <ThemeImage
                src="${image.library.url}directVipBuy/hc_benefits_header.png"
                layout={{ position: 'absolute', left: 1, width: 455, top: 0, height: 42 }}
            />
            <ThemeImage
                src="${image.library.url}directVipBuy/hc_benefits_teaser.png"
                layout={{ position: 'absolute', left: 24, width: 237, top: 91, height: 253 }}
            />
            <ThemeText
                text={t('vip.benefits.title')}
                textStyle="text-style-u-bold"
                textOptions={{ align: 'center' }}
                layout={{ position: 'absolute', left: 0, right: -12, top: 55, height: 30 }}
            />
            <ThemeText
                text={t('vip.benefits.description')}
                textStyle="text-style-u-regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 163 }}
                verticalAlign="top"
                layout={{ position: 'absolute', right: 7, width: 163, top: 98, height: 269, minWidth: 163, maxWidth: 163, minHeight: 269, maxHeight: 269 }}
            />
            <ThemeText
                text={t('vip.benefits.details')}
                textStyle="text-style-u-regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 403 }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 27, width: 403, bottom: 8, height: 50, minWidth: 403, maxWidth: 403 }}
            />
        </Frame>
    );
};
