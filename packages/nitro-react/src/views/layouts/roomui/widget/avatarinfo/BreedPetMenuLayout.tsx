import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `873_breed_pet_menu_xml` (layout "context_menu_widget", 115x221) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BreedPetMenuLayoutProps {
    border?: BreedPetMenuLayoutBorderProps;
    layout?: BoxLayout;
}

export const BreedPetMenuLayout = ({ border, layout }: BreedPetMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 221, ...layout }}>
            <Bubble
                variant="0"
                params={1048865}
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, bottom: 0, height: 221 }}
            >
                <BreedPetMenuLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};

/** Named region `profile_link` of BreedPetMenuLayout - configured through the parent's `profileLink` prop. */
export interface BreedPetMenuLayoutProfileLinkProps {
    captionName?: string;
    layout?: BoxLayout;
    onProfileLink?: () => void;
}

export const BreedPetMenuLayoutProfileLink = ({ captionName, layout, onProfileLink }: BreedPetMenuLayoutProfileLinkProps) => {
    return (
        <Region
            name="profile_link"
            params={1}
            onPointerTap={onProfileLink}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 107, top: 7, height: 16, justifyContent: 'center', ...layout }}
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
    );
};

/** Row template `breed` of BreedPetMenuLayout - pass real rows through its `items…` slot. */
export interface BreedPetMenuLayoutBreedItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const BreedPetMenuLayoutBreedItem = ({ captionLabel, layout, onButton }: BreedPetMenuLayoutBreedItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="breed"
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
                        text={captionLabel ?? t('infostand.button.breed')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Named region `buttons` of BreedPetMenuLayout - configured through the parent's `buttons` prop. */
export interface BreedPetMenuLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const BreedPetMenuLayoutButtons = ({ itemsButtons, layout }: BreedPetMenuLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            params={8519888}
            layout={{ position: 'absolute', minWidth: 103, top: 28, minHeight: 161, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsButtons ?? (
                <BreedPetMenuLayoutBreedItem />
            )}
        </Region>
    );
};

/** Named region `minimize` of BreedPetMenuLayout - configured through the parent's `minimize` prop. */
export interface BreedPetMenuLayoutMinimizeProps {
    layout?: BoxLayout;
    onMinimize?: () => void;
}

export const BreedPetMenuLayoutMinimize = ({ layout, onMinimize }: BreedPetMenuLayoutMinimizeProps) => {
    return (
        <Region
            name="minimize"
            params={1041}
            onPointerTap={onMinimize}
            cursor="pointer"
            layout={{ position: 'absolute', left: 4, width: 100, bottom: 4, height: 18, ...layout }}
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

/** Named region `border` of BreedPetMenuLayout - configured through the parent's `border` prop. */
export interface BreedPetMenuLayoutBorderProps {
    buttons?: BreedPetMenuLayoutButtonsProps;
    layout?: BoxLayout;
    minimize?: BreedPetMenuLayoutMinimizeProps;
    profileLink?: BreedPetMenuLayoutProfileLinkProps;
}

export const BreedPetMenuLayoutBorder = ({ buttons, layout, minimize, profileLink }: BreedPetMenuLayoutBorderProps) => {
    return (
        <Region
            name="border"
            params={12582928}
            layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 211, justifyContent: 'center', ...layout }}
        >
            <BreedPetMenuLayoutProfileLink {...profileLink} />
            <Region
                params={144}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 2, right: 2, top: 27, height: 1 }}
            />
            <BreedPetMenuLayoutButtons {...buttons} />
            <BreedPetMenuLayoutMinimize {...minimize} />
        </Region>
    );
};
