import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `866_mannequin_controller_save_xml` (layout "mannequin_owner_save", 386x180) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MannequinControllerSaveLayoutProps {
    captionBackText?: string;
    captionDescription?: string;
    captionOutfitNameShow?: string;
    layout?: BoxLayout;
    onBackRegion?: () => void;
    onSaveButton?: () => void;
    srcPreviewImage?: string;
    tintPreviewImage?: string;
}

export const MannequinControllerSaveLayout = ({ captionBackText, captionDescription, captionOutfitNameShow, layout, onBackRegion, onSaveButton, srcPreviewImage, tintPreviewImage }: MannequinControllerSaveLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 386, height: 180, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 386, top: 0, height: 180 }}>
                <ButtonThick
                    variant="3"
                    name="save_button"
                    onPointerTap={onSaveButton}
                    layout={{ position: 'absolute', left: 227, width: 145, top: 141, height: 28, minWidth: 130, maxWidth: 145 }}
                >
                    {t('mannequin.widget.save')}
                </ButtonThick>
                <ThemeImage
                    name="preview_image"
                    src={srcPreviewImage}
                    tint={tintPreviewImage}
                    layout={{ position: 'absolute', left: 20, width: 83, top: 10, height: 130 }}
                />
                <Region
                    name="outfit_name_show"
                    layout={{ position: 'absolute', left: 126, width: 254, top: 30, height: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionOutfitNameShow ?? ''}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Region
                    name="description"
                    layout={{ position: 'absolute', left: 126, width: 197, top: 60, height: 61, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescription ?? '${mannequin.widget.savetext '}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
                    />
                </Region>
                <Icon
                    variant="0"
                    name="club_icon"
                    layout={{ position: 'absolute', left: 80, width: 43, top: 110, height: 29 }}
                />
                <Region
                    name="back_region"
                    onPointerTap={onBackRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 15, width: 151, top: 147, height: 20 }}
                >
                    <Region
                        name="back_text"
                        layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionBackText ?? 'mannequin.widget.back'}
                            textStyle="text-style-u-regular"
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
