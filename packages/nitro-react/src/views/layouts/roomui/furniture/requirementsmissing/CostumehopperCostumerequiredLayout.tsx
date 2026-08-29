import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `859_costumehopper_costumerequired_xml` (layout "costumehopper_costumerequired", 310x149) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CostumehopperCostumerequiredLayoutProps {
    layout?: BoxLayout;
    list?: CostumehopperCostumerequiredLayoutListProps;
    onClose?: () => void;
    srcIllustration?: string;
}

export const CostumehopperCostumerequiredLayout = ({ layout, list, onClose, srcIllustration }: CostumehopperCostumerequiredLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            caption={t('costumehopper.costumerequired.header')}
            onClose={onClose}
            layout={{ width: 310, height: 149, ...layout }}
        >
            <ThemeImage
                name="illustration"
                src={srcIllustration}
                layout={{ position: 'absolute', left: 10, width: 1, top: 0, height: 1 }}
            />
            <CostumehopperCostumerequiredLayoutList {...list} />
        </Frame>
    );
};

/** Row template `title` of CostumehopperCostumerequiredLayout - pass real rows through its `items…` slot. */
export interface CostumehopperCostumerequiredLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const CostumehopperCostumerequiredLayoutTitleItem = ({ captionTitle, layout }: CostumehopperCostumerequiredLayoutTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="title"
            layout={{ width: 183, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTitle ?? t('costumehopper.costumerequired.title')}
                textStyle="text-style-il-heading-1"
                textOptions={{ fill: '#c30000' }}
            />
        </Region>
    );
};

/** Row template `bodytext` of CostumehopperCostumerequiredLayout - pass real rows through its `items…` slot. */
export interface CostumehopperCostumerequiredLayoutBodytextItemProps {
    captionBodytext?: string;
    layout?: BoxLayout;
}

export const CostumehopperCostumerequiredLayoutBodytextItem = ({ captionBodytext, layout }: CostumehopperCostumerequiredLayoutBodytextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bodytext"
            layout={{ width: 291, height: 24, flexShrink: 0, minWidth: 291, maxWidth: 291, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionBodytext ?? t('costumehopper.costumerequired.bodytext')}
                textOptions={{ wordWrap: true, wordWrapWidth: 291 }}
            />
        </Region>
    );
};

/** Row template `list_top` of CostumehopperCostumerequiredLayout - pass real rows through its `items…` slot. */
export interface CostumehopperCostumerequiredLayoutListTopItemProps {
    itemsListTop?: ReactNode;
    layout?: BoxLayout;
}

export const CostumehopperCostumerequiredLayoutListTopItem = ({ itemsListTop, layout }: CostumehopperCostumerequiredLayoutListTopItemProps) => {
    return (
        <Region
            name="list_top"
            layout={{ flexShrink: 0, flexDirection: 'column', ...layout }}
        >
            {itemsListTop ?? (
                <>
                    <CostumehopperCostumerequiredLayoutTitleItem />
                    <CostumehopperCostumerequiredLayoutBodytextItem />
                </>
            )}
        </Region>
    );
};

/** Row template `spacer` of CostumehopperCostumerequiredLayout - pass real rows through its `items…` slot. */
export interface CostumehopperCostumerequiredLayoutSpacerItemProps {
    layout?: BoxLayout;
    srcSpacer?: string;
}

export const CostumehopperCostumerequiredLayoutSpacerItem = ({ layout, srcSpacer }: CostumehopperCostumerequiredLayoutSpacerItemProps) => {
    return (
        <ThemeImage
            name="spacer"
            src={srcSpacer}
            layout={{ width: 291, height: 4, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `buy_costumes` of CostumehopperCostumerequiredLayout - pass real rows through its `items…` slot. */
export interface CostumehopperCostumerequiredLayoutBuyCostumesItemProps {
    layout?: BoxLayout;
    onBuyCostumes?: () => void;
}

export const CostumehopperCostumerequiredLayoutBuyCostumesItem = ({ layout, onBuyCostumes }: CostumehopperCostumerequiredLayoutBuyCostumesItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="5"
            name="buy_costumes"
            tintColor="#00aa00"
            onPointerTap={onBuyCostumes}
            layout={{ width: 193, height: 32, flexShrink: 0, ...layout }}
        >
            {t('costumehopper.costumerequired.buy')}
        </ButtonThick>
    );
};

/** Row template `list_bottom` of CostumehopperCostumerequiredLayout - pass real rows through its `items…` slot. */
export interface CostumehopperCostumerequiredLayoutListBottomItemProps {
    itemsListBottom?: ReactNode;
    layout?: BoxLayout;
}

export const CostumehopperCostumerequiredLayoutListBottomItem = ({ itemsListBottom, layout }: CostumehopperCostumerequiredLayoutListBottomItemProps) => {
    return (
        <Region
            name="list_bottom"
            layout={{ flexShrink: 0, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsListBottom ?? (
                <>
                    <CostumehopperCostumerequiredLayoutSpacerItem />
                    <CostumehopperCostumerequiredLayoutBuyCostumesItem />
                </>
            )}
            <ThemeImage
                src={layoutImage('illumina_horizontal_separator.png')}
                layout={{ width: 291, height: 3, flexShrink: 0 }}
            />
        </Region>
    );
};

/** Named region `list` of CostumehopperCostumerequiredLayout - configured through the parent's `list` prop. */
export interface CostumehopperCostumerequiredLayoutListProps {
    itemsList?: ReactNode;
    layout?: BoxLayout;
}

export const CostumehopperCostumerequiredLayoutList = ({ itemsList, layout }: CostumehopperCostumerequiredLayoutListProps) => {
    return (
        <Region
            name="list"
            layout={{ position: 'absolute', left: 10, top: 0, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsList ?? (
                <>
                    <CostumehopperCostumerequiredLayoutListTopItem />
                    <CostumehopperCostumerequiredLayoutListBottomItem />
                </>
            )}
        </Region>
    );
};
