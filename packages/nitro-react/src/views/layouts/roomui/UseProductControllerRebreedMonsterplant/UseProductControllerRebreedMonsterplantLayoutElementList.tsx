import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Region } from '#base/theme';

import { UseProductControllerRebreedMonsterplantLayoutPreviewListItem } from './UseProductControllerRebreedMonsterplantLayoutPreviewListItem';
import { UseProductControllerRebreedMonsterplantLayoutSeparatorItem } from './UseProductControllerRebreedMonsterplantLayoutSeparatorItem';
import { UseProductControllerRebreedMonsterplantLayoutSeparatorItem2 } from './UseProductControllerRebreedMonsterplantLayoutSeparatorItem2';
import { UseProductControllerRebreedMonsterplantLayoutSeparatorItem3 } from './UseProductControllerRebreedMonsterplantLayoutSeparatorItem3';

/** Named region `element_list` of UseProductControllerRebreedMonsterplantLayout - configured through the parent's `elementList` prop. */
export interface UseProductControllerRebreedMonsterplantLayoutElementListProps {
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
    onCancelText?: () => void;
    onSaveButton?: () => void;
}

export const UseProductControllerRebreedMonsterplantLayoutElementList = ({ itemsElementList, layout, onCancelText, onSaveButton }: UseProductControllerRebreedMonsterplantLayoutElementListProps) => {
    const t = useTranslation();

    return (
        <Region
            name="element_list"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, maxWidth: 290, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsElementList ?? (
                <>
                    <UseProductControllerRebreedMonsterplantLayoutSeparatorItem />
                    <UseProductControllerRebreedMonsterplantLayoutPreviewListItem />
                    <UseProductControllerRebreedMonsterplantLayoutSeparatorItem2 />
                    <UseProductControllerRebreedMonsterplantLayoutSeparatorItem3 />
                </>
            )}
            <Region layout={{ width: 270, height: 30, flexShrink: 0, minHeight: 30, flexDirection: 'row', gap: 10 }}>
                <Button
                    variant="3"
                    name="cancel_text"
                    onPointerTap={onCancelText}
                    layout={{ width: 130, alignSelf: 'stretch', flexShrink: 0, minWidth: 130, maxWidth: 130 }}
                >
                    {t('useproduct.widget.cancel')}
                </Button>
                <ButtonThick
                    variant="5"
                    name="save_button"
                    tintColor="#00aa00"
                    onPointerTap={onSaveButton}
                    layout={{ width: 130, alignSelf: 'stretch', flexShrink: 0, minWidth: 130, maxWidth: 130 }}
                >
                    {t('useproduct.widget.rebreed')}
                </ButtonThick>
            </Region>
        </Region>
    );
};
