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

/** Named region `profile_link` of UseProductMenuLayout - configured through the parent's `profileLink` prop. */
export interface UseProductMenuLayoutProfileLinkProps {
    captionName?: string;
    layout?: BoxLayout;
    onProfileLink?: () => void;
    tags?: string[];
}

export const UseProductMenuLayoutProfileLink = ({ captionName, layout, onProfileLink, tags }: UseProductMenuLayoutProfileLinkProps) => {
    return (
        <Region
            name="profile_link"
            tags={tags}
            onPointerTap={onProfileLink}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 107, top: 7, height: 16, justifyContent: 'center', ...layout }}
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
    );
};

/** Row template `use_product` of UseProductMenuLayout - pass real rows through its `items…` slot. */
export interface UseProductMenuLayoutUseProductItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const UseProductMenuLayoutUseProductItem = ({ captionLabel, layout, onButton, tags }: UseProductMenuLayoutUseProductItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="use_product"
            tags={tags}
            layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
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
    tags?: string[];
}

export const UseProductMenuLayoutUseProductShampooItem = ({ captionLabel, layout, onButton, tags }: UseProductMenuLayoutUseProductShampooItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="use_product_shampoo"
            tags={tags}
            layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
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
    tags?: string[];
}

export const UseProductMenuLayoutUseProductCustomPartItem = ({ captionLabel, layout, onButton, tags }: UseProductMenuLayoutUseProductCustomPartItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="use_product_custom_part"
            tags={tags}
            layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
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
    tags?: string[];
}

export const UseProductMenuLayoutUseProductCustomPartShampooItem = ({ captionLabel, layout, onButton, tags }: UseProductMenuLayoutUseProductCustomPartShampooItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="use_product_custom_part_shampoo"
            tags={tags}
            layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
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
    tags?: string[];
}

export const UseProductMenuLayoutUseProductSaddleItem = ({ captionLabel, layout, onButton, tags }: UseProductMenuLayoutUseProductSaddleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="use_product_saddle"
            tags={tags}
            layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
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
    tags?: string[];
}

export const UseProductMenuLayoutReplaceProductSaddleItem = ({ captionLabel, layout, onButton, tags }: UseProductMenuLayoutReplaceProductSaddleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="replace_product_saddle"
            tags={tags}
            layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
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
    tags?: string[];
}

export const UseProductMenuLayoutReviveMonsterplantItem = ({ captionLabel, layout, onButton, tags }: UseProductMenuLayoutReviveMonsterplantItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="revive_monsterplant"
            tags={tags}
            layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
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
    tags?: string[];
}

export const UseProductMenuLayoutRebreedMonsterplantItem = ({ captionLabel, layout, onButton, tags }: UseProductMenuLayoutRebreedMonsterplantItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rebreed_monsterplant"
            tags={tags}
            layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
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
    tags?: string[];
}

export const UseProductMenuLayoutFertilizeMonsterplantItem = ({ captionLabel, layout, onButton, tags }: UseProductMenuLayoutFertilizeMonsterplantItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="fertilize_monsterplant"
            tags={tags}
            layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
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
                        text={captionLabel ?? t('infostand.button.fertilize_monsterplant')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Named region `buttons` of UseProductMenuLayout - configured through the parent's `buttons` prop. */
export interface UseProductMenuLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const UseProductMenuLayoutButtons = ({ itemsButtons, layout, tags }: UseProductMenuLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            tags={tags}
            layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, minWidth: 104, top: 28, minHeight: 242, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <UseProductMenuLayoutUseProductItem tags={[ 'action' ]} />
                    <UseProductMenuLayoutUseProductShampooItem tags={[ 'action' ]} />
                    <UseProductMenuLayoutUseProductCustomPartItem tags={[ 'action' ]} />
                    <UseProductMenuLayoutUseProductCustomPartShampooItem tags={[ 'action' ]} />
                    <UseProductMenuLayoutUseProductSaddleItem tags={[ 'action' ]} />
                    <UseProductMenuLayoutReplaceProductSaddleItem tags={[ 'action' ]} />
                    <UseProductMenuLayoutReviveMonsterplantItem tags={[ 'action' ]} />
                    <UseProductMenuLayoutRebreedMonsterplantItem tags={[ 'action' ]} />
                    <UseProductMenuLayoutFertilizeMonsterplantItem tags={[ 'action' ]} />
                </>
            )}
        </Region>
    );
};

/** Named region `minimize` of UseProductMenuLayout - configured through the parent's `minimize` prop. */
export interface UseProductMenuLayoutMinimizeProps {
    layout?: BoxLayout;
    onMinimize?: () => void;
    tags?: string[];
}

export const UseProductMenuLayoutMinimize = ({ layout, onMinimize, tags }: UseProductMenuLayoutMinimizeProps) => {
    return (
        <Region
            name="minimize"
            tags={tags}
            onPointerTap={onMinimize}
            cursor="pointer"
            layout={{ position: 'absolute', left: 2, width: 100, bottom: 3, height: 18, ...layout }}
        >
            <Icon
                variant="7"
                name="icon"
                layout={{ position: 'absolute', left: 45, width: 13, top: 7, height: 10 }}
            />
        </Region>
    );
};

/** Named region `border` of UseProductMenuLayout - configured through the parent's `border` prop. */
export interface UseProductMenuLayoutBorderProps {
    buttons?: UseProductMenuLayoutButtonsProps;
    layout?: BoxLayout;
    minimize?: UseProductMenuLayoutMinimizeProps;
    profileLink?: UseProductMenuLayoutProfileLinkProps;
    tags?: string[];
}

export const UseProductMenuLayoutBorder = ({ buttons, layout, minimize, profileLink, tags }: UseProductMenuLayoutBorderProps) => {
    return (
        <Region
            name="border"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 292, justifyContent: 'center', ...layout }}
        >
            <UseProductMenuLayoutProfileLink {...profileLink} />
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 2, right: 2, top: 27, height: 1 }}
            />
            <UseProductMenuLayoutButtons {...buttons} />
            <UseProductMenuLayoutMinimize {...minimize} />
        </Region>
    );
};
