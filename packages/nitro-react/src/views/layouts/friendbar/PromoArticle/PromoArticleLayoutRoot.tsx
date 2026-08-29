import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage } from '#base/theme';

import { PromoArticleLayoutBorderBarItem } from './PromoArticleLayoutBorderBarItem';
import { PromoArticleLayoutButtonItem } from './PromoArticleLayoutButtonItem';
import { PromoArticleLayoutHdrLineItem } from './PromoArticleLayoutHdrLineItem';
import { PromoArticleLayoutHeaderTxtItem } from './PromoArticleLayoutHeaderTxtItem';
import { PromoArticleLayoutNavigation, PromoArticleLayoutNavigationProps } from './PromoArticleLayoutNavigation';
import { PromoArticleLayoutPromoTextItem } from './PromoArticleLayoutPromoTextItem';
import { PromoArticleLayoutPromoTitleItem } from './PromoArticleLayoutPromoTitleItem';

/** Named region `root` of PromoArticleLayout - configured through the parent's `root` prop. */
export interface PromoArticleLayoutRootProps {
    itemsContent?: ReactNode;
    itemsTitle?: ReactNode;
    layout?: BoxLayout;
    navigation?: PromoArticleLayoutNavigationProps;
    srcPromoImage?: string;
}

export const PromoArticleLayoutRoot = ({ itemsContent, itemsTitle, layout, navigation, srcPromoImage }: PromoArticleLayoutRootProps) => {
    return (
        <Region
            name="root"
            layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 118, maxWidth: 500, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, minWidth: 500, maxWidth: 500, flexDirection: 'row', gap: 4 }}
            >
                {itemsTitle ?? (
                    <>
                        <PromoArticleLayoutBorderBarItem />
                        <PromoArticleLayoutHeaderTxtItem />
                        <PromoArticleLayoutHdrLineItem />
                    </>
                )}
            </Region>
            <PromoArticleLayoutNavigation {...navigation} />
            <Region
                name="article"
                layout={{ position: 'absolute', left: 0, width: 500, top: 17, height: 101 }}
            >
                <ThemeImage
                    name="promo_image"
                    src={srcPromoImage}
                    layout={{ position: 'absolute', left: 10, width: 150, top: 19, height: 82, maxWidth: 150 }}
                />
                <Region
                    name="content"
                    layout={{ position: 'absolute', left: 170, width: 330, top: 0, height: 34, flexDirection: 'column', gap: 6 }}
                >
                    {itemsContent ?? (
                        <>
                            <PromoArticleLayoutPromoTitleItem />
                            <PromoArticleLayoutPromoTextItem />
                            <PromoArticleLayoutButtonItem />
                        </>
                    )}
                </Region>
            </Region>
        </Region>
    );
};
