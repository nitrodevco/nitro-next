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
}

export const OwnPetMenuLayoutProfileLink = ({ captionName, layout, onProfileLink }: OwnPetMenuLayoutProfileLinkProps) => {
    return (
        <Region
            name="profile_link"
            layout={{ position: 'absolute', left: 0, width: 107, top: -1, height: 28, maxHeight: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
            onPointerTap={onProfileLink}
            cursor="pointer"
        >
            <ThemeText
                text={captionName ?? 'Incarnatus Hairbullis'}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 107, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `buy_saddle` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutBuySaddleItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnPetMenuLayoutBuySaddleItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnPetMenuLayoutBuySaddleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="buy_saddle"
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
                    text={captionLabel ?? t('infostand.button.buy_saddle')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `mount` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutMountItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnPetMenuLayoutMountItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnPetMenuLayoutMountItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="mount"
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
                    text={captionLabel ?? t('infostand.button.mount')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
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
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnPetMenuLayoutToggleRidingPermissionItem = ({ captionLabel, layout, onButton, onToggleRidingPermissionCheckbox, visibleGroups }: OwnPetMenuLayoutToggleRidingPermissionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="toggle_riding_permission"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 101, height: 40, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                visible={visibleGroups?.action ?? true}
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
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnPetMenuLayoutDismountItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnPetMenuLayoutDismountItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="dismount"
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
                    text={captionLabel ?? t('infostand.button.dismount')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `respect` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutRespectItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnPetMenuLayoutRespectItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnPetMenuLayoutRespectItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="respect"
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
                    text={captionLabel ?? t('infostand.button.petrespect')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `treat` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutTreatItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnPetMenuLayoutTreatItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnPetMenuLayoutTreatItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="treat"
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
                    text={captionLabel ?? t('infostand.button.pettreat')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `pass_handitem` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutPassHanditemItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnPetMenuLayoutPassHanditemItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnPetMenuLayoutPassHanditemItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="pass_handitem"
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
                    text={captionLabel ?? t('infostand.button.give_handitem_to_pet')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `train` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutTrainItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnPetMenuLayoutTrainItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnPetMenuLayoutTrainItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="train"
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
                    text={captionLabel ?? t('infostand.button.train')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `pick_up` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutPickUpItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnPetMenuLayoutPickUpItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnPetMenuLayoutPickUpItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="pick_up"
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
                    text={captionLabel ?? t('infostand.button.pickup')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `saddle_off` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutSaddleOffItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnPetMenuLayoutSaddleOffItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnPetMenuLayoutSaddleOffItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="saddle_off"
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
                    text={captionLabel ?? t('infostand.button.saddleoff')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `give_water` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutGiveWaterItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnPetMenuLayoutGiveWaterItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnPetMenuLayoutGiveWaterItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="give_water"
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
                    text={captionLabel ?? t('infostand.button.givewater')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `give_light` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutGiveLightItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnPetMenuLayoutGiveLightItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnPetMenuLayoutGiveLightItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="give_light"
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
                    text={captionLabel ?? t('infostand.button.givelight')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `breed` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutBreedItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnPetMenuLayoutBreedItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnPetMenuLayoutBreedItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="breed"
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
                    text={captionLabel ?? t('infostand.button.breed')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `harvest` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutHarvestItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnPetMenuLayoutHarvestItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnPetMenuLayoutHarvestItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="harvest"
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
                    text={captionLabel ?? t('infostand.button.harvest')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `revive` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutReviveItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnPetMenuLayoutReviveItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnPetMenuLayoutReviveItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="revive"
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
                    text={captionLabel ?? t('infostand.button.revive')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `compost` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutCompostItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnPetMenuLayoutCompostItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnPetMenuLayoutCompostItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="compost"
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
                    text={captionLabel ?? t('infostand.button.compost')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `more` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutMoreItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnPetMenuLayoutMoreItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnPetMenuLayoutMoreItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="more"
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
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnPetMenuLayoutToggleBreedingPermissionItem = ({ captionLabel, layout, onButton, onToggleBreedingPermissionCheckbox, visibleGroups }: OwnPetMenuLayoutToggleBreedingPermissionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="toggle_breeding_permission"
            visible={visibleGroups?.action ?? true}
            layout={{ width: 101, height: 40, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="button"
                tintColor="#2d2a27"
                onPointerTap={onButton}
                visible={visibleGroups?.action ?? true}
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
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const OwnPetMenuLayoutWiredInspectItem = ({ captionLabel, layout, onButton, visibleGroups }: OwnPetMenuLayoutWiredInspectItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="wired_inspect"
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
                    text={captionLabel ?? t('infostand.button.wired_inspect')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Named region `buttons` of OwnPetMenuLayout - configured through the parent's `buttons` prop. */
export interface OwnPetMenuLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const OwnPetMenuLayoutButtons = ({ itemsButtons, layout }: OwnPetMenuLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            layout={{ position: 'absolute', minWidth: 103, top: 28, minHeight: 540, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <OwnPetMenuLayoutBuySaddleItem />
                    <OwnPetMenuLayoutMountItem />
                    <OwnPetMenuLayoutToggleRidingPermissionItem />
                    <OwnPetMenuLayoutDismountItem />
                    <OwnPetMenuLayoutRespectItem />
                    <OwnPetMenuLayoutTreatItem />
                    <OwnPetMenuLayoutPassHanditemItem />
                    <OwnPetMenuLayoutTrainItem />
                    <OwnPetMenuLayoutPickUpItem />
                    <OwnPetMenuLayoutSaddleOffItem />
                    <OwnPetMenuLayoutGiveWaterItem />
                    <OwnPetMenuLayoutGiveLightItem />
                    <OwnPetMenuLayoutBreedItem />
                    <OwnPetMenuLayoutHarvestItem />
                    <OwnPetMenuLayoutReviveItem />
                    <OwnPetMenuLayoutCompostItem />
                    <OwnPetMenuLayoutMoreItem />
                    <OwnPetMenuLayoutToggleBreedingPermissionItem />
                    <OwnPetMenuLayoutWiredInspectItem />
                </>
            )}
        </Region>
    );
};

/** Named region `minimize` of OwnPetMenuLayout - configured through the parent's `minimize` prop. */
export interface OwnPetMenuLayoutMinimizeProps {
    layout?: BoxLayout;
    onMinimize?: () => void;
}

export const OwnPetMenuLayoutMinimize = ({ layout, onMinimize }: OwnPetMenuLayoutMinimizeProps) => {
    return (
        <Region
            name="minimize"
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
}

export const OwnPetMenuLayoutBorder = ({ buttons, layout, minimize, profileLink }: OwnPetMenuLayoutBorderProps) => {
    return (
        <Region
            name="border"
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
