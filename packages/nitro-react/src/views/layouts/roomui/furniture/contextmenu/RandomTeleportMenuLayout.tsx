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
    tags?: string[];
}

export const RandomTeleportMenuLayoutUseItem = ({ captionLabel, layout, onButton, tags }: RandomTeleportMenuLayoutUseItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="use"
            tags={tags}
            layout={{ width: 101, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionLabel ?? t('widget.random_teleport.button.use')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Named region `buttons` of RandomTeleportMenuLayout - configured through the parent's `buttons` prop. */
export interface RandomTeleportMenuLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const RandomTeleportMenuLayoutButtons = ({ itemsButtons, layout, tags }: RandomTeleportMenuLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            tags={tags}
            layout={{ position: 'absolute', minWidth: 103, top: 28, minHeight: 26, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsButtons ?? (
                <RandomTeleportMenuLayoutUseItem tags={[ 'action' ]} />
            )}
        </Region>
    );
};

/** Named region `minimize` of RandomTeleportMenuLayout - configured through the parent's `minimize` prop. */
export interface RandomTeleportMenuLayoutMinimizeProps {
    layout?: BoxLayout;
    onMinimize?: () => void;
    tags?: string[];
}

export const RandomTeleportMenuLayoutMinimize = ({ layout, onMinimize, tags }: RandomTeleportMenuLayoutMinimizeProps) => {
    return (
        <Region
            name="minimize"
            tags={tags}
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
    tags?: string[];
}

export const RandomTeleportMenuLayoutBorder = ({ buttons, captionFurniName, layout, minimize, tags }: RandomTeleportMenuLayoutBorderProps) => {
    return (
        <Region
            name="border"
            tags={tags}
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
