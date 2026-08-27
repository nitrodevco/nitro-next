import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1029_use_product_menu_xml` (layout "context_menu_widget", 115x302) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductMenuLayoutProps {
    captionName?: string;
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
    onMinimize?: () => void;
    onProfileLink?: () => void;
}

export const UseProductMenuLayout = ({ captionName, itemsButtons, layout, onMinimize, onProfileLink }: UseProductMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 302, ...layout }}>
            <Bubble
                variant="0"
                params={1048865}
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, bottom: -9, height: 302 }}
            >
                <Region
                    name="border"
                    params={12582928}
                    layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 292, justifyContent: 'center' }}
                >
                    <Region
                        name="profile_link"
                        params={1}
                        onPointerTap={onProfileLink}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 107, top: 7, height: 16, justifyContent: 'center' }}
                    >
                        <Region
                            name="name"
                            params={208}
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
                        params={144}
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 2, right: 2, top: 27, height: 1 }}
                    />
                    <Region
                        name="buttons"
                        params={8519888}
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, minWidth: 104, top: 28, minHeight: 242, flexDirection: 'column', gap: 1 }}
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
                    <Region
                        name="minimize"
                        params={1041}
                        onPointerTap={onMinimize}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 2, width: 100, bottom: 3, height: 18 }}
                    >
                        <Icon
                            variant="7"
                            name="icon"
                            params={16}
                            layout={{ position: 'absolute', left: 45, width: 13, top: 7, height: 10 }}
                        />
                    </Region>
                </Region>
            </Bubble>
        </Region>
    );
};

/** Row template `use_product` of UseProductMenuLayout - pass real rows through its `items…` slot. */
export interface UseProductMenuLayoutUseProductItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const UseProductMenuLayoutUseProductItem = ({ captionLabel, layout, onButton }: UseProductMenuLayoutUseProductItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="use_product"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
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
                        text={captionLabel ?? t('infostand.button.useproduct')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `use_product_shampoo` of UseProductMenuLayout - pass real rows through its `items…` slot. */
export interface UseProductMenuLayoutUseProductShampooItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const UseProductMenuLayoutUseProductShampooItem = ({ captionLabel, layout, onButton }: UseProductMenuLayoutUseProductShampooItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="use_product_shampoo"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
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
                        text={captionLabel ?? t('infostand.button.useproduct_shampoo')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `use_product_custom_part` of UseProductMenuLayout - pass real rows through its `items…` slot. */
export interface UseProductMenuLayoutUseProductCustomPartItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const UseProductMenuLayoutUseProductCustomPartItem = ({ captionLabel, layout, onButton }: UseProductMenuLayoutUseProductCustomPartItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="use_product_custom_part"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
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
                        text={captionLabel ?? t('infostand.button.useproduct_custom_part')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `use_product_custom_part_shampoo` of UseProductMenuLayout - pass real rows through its `items…` slot. */
export interface UseProductMenuLayoutUseProductCustomPartShampooItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const UseProductMenuLayoutUseProductCustomPartShampooItem = ({ captionLabel, layout, onButton }: UseProductMenuLayoutUseProductCustomPartShampooItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="use_product_custom_part_shampoo"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
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
                        text={captionLabel ?? t('infostand.button.useproduct_custom_part_shampoo')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `use_product_saddle` of UseProductMenuLayout - pass real rows through its `items…` slot. */
export interface UseProductMenuLayoutUseProductSaddleItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const UseProductMenuLayoutUseProductSaddleItem = ({ captionLabel, layout, onButton }: UseProductMenuLayoutUseProductSaddleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="use_product_saddle"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
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
                        text={captionLabel ?? t('infostand.button.useproduct_saddle')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `replace_product_saddle` of UseProductMenuLayout - pass real rows through its `items…` slot. */
export interface UseProductMenuLayoutReplaceProductSaddleItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const UseProductMenuLayoutReplaceProductSaddleItem = ({ captionLabel, layout, onButton }: UseProductMenuLayoutReplaceProductSaddleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="replace_product_saddle"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
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
                        text={captionLabel ?? t('infostand.button.replaceproduct_saddle')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `revive_monsterplant` of UseProductMenuLayout - pass real rows through its `items…` slot. */
export interface UseProductMenuLayoutReviveMonsterplantItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const UseProductMenuLayoutReviveMonsterplantItem = ({ captionLabel, layout, onButton }: UseProductMenuLayoutReviveMonsterplantItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="revive_monsterplant"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
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
                        text={captionLabel ?? t('infostand.button.revive_monsterplant')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `rebreed_monsterplant` of UseProductMenuLayout - pass real rows through its `items…` slot. */
export interface UseProductMenuLayoutRebreedMonsterplantItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const UseProductMenuLayoutRebreedMonsterplantItem = ({ captionLabel, layout, onButton }: UseProductMenuLayoutRebreedMonsterplantItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rebreed_monsterplant"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
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
                        text={captionLabel ?? t('infostand.button.rebreed_monsterplant')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `fertilize_monsterplant` of UseProductMenuLayout - pass real rows through its `items…` slot. */
export interface UseProductMenuLayoutFertilizeMonsterplantItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const UseProductMenuLayoutFertilizeMonsterplantItem = ({ captionLabel, layout, onButton }: UseProductMenuLayoutFertilizeMonsterplantItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="fertilize_monsterplant"
            tags={[ 'action' ]}
            params={144}
            layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
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
                        text={captionLabel ?? t('infostand.button.fertilize_monsterplant')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};
