import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `947_mannequin_peer_main_xml` (layout "mannequin_peer_wear", 386x180) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MannequinPeerMainLayoutProps {
    captionDescription?: string;
    captionOutfitNameShow?: string;
    layout?: BoxLayout;
    onWearButton?: () => void;
    srcPreviewImage?: string;
}

export const MannequinPeerMainLayout = ({ captionDescription, captionOutfitNameShow, layout, onWearButton, srcPreviewImage }: MannequinPeerMainLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 386, height: 180, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 386, top: 0, height: 180 }}>
                <ButtonThick
                    variant="3"
                    name="wear_button"
                    onPointerTap={onWearButton}
                    layout={{ position: 'absolute', left: 227, width: 145, top: 141, height: 28, minWidth: 138, maxWidth: 145 }}
                >
                    {t('mannequin.widget.wear')}
                </ButtonThick>
                <ThemeImage
                    name="preview_image"
                    src={srcPreviewImage}
                    layout={{ position: 'absolute', left: 20, width: 83, top: 10, height: 130 }}
                />
                <Region
                    name="outfit_name_show"
                    layout={{ position: 'absolute', left: 126, width: 244, top: 30, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionOutfitNameShow ?? ''}
                        textStyle="text-style-u-italic"
                    />
                </Region>
                <Region
                    name="description"
                    layout={{ position: 'absolute', left: 126, width: 242, top: 60, height: 61, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescription ?? t('mannequin.widget.weartext')}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 242 }}
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
