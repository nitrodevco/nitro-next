import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `876_mannequin_no_club_xml` (layout "mannequin_peer_no_club", 386x180) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MannequinNoClubLayoutProps {
    layout?: BoxLayout;
    onGetClubButton?: () => void;
}

export const MannequinNoClubLayout = ({ layout, onGetClubButton }: MannequinNoClubLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 386, height: 180, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 386, top: 0, height: 180 }}
            >
                <ButtonThick
                    variant="3"
                    name="get_club_button"
                    params={131089}
                    onPointerTap={onGetClubButton}
                    layout={{ position: 'absolute', left: 206, width: 174, top: 141, height: 28, minWidth: 164 }}
                >
                    {t('mannequin.widget.getclub')}
                </ButtonThick>
                <ThemeImage
                    name="preview_image"
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 20, width: 83, top: 10, height: 130 }}
                />
                <Region
                    name="description"
                    params={16}
                    layout={{ position: 'absolute', left: 126, width: 241, top: 52, height: 61, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('mannequin.widget.clubnotification')}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 241 }}
                    />
                </Region>
                <Icon
                    variant="0"
                    name="club_icon"
                    params={16}
                    layout={{ position: 'absolute', left: 80, width: 43, top: 110, height: 29 }}
                />
            </Region>
        </Region>
    );
};
