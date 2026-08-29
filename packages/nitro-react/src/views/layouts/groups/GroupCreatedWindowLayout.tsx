import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1187_group_created_window_xml` (layout "Group created window", 358x381) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GroupCreatedWindowLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onOkButton?: () => void;
    srcGroupWelcomeInfo?: string;
}

export const GroupCreatedWindowLayout = ({ layout, onClose, onOkButton, srcGroupWelcomeInfo }: GroupCreatedWindowLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="groups_info_window"
            name="groups_info_window"
            caption={t('group.created.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 358, height: 381, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ThemeImage
                    name="group_welcome_info"
                    src={srcGroupWelcomeInfo ?? '${image.library.url}guilds/group_welcome_info.png'}
                    layout={{ position: 'absolute', left: 20, width: 316, bottom: 86, height: 155 }}
                />
                <ButtonThick
                    variant="3"
                    name="ok_button"
                    onPointerTap={onOkButton}
                    layout={{ position: 'absolute', left: 115, width: 131, bottom: 48, height: 29, minWidth: 131, maxWidth: 131 }}
                >
                    {t('group.created.ok')}
                </ButtonThick>
                <Region layout={{ position: 'absolute', left: 22, width: 311, top: 10, height: 150, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('group.created.info')}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 311 }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};
