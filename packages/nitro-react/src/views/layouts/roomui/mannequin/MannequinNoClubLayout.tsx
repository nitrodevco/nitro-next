import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `876_mannequin_no_club_xml` (layout "mannequin_peer_no_club", 386x180) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MannequinNoClubLayoutProps {
    captionDescription?: string;
    layout?: BoxLayout;
    onGetClubButton?: () => void;
    srcPreviewImage?: string;
    tintPreviewImage?: string;
}

export const MannequinNoClubLayout = ({ captionDescription, layout, onGetClubButton, srcPreviewImage, tintPreviewImage }: MannequinNoClubLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 386, height: 180, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <ButtonThick
                    variant="3"
                    name="get_club_button"
                    onPointerTap={onGetClubButton}
                    layout={{ position: 'absolute', right: 6, width: 174, bottom: 11, height: 28, minWidth: 164 }}
                >
                    {t('mannequin.widget.getclub')}
                </ButtonThick>
                <ThemeImage
                    name="preview_image"
                    src={srcPreviewImage}
                    tint={tintPreviewImage}
                    layout={{ position: 'absolute', left: 20, width: 83, top: 10, height: 130 }}
                />
                <Region
                    name="description"
                    layout={{ position: 'absolute', left: 126, width: 241, top: 52, height: 61, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescription ?? t('mannequin.widget.clubnotification')}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 241 }}
                    />
                </Region>
                <Icon
                    variant="0"
                    name="club_icon"
                    layout={{ position: 'absolute', left: 80, width: 43, top: 110, height: 29 }}
                />
            </Region>
        </Region>
    );
};
