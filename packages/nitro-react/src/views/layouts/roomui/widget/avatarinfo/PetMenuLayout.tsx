import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1043_pet_menu_xml` (layout "context_menu_widget", 115x275) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PetMenuLayoutProps {
    captionName?: string;
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
    onMinimize?: () => void;
    onProfileLink?: () => void;
}

export const PetMenuLayout = ({ captionName, itemsButtons, layout, onMinimize, onProfileLink }: PetMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 275, ...layout }}>
            <Bubble
                variant="0"
                params={1048865}
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, bottom: -28, height: 275 }}
            >
                <Region
                    name="border"
                    params={12582928}
                    layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 265 }}
                >
                    <Region
                        name="profile_link"
                        params={1}
                        onPointerTap={onProfileLink}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 107, top: -1, height: 28, maxHeight: 28 }}
                    >
                        <Region
                            name="name"
                            params={3280}
                            layout={{ position: 'absolute', left: '50%', marginLeft: -53.5, width: 107, top: '50%', marginTop: -14, height: 28, maxHeight: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionName ?? 'Incarnatus Hairbullis'}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 107, align: 'center' }}
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
                        layout={{ position: 'absolute', left: '50%', marginLeft: -51.5, minWidth: 103, top: 28, minHeight: 215, flexDirection: 'column', gap: 1 }}
                    >
                        {itemsButtons ?? (
                            <>
                                <PetMenuLayoutMountItem />
                                <PetMenuLayoutDismountItem />
                                <PetMenuLayoutRespectItem />
                                <PetMenuLayoutTreatItem />
                                <PetMenuLayoutPassHanditemItem />
                                <PetMenuLayoutPickUpItem />
                                <PetMenuLayoutMoreItem />
                                <PetMenuLayoutWiredInspectItem />
                            </>
                        )}
                    </Region>
                    <Region
                        name="minimize"
                        params={1041}
                        onPointerTap={onMinimize}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 4, width: 100, bottom: 6, height: 18 }}
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

/** Row template `mount` of PetMenuLayout - pass real rows through its `items…` slot. */
export interface PetMenuLayoutMountItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const PetMenuLayoutMountItem = ({ captionLabel, layout, onButton }: PetMenuLayoutMountItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="mount"
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
}

export const PetMenuLayoutDismountItem = ({ captionLabel, layout, onButton }: PetMenuLayoutDismountItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="dismount"
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
}

export const PetMenuLayoutRespectItem = ({ captionLabel, layout, onButton }: PetMenuLayoutRespectItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="respect"
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
}

export const PetMenuLayoutTreatItem = ({ captionLabel, layout, onButton }: PetMenuLayoutTreatItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="treat"
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
}

export const PetMenuLayoutPassHanditemItem = ({ captionLabel, layout, onButton }: PetMenuLayoutPassHanditemItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="pass_handitem"
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
}

export const PetMenuLayoutPickUpItem = ({ captionLabel, layout, onButton }: PetMenuLayoutPickUpItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="pick_up"
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
}

export const PetMenuLayoutMoreItem = ({ captionLabel, layout, onButton }: PetMenuLayoutMoreItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="more"
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
                        text={captionLabel ?? t('infostand.link.more')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <Icon
                    variant="5"
                    name="icon"
                    tags={[ 'arrow_right' ]}
                    params={16}
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
}

export const PetMenuLayoutWiredInspectItem = ({ captionLabel, layout, onButton }: PetMenuLayoutWiredInspectItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="wired_inspect"
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
                        text={captionLabel ?? t('infostand.button.wired_inspect')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};
