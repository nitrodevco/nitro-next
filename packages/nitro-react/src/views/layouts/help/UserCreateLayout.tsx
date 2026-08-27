import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2886_user_create_xml` (layout "user_create", 282x295) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UserCreateLayoutProps {
    captionCancelLink?: string;
    itemsList?: ReactNode;
    layout?: BoxLayout;
    onCancelLink?: () => void;
    onClose?: () => void;
    onCreateButton?: () => void;
}

export const UserCreateLayout = ({ captionCancelLink, itemsList, layout, onCancelLink, onClose, onCreateButton }: UserCreateLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="user_create"
            name="user_create"
            params={32769}
            caption={t('guide.help.request.user.create.title')}
            onClose={onClose}
            layout={{ width: 282, height: 295, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="list"
                    params={8536080}
                    layout={{ position: 'absolute', left: 5, width: 270, top: 0, height: 258, minWidth: 270, maxWidth: 270, flexDirection: 'column' }}
                >
                    {itemsList ?? (
                        <>
                            <UserCreateLayoutCreateErrorItem />
                            <UserCreateLayoutInputWidgetItem />
                        </>
                    )}
                    <Region
                        params={16}
                        layout={{ width: 264, height: 50, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('guide.help.request.user.create.help')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 264 }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ width: 270, height: 108, flexShrink: 0 }}
                    >
                        <Button
                            variant="101"
                            name="create_button"
                            params={131089}
                            tintColor="#bbbbbb"
                            onPointerTap={onCreateButton}
                            layout={{ position: 'absolute', left: 78, width: 136, top: 0, height: 48, minHeight: 48, maxHeight: 48 }}
                        >
                            {t('guide.help.request.user.create.input.button')}
                        </Button>
                        <Region
                            name="cancel_link"
                            params={1}
                            layout={{ position: 'absolute', left: 95, width: 107, top: 50, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            onPointerTap={onCancelLink}
                            cursor="pointer"
                        >
                            <ThemeText
                                text={captionCancelLink ?? t('guide.help.request.user.create.cancel.link')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 107 }}
                            />
                        </Region>
                        <ThemeImage
                            src={layoutImage('help_user_create.png')}
                            layout={{ position: 'absolute', left: 1, width: 71, top: -25, height: 120 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};

/** Row template `create_error` of UserCreateLayout - pass real rows through its `items…` slot. */
export interface UserCreateLayoutCreateErrorItemProps {
    captionCreateError?: string;
    layout?: BoxLayout;
}

export const UserCreateLayoutCreateErrorItem = ({ captionCreateError, layout }: UserCreateLayoutCreateErrorItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="create_error"
            params={16}
            visible={false}
            layout={{ width: 264, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCreateError ?? t('guide.help.request.user.create.input.error')}
                textOptions={{ fill: '#ff0000', wordWrap: true, wordWrapWidth: 264 }}
            />
        </Region>
    );
};

/** Row template `input_widget` of UserCreateLayout - pass real rows through its `items…` slot. */
export interface UserCreateLayoutInputWidgetItemProps {
    layout?: BoxLayout;
}

export const UserCreateLayoutInputWidgetItem = ({ layout }: UserCreateLayoutInputWidgetItemProps) => {
    return (
        <WidgetSlot
            widgetType="illumina_input"
            name="input_widget"
            params={16}
            options={{ 'illumina_input:button_caption': '', 'illumina_input:empty_message': '${guide.help.request.user.create.input.help}', 'illumina_input:multiline': 'true' }}
            layout={{ width: 270, height: 100, flexShrink: 0, ...layout }}
        />
    );
};
