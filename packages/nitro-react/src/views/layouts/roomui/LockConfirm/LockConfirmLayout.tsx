import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

import { LockConfirmLayoutTopList, LockConfirmLayoutTopListProps } from './LockConfirmLayoutTopList';

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
            layout={{ width: 309, height: 198, minWidth: 309, minHeight: 198, ...layout }}
        >
            <LockConfirmLayoutTopList {...topList} />
        </Frame>
    );
};
