import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1029_use_product_menu_xml` (layout "context_menu_widget", 115x302) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductMenuLayoutProps {
    border?: UseProductMenuLayoutBorderProps;
    layout?: BoxLayout;
}

export const UseProductMenuLayout = ({ border, layout }: UseProductMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 302, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, bottom: -9, height: 302 }}
            >
                <UseProductMenuLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};

/** Row template `use_product` of UseProductMenuLayout - pass real rows through its `items…` slot. */
export interface UseProductMenuLayoutUseProductItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const UseProductMenuLayoutUseProductItem = ({ captionLabel, layout, onButton, visibleGroups }: UseProductMenuLayoutUseProductItemProps) => {
    const t = useTranslation();

    return (
        (visibleGroups?.action ?? true) && (
            <Region
                name="use_product"
                layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
            >
                {(visibleGroups?.action ?? true) && (
                    <ContainerButton
                        variant="3"
                        name="button"
                        tintColor="#2d2a27"
                        onPointerTap={onButton}
                        layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('infostand.button.useproduct')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </ContainerButton>
                )}
            </Region>
        )
    );
};

/** Row template `use_product_shampoo` of UseProductMenuLayout - pass real rows through its `items…` slot. */
export interface UseProductMenuLayoutUseProductShampooItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const UseProductMenuLayoutUseProductShampooItem = ({ captionLabel, layout, onButton, visibleGroups }: UseProductMenuLayoutUseProductShampooItemProps) => {
    const t = useTranslation();

    return (
        (visibleGroups?.action ?? true) && (
            <Region
                name="use_product_shampoo"
                layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
            >
                {(visibleGroups?.action ?? true) && (
                    <ContainerButton
                        variant="3"
                        name="button"
                        tintColor="#2d2a27"
                        onPointerTap={onButton}
                        layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('infostand.button.useproduct_shampoo')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </ContainerButton>
                )}
            </Region>
        )
    );
};

/** Row template `use_product_custom_part` of UseProductMenuLayout - pass real rows through its `items…` slot. */
export interface UseProductMenuLayoutUseProductCustomPartItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const UseProductMenuLayoutUseProductCustomPartItem = ({ captionLabel, layout, onButton, visibleGroups }: UseProductMenuLayoutUseProductCustomPartItemProps) => {
    const t = useTranslation();

    return (
        (visibleGroups?.action ?? true) && (
            <Region
                name="use_product_custom_part"
                layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
            >
                {(visibleGroups?.action ?? true) && (
                    <ContainerButton
                        variant="3"
                        name="button"
                        tintColor="#2d2a27"
                        onPointerTap={onButton}
                        layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('infostand.button.useproduct_custom_part')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </ContainerButton>
                )}
            </Region>
        )
    );
};

/** Row template `use_product_custom_part_shampoo` of UseProductMenuLayout - pass real rows through its `items…` slot. */
export interface UseProductMenuLayoutUseProductCustomPartShampooItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const UseProductMenuLayoutUseProductCustomPartShampooItem = ({ captionLabel, layout, onButton, visibleGroups }: UseProductMenuLayoutUseProductCustomPartShampooItemProps) => {
    const t = useTranslation();

    return (
        (visibleGroups?.action ?? true) && (
            <Region
                name="use_product_custom_part_shampoo"
                layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
            >
                {(visibleGroups?.action ?? true) && (
                    <ContainerButton
                        variant="3"
                        name="button"
                        tintColor="#2d2a27"
                        onPointerTap={onButton}
                        layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('infostand.button.useproduct_custom_part_shampoo')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </ContainerButton>
                )}
            </Region>
        )
    );
};

/** Row template `use_product_saddle` of UseProductMenuLayout - pass real rows through its `items…` slot. */
export interface UseProductMenuLayoutUseProductSaddleItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const UseProductMenuLayoutUseProductSaddleItem = ({ captionLabel, layout, onButton, visibleGroups }: UseProductMenuLayoutUseProductSaddleItemProps) => {
    const t = useTranslation();

    return (
        (visibleGroups?.action ?? true) && (
            <Region
                name="use_product_saddle"
                layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
            >
                {(visibleGroups?.action ?? true) && (
                    <ContainerButton
                        variant="3"
                        name="button"
                        tintColor="#2d2a27"
                        onPointerTap={onButton}
                        layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('infostand.button.useproduct_saddle')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </ContainerButton>
                )}
            </Region>
        )
    );
};

/** Row template `replace_product_saddle` of UseProductMenuLayout - pass real rows through its `items…` slot. */
export interface UseProductMenuLayoutReplaceProductSaddleItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const UseProductMenuLayoutReplaceProductSaddleItem = ({ captionLabel, layout, onButton, visibleGroups }: UseProductMenuLayoutReplaceProductSaddleItemProps) => {
    const t = useTranslation();

    return (
        (visibleGroups?.action ?? true) && (
            <Region
                name="replace_product_saddle"
                layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
            >
                {(visibleGroups?.action ?? true) && (
                    <ContainerButton
                        variant="3"
                        name="button"
                        tintColor="#2d2a27"
                        onPointerTap={onButton}
                        layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('infostand.button.replaceproduct_saddle')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </ContainerButton>
                )}
            </Region>
        )
    );
};

/** Row template `revive_monsterplant` of UseProductMenuLayout - pass real rows through its `items…` slot. */
export interface UseProductMenuLayoutReviveMonsterplantItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const UseProductMenuLayoutReviveMonsterplantItem = ({ captionLabel, layout, onButton, visibleGroups }: UseProductMenuLayoutReviveMonsterplantItemProps) => {
    const t = useTranslation();

    return (
        (visibleGroups?.action ?? true) && (
            <Region
                name="revive_monsterplant"
                layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
            >
                {(visibleGroups?.action ?? true) && (
                    <ContainerButton
                        variant="3"
                        name="button"
                        tintColor="#2d2a27"
                        onPointerTap={onButton}
                        layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('infostand.button.revive_monsterplant')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </ContainerButton>
                )}
            </Region>
        )
    );
};

/** Row template `rebreed_monsterplant` of UseProductMenuLayout - pass real rows through its `items…` slot. */
export interface UseProductMenuLayoutRebreedMonsterplantItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const UseProductMenuLayoutRebreedMonsterplantItem = ({ captionLabel, layout, onButton, visibleGroups }: UseProductMenuLayoutRebreedMonsterplantItemProps) => {
    const t = useTranslation();

    return (
        (visibleGroups?.action ?? true) && (
            <Region
                name="rebreed_monsterplant"
                layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
            >
                {(visibleGroups?.action ?? true) && (
                    <ContainerButton
                        variant="3"
                        name="button"
                        tintColor="#2d2a27"
                        onPointerTap={onButton}
                        layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('infostand.button.rebreed_monsterplant')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </ContainerButton>
                )}
            </Region>
        )
    );
};

/** Row template `fertilize_monsterplant` of UseProductMenuLayout - pass real rows through its `items…` slot. */
export interface UseProductMenuLayoutFertilizeMonsterplantItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const UseProductMenuLayoutFertilizeMonsterplantItem = ({ captionLabel, layout, onButton, visibleGroups }: UseProductMenuLayoutFertilizeMonsterplantItemProps) => {
    const t = useTranslation();

    return (
        (visibleGroups?.action ?? true) && (
            <Region
                name="fertilize_monsterplant"
                layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
            >
                {(visibleGroups?.action ?? true) && (
                    <ContainerButton
                        variant="3"
                        name="button"
                        tintColor="#2d2a27"
                        onPointerTap={onButton}
                        layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('infostand.button.fertilize_monsterplant')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </ContainerButton>
                )}
            </Region>
        )
    );
};

/** Named region `buttons` of UseProductMenuLayout - configured through the parent's `buttons` prop. */
export interface UseProductMenuLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const UseProductMenuLayoutButtons = ({ itemsButtons, layout }: UseProductMenuLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, minWidth: 104, top: 28, minHeight: 242, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <UseProductMenuLayoutUseProductItem />
                    <UseProductMenuLayoutUseProductShampooItem />
                    <UseProductMenuLayoutUseProductCustomPartItem />
                    <UseProductMenuLayoutUseProductCustomPartShampooItem />
                    <UseProductMenuLayoutUseProductSaddleItem />
                    <UseProductMenuLayoutReplaceProductSaddleItem />
                    <UseProductMenuLayoutReviveMonsterplantItem />
                    <UseProductMenuLayoutRebreedMonsterplantItem />
                    <UseProductMenuLayoutFertilizeMonsterplantItem />
                </>
            )}
        </Region>
    );
};

/** Named region `border` of UseProductMenuLayout - configured through the parent's `border` prop. */
export interface UseProductMenuLayoutBorderProps {
    buttons?: UseProductMenuLayoutButtonsProps;
    captionName?: string;
    layout?: BoxLayout;
    onMinimize?: () => void;
    onProfileLink?: () => void;
}

export const UseProductMenuLayoutBorder = ({ buttons, captionName, layout, onMinimize, onProfileLink }: UseProductMenuLayoutBorderProps) => {
    return (
        <Region
            name="border"
            layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 292, justifyContent: 'center', ...layout }}
        >
            <Region
                name="profile_link"
                onPointerTap={onProfileLink}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 107, top: 7, height: 16, justifyContent: 'center' }}
            >
                <Region
                    name="name"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 80, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionName ?? 'my_name_here'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 2, right: 2, top: 27, height: 1 }}
            />
            <UseProductMenuLayoutButtons {...buttons} />
            <Region
                name="minimize"
                onPointerTap={onMinimize}
                cursor="pointer"
                layout={{ position: 'absolute', left: 2, width: 100, bottom: 3, height: 18 }}
            >
                <Icon
                    variant="7"
                    name="icon"
                    layout={{ position: 'absolute', left: 45, width: 13, top: 7, height: 10 }}
                />
            </Region>
        </Region>
    );
};
