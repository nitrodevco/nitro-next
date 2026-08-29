import { BoxLayout, Region } from '#base/theme';

import { UseProductControllerRebreedMonsterplantLayoutElementList, UseProductControllerRebreedMonsterplantLayoutElementListProps } from './UseProductControllerRebreedMonsterplantLayoutElementList';

/** Generated from `1063_use_product_controller_rebreed_monsterplant_xml` (layout "use_product_rebreed_monsterplant", 290x257) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductControllerRebreedMonsterplantLayoutProps {
    elementList?: UseProductControllerRebreedMonsterplantLayoutElementListProps;
    layout?: BoxLayout;
}

export const UseProductControllerRebreedMonsterplantLayout = ({ elementList, layout }: UseProductControllerRebreedMonsterplantLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 290, height: 257, ...layout }}>
            <UseProductControllerRebreedMonsterplantLayoutElementList {...elementList} />
        </Region>
    );
};
