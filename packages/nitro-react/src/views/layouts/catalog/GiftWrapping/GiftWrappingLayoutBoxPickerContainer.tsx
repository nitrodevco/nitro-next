import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

import { GiftWrappingLayoutPickBoxPriceTitleItem } from './GiftWrappingLayoutPickBoxPriceTitleItem';
import { GiftWrappingLayoutSmallCoinItem } from './GiftWrappingLayoutSmallCoinItem';

/** Named region `box_picker_container` of GiftWrappingLayout - configured through the parent's `boxPickerContainer` prop. */
export interface GiftWrappingLayoutBoxPickerContainerProps {
    captionPickBoxTitle?: string;
    captionPickRibbonTitle?: string;
    itemsPriceBoxContainer?: ReactNode;
    layout?: BoxLayout;
    onBoxNext?: () => void;
    onBoxPrev?: () => void;
    onRibbonNext?: () => void;
    onRibbonPrev?: () => void;
    srcProductImage?: string;
    tintProductImage?: string;
}

export const GiftWrappingLayoutBoxPickerContainer = ({ captionPickBoxTitle, captionPickRibbonTitle, itemsPriceBoxContainer, layout, onBoxNext, onBoxPrev, onRibbonNext, onRibbonPrev, srcProductImage, tintProductImage }: GiftWrappingLayoutBoxPickerContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="box_picker_container"
            layout={{ position: 'absolute', left: 10, width: 306, top: 253, height: 83, ...layout }}
        >
            <Border
                variant="0"
                name="image_border"
                tintColor="#f1f1f1"
                layout={{ position: 'absolute', left: 0, width: 82, top: 0, height: 82 }}
            >
                <ThemeImage
                    name="product_image"
                    src={srcProductImage}
                    tint={tintProductImage}
                    layout={{ position: 'absolute', left: 1, width: 80, top: 1, height: 80 }}
                />
            </Border>
            <Region
                name="pick_box_title"
                layout={{ position: 'absolute', left: 154, width: 152, top: 5, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPickBoxTitle ?? t('catalog.gift_wrapping.pick_box')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="price_box_container"
                layout={{ position: 'absolute', left: 154, top: 20, flexDirection: 'row' }}
            >
                {itemsPriceBoxContainer ?? (
                    <>
                        <GiftWrappingLayoutPickBoxPriceTitleItem />
                        <GiftWrappingLayoutSmallCoinItem />
                    </>
                )}
            </Region>
            <ContainerButton
                variant="0"
                name="box_prev"
                onPointerTap={onBoxPrev}
                layout={{ position: 'absolute', left: 92, width: 25, top: 9, height: 25 }}
            >
                <Icon
                    variant="2"
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 7, width: 17, top: 8, height: 16 }}
                />
            </ContainerButton>
            <ContainerButton
                variant="0"
                name="box_next"
                onPointerTap={onBoxNext}
                layout={{ position: 'absolute', left: 121, width: 25, top: 9, height: 25 }}
            >
                <Icon
                    variant="3"
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 8, width: 17, top: 8, height: 16 }}
                />
            </ContainerButton>
            <Region
                name="pick_ribbon_title"
                layout={{ position: 'absolute', left: 154, width: 152, top: 50, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPickRibbonTitle ?? t('catalog.gift_wrapping.pick_ribbon.title')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <ContainerButton
                variant="0"
                name="ribbon_prev"
                onPointerTap={onRibbonPrev}
                layout={{ position: 'absolute', left: 92, width: 25, top: 47, height: 25 }}
            >
                <Icon
                    variant="2"
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 7, width: 17, top: 8, height: 16 }}
                />
            </ContainerButton>
            <ContainerButton
                variant="0"
                name="ribbon_next"
                onPointerTap={onRibbonNext}
                layout={{ position: 'absolute', left: 121, width: 25, top: 47, height: 25 }}
            >
                <Icon
                    variant="3"
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 9, width: 17, top: 8, height: 16 }}
                />
            </ContainerButton>
        </Region>
    );
};
