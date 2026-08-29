import { BoxLayout, Region } from '#base/theme';

import { UseProductControllerFertilizeMonsterplantLayoutElementList, UseProductControllerFertilizeMonsterplantLayoutElementListProps } from './UseProductControllerFertilizeMonsterplantLayoutElementList';

/** Generated from `831_use_product_controller_fertilize_monsterplant_xml` (layout "use_product_fertilize_monsterplant", 290x257) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductControllerFertilizeMonsterplantLayoutProps {
    elementList?: UseProductControllerFertilizeMonsterplantLayoutElementListProps;
    layout?: BoxLayout;
}

export const UseProductControllerFertilizeMonsterplantLayout = ({ elementList, layout }: UseProductControllerFertilizeMonsterplantLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 290, height: 257, ...layout }}>
            <UseProductControllerFertilizeMonsterplantLayoutElementList {...elementList} />
        </Region>
    );
};
