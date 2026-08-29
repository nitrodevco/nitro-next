import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Frame, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2916_sanction_info_xml` (layout "sanction_info", 450x359) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SanctionInfoLayoutProps {
    bottom?: SanctionInfoLayoutBottomProps;
    layout?: BoxLayout;
    mainContentsList?: SanctionInfoLayoutMainContentsListProps;
    onClose?: () => void;
}

export const SanctionInfoLayout = ({ bottom, layout, mainContentsList, onClose }: SanctionInfoLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={35073}
            caption={t('help.sanction.info.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 450, height: 359, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <SanctionInfoLayoutMainContentsList {...mainContentsList} />
                <SanctionInfoLayoutBottom {...bottom} />
            </Region>
        </Frame>
    );
};

/** Row template `sanction_info` of SanctionInfoLayout - pass real rows through its `items…` slot. */
export interface SanctionInfoLayoutSanctionInfoItemProps {
    captionSanctionInfo?: string;
    layout?: BoxLayout;
}

export const SanctionInfoLayoutSanctionInfoItem = ({ captionSanctionInfo, layout }: SanctionInfoLayoutSanctionInfoItemProps) => {
    return (
        <Region
            name="sanction_info"
            params={8536080}
            layout={{ width: 404, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionSanctionInfo ?? 'sanction info'}
                textOptions={{ wordWrap: true, wordWrapWidth: 404 }}
            />
        </Region>
    );
};

/** Row template `divider` of SanctionInfoLayout - pass real rows through its `items…` slot. */
export interface SanctionInfoLayoutDividerItemProps {
    layout?: BoxLayout;
}

export const SanctionInfoLayoutDividerItem = ({ layout }: SanctionInfoLayoutDividerItemProps) => {
    return (
        <Border
            variant="3"
            name="divider"
            params={16}
            tintColor="#000000"
            layout={{ width: 404, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `main_contents_list` of SanctionInfoLayout - configured through the parent's `mainContentsList` prop. */
export interface SanctionInfoLayoutMainContentsListProps {
    itemsMainContentsList?: ReactNode;
    layout?: BoxLayout;
}

export const SanctionInfoLayoutMainContentsList = ({ itemsMainContentsList, layout }: SanctionInfoLayoutMainContentsListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 10, width: 426, top: 10, height: 254, ...layout }}
        >
            <Region
                name="main_contents_list"
                params={16}
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsMainContentsList ?? (
                    <>
                        <SanctionInfoLayoutSanctionInfoItem />
                        <SanctionInfoLayoutDividerItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `bottom` of SanctionInfoLayout - configured through the parent's `bottom` prop. */
export interface SanctionInfoLayoutBottomProps {
    captionFaqLink?: string;
    captionSanctionInfoDisclaimer?: string;
    layout?: BoxLayout;
    onFaqLink?: () => void;
    onOkButton?: () => void;
}

export const SanctionInfoLayoutBottom = ({ captionFaqLink, captionSanctionInfoDisclaimer, layout, onFaqLink, onOkButton }: SanctionInfoLayoutBottomProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bottom"
            params={16}
            layout={{ position: 'absolute', left: 10, width: 426, top: 270, height: 40, ...layout }}
        >
            <Region
                name="sanction_info_disclaimer"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 420, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSanctionInfoDisclaimer ?? t('help.sanction.info.disclaimer')}
                    textOptions={{ fill: '#696969' }}
                />
            </Region>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 420, top: 19, height: 30, flexDirection: 'row' }}
            >
                <ThemeImage
                    params={16}
                    src={layoutImage('icons_link_icon.png')}
                    layout={{ width: 22, height: 19, flexShrink: 0 }}
                />
                <Region
                    name="faq_link"
                    params={147457}
                    layout={{ width: 389, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    onPointerTap={onFaqLink}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionFaqLink ?? t('help.main.faq.link.text')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Region>
            <ButtonThick
                variant="5"
                name="ok_button"
                params={393297}
                tintColor="#009900"
                onPointerTap={onOkButton}
                layout={{ position: 'absolute', right: 0, width: 99, top: 0, height: 40, minWidth: 99 }}
            >
                {t('generic.got.it')}
            </ButtonThick>
        </Region>
    );
};
