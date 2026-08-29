import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { UseProductMenuLayoutFertilizeMonsterplantItem } from './UseProductMenuLayoutFertilizeMonsterplantItem';
import { UseProductMenuLayoutRebreedMonsterplantItem } from './UseProductMenuLayoutRebreedMonsterplantItem';
import { UseProductMenuLayoutReplaceProductSaddleItem } from './UseProductMenuLayoutReplaceProductSaddleItem';
import { UseProductMenuLayoutReviveMonsterplantItem } from './UseProductMenuLayoutReviveMonsterplantItem';
import { UseProductMenuLayoutUseProductCustomPartItem } from './UseProductMenuLayoutUseProductCustomPartItem';
import { UseProductMenuLayoutUseProductCustomPartShampooItem } from './UseProductMenuLayoutUseProductCustomPartShampooItem';
import { UseProductMenuLayoutUseProductItem } from './UseProductMenuLayoutUseProductItem';
import { UseProductMenuLayoutUseProductSaddleItem } from './UseProductMenuLayoutUseProductSaddleItem';
import { UseProductMenuLayoutUseProductShampooItem } from './UseProductMenuLayoutUseProductShampooItem';

/** Named region `buttons` of UseProductMenuLayout - configured through the parent's `buttons` prop. */
export interface UseProductMenuLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const UseProductMenuLayoutButtons = ({ itemsButtons, layout }: UseProductMenuLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, minWidth: 104, top: 28, minHeight: 242, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <UseProductMenuLayoutUseProductItem />
                    <UseProductMenuLayoutUseProductShampooItem />
                    <UseProductMenuLayoutUseProductCustomPartItem />
                    <UseProductMenuLayoutUseProductCustomPartShampooItem />
                    <UseProductMenuLayoutUseProductSaddleItem />
                    <UseProductMenuLayoutReplaceProductSaddleItem />
                    <UseProductMenuLayoutReviveMonsterplantItem />
                    <UseProductMenuLayoutRebreedMonsterplantItem />
                    <UseProductMenuLayoutFertilizeMonsterplantItem />
                </>
            )}
        </Region>
    );
};
