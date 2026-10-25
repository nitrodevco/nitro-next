/**
 * The Habbo Club benefits - Flash's `VipBenefitsWindow` (`HabboCatalogUtils.showVipBenefits` while
 * `catalog.vip.benefits.enabled`), the centred `vip_benefits` window. Only the header's close button
 * does anything.
 */
import { useCatalogClubActions } from '#base/context/catalog';
import { TemplateWindow } from '#base/theme';

import { catalogTemplateId } from '../page/catalogTemplates';

export const CatalogVipBenefitsView = () => {
    const { setVipBenefitsVisible } = useCatalogClubActions();

    return (
        <TemplateWindow
            id={catalogTemplateId('vip_benefits')}
            frame={{ id: 'vip-benefits', centered: true, rememberPosition: false, onClose: () => setVipBenefitsVisible(false) }}
        />
    );
};
