import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from 'react';

import { useTranslation } from '#base/context';

import { ToolbarMenu } from './ToolbarMenu';

/** Pixi port of theme/ToolbarProgressionMenu.tsx. */
export const ToolbarProgressionMenuPixi: ForwardRefExoticComponent<RefAttributes<PixiContainer>> = forwardRef<PixiContainer>((_, ref) => {
    const t = useTranslation();

    return (
        <ToolbarMenu
            ref={ref}
            items={[
                { icon: 'icon-progression-daily-tasks', label: t('widget.progmenu.dailytasks') },
                { icon: 'icon-progression-tasks', label: t('widget.progmenu.quests') },
                { icon: 'icon-progression-achievements', label: t('widget.progmenu.achievements') },
                { icon: 'icon-progression-leaderboard', label: t('widget.progmenu.leaderboards') },
                { icon: 'icon-progression-introduction', label: t('widget.progmenu.introduction') },
            ]}
        />
    );
});

ToolbarProgressionMenuPixi.displayName = 'ToolbarProgressionMenuPixi';
