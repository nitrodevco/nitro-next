import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1491_avatar_popup_xml` (layout "avatar_popup", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarPopupLayoutProps {
    captionLastAccessText?: string;
    captionMottoText?: string;
    captionNameTextOffline?: string;
    captionNameTextOnline?: string;
    captionOnlineText?: string;
    layout?: BoxLayout;
    srcFace?: string;
    srcOffline?: string;
}

export const AvatarPopupLayout = ({ captionLastAccessText, captionMottoText, captionNameTextOffline, captionNameTextOnline, captionOnlineText, layout, srcFace, srcOffline }: AvatarPopupLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Border
                variant="0"
                name="avatar_popup"
                layout={{ position: 'absolute', left: 0, width: 203, top: 0, height: 90 }}
            >
                <ThemeImage
                    name="face"
                    src={srcFace}
                    layout={{ position: 'absolute', left: 11, width: 32, top: 5, height: 72 }}
                />
                <Region
                    name="name_text_online"
                    layout={{ position: 'absolute', left: 40, top: 5, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionNameTextOnline ?? 'PH Avatar Name'}
                        textOptions={{ fill: '#000000' }}
                    />
                </Region>
                <Region
                    name="name_text_offline"
                    layout={{ position: 'absolute', left: 60, width: 140, top: 9, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionNameTextOffline ?? 'PH Avatar Name'}
                        textOptions={{ fill: '#000000' }}
                    />
                </Region>
                <Region
                    name="motto_text"
                    layout={{ position: 'absolute', left: 40, width: 150, top: 20, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMottoText ?? 'PH Room Desc: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit'}
                        textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 150 }}
                    />
                </Region>
                <Region
                    name="online_text"
                    layout={{ position: 'absolute', left: 10, width: 180, top: 66, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionOnlineText ?? t('friendlist.avatarpopup.online')}
                        textOptions={{ fill: '#000000' }}
                    />
                </Region>
                <ThemeImage
                    name="offline"
                    src={srcOffline}
                    layout={{ position: 'absolute', left: 10, width: 30, top: 8, height: 10 }}
                />
                <Region
                    name="last_access_text"
                    layout={{ position: 'absolute', left: 10, width: 180, top: 27, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionLastAccessText ?? t('friendlist.avatarpopup.lastaccess')}
                        textOptions={{ fill: '#000000' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
