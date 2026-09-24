import { useConfigValue, useTranslation } from '#base/context/system';
import { ButtonThick, Frame, ThemeImage, ThemeText } from '#base/theme';

export interface GroupCreatedViewProps {
    onClose: () => void;
}

/**
 * The welcome window a new group opens with - `group_created_window`, drawn by
 * `GroupCreatedWindowCtrl`. Both its close button and its OK button do the same thing: close, and
 * ask for the group's details, which opens the details window on it.
 */
export const GroupCreatedView = ({ onClose }: GroupCreatedViewProps) => {
    const t = useTranslation();
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';

    return (
        <Frame
            variant="3"
            name="groups_created_window"
            caption={t('group.created.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            resizeDirection="none"
            layout={{ width: 358, height: 381 }}
            margins={[ 0, 33, 0, 3 ]}
        >
            <ThemeText
                text={t('group.created.info')}
                textStyle="u_regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 307 }}
                markup
                clip
                verticalAlign="top"
                layout={{ position: 'absolute', left: 22, width: 311, top: 10, height: 150 }}
            />
            <ThemeImage
                name="group_welcome_info"
                src={`${imageLibraryUrl}guilds/group_welcome_info.png`}
                layout={{ position: 'absolute', left: 20, width: 316, bottom: 50, height: 155 }}
            />
            <ButtonThick
                variant="3"
                name="ok_button"
                onPointerTap={onClose}
                layout={{ position: 'absolute', left: 115, width: 131, bottom: 12, height: 29, minWidth: 131, maxWidth: 131 }}
            >
                {t('group.created.ok')}
            </ButtonThick>
        </Frame>
    );
};
