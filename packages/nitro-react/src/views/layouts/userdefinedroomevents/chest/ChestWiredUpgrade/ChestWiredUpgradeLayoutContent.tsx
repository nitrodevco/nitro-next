import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

import { ChestWiredUpgradeLayoutButtonsItem } from './ChestWiredUpgradeLayoutButtonsItem';
import { ChestWiredUpgradeLayoutErrorTextItem } from './ChestWiredUpgradeLayoutErrorTextItem';
import { ChestWiredUpgradeLayoutProductNameItem } from './ChestWiredUpgradeLayoutProductNameItem';
import { ChestWiredUpgradeLayoutWarningItem } from './ChestWiredUpgradeLayoutWarningItem';

/** Named region `content` of ChestWiredUpgradeLayout - configured through the parent's `content` prop. */
export interface ChestWiredUpgradeLayoutContentProps {
    captionFree?: string;
    itemsContent?: ReactNode;
    itemsPropertiesItemlist?: ReactNode;
    layout?: BoxLayout;
    srcProductImage?: string;
    srcWiredIcon?: string;
    tintProductImage?: string;
}

export const ChestWiredUpgradeLayoutContent = ({ captionFree, itemsContent, itemsPropertiesItemlist, layout, srcProductImage, srcWiredIcon, tintProductImage }: ChestWiredUpgradeLayoutContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="content"
            layout={{ position: 'absolute', left: 0, right: -10, top: 8, bottom: -3, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsContent ?? (
                <>
                    <ChestWiredUpgradeLayoutErrorTextItem />
                    <ChestWiredUpgradeLayoutButtonsItem />
                </>
            )}
            <Region layout={{ width: 349, height: 164, flexShrink: 0 }}>
                <Border
                    variant="0"
                    tintColor="#f1f1f1"
                    layout={{ position: 'absolute', left: 10, width: 126, top: 12, height: 152 }}
                >
                    <ThemeImage
                        name="product_image"
                        src={srcProductImage}
                        tint={tintProductImage}
                        layout={{ position: 'absolute', left: 1, width: 126, top: 1, height: 152 }}
                    />
                    <ThemeImage
                        name="wired_icon"
                        src={srcWiredIcon ?? '${image.library.url}catalogue/icon_80.png'}
                        layout={{ position: 'absolute', left: 89, width: 30, top: 7, height: 30 }}
                    />
                </Border>
                <Region
                    name="properties_itemlist"
                    layout={{ position: 'absolute', left: 143, right: 9, top: 15, height: 67, flexDirection: 'column', gap: 4 }}
                >
                    {itemsPropertiesItemlist ?? (
                        <>
                            <ChestWiredUpgradeLayoutProductNameItem />
                            <ChestWiredUpgradeLayoutWarningItem />
                        </>
                    )}
                </Region>
                <Region layout={{ position: 'absolute', left: 142, width: 307, top: 137, height: 22, flexDirection: 'row' }}>
                    <ThemeText
                        text={t('catalog.purchase.confirmation.dialog.cost')}
                        textStyle="text-style-u-regular"
                        layout={{ width: 268, height: 19, flexShrink: 0 }}
                    />
                    <ThemeText
                        text={captionFree ?? t('wiredchests.upgrade.wired.cost')}
                        name="free"
                        layout={{ width: 39, height: 19, flexShrink: 0 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
