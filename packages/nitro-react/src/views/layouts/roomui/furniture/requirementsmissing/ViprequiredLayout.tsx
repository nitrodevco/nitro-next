import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `991_viprequired_xml` (layout "viprequired", 310x149) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ViprequiredLayoutProps {
    layout?: BoxLayout;
    list?: ViprequiredLayoutListProps;
    onClose?: () => void;
    srcIllustration?: string;
}

export const ViprequiredLayout = ({ layout, list, onClose, srcIllustration }: ViprequiredLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="frame"
            name="frame"
            caption={t('viprequired.header')}
            onClose={onClose}
            layout={{ width: 310, height: 149, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ThemeImage
                    name="illustration"
                    src={srcIllustration}
                    layout={{ position: 'absolute', left: 10, width: 1, top: 0, height: 1 }}
                />
                <ViprequiredLayoutList {...list} />
            </Region>
        </Frame>
    );
};

/** Row template `title` of ViprequiredLayout - pass real rows through its `items…` slot. */
export interface ViprequiredLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const ViprequiredLayoutTitleItem = ({ captionTitle, layout, tags }: ViprequiredLayoutTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="title"
            tags={tags}
            layout={{ width: 114, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTitle ?? t('viprequired.title')}
                textStyle="text-style-il-heading-1"
                textOptions={{ fill: '#c30000' }}
            />
        </Region>
    );
};

/** Row template `bodytext` of ViprequiredLayout - pass real rows through its `items…` slot. */
export interface ViprequiredLayoutBodytextItemProps {
    captionBodytext?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const ViprequiredLayoutBodytextItem = ({ captionBodytext, layout, tags }: ViprequiredLayoutBodytextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bodytext"
            tags={tags}
            layout={{ width: 291, height: 24, flexShrink: 0, minWidth: 291, maxWidth: 291, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionBodytext ?? t('viprequired.bodytext')}
                textOptions={{ wordWrap: true, wordWrapWidth: 291 }}
            />
        </Region>
    );
};

/** Row template `list_top` of ViprequiredLayout - pass real rows through its `items…` slot. */
export interface ViprequiredLayoutListTopItemProps {
    itemsListTop?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const ViprequiredLayoutListTopItem = ({ itemsListTop, layout, tags }: ViprequiredLayoutListTopItemProps) => {
    return (
        <Region
            name="list_top"
            tags={tags}
            layout={{ flexShrink: 0, flexDirection: 'column', ...layout }}
        >
            {itemsListTop ?? (
                <>
                    <ViprequiredLayoutTitleItem />
                    <ViprequiredLayoutBodytextItem />
                </>
            )}
        </Region>
    );
};

/** Row template `spacer` of ViprequiredLayout - pass real rows through its `items…` slot. */
export interface ViprequiredLayoutSpacerItemProps {
    layout?: BoxLayout;
    srcSpacer?: string;
    tags?: string[];
}

export const ViprequiredLayoutSpacerItem = ({ layout, srcSpacer, tags }: ViprequiredLayoutSpacerItemProps) => {
    return (
        <ThemeImage
            name="spacer"
            tags={tags}
            src={srcSpacer}
            layout={{ width: 291, height: 4, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `buy_vip` of ViprequiredLayout - pass real rows through its `items…` slot. */
export interface ViprequiredLayoutBuyVipItemProps {
    layout?: BoxLayout;
    onBuyVip?: () => void;
    tags?: string[];
}

export const ViprequiredLayoutBuyVipItem = ({ layout, onBuyVip, tags }: ViprequiredLayoutBuyVipItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="5"
            name="buy_vip"
            tags={tags}
            tintColor="#00aa00"
            onPointerTap={onBuyVip}
            layout={{ width: 133, height: 32, flexShrink: 0, ...layout }}
        >
            {t('viprequired.buy.vip')}
        </ButtonThick>
    );
};

/** Row template `vip_benefits` of ViprequiredLayout - pass real rows through its `items…` slot. */
export interface ViprequiredLayoutVipBenefitsItemProps {
    captionVipBenefits?: string;
    layout?: BoxLayout;
    onVipBenefits?: () => void;
    tags?: string[];
}

export const ViprequiredLayoutVipBenefitsItem = ({ captionVipBenefits, layout, onVipBenefits, tags }: ViprequiredLayoutVipBenefitsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="vip_benefits"
            tags={tags}
            layout={{ width: 262, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
            onPointerTap={onVipBenefits}
            cursor="pointer"
        >
            <ThemeText
                text={captionVipBenefits ?? t('viprequired.vip.benefits')}
                textOptions={{ wordWrap: true, wordWrapWidth: 262, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `list_bottom` of ViprequiredLayout - pass real rows through its `items…` slot. */
export interface ViprequiredLayoutListBottomItemProps {
    itemsListBottom?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const ViprequiredLayoutListBottomItem = ({ itemsListBottom, layout, tags }: ViprequiredLayoutListBottomItemProps) => {
    return (
        <Region
            name="list_bottom"
            tags={tags}
            layout={{ flexShrink: 0, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsListBottom ?? (
                <>
                    <ViprequiredLayoutSpacerItem />
                    <ViprequiredLayoutBuyVipItem />
                    <ViprequiredLayoutVipBenefitsItem />
                </>
            )}
            <ThemeImage
                src={layoutImage('illumina_horizontal_separator.png')}
                layout={{ width: 291, height: 3, flexShrink: 0 }}
            />
        </Region>
    );
};

/** Named region `list` of ViprequiredLayout - configured through the parent's `list` prop. */
export interface ViprequiredLayoutListProps {
    itemsList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const ViprequiredLayoutList = ({ itemsList, layout, tags }: ViprequiredLayoutListProps) => {
    return (
        <Region
            name="list"
            tags={tags}
            layout={{ position: 'absolute', left: 10, top: 0, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsList ?? (
                <>
                    <ViprequiredLayoutListTopItem />
                    <ViprequiredLayoutListBottomItem />
                </>
            )}
        </Region>
    );
};
