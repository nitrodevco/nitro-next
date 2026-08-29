import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `top_container` of CollectibleRewardLayout - configured through the parent's `topContainer` prop. */
export interface CollectibleRewardLayoutTopContainerProps {
    captionProductName?: string;
    captionTitleText?: string;
    layout?: BoxLayout;
    productImage?: ReactNode;
    srcGradient?: string;
    srcRotatingStar?: string;
}

export const CollectibleRewardLayoutTopContainer = ({ captionProductName, captionTitleText, layout, productImage, srcGradient, srcRotatingStar }: CollectibleRewardLayoutTopContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="top_container"
            layout={{ position: 'absolute', left: 0, right: -12, top: 0, height: 350, justifyContent: 'center', ...layout }}
        >
            <Region
                name="collector_hub_background"
                layout={{ position: 'absolute', left: -2, right: -2, top: 0, height: 565 }}
            >
                <ThemeImage
                    name="gradient"
                    src={srcGradient ?? layoutImage('collectables_score_background_gradient.png')}
                    tint="#000000"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 348 }}
                />
                <Border
                    variant="3"
                    name="dimmer"
                    tintColor="#000000"
                    blend={0.5}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 348 }}
                />
            </Region>
            <Region
                name="text_container"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 58 }}
            >
                <Region
                    name="title_text"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 4, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionTitleText ?? t('collectibles.reward_box.contains')}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <Region
                    name="product_name"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 32, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionProductName ?? 'Product Name'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#f3cd03', align: 'center' }}
                    />
                </Region>
            </Region>
            <Region
                name="product_container"
                layout={{ position: 'absolute', width: 300, top: 25, height: 300 }}
            >
                <ThemeImage
                    name="rotating_star"
                    src={srcRotatingStar ?? layoutImage('bg_star_300x300.png')}
                    tint="#ffecac"
                    layout={{ position: 'absolute', left: 0, width: 300, top: 0, height: 300 }}
                />
                <WidgetSlot
                    widgetType="product_image"
                    name="product_image"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    {productImage}
                </WidgetSlot>
            </Region>
        </Region>
    );
};
