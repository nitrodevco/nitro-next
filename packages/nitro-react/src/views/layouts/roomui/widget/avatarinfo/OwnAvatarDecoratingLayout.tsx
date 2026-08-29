import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, ContainerButton, Region, ThemeText } from '#base/theme';

/** Generated from `1097_own_avatar_decorating_xml` (layout "context_menu_widget", 115x49) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface OwnAvatarDecoratingLayoutProps {
    border?: OwnAvatarDecoratingLayoutBorderProps;
    layout?: BoxLayout;
}

export const OwnAvatarDecoratingLayout = ({ border, layout }: OwnAvatarDecoratingLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 49, ...layout }}>
            <Bubble
                variant="0"
                params={1048865}
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, bottom: -376, height: 49 }}
            >
                <OwnAvatarDecoratingLayoutBorder {...border} />
            </Bubble>
        </Region>
    );
};

/** Row template `decorate` of OwnAvatarDecoratingLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarDecoratingLayoutDecorateItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
}

export const OwnAvatarDecoratingLayoutDecorateItem = ({ captionLabel, layout, onButton }: OwnAvatarDecoratingLayoutDecorateItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="decorate"
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
                        text={captionLabel ?? t('widget.avatar.stop_decorating')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};

/** Named region `buttons` of OwnAvatarDecoratingLayout - configured through the parent's `buttons` prop. */
export interface OwnAvatarDecoratingLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const OwnAvatarDecoratingLayoutButtons = ({ itemsButtons, layout }: OwnAvatarDecoratingLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            params={8519888}
            layout={{ position: 'absolute', minWidth: 103, top: 7, minHeight: 26, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsButtons ?? (
                <OwnAvatarDecoratingLayoutDecorateItem />
            )}
        </Region>
    );
};

/** Named region `border` of OwnAvatarDecoratingLayout - configured through the parent's `border` prop. */
export interface OwnAvatarDecoratingLayoutBorderProps {
    buttons?: OwnAvatarDecoratingLayoutButtonsProps;
    layout?: BoxLayout;
}

export const OwnAvatarDecoratingLayoutBorder = ({ buttons, layout }: OwnAvatarDecoratingLayoutBorderProps) => {
    return (
        <Region
            name="border"
            params={12582928}
            layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 76, justifyContent: 'center', ...layout }}
        >
            <Region
                params={144}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 2, right: 2, top: 7, height: 1 }}
            />
            <OwnAvatarDecoratingLayoutButtons {...buttons} />
        </Region>
    );
};
