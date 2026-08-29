import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `965_generic_usable_menu_xml` (layout "generic_usable_menu", 115x86) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GenericUsableMenuLayoutProps {
    border?: GenericUsableMenuLayoutBorderProps;
    layout?: BoxLayout;
}

export const GenericUsableMenuLayout = ({ border, layout }: GenericUsableMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 86, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, bottom: -27, height: 86 }}
            >
                <GenericUsableMenuLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};

/** Row template `use` of GenericUsableMenuLayout - pass real rows through its `items…` slot. */
export interface GenericUsableMenuLayoutUseItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const GenericUsableMenuLayoutUseItem = ({ captionLabel, layout, onButton, visibleGroups }: GenericUsableMenuLayoutUseItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="use"
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
                            text={captionLabel ?? t('widget.generic_usable.button.use')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Named region `buttons` of GenericUsableMenuLayout - configured through the parent's `buttons` prop. */
export interface GenericUsableMenuLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const GenericUsableMenuLayoutButtons = ({ itemsButtons, layout }: GenericUsableMenuLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            layout={{ position: 'absolute', minWidth: 103, top: 28, minHeight: 26, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsButtons ?? (
                <GenericUsableMenuLayoutUseItem />
            )}
        </Region>
    );
};

/** Named region `minimize` of GenericUsableMenuLayout - configured through the parent's `minimize` prop. */
export interface GenericUsableMenuLayoutMinimizeProps {
    layout?: BoxLayout;
    onMinimize?: () => void;
}

export const GenericUsableMenuLayoutMinimize = ({ layout, onMinimize }: GenericUsableMenuLayoutMinimizeProps) => {
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

/** Named region `border` of GenericUsableMenuLayout - configured through the parent's `border` prop. */
export interface GenericUsableMenuLayoutBorderProps {
    buttons?: GenericUsableMenuLayoutButtonsProps;
    captionFurniName?: string;
    layout?: BoxLayout;
    minimize?: GenericUsableMenuLayoutMinimizeProps;
}

export const GenericUsableMenuLayoutBorder = ({ buttons, captionFurniName, layout, minimize }: GenericUsableMenuLayoutBorderProps) => {
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
            <GenericUsableMenuLayoutButtons {...buttons} />
            <GenericUsableMenuLayoutMinimize {...minimize} />
        </Region>
    );
};
