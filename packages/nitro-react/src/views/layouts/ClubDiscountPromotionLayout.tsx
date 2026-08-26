import { Border, BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1223_club_discount_promotion_xml` (layout "club_promo_bar", 192x44) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubDiscountPromotionLayoutProps {
    layout?: BoxLayout;
}

export const ClubDiscountPromotionLayout = ({ layout }: ClubDiscountPromotionLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 192, height: 44, ...layout }}>
            <Border
                variant="9"
                name="club_promo_bar_border"
                params={16}
                tintColor="#686661"
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 44 }}
            >
                <ThemeImage
                    name="flashing_animation"
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 3, width: 46, top: 3, height: 37 }}
                />
                <Region
                    name="text_region"
                    params={8388625}
                    layout={{ position: 'absolute', left: 26, width: 161, top: 6, height: 30 }}
                >
                    <Region
                        name="promo_text_shadow"
                        params={16}
                        layout={{ position: 'absolute', left: 1, width: 160, top: 1, height: 30, minWidth: 160, maxWidth: 160, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="club extend discount promo text"
                            textOptions={{ wordWrap: true, wordWrapWidth: 160 }}
                        />
                    </Region>
                    <Region
                        name="promo_text"
                        params={8388624}
                        layout={{ position: 'absolute', left: 0, width: 160, top: 0, height: 30, minWidth: 160, maxWidth: 160, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="club extend discount promo text"
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 160 }}
                        />
                    </Region>
                </Region>
                <Icon
                    variant="14"
                    name="club_icon"
                    params={16}
                    layout={{ position: 'absolute', left: 6, width: 16, top: 7, height: 16 }}
                />
            </Border>
        </Region>
    );
};
