/**
 * The Habbo Club benefits - Flash's `VipBenefitsWindow` (`HabboCatalogUtils.showVipBenefits` while
 * `catalog.vip.benefits.enabled`), drawn from `vip_benefits.xml` (457x450, style 3 frame in
 * `0x418db0`, margins 0/33/0/0, centred): the image library's `directVipBuy/hc_benefits_header.png`
 * and `hc_benefits_teaser.png`, the title in bold 24 centred across the window, the description
 * beside the teaser and the details under it, both html with 3px leading. Only the header's close
 * button does anything.
 */
import { useCatalogClubActions } from '#base/context/catalog';
import { useConfigValue, useTranslation } from '#base/context/system';
import { Frame, ThemeImage, ThemeText } from '#base/theme';

export const CatalogVipBenefitsView = () => {
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const { setVipBenefitsVisible } = useCatalogClubActions();
    const t = useTranslation();

    return (
        <Frame
            id="vip-benefits"
            variant="3"
            centered
            rememberPosition={false}
            caption={t('vip.benefits.caption')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection="none"
            margins={[ 0, 33, 0, 0 ]}
            onClose={() => setVipBenefitsVisible(false)}
            layout={{ position: 'absolute', width: 457, height: 450 }}
        >
            <ThemeImage
                src={`${imageLibraryUrl}directVipBuy/hc_benefits_header.png`}
                bitmap={{}}
                layout={{ position: 'absolute', left: 1, width: 455, top: 0, height: 42 }}
            />
            <ThemeImage
                src={`${imageLibraryUrl}directVipBuy/hc_benefits_teaser.png`}
                bitmap={{}}
                layout={{ position: 'absolute', left: 24, width: 237, top: 91, height: 253 }}
            />
            <ThemeText
                text={t('vip.benefits.title')}
                textStyle="u_bold"
                textOptions={{ fontSize: 24, align: 'center' }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 0, width: 457, top: 55 }}
            />
            <ThemeText
                text={t('vip.benefits.description')}
                textStyle="u_regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 159 }}
                flashFormat={{ leading: 3 }}
                markup
                clip
                verticalAlign="top"
                layout={{ position: 'absolute', left: 275, width: 163, top: 98, height: 269 }}
            />
            <ThemeText
                text={t('vip.benefits.details')}
                textStyle="u_regular"
                textOptions={{ fontSize: 10, wordWrap: true, wordWrapWidth: 399 }}
                flashFormat={{ leading: 3 }}
                markup
                clip
                verticalAlign="top"
                layout={{ position: 'absolute', left: 27, width: 403, top: 351, height: 50 }}
            />
        </Frame>
    );
};
