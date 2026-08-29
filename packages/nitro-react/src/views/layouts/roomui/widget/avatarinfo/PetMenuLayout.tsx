import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1043_pet_menu_xml` (layout "context_menu_widget", 115x275) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PetMenuLayoutProps {
    border?: PetMenuLayoutBorderProps;
    layout?: BoxLayout;
}

export const PetMenuLayout = ({ border, layout }: PetMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 275, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, bottom: -28, height: 275 }}
            >
                <PetMenuLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};

/** Named region `profile_link` of PetMenuLayout - configured through the parent's `profileLink` prop. */
export interface PetMenuLayoutProfileLinkProps {
    captionName?: string;
    layout?: BoxLayout;
    onProfileLink?: () => void;
    tags?: string[];
}

export const PetMenuLayoutProfileLink = ({ captionName, layout, onProfileLink, tags }: PetMenuLayoutProfileLinkProps) => {
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

/** Row template `mount` of PetMenuLayout - pass real rows through its `items…` slot. */
export interface PetMenuLayoutMountItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const PetMenuLayoutMountItem = ({ captionLabel, layout, onButton, tags }: PetMenuLayoutMountItemProps) => {
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

/** Row template `dismount` of PetMenuLayout - pass real rows through its `items…` slot. */
export interface PetMenuLayoutDismountItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const PetMenuLayoutDismountItem = ({ captionLabel, layout, onButton, tags }: PetMenuLayoutDismountItemProps) => {
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

/** Row template `respect` of PetMenuLayout - pass real rows through its `items…` slot. */
export interface PetMenuLayoutRespectItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const PetMenuLayoutRespectItem = ({ captionLabel, layout, onButton, tags }: PetMenuLayoutRespectItemProps) => {
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

/** Row template `treat` of PetMenuLayout - pass real rows through its `items…` slot. */
export interface PetMenuLayoutTreatItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const PetMenuLayoutTreatItem = ({ captionLabel, layout, onButton, tags }: PetMenuLayoutTreatItemProps) => {
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
                    layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
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

/** Row template `pass_handitem` of PetMenuLayout - pass real rows through its `items…` slot. */
export interface PetMenuLayoutPassHanditemItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const PetMenuLayoutPassHanditemItem = ({ captionLabel, layout, onButton, tags }: PetMenuLayoutPassHanditemItemProps) => {
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

/** Row template `pick_up` of PetMenuLayout - pass real rows through its `items…` slot. */
export interface PetMenuLayoutPickUpItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const PetMenuLayoutPickUpItem = ({ captionLabel, layout, onButton, tags }: PetMenuLayoutPickUpItemProps) => {
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

/** Row template `more` of PetMenuLayout - pass real rows through its `items…` slot. */
export interface PetMenuLayoutMoreItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const PetMenuLayoutMoreItem = ({ captionLabel, layout, onButton, tags }: PetMenuLayoutMoreItemProps) => {
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

/** Row template `wired_inspect` of PetMenuLayout - pass real rows through its `items…` slot. */
export interface PetMenuLayoutWiredInspectItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    tags?: string[];
}

export const PetMenuLayoutWiredInspectItem = ({ captionLabel, layout, onButton, tags }: PetMenuLayoutWiredInspectItemProps) => {
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

/** Named region `buttons` of PetMenuLayout - configured through the parent's `buttons` prop. */
export interface PetMenuLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const PetMenuLayoutButtons = ({ itemsButtons, layout, tags }: PetMenuLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            tags={tags}
            layout={{ position: 'absolute', minWidth: 103, top: 28, minHeight: 215, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <PetMenuLayoutMountItem tags={[ 'action' ]} />
                    <PetMenuLayoutDismountItem tags={[ 'action' ]} />
                    <PetMenuLayoutRespectItem tags={[ 'action' ]} />
                    <PetMenuLayoutTreatItem tags={[ 'action' ]} />
                    <PetMenuLayoutPassHanditemItem tags={[ 'action' ]} />
                    <PetMenuLayoutPickUpItem tags={[ 'action' ]} />
                    <PetMenuLayoutMoreItem tags={[ 'action' ]} />
                    <PetMenuLayoutWiredInspectItem tags={[ 'action' ]} />
                </>
            )}
        </Region>
    );
};

/** Named region `minimize` of PetMenuLayout - configured through the parent's `minimize` prop. */
export interface PetMenuLayoutMinimizeProps {
    layout?: BoxLayout;
    onMinimize?: () => void;
    tags?: string[];
}

export const PetMenuLayoutMinimize = ({ layout, onMinimize, tags }: PetMenuLayoutMinimizeProps) => {
    return (
        <Region
            name="minimize"
            tags={tags}
            onPointerTap={onMinimize}
            cursor="pointer"
            layout={{ position: 'absolute', left: 4, width: 100, bottom: 6, height: 18, ...layout }}
        >
            <Icon
                variant="7"
                name="icon"
                layout={{ position: 'absolute', left: 45, width: 13, top: 7, height: 10 }}
            />
        </Region>
    );
};

/** Named region `border` of PetMenuLayout - configured through the parent's `border` prop. */
export interface PetMenuLayoutBorderProps {
    buttons?: PetMenuLayoutButtonsProps;
    layout?: BoxLayout;
    minimize?: PetMenuLayoutMinimizeProps;
    profileLink?: PetMenuLayoutProfileLinkProps;
    tags?: string[];
}

export const PetMenuLayoutBorder = ({ buttons, layout, minimize, profileLink, tags }: PetMenuLayoutBorderProps) => {
    return (
        <Region
            name="border"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 265, justifyContent: 'center', ...layout }}
        >
            <PetMenuLayoutProfileLink {...profileLink} />
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 2, right: 2, top: 27, height: 1 }}
            />
            <PetMenuLayoutButtons {...buttons} />
            <PetMenuLayoutMinimize {...minimize} />
        </Region>
    );
};
