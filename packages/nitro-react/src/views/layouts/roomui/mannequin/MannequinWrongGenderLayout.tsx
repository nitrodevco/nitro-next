import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `901_mannequin_wrong_gender_xml` (layout "mannequin_peer_wrong_gender", 386x180) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MannequinWrongGenderLayoutProps {
    captionDescription?: string;
    layout?: BoxLayout;
    onOkButton?: () => void;
    srcPreviewImage?: string;
}

export const MannequinWrongGenderLayout = ({ captionDescription, layout, onOkButton, srcPreviewImage }: MannequinWrongGenderLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 386, height: 180, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 386, top: 0, height: 180 }}>
                <ButtonThick
                    variant="3"
                    name="ok_button"
                    onPointerTap={onOkButton}
                    layout={{ position: 'absolute', left: 289, width: 75, top: 141, height: 28, minWidth: 75, maxWidth: 140 }}
                >
                    {t('generic.ok')}
                </ButtonThick>
                <ThemeImage
                    name="preview_image"
                    src={srcPreviewImage}
                    layout={{ position: 'absolute', left: 20, width: 83, top: 10, height: 130 }}
                />
                <Region
                    name="description"
                    layout={{ position: 'absolute', left: 126, width: 245, top: 52, height: 86, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescription ?? t('mannequin.widget.wronggender')}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 245 }}
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
