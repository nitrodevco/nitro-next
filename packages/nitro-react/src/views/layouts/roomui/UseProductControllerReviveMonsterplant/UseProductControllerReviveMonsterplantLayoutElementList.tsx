import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Region } from '#base/theme';

import { UseProductControllerReviveMonsterplantLayoutPreviewListItem } from './UseProductControllerReviveMonsterplantLayoutPreviewListItem';
import { UseProductControllerReviveMonsterplantLayoutSeparatorItem } from './UseProductControllerReviveMonsterplantLayoutSeparatorItem';
import { UseProductControllerReviveMonsterplantLayoutSeparatorItem2 } from './UseProductControllerReviveMonsterplantLayoutSeparatorItem2';
import { UseProductControllerReviveMonsterplantLayoutSeparatorItem3 } from './UseProductControllerReviveMonsterplantLayoutSeparatorItem3';

/** Named region `element_list` of UseProductControllerReviveMonsterplantLayout - configured through the parent's `elementList` prop. */
export interface UseProductControllerReviveMonsterplantLayoutElementListProps {
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
    onCancelText?: () => void;
    onSaveButton?: () => void;
}

export const UseProductControllerReviveMonsterplantLayoutElementList = ({ itemsElementList, layout, onCancelText, onSaveButton }: UseProductControllerReviveMonsterplantLayoutElementListProps) => {
    const t = useTranslation();

    return (
        <Region
            name="element_list"
            layout={{ position: 'absolute', left: 0, top: 0, maxWidth: 290, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsElementList ?? (
                <>
                    <UseProductControllerReviveMonsterplantLayoutSeparatorItem />
                    <UseProductControllerReviveMonsterplantLayoutPreviewListItem />
                    <UseProductControllerReviveMonsterplantLayoutSeparatorItem2 />
                    <UseProductControllerReviveMonsterplantLayoutSeparatorItem3 />
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
                    {t('useproduct.widget.revive')}
                </ButtonThick>
            </Region>
        </Region>
    );
};
