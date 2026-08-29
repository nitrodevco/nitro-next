import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, ContainerButton, Region, ThemeText } from '#base/theme';

/** Generated from `1097_own_avatar_decorating_xml` (layout "context_menu_widget", 115x49) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface OwnAvatarDecoratingLayoutProps {
    border?: OwnAvatarDecoratingLayoutBorderProps;
    layout?: BoxLayout;
}

export const OwnAvatarDecoratingLayout = ({ border, layout }: OwnAvatarDecoratingLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 49, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, bottom: -376, height: 49 }}
            >
                <OwnAvatarDecoratingLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};

/** Row template `decorate` of OwnAvatarDecoratingLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarDecoratingLayoutDecorateItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnAvatarDecoratingLayoutDecorateItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnAvatarDecoratingLayoutDecorateItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="decorate"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 101, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ContainerButton
                    variant="3"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="label"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('widget.avatar.stop_decorating')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Named region `buttons` of OwnAvatarDecoratingLayout - configured through the parent's `buttons` prop. */
export interface OwnAvatarDecoratingLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const OwnAvatarDecoratingLayoutButtons = ({ itemsButtons, layout }: OwnAvatarDecoratingLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            layout={{ position: 'absolute', minWidth: 103, top: 7, minHeight: 26, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsButtons ?? (
                <OwnAvatarDecoratingLayoutDecorateItem />
            )}
        </Region>
    );
};

/** Named region `border` of OwnAvatarDecoratingLayout - configured through the parent's `border` prop. */
export interface OwnAvatarDecoratingLayoutBorderProps {
    buttons?: OwnAvatarDecoratingLayoutButtonsProps;
    layout?: BoxLayout;
}

export const OwnAvatarDecoratingLayoutBorder = ({ buttons, layout }: OwnAvatarDecoratingLayoutBorderProps) => {
    return (
        <Region
            name="border"
            layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 76, justifyContent: 'center', ...layout }}
        >
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 2, right: 2, top: 7, height: 1 }}
            />
            <OwnAvatarDecoratingLayoutButtons {...buttons} />
        </Region>
    );
};
