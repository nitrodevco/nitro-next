import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1694_club_buy_info_item_xml` (layout "club_buy_info_item", 151x139) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubBuyInfoItemLayoutProps {
    captionInfoContent?: string;
    captionItemHeader?: string;
    layout?: BoxLayout;
}

export const ClubBuyInfoItemLayout = ({ captionInfoContent, captionItemHeader, layout }: ClubBuyInfoItemLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 151, height: 139, ...layout }}>
            <Border
                variant="2"
                params={16}
                tintColor="#9b9448"
                layout={{ position: 'absolute', left: 0, width: 151, top: 0, height: 139 }}
            >
                <Border
                    variant="2"
                    params={16}
                    tintColor="#ebeada"
                    layout={{ position: 'absolute', left: 1, width: 149, top: 1, height: 137 }}
                />
                <Border
                    variant="2"
                    params={16}
                    tintColor="#9b9448"
                    layout={{ position: 'absolute', left: 5, width: 141, top: 5, height: 25 }}
                >
                    <Region
                        name="item_header"
                        params={786448}
                        layout={{ position: 'absolute', left: 0, width: 141, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionItemHeader ?? t('catalog.club.info.header')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Border>
                <Region
                    name="info_content"
                    params={16}
                    layout={{ position: 'absolute', left: 9, width: 134, top: 44, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfoContent ?? t('catalog.club.info.content')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 134 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
