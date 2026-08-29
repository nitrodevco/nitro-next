import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region } from '#base/theme';

import { WiredMenuViewLayoutChestControlsContainer, WiredMenuViewLayoutChestControlsContainerProps } from './WiredMenuViewLayoutChestControlsContainer';

/** Named region `chests_container` of WiredMenuViewLayout - configured through the parent's `chestsContainer` prop. */
export interface WiredMenuViewLayoutChestsContainerProps {
    captionTitle?: string;
    captionTitleExtra?: string;
    chestControlsContainer?: WiredMenuViewLayoutChestControlsContainerProps;
    layout?: BoxLayout;
    logsTableContainer?: ReactNode;
    onViewInDetailButton?: () => void;
    visibleChestsContainer?: boolean;
}

export const WiredMenuViewLayoutChestsContainer = ({ captionTitle, captionTitleExtra, chestControlsContainer, layout, logsTableContainer, onViewInDetailButton, visibleChestsContainer }: WiredMenuViewLayoutChestsContainerProps) => {
    const t = useTranslation();

    return (
        (visibleChestsContainer ?? false) && (
            <Region
                name="chests_container"
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382, ...layout }}
            >
                <WiredMenuViewLayoutChestControlsContainer {...chestControlsContainer} />
                <Region
                    name="logs_container"
                    layout={{ position: 'absolute', left: 14, width: 472, top: 139, height: 228 }}
                >
                    <Region
                        name="title"
                        layout={{ position: 'absolute', left: 0, width: 136, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionTitle ?? t('wiredmenu.chests.room_logs')}
                    </Region>
                    <Region
                        name="title_extra"
                        layout={{ position: 'absolute', right: 3, width: 197, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionTitleExtra ?? t('wiredmenu.chests.room_logs.extra')}
                    </Region>
                    <Region
                        name="logs_table_container"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 20, bottom: 40 }}
                    >
                        {logsTableContainer}
                    </Region>
                    <Button
                        variant="3"
                        name="view_in_detail_button"
                        onPointerTap={onViewInDetailButton}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ position: 'absolute', left: 0, width: 114, top: 197, height: 30 }}
                    >
                        {t('wiredmenu.chests.room_logs.view_detail')}
                    </Button>
                </Region>
            </Region>
        )
    );
};
