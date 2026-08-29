import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `addons_list` of BuilderAddonsWidget - configured through the parent's `addonsList` prop. */
export interface BuilderAddonsWidgetAddonsListProps {
    captionDiamondsPrice?: string;
    captionItemHeader?: string;
    captionItemPrice?: string;
    layout?: BoxLayout;
    onItemBuy?: () => void;
    srcDiamondsIcon?: string;
    visibleDiamondsIcon?: boolean;
    visibleDiamondsPrice?: boolean;
}

export const BuilderAddonsWidgetAddonsList = ({ captionDiamondsPrice, captionItemHeader, captionItemPrice, layout, onItemBuy, srcDiamondsIcon, visibleDiamondsIcon, visibleDiamondsPrice }: BuilderAddonsWidgetAddonsListProps) => {
    const t = useTranslation();

    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 287, top: 0, bottom: 20, ...layout }}
        >
            <Region
                name="addons_list"
                layout={{ flexDirection: 'column', gap: 12, width: '100%' }}
            >
                <Border
                    variant="2"
                    tintColor="#d7d7cf"
                    layout={{ width: 269, height: 77, flexShrink: 0 }}
                >
                    <Border
                        variant="3"
                        tintColor="#afafa9"
                        layout={{ position: 'absolute', left: 5, width: 260, top: 5, height: 25 }}
                    >
                        <ThemeImage
                            src="${image.library.url}/catalogue/icon_193.png"
                            layout={{ position: 'absolute', left: 8, width: 15, top: 5, height: 15 }}
                        />
                        <Region
                            name="item_header"
                            layout={{ position: 'absolute', left: 33, width: 88, top: 2, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionItemHeader ?? 'item name'}
                                textStyle="text-style-u-headline-medium"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    </Border>
                    <Region layout={{ position: 'absolute', left: 9, width: 105, top: 45, height: 24, flexDirection: 'row', gap: 3 }}>
                        <Region
                            name="item_price"
                            layout={{ width: 28, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionItemPrice ?? '999'}
                                textStyle="text-style-u-headline-small"
                            />
                        </Region>
                        <ThemeImage
                            src={layoutImage('pursearea_credits_icon.png')}
                            layout={{ width: 15, height: 15, flexShrink: 0 }}
                        />
                        {(visibleDiamondsPrice ?? false) && (
                            <Region
                                name="diamonds_price"
                                layout={{ width: 28, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionDiamondsPrice ?? '999'}
                                    textStyle="text-style-u-headline-small"
                                />
                            </Region>
                        )}
                        {(visibleDiamondsIcon ?? false) && (
                            <ThemeImage
                                name="diamonds_icon"
                                src={srcDiamondsIcon ?? layoutImage('pursearea_diamond_icon.png')}
                                layout={{ width: 15, height: 15, flexShrink: 0 }}
                            />
                        )}
                    </Region>
                    <ButtonThick
                        variant="5"
                        name="item_buy"
                        tintColor="#0a9bc5"
                        onPointerTap={onItemBuy}
                        layout={{ position: 'absolute', right: 4, width: 142, top: 37, height: 35, minWidth: 40 }}
                    >
                        {t('buy')}
                    </ButtonThick>
                </Border>
            </Region>
        </ScrollArea>
    );
};
