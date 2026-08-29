import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Region } from '#base/theme';

import { UseProductControllerFertilizeMonsterplantLayoutPreviewListItem } from './UseProductControllerFertilizeMonsterplantLayoutPreviewListItem';
import { UseProductControllerFertilizeMonsterplantLayoutSeparatorItem } from './UseProductControllerFertilizeMonsterplantLayoutSeparatorItem';
import { UseProductControllerFertilizeMonsterplantLayoutSeparatorItem2 } from './UseProductControllerFertilizeMonsterplantLayoutSeparatorItem2';
import { UseProductControllerFertilizeMonsterplantLayoutSeparatorItem3 } from './UseProductControllerFertilizeMonsterplantLayoutSeparatorItem3';

/** Named region `element_list` of UseProductControllerFertilizeMonsterplantLayout - configured through the parent's `elementList` prop. */
export interface UseProductControllerFertilizeMonsterplantLayoutElementListProps {
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
    onCancelText?: () => void;
    onSaveButton?: () => void;
}

export const UseProductControllerFertilizeMonsterplantLayoutElementList = ({ itemsElementList, layout, onCancelText, onSaveButton }: UseProductControllerFertilizeMonsterplantLayoutElementListProps) => {
    const t = useTranslation();

    return (
        <Region
            name="element_list"
            layout={{ position: 'absolute', left: 0, top: 0, maxWidth: 290, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsElementList ?? (
                <>
                    <UseProductControllerFertilizeMonsterplantLayoutSeparatorItem />
                    <UseProductControllerFertilizeMonsterplantLayoutPreviewListItem />
                    <UseProductControllerFertilizeMonsterplantLayoutSeparatorItem2 />
                    <UseProductControllerFertilizeMonsterplantLayoutSeparatorItem3 />
                </>
            )}
            <Region layout={{ width: 270, height: 30, flexShrink: 0, minHeight: 30, flexDirection: 'row', gap: 10 }}>
                <Button
                    variant="3"
                    name="cancel_text"
                    onPointerTap={onCancelText}
                    layout={{ width: 130, height: 30, flexShrink: 0, minWidth: 130, maxWidth: 130 }}
                >
                    {t('useproduct.widget.cancel')}
                </Button>
                <ButtonThick
                    variant="5"
                    name="save_button"
                    tintColor="#00aa00"
                    onPointerTap={onSaveButton}
                    layout={{ width: 130, height: 30, flexShrink: 0, minWidth: 130, maxWidth: 130 }}
                >
                    {t('useproduct.widget.fertilize')}
                </ButtonThick>
            </Region>
        </Region>
    );
};
