import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `2996_grs_category_selector_xml` (layout "grs_category_selector", 345x55) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsCategorySelectorLayoutProps {
    captionCategoryNameTxt?: string;
    captionOpenTxt?: string;
    layout?: BoxLayout;
    onEnterCategoryButton?: () => void;
    onToggleOpenRegion?: () => void;
    srcNaviRoomIcon?: string;
    tintNaviRoomIcon?: string;
}

export const GrsCategorySelectorLayout = ({ captionCategoryNameTxt, captionOpenTxt, layout, onEnterCategoryButton, onToggleOpenRegion, srcNaviRoomIcon, tintNaviRoomIcon }: GrsCategorySelectorLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 345, height: 55, ...layout }}>
            <Region
                name="row"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ContainerButton
                    variant="3"
                    name="enter_category_button"
                    onPointerTap={onEnterCategoryButton}
                    layout={{ position: 'absolute', left: 1, right: 0, top: 0, height: 53 }}
                >
                    <ThemeText
                        text={captionCategoryNameTxt ?? 'Dippa daa'}
                        name="category_name_txt"
                        layout={{ position: 'absolute', left: 10, width: 250, top: 8, height: 13 }}
                    />
                    <ThemeImage
                        name="navi_room_icon"
                        src={srcNaviRoomIcon}
                        tint={tintNaviRoomIcon}
                        layout={{ position: 'absolute', right: 13, width: 44, top: 3, height: 30 }}
                    />
                    <Region
                        name="toggle_open_region"
                        onPointerTap={onToggleOpenRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 10, width: 328, top: 30, height: 17 }}
                    >
                        <ThemeText
                            text={captionOpenTxt ?? t('navigator.categories.viewmore')}
                            name="open_txt"
                            layout={{ position: 'absolute', left: -1, width: 157, top: 2, height: 13 }}
                        />
                        <Icon
                            variant="5"
                            name="arrow_right_icon"
                            tintColor="#000000"
                            layout={{ position: 'absolute', left: 260, width: 12, top: 5, height: 18 }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};
