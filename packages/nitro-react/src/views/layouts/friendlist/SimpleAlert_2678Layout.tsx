import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2678_simple_alert_xml` (layout "simple_alert", 310x163) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SimpleAlert_2678LayoutProps {
    itemsList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    srcIllustration?: string;
}

export const SimpleAlert_2678Layout = ({ itemsList, layout, onClose, srcIllustration }: SimpleAlert_2678LayoutProps) => {
    return (
        <Frame
            variant="3"
            params={163841}
            caption="caption"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 310, height: 163, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ThemeImage
                    name="illustration"
                    params={16}
                    src={srcIllustration}
                    layout={{ position: 'absolute', left: 10, width: 1, top: 8, height: 1 }}
                />
                <Region
                    name="list"
                    params={8536080}
                    layout={{ position: 'absolute', left: 10, width: 290, top: 8, height: 118, flexDirection: 'column', gap: 3 }}
                >
                    {itemsList ?? (
                        <>
                            <SimpleAlert_2678LayoutListTopItem />
                            <SimpleAlert_2678LayoutListBottomItem />
                        </>
                    )}
                </Region>
            </Region>
        </Frame>
    );
};

/** Row template `subtitle` of SimpleAlert_2678Layout - pass real rows through its `items…` slot. */
export interface SimpleAlert_2678LayoutSubtitleItemProps {
    captionSubtitle?: string;
    layout?: BoxLayout;
}

export const SimpleAlert_2678LayoutSubtitleItem = ({ captionSubtitle, layout }: SimpleAlert_2678LayoutSubtitleItemProps) => {
    return (
        <Region
            name="subtitle"
            params={16}
            layout={{ width: 54, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionSubtitle ?? 'subtitle'}
                textStyle="text-style-il-heading-1"
                textOptions={{ fill: '#c30000' }}
            />
        </Region>
    );
};

/** Row template `message` of SimpleAlert_2678Layout - pass real rows through its `items…` slot. */
export interface SimpleAlert_2678LayoutMessageItemProps {
    captionMessage?: string;
    layout?: BoxLayout;
}

export const SimpleAlert_2678LayoutMessageItem = ({ captionMessage, layout }: SimpleAlert_2678LayoutMessageItemProps) => {
    return (
        <Region
            name="message"
            params={16}
            layout={{ width: 291, height: 24, flexShrink: 0, minWidth: 291, maxWidth: 291, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionMessage ?? 'message'}
                textOptions={{ wordWrap: true, wordWrapWidth: 291 }}
            />
        </Region>
    );
};

/** Row template `list_top` of SimpleAlert_2678Layout - pass real rows through its `items…` slot. */
export interface SimpleAlert_2678LayoutListTopItemProps {
    itemsListTop?: ReactNode;
    layout?: BoxLayout;
}

export const SimpleAlert_2678LayoutListTopItem = ({ itemsListTop, layout }: SimpleAlert_2678LayoutListTopItemProps) => {
    return (
        <Region
            name="list_top"
            params={147472}
            layout={{ width: 290, height: 43, flexShrink: 0, flexDirection: 'column', ...layout }}
        >
            {itemsListTop ?? (
                <>
                    <SimpleAlert_2678LayoutSubtitleItem />
                    <SimpleAlert_2678LayoutMessageItem />
                </>
            )}
        </Region>
    );
};

/** Row template `close_button` of SimpleAlert_2678Layout - pass real rows through its `items…` slot. */
export interface SimpleAlert_2678LayoutCloseButtonItemProps {
    layout?: BoxLayout;
    onCloseButton?: () => void;
}

export const SimpleAlert_2678LayoutCloseButtonItem = ({ layout, onCloseButton }: SimpleAlert_2678LayoutCloseButtonItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="3"
            name="close_button"
            params={131281}
            tintColor="#efefef"
            onPointerTap={onCloseButton}
            layout={{ width: 126, height: 28, flexShrink: 0, ...layout }}
        >
            {t('alert.close.button')}
        </ButtonThick>
    );
};

/** Row template `link` of SimpleAlert_2678Layout - pass real rows through its `items…` slot. */
export interface SimpleAlert_2678LayoutLinkItemProps {
    captionLink?: string;
    layout?: BoxLayout;
    onLink?: () => void;
}

export const SimpleAlert_2678LayoutLinkItem = ({ captionLink, layout, onLink }: SimpleAlert_2678LayoutLinkItemProps) => {
    return (
        <Region
            name="link"
            params={193}
            layout={{ width: 262, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
            onPointerTap={onLink}
            cursor="pointer"
        >
            <ThemeText
                text={captionLink ?? 'link'}
                textOptions={{ wordWrap: true, wordWrapWidth: 262, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `list_bottom` of SimpleAlert_2678Layout - pass real rows through its `items…` slot. */
export interface SimpleAlert_2678LayoutListBottomItemProps {
    itemsListBottom?: ReactNode;
    layout?: BoxLayout;
}

export const SimpleAlert_2678LayoutListBottomItem = ({ itemsListBottom, layout }: SimpleAlert_2678LayoutListBottomItemProps) => {
    return (
        <Region
            name="list_bottom"
            params={147472}
            layout={{ width: 290, height: 72, flexShrink: 0, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsListBottom ?? (
                <>
                    <SimpleAlert_2678LayoutCloseButtonItem />
                    <SimpleAlert_2678LayoutLinkItem />
                </>
            )}
            <ThemeImage
                params={16}
                src={layoutImage('illumina_horizontal_separator.png')}
                layout={{ width: 1000, height: 13, flexShrink: 0 }}
            />
        </Region>
    );
};
