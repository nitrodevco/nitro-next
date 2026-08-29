import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `2996_grs_category_selector_xml` (layout "grs_category_selector", 345x55) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsCategorySelectorLayoutProps {
    layout?: BoxLayout;
    row?: GrsCategorySelectorLayoutRowProps;
}

export const GrsCategorySelectorLayout = ({ layout, row }: GrsCategorySelectorLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 345, height: 55, ...layout }}>
            <GrsCategorySelectorLayoutRow {...row} />
        </Region>
    );
};

/** Named region `toggle_open_region` of GrsCategorySelectorLayout - configured through the parent's `toggleOpenRegion` prop. */
export interface GrsCategorySelectorLayoutToggleOpenRegionProps {
    captionOpenTxt?: string;
    layout?: BoxLayout;
    onToggleOpenRegion?: () => void;
}

export const GrsCategorySelectorLayoutToggleOpenRegion = ({ captionOpenTxt, layout, onToggleOpenRegion }: GrsCategorySelectorLayoutToggleOpenRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="toggle_open_region"
            params={17}
            onPointerTap={onToggleOpenRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 10, width: 328, top: 30, height: 17, ...layout }}
        >
            <Region
                name="open_txt"
                params={16}
                layout={{ position: 'absolute', left: -1, width: 157, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionOpenTxt ?? t('navigator.categories.viewmore')} />
            </Region>
            <Icon
                variant="5"
                name="arrow_right_icon"
                params={16}
                tintColor="#000000"
                layout={{ position: 'absolute', left: 260, width: 12, top: 5, height: 18 }}
            />
        </Region>
    );
};

/** Named region `row` of GrsCategorySelectorLayout - configured through the parent's `row` prop. */
export interface GrsCategorySelectorLayoutRowProps {
    captionCategoryNameTxt?: string;
    layout?: BoxLayout;
    onEnterCategoryButton?: () => void;
    srcNaviRoomIcon?: string;
    toggleOpenRegion?: GrsCategorySelectorLayoutToggleOpenRegionProps;
}

export const GrsCategorySelectorLayoutRow = ({ captionCategoryNameTxt, layout, onEnterCategoryButton, srcNaviRoomIcon, toggleOpenRegion }: GrsCategorySelectorLayoutRowProps) => {
    return (
        <Region
            name="row"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 345, top: 0, height: 55, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="enter_category_button"
                params={145}
                onPointerTap={onEnterCategoryButton}
                layout={{ position: 'absolute', left: 1, right: 0, top: 0, height: 53 }}
            >
                <Region
                    name="category_name_txt"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 250, top: 8, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionCategoryNameTxt ?? 'Dippa daa'} />
                </Region>
                <ThemeImage
                    name="navi_room_icon"
                    params={80}
                    src={srcNaviRoomIcon}
                    layout={{ position: 'absolute', right: 13, width: 44, top: 3, height: 30 }}
                />
                <GrsCategorySelectorLayoutToggleOpenRegion {...toggleOpenRegion} />
            </ContainerButton>
        </Region>
    );
};
