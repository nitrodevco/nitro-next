import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, CheckBox, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `843_own_pet_menu_xml` (layout "context_menu_widget", 115x600) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface OwnPetMenuLayoutProps {
    border?: OwnPetMenuLayoutBorderProps;
    layout?: BoxLayout;
}

export const OwnPetMenuLayout = ({ border, layout }: OwnPetMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 600, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, bottom: 0, height: 600 }}
            >
                <OwnPetMenuLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};

/** Named region `profile_link` of OwnPetMenuLayout - configured through the parent's `profileLink` prop. */
export interface OwnPetMenuLayoutProfileLinkProps {
    captionName?: string;
    layout?: BoxLayout;
    onProfileLink?: () => void;
    tags?: string[];
}

export const OwnPetMenuLayoutProfileLink = ({ captionName, layout, onProfileLink, tags }: OwnPetMenuLayoutProfileLinkProps) => {
    return (
        <Region
            name="profile_link"
            tags={tags}
            onPointerTap={onProfileLink}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 107, top: -1, height: 28, maxHeight: 28, justifyContent: 'center', ...layout }}
        >
            <Region
                name="name"
                layout={{ position: 'absolute', width: 107, alignSelf: 'center', height: 28, maxHeight: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionName ?? 'Incarnatus Hairbullis'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 107, align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `buy_saddle` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutBuySaddleItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const OwnPetMenuLayoutBuySaddleItem = ({ captionLabel, layout, onButton, tags }: OwnPetMenuLayoutBuySaddleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="buy_saddle"
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
                        text={captionLabel ?? t('infostand.button.buy_saddle')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `mount` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutMountItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const OwnPetMenuLayoutMountItem = ({ captionLabel, layout, onButton, tags }: OwnPetMenuLayoutMountItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="mount"
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
                        text={captionLabel ?? t('infostand.button.mount')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `toggle_riding_permission` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutToggleRidingPermissionItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    onToggleRidingPermissionCheckbox?: () => void;
    tags?: string[];
}

export const OwnPetMenuLayoutToggleRidingPermissionItem = ({ captionLabel, layout, onButton, onToggleRidingPermissionCheckbox, tags }: OwnPetMenuLayoutToggleRidingPermissionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="toggle_riding_permission"
            tags={tags}
            layout={{ width: 101, height: 40, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -2 }}
            >
                <CheckBox
                    variant="1"
                    name="toggle_riding_permission_checkbox"
                    onPointerTap={onToggleRidingPermissionCheckbox}
                    layout={{ position: 'absolute', left: 9, width: 20, top: 17, height: 20 }}
                />
                <Region
                    name="label"
                    layout={{ position: 'absolute', left: 26, width: 78, alignSelf: 'center', height: 40, maxWidth: 78, maxHeight: 46, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionLabel ?? t('infostand.button.toggle_riding_permission')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 78 }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `dismount` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutDismountItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const OwnPetMenuLayoutDismountItem = ({ captionLabel, layout, onButton, tags }: OwnPetMenuLayoutDismountItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="dismount"
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
                        text={captionLabel ?? t('infostand.button.dismount')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `respect` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutRespectItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const OwnPetMenuLayoutRespectItem = ({ captionLabel, layout, onButton, tags }: OwnPetMenuLayoutRespectItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="respect"
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
                        text={captionLabel ?? t('infostand.button.petrespect')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `treat` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutTreatItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const OwnPetMenuLayoutTreatItem = ({ captionLabel, layout, onButton, tags }: OwnPetMenuLayoutTreatItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="treat"
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
                    layout={{ position: 'absolute', left: 3, width: 101, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionLabel ?? t('infostand.button.pettreat')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `pass_handitem` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutPassHanditemItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const OwnPetMenuLayoutPassHanditemItem = ({ captionLabel, layout, onButton, tags }: OwnPetMenuLayoutPassHanditemItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="pass_handitem"
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
                        text={captionLabel ?? t('infostand.button.give_handitem_to_pet')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `train` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutTrainItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const OwnPetMenuLayoutTrainItem = ({ captionLabel, layout, onButton, tags }: OwnPetMenuLayoutTrainItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="train"
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
                        text={captionLabel ?? t('infostand.button.train')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `pick_up` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutPickUpItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const OwnPetMenuLayoutPickUpItem = ({ captionLabel, layout, onButton, tags }: OwnPetMenuLayoutPickUpItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="pick_up"
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
                        text={captionLabel ?? t('infostand.button.pickup')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `saddle_off` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutSaddleOffItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const OwnPetMenuLayoutSaddleOffItem = ({ captionLabel, layout, onButton, tags }: OwnPetMenuLayoutSaddleOffItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="saddle_off"
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
                        text={captionLabel ?? t('infostand.button.saddleoff')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `give_water` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutGiveWaterItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const OwnPetMenuLayoutGiveWaterItem = ({ captionLabel, layout, onButton, tags }: OwnPetMenuLayoutGiveWaterItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="give_water"
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
                        text={captionLabel ?? t('infostand.button.givewater')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `give_light` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutGiveLightItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const OwnPetMenuLayoutGiveLightItem = ({ captionLabel, layout, onButton, tags }: OwnPetMenuLayoutGiveLightItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="give_light"
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
                        text={captionLabel ?? t('infostand.button.givelight')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `breed` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutBreedItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const OwnPetMenuLayoutBreedItem = ({ captionLabel, layout, onButton, tags }: OwnPetMenuLayoutBreedItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="breed"
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
                        text={captionLabel ?? t('infostand.button.breed')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `harvest` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutHarvestItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const OwnPetMenuLayoutHarvestItem = ({ captionLabel, layout, onButton, tags }: OwnPetMenuLayoutHarvestItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="harvest"
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
                        text={captionLabel ?? t('infostand.button.harvest')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `revive` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutReviveItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const OwnPetMenuLayoutReviveItem = ({ captionLabel, layout, onButton, tags }: OwnPetMenuLayoutReviveItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="revive"
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
                        text={captionLabel ?? t('infostand.button.revive')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `compost` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutCompostItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const OwnPetMenuLayoutCompostItem = ({ captionLabel, layout, onButton, tags }: OwnPetMenuLayoutCompostItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="compost"
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
                        text={captionLabel ?? t('infostand.button.compost')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `more` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutMoreItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const OwnPetMenuLayoutMoreItem = ({ captionLabel, layout, onButton, tags }: OwnPetMenuLayoutMoreItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="more"
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
                        text={captionLabel ?? t('infostand.link.more')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <Icon
                    variant="5"
                    name="icon"
                    tags={[ 'arrow_right' ]}
                    layout={{ position: 'absolute', left: 92, width: 5, top: 12, height: 10 }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `toggle_breeding_permission` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutToggleBreedingPermissionItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    onToggleBreedingPermissionCheckbox?: () => void;
    tags?: string[];
}

export const OwnPetMenuLayoutToggleBreedingPermissionItem = ({ captionLabel, layout, onButton, onToggleBreedingPermissionCheckbox, tags }: OwnPetMenuLayoutToggleBreedingPermissionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="toggle_breeding_permission"
            tags={tags}
            layout={{ width: 101, height: 40, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tags={[ 'action' ]}
                tintColor="#2d2a27"
                onPointerTap={onButton}
                layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -2 }}
            >
                <CheckBox
                    variant="1"
                    name="toggle_breeding_permission_checkbox"
                    onPointerTap={onToggleBreedingPermissionCheckbox}
                    layout={{ position: 'absolute', left: 9, width: 20, top: 17, height: 20 }}
                />
                <Region
                    name="label"
                    layout={{ position: 'absolute', left: 26, width: 78, alignSelf: 'center', height: 46, maxWidth: 78, maxHeight: 46, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionLabel ?? t('infostand.button.toggle_breeding_permission')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 78 }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Row template `wired_inspect` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutWiredInspectItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const OwnPetMenuLayoutWiredInspectItem = ({ captionLabel, layout, onButton, tags }: OwnPetMenuLayoutWiredInspectItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="wired_inspect"
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
                        text={captionLabel ?? t('infostand.button.wired_inspect')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Named region `buttons` of OwnPetMenuLayout - configured through the parent's `buttons` prop. */
export interface OwnPetMenuLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const OwnPetMenuLayoutButtons = ({ itemsButtons, layout, tags }: OwnPetMenuLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            tags={tags}
            layout={{ position: 'absolute', minWidth: 103, top: 28, minHeight: 540, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <OwnPetMenuLayoutBuySaddleItem tags={[ 'action' ]} />
                    <OwnPetMenuLayoutMountItem tags={[ 'action' ]} />
                    <OwnPetMenuLayoutToggleRidingPermissionItem tags={[ 'action' ]} />
                    <OwnPetMenuLayoutDismountItem tags={[ 'action' ]} />
                    <OwnPetMenuLayoutRespectItem tags={[ 'action' ]} />
                    <OwnPetMenuLayoutTreatItem tags={[ 'action' ]} />
                    <OwnPetMenuLayoutPassHanditemItem tags={[ 'action' ]} />
                    <OwnPetMenuLayoutTrainItem tags={[ 'action' ]} />
                    <OwnPetMenuLayoutPickUpItem tags={[ 'action' ]} />
                    <OwnPetMenuLayoutSaddleOffItem tags={[ 'action' ]} />
                    <OwnPetMenuLayoutGiveWaterItem tags={[ 'action' ]} />
                    <OwnPetMenuLayoutGiveLightItem tags={[ 'action' ]} />
                    <OwnPetMenuLayoutBreedItem tags={[ 'action' ]} />
                    <OwnPetMenuLayoutHarvestItem tags={[ 'action' ]} />
                    <OwnPetMenuLayoutReviveItem tags={[ 'action' ]} />
                    <OwnPetMenuLayoutCompostItem tags={[ 'action' ]} />
                    <OwnPetMenuLayoutMoreItem tags={[ 'action' ]} />
                    <OwnPetMenuLayoutToggleBreedingPermissionItem tags={[ 'action' ]} />
                    <OwnPetMenuLayoutWiredInspectItem tags={[ 'action' ]} />
                </>
            )}
        </Region>
    );
};

/** Named region `minimize` of OwnPetMenuLayout - configured through the parent's `minimize` prop. */
export interface OwnPetMenuLayoutMinimizeProps {
    layout?: BoxLayout;
    onMinimize?: () => void;
    tags?: string[];
}

export const OwnPetMenuLayoutMinimize = ({ layout, onMinimize, tags }: OwnPetMenuLayoutMinimizeProps) => {
    return (
        <Region
            name="minimize"
            tags={tags}
            onPointerTap={onMinimize}
            cursor="pointer"
            layout={{ position: 'absolute', left: 4, width: 100, bottom: 4, height: 19, ...layout }}
        >
            <Icon
                variant="7"
                name="icon"
                layout={{ position: 'absolute', left: 45, width: 13, top: 7, height: 10 }}
            />
        </Region>
    );
};

/** Named region `border` of OwnPetMenuLayout - configured through the parent's `border` prop. */
export interface OwnPetMenuLayoutBorderProps {
    buttons?: OwnPetMenuLayoutButtonsProps;
    layout?: BoxLayout;
    minimize?: OwnPetMenuLayoutMinimizeProps;
    profileLink?: OwnPetMenuLayoutProfileLinkProps;
    tags?: string[];
}

export const OwnPetMenuLayoutBorder = ({ buttons, layout, minimize, profileLink, tags }: OwnPetMenuLayoutBorderProps) => {
    return (
        <Region
            name="border"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 590, justifyContent: 'center', ...layout }}
        >
            <OwnPetMenuLayoutProfileLink {...profileLink} />
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 2, right: 2, top: 27, height: 1 }}
            />
            <OwnPetMenuLayoutButtons {...buttons} />
            <OwnPetMenuLayoutMinimize {...minimize} />
        </Region>
    );
};
