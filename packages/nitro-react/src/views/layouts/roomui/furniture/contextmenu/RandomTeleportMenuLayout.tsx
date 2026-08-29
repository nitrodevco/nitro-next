import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `987_random_teleport_menu_xml` (layout "context_menu_widget", 115x86) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RandomTeleportMenuLayoutProps {
    border?: RandomTeleportMenuLayoutBorderProps;
    layout?: BoxLayout;
}

export const RandomTeleportMenuLayout = ({ border, layout }: RandomTeleportMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 86, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, bottom: -27, height: 86 }}
            >
                <RandomTeleportMenuLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};

/** Row template `use` of RandomTeleportMenuLayout - pass real rows through its `items…` slot. */
export interface RandomTeleportMenuLayoutUseItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const RandomTeleportMenuLayoutUseItem = ({ captionLabel, layout, onButton, visibleGroups }: RandomTeleportMenuLayoutUseItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="use"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 101, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                visible={visibleGroups?.action ?? true}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <ThemeText
                    text={captionLabel ?? t('widget.random_teleport.button.use')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Named region `buttons` of RandomTeleportMenuLayout - configured through the parent's `buttons` prop. */
export interface RandomTeleportMenuLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const RandomTeleportMenuLayoutButtons = ({ itemsButtons, layout }: RandomTeleportMenuLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            layout={{ position: 'absolute', minWidth: 103, top: 28, minHeight: 26, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsButtons ?? (
                <RandomTeleportMenuLayoutUseItem />
            )}
        </Region>
    );
};

/** Named region `minimize` of RandomTeleportMenuLayout - configured through the parent's `minimize` prop. */
export interface RandomTeleportMenuLayoutMinimizeProps {
    layout?: BoxLayout;
    onMinimize?: () => void;
}

export const RandomTeleportMenuLayoutMinimize = ({ layout, onMinimize }: RandomTeleportMenuLayoutMinimizeProps) => {
    return (
        <Region
            name="minimize"
            onPointerTap={onMinimize}
            cursor="pointer"
            layout={{ position: 'absolute', left: 4, width: 100, bottom: 3, height: 18, ...layout }}
        >
            <Icon
                variant="7"
                name="icon"
                layout={{ position: 'absolute', left: 45, width: 13, top: 7, height: 10 }}
            />
        </Region>
    );
};

/** Named region `border` of RandomTeleportMenuLayout - configured through the parent's `border` prop. */
export interface RandomTeleportMenuLayoutBorderProps {
    buttons?: RandomTeleportMenuLayoutButtonsProps;
    captionFurniName?: string;
    layout?: BoxLayout;
    minimize?: RandomTeleportMenuLayoutMinimizeProps;
}

export const RandomTeleportMenuLayoutBorder = ({ buttons, captionFurniName, layout, minimize }: RandomTeleportMenuLayoutBorderProps) => {
    return (
        <Region
            name="border"
            layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 76, justifyContent: 'center', ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 107, top: 7, height: 16, justifyContent: 'center' }}>
                <Region
                    name="furni_name"
                    layout={{ position: 'absolute', width: 61, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionFurniName ?? 'furni_name'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 2, right: 2, top: 27, height: 1 }}
            />
            <RandomTeleportMenuLayoutButtons {...buttons} />
            <RandomTeleportMenuLayoutMinimize {...minimize} />
        </Region>
    );
};
