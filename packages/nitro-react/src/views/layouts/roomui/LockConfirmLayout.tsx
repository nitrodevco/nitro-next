import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `855_lock_confirm_xml` (layout "lock_confirm", 309x198) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LockConfirmLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    topList?: LockConfirmLayoutTopListProps;
}

export const LockConfirmLayout = ({ layout, onClose, topList }: LockConfirmLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            caption={t('friend.furniture.confirm.lock.caption')}
            onClose={onClose}
            layout={{ width: 309, height: 198, ...layout }}
        >
            <LockConfirmLayoutTopList {...topList} />
        </Frame>
    );
};

/** Row template `subtitle` of LockConfirmLayout - pass real rows through its `items…` slot. */
export interface LockConfirmLayoutSubtitleItemProps {
    captionSubtitle?: string;
    layout?: BoxLayout;
}

export const LockConfirmLayoutSubtitleItem = ({ captionSubtitle, layout }: LockConfirmLayoutSubtitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="subtitle"
            layout={{ width: 249, height: 35, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionSubtitle ?? t('friend.furniture.confirm.lock.subtitle')}
                textStyle="text-style-il-heading-1"
                textOptions={{ wordWrap: true, wordWrapWidth: 249, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `other_locked_container` of LockConfirmLayout - pass real rows through its `items…` slot. */
export interface LockConfirmLayoutOtherLockedContainerItemProps {
    captionMessage?: string;
    layout?: BoxLayout;
    srcLock?: string;
}

export const LockConfirmLayoutOtherLockedContainerItem = ({ captionMessage, layout, srcLock }: LockConfirmLayoutOtherLockedContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="other_locked_container"
            layout={{ width: 290, height: 65, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="lock"
                src={srcLock ?? '${image.library.url}furniextras/unlocked_image.png'}
                layout={{ position: 'absolute', left: 122, width: 44, top: 4, height: 44 }}
            />
            <Region
                name="message"
                layout={{ position: 'absolute', left: 0, width: 291, bottom: -8, height: 24, minWidth: 291, maxWidth: 291, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionMessage ?? t('friend.furniture.confirm.lock.other.locked')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 291, align: 'center' }}
                />
            </Region>
        </Region>
    );
};

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
