import { BoxLayout, Region } from '#base/theme';

import { UseProductControllerReviveMonsterplantLayoutElementList, UseProductControllerReviveMonsterplantLayoutElementListProps } from './UseProductControllerReviveMonsterplantLayoutElementList';

/** Generated from `942_use_product_controller_revive_monsterplant_xml` (layout "use_product_revive_monsterplant", 290x257) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductControllerReviveMonsterplantLayoutProps {
    elementList?: UseProductControllerReviveMonsterplantLayoutElementListProps;
    layout?: BoxLayout;
}

export const UseProductControllerReviveMonsterplantLayout = ({ elementList, layout }: UseProductControllerReviveMonsterplantLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 290, height: 257, ...layout }}>
            <UseProductControllerReviveMonsterplantLayoutElementList {...elementList} />
        </Region>
    );
};
