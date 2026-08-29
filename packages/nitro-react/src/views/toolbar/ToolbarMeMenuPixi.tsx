import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { useSystemActions } from '#base/context';
import { Border } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';
import { MemenuMainSimpleLayout } from '#base/views/layouts/roomui/memenu/MemenuMainSimpleLayout';

export interface ToolbarMeMenuPixiProps {
    /** Fired after any tile is chosen - the Flash menu hid itself (`hide()`) on every click. */
    onSelect?: () => void;
}

/**
 * The me menu, driven by the `memenu_main_simple` layout port (the `simple.memenu.enabled`
 * variant com/sulake/habbo/ui/widget/memenu/MeMenuMainView.as builds). Tile icons come from
 * that class's `_icons` table (`<name>_white` at rest, `<name>_color` on hover - only the rest
 * state is shown here), and the click handlers follow its `onButtonClicked` switch: `rooms`
 * opened the user's own rooms (the navigator here), the rest reach features this client doesn't
 * have windows for yet (profile, minimail, settings, achievements, talent track, guide tool)
 * and only close the menu.
 */
export const ToolbarMeMenuPixi: ForwardRefExoticComponent<ToolbarMeMenuPixiProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ToolbarMeMenuPixiProps>(({ onSelect }, ref) => {
    const { showWindow } = useSystemActions();
    const icon = (name: string) => layoutImage(`${name}_white.png`);

    const choose = (action?: () => void) => () => {
        action?.();
        onSelect?.();
    };

    return (
        <Border
            ref={ref}
            variant="3"
            tintColor="#2e2d2c"
            layout={{ position: 'absolute', left: 4, bottom: 58, padding: 6 }}
        >
            <MemenuMainSimpleLayout buttons={{
                profile: { srcProfileIcon: icon('profile'), onProfile: choose() },
                minimail: { srcMinimailIcon: icon('minimail'), onMinimail: choose() },
                rooms: { srcRoomsIcon: icon('gohome'), onRooms: choose(() => showWindow('navigator')) },
                settings: { srcSettingsIcon: icon('settings'), onSettings: choose() },
                achievements: { srcAchievementsIcon: icon('achievements'), onAchievements: choose() },
                talents: { srcTalentsIcon: icon('compass'), onTalents: choose() },
                guide: { srcGuideIcon: icon('lighthouse'), onGuide: choose() },
            }}
            />
        </Border>
    );
});

ToolbarMeMenuPixi.displayName = 'ToolbarMeMenuPixi';
