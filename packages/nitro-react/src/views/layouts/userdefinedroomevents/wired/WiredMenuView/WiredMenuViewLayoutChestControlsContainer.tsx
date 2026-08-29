import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region } from '#base/theme';

/** Named region `chest_controls_container` of WiredMenuViewLayout - configured through the parent's `chestControlsContainer` prop. */
export interface WiredMenuViewLayoutChestControlsContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onLockAllButton?: () => void;
    onLockOwnButton?: () => void;
    onUnlockOwnButton?: () => void;
}

export const WiredMenuViewLayoutChestControlsContainer = ({ captionTitle, layout, onLockAllButton, onLockOwnButton, onUnlockOwnButton }: WiredMenuViewLayoutChestControlsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="chest_controls_container"
            layout={{ position: 'absolute', left: 14, width: 472, top: 18, height: 110, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, width: 84, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionTitle ?? t('wiredmenu.chests.chest_control')}
            </Region>
            <Border
                variant="3"
                name="preferences_border"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 0, right: 0, top: 20, bottom: 0 }}
            >
                <Region layout={{ position: 'absolute', left: 10, width: 452, top: 10, height: 30, flexDirection: 'row', gap: 10 }}>
                    <Button
                        variant="3"
                        name="lock_own_button"
                        onPointerTap={onLockOwnButton}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ width: 221, height: 30, flexShrink: 0, minWidth: 221, maxWidth: 221 }}
                    >
                        {t('wiredmenu.chests.chest_control.lock_own')}
                    </Button>
                    <Button
                        variant="3"
                        name="unlock_own_button"
                        onPointerTap={onUnlockOwnButton}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ width: 221, height: 30, flexShrink: 0, minWidth: 221, maxWidth: 221 }}
                    >
                        {t('wiredmenu.chests.chest_control.unlock_own')}
                    </Button>
                </Region>
                <Region layout={{ position: 'absolute', left: 10, width: 221, top: 50, height: 30, flexDirection: 'row' }}>
                    <Button
                        variant="3"
                        name="lock_all_button"
                        onPointerTap={onLockAllButton}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ width: 221, height: 30, flexShrink: 0, minWidth: 221, maxWidth: 221 }}
                    >
                        {t('wiredmenu.chests.chest_control.lock_all')}
                    </Button>
                </Region>
            </Border>
        </Region>
    );
};
