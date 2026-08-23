import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from 'react';

import { useTranslation } from '#base/context';

import { ToolbarMenu } from './ToolbarMenu';

/** Pixi port of theme/ToolbarMeMenu.tsx. */
export const ToolbarMeMenuPixi: ForwardRefExoticComponent<RefAttributes<PixiContainer>> = forwardRef<PixiContainer>((_, ref) => {
    const t = useTranslation();

    return (
        <ToolbarMenu
            ref={ref}
            items={[
                { icon: 'icon-me-profile', label: t('widget.memenu.profile') },
                { icon: 'icon-me-rooms', label: t('widget.memenu.myrooms') },
                { icon: 'icon-me-clothing', label: t('widget.memenu.myclothes') },
                { icon: 'icon-me-forums', label: t('widget.memenu.forums') },
                { icon: 'icon-me-collectibles', label: t('memenu.collectibles') },
            ]}
        />
    );
});

ToolbarMeMenuPixi.displayName = 'ToolbarMeMenuPixi';
