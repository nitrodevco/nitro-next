import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `947_mannequin_peer_main_xml` (layout "mannequin_peer_wear", 386x180) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MannequinPeerMainLayoutProps {
    captionDescription?: string;
    captionOutfitNameShow?: string;
    layout?: BoxLayout;
    onWearButton?: () => void;
    srcPreviewImage?: string;
    tintPreviewImage?: string;
}

export const MannequinPeerMainLayout = ({ captionDescription, captionOutfitNameShow, layout, onWearButton, srcPreviewImage, tintPreviewImage }: MannequinPeerMainLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 386, height: 180, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <ButtonThick
                    variant="3"
                    name="wear_button"
                    onPointerTap={onWearButton}
                    layout={{ position: 'absolute', left: 227, width: 145, bottom: 11, height: 28, minWidth: 138, maxWidth: 145 }}
                >
                    {t('mannequin.widget.wear')}
                </ButtonThick>
                <ThemeImage
                    name="preview_image"
                    src={srcPreviewImage}
                    tint={tintPreviewImage}
                    layout={{ position: 'absolute', left: 20, width: 83, top: 10, height: 130 }}
                />
                <ThemeText
                    text={captionOutfitNameShow ?? ''}
                    textStyle="text-style-u-italic"
                    name="outfit_name_show"
                    layout={{ position: 'absolute', left: 126, width: 244, top: 30, height: 25 }}
                />
                <ThemeText
                    text={captionDescription ?? t('mannequin.widget.weartext')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 242 }}
                    name="description"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 126, width: 242, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 61 }}
                />
                <Icon
                    variant="0"
                    name="club_icon"
                    layout={{ position: 'absolute', left: 80, width: 43, top: 110, height: 29 }}
                />
            </Region>
        </Region>
    );
};
