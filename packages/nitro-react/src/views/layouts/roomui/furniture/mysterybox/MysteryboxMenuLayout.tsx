import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1068_mysterybox_menu_xml` (layout "mysterybox_menu", 115x86) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MysteryboxMenuLayoutProps {
    border?: MysteryboxMenuLayoutBorderProps;
    layout?: BoxLayout;
}

export const MysteryboxMenuLayout = ({ border, layout }: MysteryboxMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 86, ...layout }}>
            <Bubble
                variant="0"
                params={1048865}
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, bottom: -27, height: 86 }}
            >
                <MysteryboxMenuLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};

/** Row template `use` of MysteryboxMenuLayout - pass real rows through its `items…` slot. */
export interface MysteryboxMenuLayoutUseItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const MysteryboxMenuLayoutUseItem = ({ captionLabel, layout, onButton }: MysteryboxMenuLayoutUseItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="use"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 101, height: 26, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                params={2193}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
            >
                <Region
                    name="label"
                    params={144}
                    layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionLabel ?? t('mysterybox.context.other.use')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Named region `buttons` of MysteryboxMenuLayout - configured through the parent's `buttons` prop. */
export interface MysteryboxMenuLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const MysteryboxMenuLayoutButtons = ({ itemsButtons, layout }: MysteryboxMenuLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            params={8519888}
            layout={{ position: 'absolute', minWidth: 103, top: 28, minHeight: 26, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsButtons ?? (
                <MysteryboxMenuLayoutUseItem />
            )}
        </Region>
    );
};

/** Named region `minimize` of MysteryboxMenuLayout - configured through the parent's `minimize` prop. */
export interface MysteryboxMenuLayoutMinimizeProps {
    layout?: BoxLayout;
    onMinimize?: () => void;
}

export const MysteryboxMenuLayoutMinimize = ({ layout, onMinimize }: MysteryboxMenuLayoutMinimizeProps) => {
    return (
        <Region
            name="minimize"
            params={1041}
            onPointerTap={onMinimize}
            cursor="pointer"
            layout={{ position: 'absolute', left: 4, width: 100, bottom: 3, height: 18, ...layout }}
        >
            <Icon
                variant="7"
                name="icon"
                params={16}
                layout={{ position: 'absolute', left: 45, width: 13, top: 7, height: 10 }}
            />
        </Region>
    );
};

/** Named region `border` of MysteryboxMenuLayout - configured through the parent's `border` prop. */
export interface MysteryboxMenuLayoutBorderProps {
    buttons?: MysteryboxMenuLayoutButtonsProps;
    layout?: BoxLayout;
    minimize?: MysteryboxMenuLayoutMinimizeProps;
}

export const MysteryboxMenuLayoutBorder = ({ buttons, layout, minimize }: MysteryboxMenuLayoutBorderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="border"
            params={12582928}
            layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 76, justifyContent: 'center', ...layout }}
        >
            <Region
                params={17}
                layout={{ position: 'absolute', left: 0, width: 107, top: 7, height: 16, justifyContent: 'center' }}
            >
                <Region
                    params={208}
                    layout={{ position: 'absolute', marginLeft: 14, marginRight: -14, width: 135, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('mysterybox.context.title')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region
                params={144}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 2, right: 2, top: 27, height: 1 }}
            />
            <MysteryboxMenuLayoutButtons {...buttons} />
            <MysteryboxMenuLayoutMinimize {...minimize} />
        </Region>
    );
};
