import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { UserCreateLayoutCreateErrorItem } from './UserCreateLayoutCreateErrorItem';
import { UserCreateLayoutInputWidgetItem } from './UserCreateLayoutInputWidgetItem';

/** Named region `list` of UserCreateLayout - configured through the parent's `list` prop. */
export interface UserCreateLayoutListProps {
    captionCancelLink?: string;
    itemsList?: ReactNode;
    layout?: BoxLayout;
    onCancelLink?: () => void;
    onCreateButton?: () => void;
}

export const UserCreateLayoutList = ({ captionCancelLink, itemsList, layout, onCancelLink, onCreateButton }: UserCreateLayoutListProps) => {
    const t = useTranslation();

    return (
        <Region
            name="list"
            layout={{ position: 'absolute', left: 5, right: -5, top: 0, bottom: -4, minWidth: 270, maxWidth: 270, flexDirection: 'column', ...layout }}
        >
            {itemsList ?? (
                <>
                    <UserCreateLayoutCreateErrorItem />
                    <UserCreateLayoutInputWidgetItem />
                </>
            )}
            <Region layout={{ alignSelf: 'stretch', height: 50, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('guide.help.request.user.create.help')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 264 }}
                />
            </Region>
            <Region layout={{ alignSelf: 'stretch', height: 108, flexShrink: 0 }}>
                <Button
                    variant="101"
                    name="create_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onCreateButton}
                    layout={{ position: 'absolute', left: 78, width: 136, top: 0, height: 48, minHeight: 48, maxHeight: 48 }}
                >
                    {t('guide.help.request.user.create.input.button')}
                </Button>
                <Region
                    name="cancel_link"
                    layout={{ position: 'absolute', left: 95, width: 107, alignSelf: 'center', marginTop: 4, marginBottom: -4, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
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
    );
};
