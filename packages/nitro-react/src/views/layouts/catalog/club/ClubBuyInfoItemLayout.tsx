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
                tintColor="#9b9448"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Border
                    variant="2"
                    tintColor="#ebeada"
                    layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                />
                <Border
                    variant="2"
                    tintColor="#9b9448"
                    layout={{ position: 'absolute', left: 5, right: 5, top: 5, height: 25, justifyContent: 'center' }}
                >
                    <Region
                        name="item_header"
                        layout={{ position: 'absolute', width: 141, top: 5, bottom: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionItemHeader ?? t('catalog.club.info.header')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Border>
                <Region
                    name="info_content"
                    layout={{ position: 'absolute', left: 9, right: 8, top: 44, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
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
