import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { LockConfirmLayoutOtherLockedContainerItem } from './LockConfirmLayoutOtherLockedContainerItem';
import { LockConfirmLayoutSubtitleItem } from './LockConfirmLayoutSubtitleItem';

/** Named region `top_list` of LockConfirmLayout - configured through the parent's `topList` prop. */
export interface LockConfirmLayoutTopListProps {
    itemsTopList?: ReactNode;
    layout?: BoxLayout;
    onCancelButton?: () => void;
    onConfirmButton?: () => void;
}

export const LockConfirmLayoutTopList = ({ itemsTopList, layout, onCancelButton, onConfirmButton }: LockConfirmLayoutTopListProps) => {
    const t = useTranslation();

    return (
        <Region
            name="top_list"
            layout={{ position: 'absolute', left: 9, top: 1, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsTopList ?? (
                <>
                    <LockConfirmLayoutSubtitleItem />
                    <LockConfirmLayoutOtherLockedContainerItem />
                </>
            )}
            <ThemeImage
                src={layoutImage('illumina_horizontal_separator.png')}
                layout={{ width: 285, height: 2, flexShrink: 0 }}
            />
            <Region layout={{ width: 288, height: 46, flexShrink: 0 }}>
                <Button
                    variant="101"
                    name="cancel_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onCancelButton}
                    layout={{ position: 'absolute', left: 0, width: 140, top: -2, height: 48, maxWidth: 140 }}
                >
                    {t('friend.furniture.confirm.lock.button.cancel')}
                </Button>
                <Button
                    variant="101"
                    name="confirm_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onConfirmButton}
                    layout={{ position: 'absolute', right: 4, width: 140, top: -2, height: 48, maxWidth: 140 }}
                >
                    {t('friend.furniture.confirm.lock.button.confirm')}
                </Button>
            </Region>
        </Region>
    );
};
