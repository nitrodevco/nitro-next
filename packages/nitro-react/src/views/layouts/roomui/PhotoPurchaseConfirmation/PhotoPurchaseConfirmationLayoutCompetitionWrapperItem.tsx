import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region } from '#base/theme';

import { PhotoPurchaseConfirmationLayoutCompetitionInfoItem } from './PhotoPurchaseConfirmationLayoutCompetitionInfoItem';
import { PhotoPurchaseConfirmationLayoutCompetitionNameItem } from './PhotoPurchaseConfirmationLayoutCompetitionNameItem';

/** Row template `competition_wrapper` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutCompetitionWrapperItemProps {
    itemsPropertiesItemlist?: ReactNode;
    layout?: BoxLayout;
    onCompetitionButton?: () => void;
    visibleCompetitionButton?: boolean;
    visiblePropertiesItemlist?: boolean;
}

export const PhotoPurchaseConfirmationLayoutCompetitionWrapperItem = ({ itemsPropertiesItemlist, layout, onCompetitionButton, visibleCompetitionButton, visiblePropertiesItemlist }: PhotoPurchaseConfirmationLayoutCompetitionWrapperItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="2"
            name="competition_wrapper"
            tintColor="#4d1725"
            layout={{ width: 316, height: 62, flexShrink: 0, minWidth: 316, maxWidth: 316, minHeight: 55, ...layout }}
        >
            {(visiblePropertiesItemlist ?? true) && (
                <Region
                    name="properties_itemlist"
                    layout={{ position: 'absolute', left: 6, width: 309, top: 4, height: 58, flexDirection: 'column', gap: 2 }}
                >
                    {itemsPropertiesItemlist ?? (
                        <>
                            <PhotoPurchaseConfirmationLayoutCompetitionNameItem />
                            <PhotoPurchaseConfirmationLayoutCompetitionInfoItem />
                        </>
                    )}
                </Region>
            )}
            {(visibleCompetitionButton ?? true) && (
                <Button
                    variant="5"
                    name="competition_button"
                    tintColor="#00aa00"
                    onPointerTap={onCompetitionButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', right: 7, width: 110, bottom: 7, height: 27, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27 }}
                >
                    {t('generic.submit')}
                </Button>
            )}
        </Border>
    );
};
