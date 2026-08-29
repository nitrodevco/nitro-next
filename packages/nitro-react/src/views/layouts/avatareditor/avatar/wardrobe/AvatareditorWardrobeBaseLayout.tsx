import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `3117_avatareditor_wardrobe_base_xml` (layout "avatareditor_wardrobe", 182x490) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatareditorWardrobeBaseLayoutProps {
    layout?: BoxLayout;
    mainContainer?: AvatareditorWardrobeBaseLayoutMainContainerProps;
    spacing?: AvatareditorWardrobeBaseLayoutSpacingProps;
    spacing2?: AvatareditorWardrobeBaseLayoutSpacing2Props;
    splitter?: AvatareditorWardrobeBaseLayoutSplitterProps;
}

export const AvatareditorWardrobeBaseLayout = ({ layout, mainContainer, spacing, spacing2, splitter }: AvatareditorWardrobeBaseLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 182, height: 490, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 182, top: 0, height: 490 }}>
                <AvatareditorWardrobeBaseLayoutSplitter {...splitter} />
                <Region layout={{ position: 'absolute', left: 0, width: 182, top: 0, height: 490, flexDirection: 'row' }}>
                    <AvatareditorWardrobeBaseLayoutSpacing {...spacing} />
                    <AvatareditorWardrobeBaseLayoutMainContainer {...mainContainer} />
                    <AvatareditorWardrobeBaseLayoutSpacing2 {...spacing2} />
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `splitter` of AvatareditorWardrobeBaseLayout - configured through the parent's `splitter` prop. */
export interface AvatareditorWardrobeBaseLayoutSplitterProps {
    layout?: BoxLayout;
}

export const AvatareditorWardrobeBaseLayoutSplitter = ({ layout }: AvatareditorWardrobeBaseLayoutSplitterProps) => {
    return (
        <Region
            name="splitter"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 1, top: 0, height: 490, ...layout }}
        />
    );
};

/** Named region `spacing` of AvatareditorWardrobeBaseLayout - configured through the parent's `spacing` prop. */
export interface AvatareditorWardrobeBaseLayoutSpacingProps {
    layout?: BoxLayout;
}

export const AvatareditorWardrobeBaseLayoutSpacing = ({ layout }: AvatareditorWardrobeBaseLayoutSpacingProps) => {
    return (
        <Region
            name="spacing"
            layout={{ width: 6, height: 30, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `hc_icon` of AvatareditorWardrobeBaseLayout - pass real rows through its `items…` slot. */
export interface AvatareditorWardrobeBaseLayoutHcIconItemProps {
    layout?: BoxLayout;
}

export const AvatareditorWardrobeBaseLayoutHcIconItem = ({ layout }: AvatareditorWardrobeBaseLayoutHcIconItemProps) => {
    return (
        <Icon
            variant="13"
            name="hc_icon"
            layout={{ width: 18, height: 15, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `header` of AvatareditorWardrobeBaseLayout - configured through the parent's `header` prop. */
export interface AvatareditorWardrobeBaseLayoutHeaderProps {
    itemsHeader?: ReactNode;
    layout?: BoxLayout;
}

export const AvatareditorWardrobeBaseLayoutHeader = ({ itemsHeader, layout }: AvatareditorWardrobeBaseLayoutHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header"
            layout={{ position: 'absolute', marginLeft: 9, marginRight: -9, width: 186, top: 19, height: 23, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsHeader ?? (
                <AvatareditorWardrobeBaseLayoutHcIconItem />
            )}
            <Region layout={{ width: 158, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('avatareditor.wardrobe.title')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#83827e' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `set_button` of AvatareditorWardrobeBaseLayout - configured through the parent's `setButton` prop. */
export interface AvatareditorWardrobeBaseLayoutSetButtonProps {
    layout?: BoxLayout;
    onSetButton?: () => void;
}

export const AvatareditorWardrobeBaseLayoutSetButton = ({ layout, onSetButton }: AvatareditorWardrobeBaseLayoutSetButtonProps) => {
    return (
        <Region
            name="set_button"
            onPointerTap={onSetButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 3, width: 22, top: 3, height: 26, ...layout }}
        >
            <ThemeImage
                src={layoutImage('icons_forward_small.png')}
                layout={{ position: 'absolute', left: 0, width: 22, top: 9, height: 15 }}
            />
        </Region>
    );
};

/** Named region `get_button` of AvatareditorWardrobeBaseLayout - configured through the parent's `getButton` prop. */
export interface AvatareditorWardrobeBaseLayoutGetButtonProps {
    layout?: BoxLayout;
    onGetButton?: () => void;
}

export const AvatareditorWardrobeBaseLayoutGetButton = ({ layout, onGetButton }: AvatareditorWardrobeBaseLayoutGetButtonProps) => {
    return (
        <Region
            name="get_button"
            onPointerTap={onGetButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 2, width: 22, top: 28, height: 26, ...layout }}
        >
            <ThemeImage
                src={layoutImage('icons_back_small.png')}
                layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 15 }}
            />
        </Region>
    );
};

/** Named region `get_figure` of AvatareditorWardrobeBaseLayout - configured through the parent's `getFigure` prop. */
export interface AvatareditorWardrobeBaseLayoutGetFigureProps {
    layout?: BoxLayout;
    onGetFigure?: () => void;
}

export const AvatareditorWardrobeBaseLayoutGetFigure = ({ layout, onGetFigure }: AvatareditorWardrobeBaseLayoutGetFigureProps) => {
    return (
        <Region
            name="get_figure"
            onPointerTap={onGetFigure}
            cursor="pointer"
            layout={{ position: 'absolute', left: 29, width: 24, top: 3, height: 50, ...layout }}
        />
    );
};

/** Row template `slot_template` of AvatareditorWardrobeBaseLayout - pass real rows through its `items…` slot. */
export interface AvatareditorWardrobeBaseLayoutSlotTemplateItemProps {
    getButton?: AvatareditorWardrobeBaseLayoutGetButtonProps;
    getFigure?: AvatareditorWardrobeBaseLayoutGetFigureProps;
    layout?: BoxLayout;
    setButton?: AvatareditorWardrobeBaseLayoutSetButtonProps;
    srcImage?: string;
}

export const AvatareditorWardrobeBaseLayoutSlotTemplateItem = ({ getButton, getFigure, layout, setButton, srcImage }: AvatareditorWardrobeBaseLayoutSlotTemplateItemProps) => {
    return (
        <Region
            name="slot_template"
            layout={{ width: 56, height: 56, flexShrink: 0, ...layout }}
        >
            <Border
                variant="3"
                tintColor="#666666"
                blend={0.3}
                layout={{ position: 'absolute', left: 29, width: 24, top: 3, height: 50 }}
            />
            <AvatareditorWardrobeBaseLayoutSetButton {...setButton} />
            <AvatareditorWardrobeBaseLayoutGetButton {...getButton} />
            <ThemeImage
                name="image"
                src={srcImage}
                layout={{ position: 'absolute', left: 30, width: 22, top: 4, height: 48 }}
            />
            <AvatareditorWardrobeBaseLayoutGetFigure {...getFigure} />
        </Region>
    );
};

/** Row template `slots_column_template` of AvatareditorWardrobeBaseLayout - pass real rows through its `items…` slot. */
export interface AvatareditorWardrobeBaseLayoutSlotsColumnTemplateItemProps {
    itemsSlotsColumnTemplate?: ReactNode;
    layout?: BoxLayout;
}

export const AvatareditorWardrobeBaseLayoutSlotsColumnTemplateItem = ({ itemsSlotsColumnTemplate, layout }: AvatareditorWardrobeBaseLayoutSlotsColumnTemplateItemProps) => {
    return (
        <Region
            name="slots_column_template"
            layout={{ width: 64, height: 412, flexShrink: 0, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsSlotsColumnTemplate ?? (
                <AvatareditorWardrobeBaseLayoutSlotTemplateItem />
            )}
        </Region>
    );
};

/** Row template `another_column` of AvatareditorWardrobeBaseLayout - pass real rows through its `items…` slot. */
export interface AvatareditorWardrobeBaseLayoutAnotherColumnItemProps {
    layout?: BoxLayout;
}

export const AvatareditorWardrobeBaseLayoutAnotherColumnItem = ({ layout }: AvatareditorWardrobeBaseLayoutAnotherColumnItemProps) => {
    return (
        <Region
            name="another_column"
            layout={{ width: 64, height: 412, flexShrink: 0, flexDirection: 'column', gap: 3, ...layout }}
        />
    );
};

/** Named region `slots_columns_list` of AvatareditorWardrobeBaseLayout - configured through the parent's `slotsColumnsList` prop. */
export interface AvatareditorWardrobeBaseLayoutSlotsColumnsListProps {
    itemsSlotsColumnsList?: ReactNode;
    layout?: BoxLayout;
}

export const AvatareditorWardrobeBaseLayoutSlotsColumnsList = ({ itemsSlotsColumnsList, layout }: AvatareditorWardrobeBaseLayoutSlotsColumnsListProps) => {
    return (
        <Region
            name="slots_columns_list"
            layout={{ position: 'absolute', left: 4, width: 132, top: 0, height: 418, flexDirection: 'row', gap: 4, ...layout }}
        >
            {itemsSlotsColumnsList ?? (
                <>
                    <AvatareditorWardrobeBaseLayoutSlotsColumnTemplateItem />
                    <AvatareditorWardrobeBaseLayoutAnotherColumnItem />
                </>
            )}
        </Region>
    );
};

/** Named region `main_container` of AvatareditorWardrobeBaseLayout - configured through the parent's `mainContainer` prop. */
export interface AvatareditorWardrobeBaseLayoutMainContainerProps {
    header?: AvatareditorWardrobeBaseLayoutHeaderProps;
    layout?: BoxLayout;
    slotsColumnsList?: AvatareditorWardrobeBaseLayoutSlotsColumnsListProps;
}

export const AvatareditorWardrobeBaseLayoutMainContainer = ({ header, layout, slotsColumnsList }: AvatareditorWardrobeBaseLayoutMainContainerProps) => {
    return (
        <Region
            name="main_container"
            layout={{ width: 168, height: 490, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <AvatareditorWardrobeBaseLayoutHeader {...header} />
            <Border
                variant="4"
                tintColor="#cbcbcb"
                layout={{ position: 'absolute', left: 15, width: 139, top: 53, height: 418 }}
            >
                <AvatareditorWardrobeBaseLayoutSlotsColumnsList {...slotsColumnsList} />
            </Border>
        </Region>
    );
};

/** Named region `spacing` of AvatareditorWardrobeBaseLayout - configured through the parent's `spacing` prop. */
export interface AvatareditorWardrobeBaseLayoutSpacing2Props {
    layout?: BoxLayout;
}

export const AvatareditorWardrobeBaseLayoutSpacing2 = ({ layout }: AvatareditorWardrobeBaseLayoutSpacing2Props) => {
    return (
        <Region
            name="spacing"
            layout={{ width: 8, height: 30, flexShrink: 0, ...layout }}
        />
    );
};
