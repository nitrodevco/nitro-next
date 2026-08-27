import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `117_AchievementCategory_xml` (layout "AchievementCategory", 112x105) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AchievementCategoryLayoutProps {
    captionCompletionTxt?: string;
    captionHeaderTxt?: string;
    captionUnseenCount?: string;
    layout?: BoxLayout;
    onCategoryRegion?: () => void;
    srcCategoryBgAct?: string;
    srcCategoryBgActHover?: string;
    srcCategoryBgInact?: string;
    srcCategoryPicBitmap?: string;
}

export const AchievementCategoryLayout = ({ captionCompletionTxt, captionHeaderTxt, captionUnseenCount, layout, onCategoryRegion, srcCategoryBgAct, srcCategoryBgActHover, srcCategoryBgInact, srcCategoryPicBitmap }: AchievementCategoryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 112, height: 105, ...layout }}>
            <Region
                name="achievement_category_container"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 105 }}
            >
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 105 }}
                >
                    <ThemeImage
                        name="category_bg_act"
                        params={3089}
                        src={srcCategoryBgAct ?? '${image.library.questing.url}achievement_background_active_1.png'}
                        layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 105 }}
                    />
                </Region>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 105 }}
                >
                    <ThemeImage
                        name="category_bg_act_hover"
                        params={3089}
                        src={srcCategoryBgActHover ?? '${image.library.questing.url}achievement_background_active_2.png'}
                        layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 105 }}
                    />
                </Region>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 110, top: 1, height: 103 }}
                >
                    <ThemeImage
                        name="category_bg_inact"
                        params={3088}
                        src={srcCategoryBgInact ?? '${image.library.questing.url}achievement_category_bkg_empty_3.png'}
                        layout={{ position: 'absolute', left: 0, width: 110, top: 1, height: 103 }}
                    />
                </Region>
                <Region
                    name="hover_container"
                    params={16}
                    layout={{ position: 'absolute', left: 1, width: 115, top: 1, height: 104 }}
                >
                    <Region
                        name="header_txt"
                        params={208}
                        layout={{ position: 'absolute', left: 23, width: 65, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionHeaderTxt ?? 'Decoration'} />
                    </Region>
                    <ThemeImage
                        name="category_pic_bitmap"
                        params={16}
                        src={srcCategoryPicBitmap}
                        layout={{ position: 'absolute', left: 12, width: 86, top: 27, height: 72 }}
                    />
                    <Region
                        name="completion_txt"
                        params={208}
                        layout={{ position: 'absolute', left: 40, width: 30, top: 70, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCompletionTxt ?? '1/10'}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="category_region"
                    tags={[ 'FIT:achievementsSelectCategory' ]}
                    params={17}
                    onPointerTap={onCategoryRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 110, top: 0, height: 103 }}
                />
                <Border
                    variant="7"
                    name="unseen_count_border"
                    params={409616}
                    tintColor="#de4537"
                    layout={{ position: 'absolute', left: 71, width: 18, top: 27, height: 20 }}
                >
                    <Region
                        name="unseen_count"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionUnseenCount ?? '0'}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
