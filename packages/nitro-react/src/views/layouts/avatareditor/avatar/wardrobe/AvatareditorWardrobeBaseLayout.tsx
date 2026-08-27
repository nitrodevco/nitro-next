import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `3117_avatareditor_wardrobe_base_xml` (layout "avatareditor_wardrobe", 182x490) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatareditorWardrobeBaseLayoutProps {
    itemsHeader?: ReactNode;
    itemsSlotsColumnsList?: ReactNode;
    layout?: BoxLayout;
}

export const AvatareditorWardrobeBaseLayout = ({ itemsHeader, itemsSlotsColumnsList, layout }: AvatareditorWardrobeBaseLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 182, height: 490, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 182, top: 0, height: 490 }}
            >
                <Region
                    name="splitter"
                    params={16}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, width: 1, top: 0, height: 490 }}
                />
                <Region
                    params={4194320}
                    layout={{ position: 'absolute', left: 0, width: 182, top: 0, height: 490, flexDirection: 'row' }}
                >
                    <Region
                        name="spacing"
                        params={16}
                        layout={{ width: 6, height: 30, flexShrink: 0 }}
                    />
                    <Region
                        name="main_container"
                        params={16}
                        layout={{ width: 168, height: 490, flexShrink: 0 }}
                    >
                        <Region
                            name="header"
                            params={786640}
                            layout={{ position: 'absolute', left: '50%', marginLeft: -84, width: 186, top: 19, height: 23, flexDirection: 'row', gap: 10 }}
                        >
                            {itemsHeader ?? (
                                <AvatareditorWardrobeBaseLayoutHcIconItem />
                            )}
                            <Region
                                params={16}
                                layout={{ width: 158, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('avatareditor.wardrobe.title')}
                                    textStyle="text-style-u-bold"
                                    textOptions={{ fill: '#83827e' }}
                                />
                            </Region>
                        </Region>
                        <Border
                            variant="4"
                            params={4194320}
                            tintColor="#cbcbcb"
                            layout={{ position: 'absolute', left: 15, width: 139, top: 53, height: 418 }}
                        >
                            <Region
                                name="slots_columns_list"
                                params={4194320}
                                layout={{ position: 'absolute', left: 4, width: 132, top: 0, height: 418, flexDirection: 'row', gap: 4 }}
                            >
                                {itemsSlotsColumnsList ?? (
                                    <>
                                        <AvatareditorWardrobeBaseLayoutSlotsColumnTemplateItem />
                                        <AvatareditorWardrobeBaseLayoutAnotherColumnItem />
                                    </>
                                )}
                            </Region>
                        </Border>
                    </Region>
                    <Region
                        name="spacing"
                        params={16}
                        layout={{ width: 8, height: 30, flexShrink: 0 }}
                    />
                </Region>
            </Region>
        </Region>
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
            params={16}
            layout={{ width: 18, height: 15, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `slot_template` of AvatareditorWardrobeBaseLayout - pass real rows through its `items…` slot. */
export interface AvatareditorWardrobeBaseLayoutSlotTemplateItemProps {
    layout?: BoxLayout;
    onGetButton?: () => void;
    onGetFigure?: () => void;
    onSetButton?: () => void;
    srcImage?: string;
}

export const AvatareditorWardrobeBaseLayoutSlotTemplateItem = ({ layout, onGetButton, onGetFigure, onSetButton, srcImage }: AvatareditorWardrobeBaseLayoutSlotTemplateItemProps) => {
    return (
        <Region
            name="slot_template"
            params={16}
            layout={{ width: 56, height: 56, flexShrink: 0, ...layout }}
        >
            <Border
                variant="3"
                params={16}
                tintColor="#666666"
                blend={0.3}
                layout={{ position: 'absolute', left: 29, width: 24, top: 3, height: 50 }}
            />
            <Region
                name="set_button"
                params={17}
                onPointerTap={onSetButton}
                cursor="pointer"
                layout={{ position: 'absolute', left: 3, width: 22, top: 3, height: 26 }}
            >
                <ThemeImage
                    params={16}
                    src={layoutImage('icons_forward_small.png')}
                    layout={{ position: 'absolute', left: 0, width: 22, top: 9, height: 15 }}
                />
            </Region>
            <Region
                name="get_button"
                params={17}
                onPointerTap={onGetButton}
                cursor="pointer"
                layout={{ position: 'absolute', left: 2, width: 22, top: 28, height: 26 }}
            >
                <ThemeImage
                    params={16}
                    src={layoutImage('icons_back_small.png')}
                    layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 15 }}
                />
            </Region>
            <ThemeImage
                name="image"
                params={16}
                src={srcImage}
                layout={{ position: 'absolute', left: 30, width: 22, top: 4, height: 48 }}
            />
            <Region
                name="get_figure"
                params={17}
                onPointerTap={onGetFigure}
                cursor="pointer"
                layout={{ position: 'absolute', left: 29, width: 24, top: 3, height: 50 }}
            />
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
            params={786449}
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
            params={786449}
            layout={{ width: 64, height: 412, flexShrink: 0, flexDirection: 'column', gap: 3, ...layout }}
        />
    );
};
