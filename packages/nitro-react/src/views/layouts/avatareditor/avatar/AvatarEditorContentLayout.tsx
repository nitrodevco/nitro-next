import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Region, ScrollArea, TabButton, TabContext, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `3113_AvatarEditorContent_xml` (layout "avatarEditorContent", 490x490) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarEditorContentLayoutProps {
    avatarEditorContent?: AvatarEditorContentLayoutAvatarEditorContentProps;
    layout?: BoxLayout;
}

export const AvatarEditorContentLayout = ({ avatarEditorContent, layout }: AvatarEditorContentLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 490, height: 490, ...layout }}>
            <AvatarEditorContentLayoutAvatarEditorContent {...avatarEditorContent} />
        </Region>
    );
};

/** Named region `head_content` of AvatarEditorContentLayout - configured through the parent's `headContent` prop. */
export interface AvatarEditorContentLayoutHeadContentProps {
    layout?: BoxLayout;
    onTabAccessories?: () => void;
    onTabEyewear?: () => void;
    onTabHair?: () => void;
    onTabHat?: () => void;
    onTabMasks?: () => void;
    srcTabAccessories?: string;
    srcTabEyewear?: string;
    srcTabHair?: string;
    srcTabHat?: string;
    srcTabMasks?: string;
    visibleHeadContent?: boolean;
}

export const AvatarEditorContentLayoutHeadContent = ({ layout, onTabAccessories, onTabEyewear, onTabHair, onTabHat, onTabMasks, srcTabAccessories, srcTabEyewear, srcTabHair, srcTabHat, srcTabMasks, visibleHeadContent }: AvatarEditorContentLayoutHeadContentProps) => {
    return (
        (visibleHeadContent ?? false) && (
            <Region
                name="head_content"
                layout={{ position: 'absolute', left: 20, width: 280, top: 10, height: 35, ...layout }}
            >
                <Region
                    name="tab_hair"
                    onPointerTap={onTabHair}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 6, width: 47, top: 0, height: 35 }}
                >
                    <ThemeImage
                        name="tab_hair"
                        src={srcTabHair ?? layoutImage('avatar_editor_tabs_head_hair_off.png')}
                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                    />
                </Region>
                <Region
                    name="tab_hat"
                    onPointerTap={onTabHat}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 58, width: 47, top: 0, height: 35 }}
                >
                    <ThemeImage
                        name="tab_hat"
                        src={srcTabHat ?? layoutImage('avatar_editor_tabs_head_hats_off.png')}
                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                    />
                </Region>
                <Region
                    name="tab_accessories"
                    onPointerTap={onTabAccessories}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 110, width: 47, top: 0, height: 35 }}
                >
                    <ThemeImage
                        name="tab_accessories"
                        src={srcTabAccessories ?? layoutImage('avatar_editor_tabs_head_accessories_off.png')}
                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                    />
                </Region>
                <Region
                    name="tab_eyewear"
                    onPointerTap={onTabEyewear}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 162, width: 47, top: 0, height: 35 }}
                >
                    <ThemeImage
                        name="tab_eyewear"
                        src={srcTabEyewear ?? layoutImage('avatar_editor_tabs_head_eyewear_off.png')}
                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                    />
                </Region>
                <Region
                    name="tab_masks"
                    onPointerTap={onTabMasks}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 214, width: 47, top: 0, height: 35 }}
                >
                    <ThemeImage
                        name="tab_masks"
                        src={srcTabMasks ?? layoutImage('avatar_editor_tabs_head_face_accessories_off.png')}
                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                    />
                </Region>
            </Region>
        )
    );
};

/** Named region `torso_content` of AvatarEditorContentLayout - configured through the parent's `torsoContent` prop. */
export interface AvatarEditorContentLayoutTorsoContentProps {
    layout?: BoxLayout;
    onTabAccessories?: () => void;
    onTabJacket?: () => void;
    onTabPrints?: () => void;
    onTabShirt?: () => void;
    srcTabAccessories?: string;
    srcTabJacket?: string;
    srcTabPrints?: string;
    srcTabShirt?: string;
    visibleTorsoContent?: boolean;
}

export const AvatarEditorContentLayoutTorsoContent = ({ layout, onTabAccessories, onTabJacket, onTabPrints, onTabShirt, srcTabAccessories, srcTabJacket, srcTabPrints, srcTabShirt, visibleTorsoContent }: AvatarEditorContentLayoutTorsoContentProps) => {
    return (
        (visibleTorsoContent ?? false) && (
            <Region
                name="torso_content"
                layout={{ position: 'absolute', left: 20, width: 210, top: 10, height: 35, ...layout }}
            >
                <Region
                    name="tab_shirt"
                    onPointerTap={onTabShirt}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 6, width: 47, top: 0, height: 35 }}
                >
                    <ThemeImage
                        name="tab_shirt"
                        src={srcTabShirt ?? layoutImage('avatar_editor_tabs_top_shirt_off.png')}
                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                    />
                </Region>
                <Region
                    name="tab_prints"
                    onPointerTap={onTabPrints}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 58, width: 47, top: 0, height: 35 }}
                >
                    <ThemeImage
                        name="tab_prints"
                        src={srcTabPrints ?? layoutImage('avatar_editor_tabs_top_prints_off.png')}
                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                    />
                </Region>
                <Region
                    name="tab_jacket"
                    onPointerTap={onTabJacket}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 110, width: 47, top: 0, height: 35 }}
                >
                    <ThemeImage
                        name="tab_jacket"
                        src={srcTabJacket ?? layoutImage('avatar_editor_tabs_top_jacket_off.png')}
                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                    />
                </Region>
                <Region
                    name="tab_accessories"
                    onPointerTap={onTabAccessories}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 162, width: 47, top: 0, height: 35 }}
                >
                    <ThemeImage
                        name="tab_accessories"
                        src={srcTabAccessories ?? layoutImage('avatar_editor_tabs_top_accessories_off.png')}
                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                    />
                </Region>
            </Region>
        )
    );
};

/** Named region `contentArea` of AvatarEditorContentLayout - configured through the parent's `contentArea` prop. */
export interface AvatarEditorContentLayoutContentAreaProps {
    captionEffectsTitle?: string;
    captionHotlooksChoose?: string;
    captionHotlooksTitle?: string;
    captionNftsChoose?: string;
    captionNftsTitle?: string;
    captionTabBoyTitle?: string;
    captionTabGirlTitle?: string;
    headContent?: AvatarEditorContentLayoutHeadContentProps;
    layout?: BoxLayout;
    onTabBelts?: () => void;
    onTabBoy?: () => void;
    onTabEffects?: () => void;
    onTabGirl?: () => void;
    onTabMisc?: () => void;
    onTabPants?: () => void;
    onTabPets?: () => void;
    onTabShoes?: () => void;
    srcTabBelts?: string;
    srcTabBoy?: string;
    srcTabEffects?: string;
    srcTabGirl?: string;
    srcTabMisc?: string;
    srcTabPants?: string;
    srcTabPets?: string;
    srcTabShoes?: string;
    torsoContent?: AvatarEditorContentLayoutTorsoContentProps;
    visibleEffectsContent?: boolean;
    visibleGenericContent?: boolean;
    visibleHeadContent?: boolean;
    visibleHotlooksContent?: boolean;
    visibleLegsContent?: boolean;
    visibleMiscContent?: boolean;
    visibleNftsContent?: boolean;
    visibleTorsoContent?: boolean;
}

export const AvatarEditorContentLayoutContentArea = ({ captionEffectsTitle, captionHotlooksChoose, captionHotlooksTitle, captionNftsChoose, captionNftsTitle, captionTabBoyTitle, captionTabGirlTitle, headContent, layout, onTabBelts, onTabBoy, onTabEffects, onTabGirl, onTabMisc, onTabPants, onTabPets, onTabShoes, srcTabBelts, srcTabBoy, srcTabEffects, srcTabGirl, srcTabMisc, srcTabPants, srcTabPets, srcTabShoes, torsoContent, visibleEffectsContent, visibleGenericContent, visibleHeadContent, visibleHotlooksContent, visibleLegsContent, visibleMiscContent, visibleNftsContent, visibleTorsoContent }: AvatarEditorContentLayoutContentAreaProps) => {
    const t = useTranslation();

    return (
        <Region
            name="contentArea"
            layout={{ position: 'absolute', left: 2, width: 486, top: 36, height: 365, ...layout }}
        >
            {(visibleGenericContent ?? false) && (
                <Region
                    name="generic_content"
                    layout={{ position: 'absolute', left: 20, width: 250, top: 10, height: 35 }}
                >
                    <Region
                        name="tab_boy"
                        onPointerTap={onTabBoy}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 6, width: 47, top: 0, height: 35 }}
                    >
                        <ThemeImage
                            name="tab_boy"
                            src={srcTabBoy ?? layoutImage('avatar_editor_tabs_gender_male_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                        />
                    </Region>
                    <Region
                        name="tab_boy_title"
                        layout={{ position: 'absolute', left: 50, width: 143, top: 10, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionTabBoyTitle ?? t('avatareditor.generic.boy')}
                    </Region>
                    <Region
                        name="tab_girl"
                        onPointerTap={onTabGirl}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 100, width: 47, top: 0, height: 35 }}
                    >
                        <ThemeImage
                            name="tab_girl"
                            src={srcTabGirl ?? layoutImage('avatar_editor_tabs_gender_female_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 48, top: 0, height: 35 }}
                        />
                    </Region>
                    <Region
                        name="tab_girl_title"
                        layout={{ position: 'absolute', left: 150, width: 141, top: 10, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionTabGirlTitle ?? t('avatareditor.generic.girl')}
                    </Region>
                </Region>
            )}
            {(visibleHeadContent ?? false) && (
                <AvatarEditorContentLayoutHeadContent {...headContent} />
            )}
            {(visibleTorsoContent ?? false) && (
                <AvatarEditorContentLayoutTorsoContent {...torsoContent} />
            )}
            {(visibleLegsContent ?? false) && (
                <Region
                    name="legs_content"
                    layout={{ position: 'absolute', left: 20, width: 170, top: 10, height: 35 }}
                >
                    <Region
                        name="tab_pants"
                        onPointerTap={onTabPants}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 6, width: 47, top: 0, height: 35 }}
                    >
                        <ThemeImage
                            name="tab_pants"
                            src={srcTabPants ?? layoutImage('avatar_editor_tabs_bottom_trousers_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                        />
                    </Region>
                    <Region
                        name="tab_shoes"
                        onPointerTap={onTabShoes}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 58, width: 47, top: 0, height: 35 }}
                    >
                        <ThemeImage
                            name="tab_shoes"
                            src={srcTabShoes ?? layoutImage('avatar_editor_tabs_bottom_shoes_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                        />
                    </Region>
                    <Region
                        name="tab_belts"
                        onPointerTap={onTabBelts}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 110, width: 47, top: 0, height: 35 }}
                    >
                        <ThemeImage
                            name="tab_belts"
                            src={srcTabBelts ?? layoutImage('avatar_editor_tabs_bottom_accessories_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                        />
                    </Region>
                </Region>
            )}
            {(visibleHotlooksContent ?? false) && (
                <Region
                    name="hotlooks_content"
                    layout={{ position: 'absolute', left: 20, width: 310, top: 10, height: 290 }}
                >
                    <Region
                        name="hotlooksTitle"
                        layout={{ position: 'absolute', left: 0, width: 262, top: 0, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionHotlooksTitle ?? t('avatareditor.hotlooks.title')}
                    </Region>
                    <Region
                        name="hotlooksChoose"
                        layout={{ position: 'absolute', left: 0, width: 168, top: 28, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionHotlooksChoose ?? t('avatareditor.hotlooks.choose')}
                    </Region>
                    <Region
                        name="hotlooks"
                        layout={{ position: 'absolute', left: 4, width: 299, top: 65, height: 220, flexDirection: 'row', flexWrap: 'wrap', gap: 7 }}
                    />
                </Region>
            )}
            {(visibleNftsContent ?? false) && (
                <Region
                    name="nfts_content"
                    layout={{ position: 'absolute', left: 20, width: 310, top: 10, height: 290 }}
                >
                    <Region
                        name="nftsTitle"
                        layout={{ position: 'absolute', left: 0, width: 217, top: 0, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionNftsTitle ?? t('avatareditor.nfts.title')}
                    </Region>
                    <Region
                        name="nftsChoose"
                        layout={{ position: 'absolute', left: 0, width: 140, top: 28, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionNftsChoose ?? t('avatareditor.nfts.choose')}
                    </Region>
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 4, width: 299, top: 65, height: 220 }}
                    >
                        <Region
                            name="nfts"
                            layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, width: '100%' }}
                        />
                    </ScrollArea>
                </Region>
            )}
            {(visibleEffectsContent ?? false) && (
                <Region
                    name="effects_content"
                    layout={{ position: 'absolute', left: 20, width: 140, top: 10, height: 35 }}
                >
                    <ThemeImage
                        name="tab_effects"
                        src={srcTabEffects ?? layoutImage('avatar_editor_tabs_effects_fx.png')}
                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                    />
                    <Region
                        name="effectsTitle"
                        layout={{ position: 'absolute', left: 40, width: 169, top: 4, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionEffectsTitle ?? t('inventory.effects')}
                    </Region>
                    <Region
                        name="tab_effects"
                        onPointerTap={onTabEffects}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 6, width: 47, top: 0, height: 35 }}
                    />
                </Region>
            )}
            {(visibleMiscContent ?? false) && (
                <Region
                    name="misc_content"
                    layout={{ position: 'absolute', left: 20, width: 250, top: 10, height: 35 }}
                >
                    <Region
                        name="tab_pets"
                        onPointerTap={onTabPets}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 6, width: 47, top: 0, height: 35 }}
                    >
                        <ThemeImage
                            name="tab_pets"
                            src={srcTabPets ?? layoutImage('avatar_editor_tabs_icon_misc_pets_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                        />
                    </Region>
                    <Region
                        name="tab_misc"
                        onPointerTap={onTabMisc}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 58, width: 47, top: 0, height: 35 }}
                    >
                        <ThemeImage
                            name="tab_misc"
                            src={srcTabMisc ?? layoutImage('avatar_editor_tabs_icon_misc_misc_off.png')}
                            layout={{ position: 'absolute', left: 0, width: 48, top: 0, height: 35 }}
                        />
                    </Region>
                </Region>
            )}
        </Region>
    );
};

/** Row template `thumb_template` of AvatarEditorContentLayout - pass real rows through its `items…` slot. */
export interface AvatarEditorContentLayoutThumbTemplateItemProps {
    layout?: BoxLayout;
    onThumbTemplate?: () => void;
    srcBitmap?: string;
    srcClubIcon?: string;
    srcHover?: string;
    srcSellableIcon?: string;
}

export const AvatarEditorContentLayoutThumbTemplateItem = ({ layout, onThumbTemplate, srcBitmap, srcClubIcon, srcHover, srcSellableIcon }: AvatarEditorContentLayoutThumbTemplateItemProps) => {
    return (
        <Region
            name="thumb_template"
            onPointerTap={onThumbTemplate}
            cursor="pointer"
            layout={{ width: 50, height: 50, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="hover"
                src={srcHover ?? layoutImage('avatar_editor_parts_hilite.png')}
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
            />
            <ThemeImage
                name="bitmap"
                src={srcBitmap}
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50, minWidth: 50, maxWidth: 50 }}
            />
            <ThemeImage
                name="club_icon"
                src={srcClubIcon ?? layoutImage('icons_hc_icon_small.png')}
                layout={{ position: 'absolute', left: 40, width: 10, top: 40, height: 9 }}
            />
            <ThemeImage
                name="sellable_icon"
                src={srcSellableIcon ?? layoutImage('icons_wearable.png')}
                layout={{ position: 'absolute', left: 0, width: 17, top: 30, height: 20 }}
            />
        </Region>
    );
};

/** Row template `palette_template` of AvatarEditorContentLayout - pass real rows through its `items…` slot. */
export interface AvatarEditorContentLayoutPaletteTemplateItemProps {
    layout?: BoxLayout;
    onPaletteTemplate?: () => void;
    srcBorder?: string;
    srcClubIcon?: string;
    srcColor?: string;
}

export const AvatarEditorContentLayoutPaletteTemplateItem = ({ layout, onPaletteTemplate, srcBorder, srcClubIcon, srcColor }: AvatarEditorContentLayoutPaletteTemplateItemProps) => {
    return (
        <Region
            name="palette_template"
            onPointerTap={onPaletteTemplate}
            cursor="pointer"
            layout={{ width: 15, height: 23, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="color"
                src={srcColor}
                layout={{ position: 'absolute', left: 1, width: 13, top: 0, height: 21 }}
            />
            <ThemeImage
                name="border"
                src={srcBorder ?? layoutImage('avatar_editor_editor_clr_13x21_1.png')}
                layout={{ position: 'absolute', left: 1, width: 13, top: 0, height: 21 }}
            />
            <ThemeImage
                name="club_icon"
                src={srcClubIcon ?? layoutImage('icons_hc_icon_small.png')}
                layout={{ position: 'absolute', left: 3, width: 10, top: 10, height: 9 }}
            />
        </Region>
    );
};

/** Named region `grid_container` of AvatarEditorContentLayout - configured through the parent's `gridContainer` prop. */
export interface AvatarEditorContentLayoutGridContainerProps {
    captionContentNotification?: string;
    captionContentTitle?: string;
    itemsPalette0?: ReactNode;
    itemsThumbs?: ReactNode;
    layout?: BoxLayout;
}

export const AvatarEditorContentLayoutGridContainer = ({ captionContentNotification, captionContentTitle, itemsPalette0, itemsThumbs, layout }: AvatarEditorContentLayoutGridContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="grid_container"
            layout={{ position: 'absolute', left: 20, width: 330, top: 94, height: 302, ...layout }}
        >
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 0, width: 330, top: 0, height: 200 }}
            >
                <Region
                    name="thumbs"
                    layout={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}
                >
                    {itemsThumbs ?? (
                        <AvatarEditorContentLayoutThumbTemplateItem />
                    )}
                </Region>
            </ScrollArea>
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 0, width: 165, top: 210, height: 93 }}
            >
                <Region
                    name="palette0"
                    layout={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}
                >
                    {itemsPalette0 ?? (
                        <AvatarEditorContentLayoutPaletteTemplateItem />
                    )}
                </Region>
            </ScrollArea>
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 165, width: 165, top: 210, height: 93 }}
            >
                <Region
                    name="palette1"
                    layout={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}
                />
            </ScrollArea>
            <Region
                name="content_notification"
                layout={{ position: 'absolute', left: 0, width: 298, top: 30, height: 128, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionContentNotification ?? t('avatar.editor.content.notification')}
            </Region>
            <Region
                name="content_title"
                layout={{ position: 'absolute', left: 0, width: 300, top: 0, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionContentTitle ?? t('avatar.editor.content.title')}
                    textStyle="text-style-u-bold"
                />
            </Region>
        </Region>
    );
};

/** Named region `tabbedView` of AvatarEditorContentLayout - configured through the parent's `tabbedView` prop. */
export interface AvatarEditorContentLayoutTabbedViewProps {
    contentArea?: AvatarEditorContentLayoutContentAreaProps;
    gridContainer?: AvatarEditorContentLayoutGridContainerProps;
    layout?: BoxLayout;
    onEffects?: () => void;
    onGeneric?: () => void;
    onHead?: () => void;
    onHotlooks?: () => void;
    onLegs?: () => void;
    onMisc?: () => void;
    onNfts?: () => void;
    onTorso?: () => void;
    srcBitmap?: string;
    srcBitmap2?: string;
    srcBitmap3?: string;
    srcBitmap4?: string;
    srcBitmap5?: string;
    srcBitmap6?: string;
    srcBitmap7?: string;
    srcBitmap8?: string;
}

export const AvatarEditorContentLayoutTabbedView = ({ contentArea, gridContainer, layout, onEffects, onGeneric, onHead, onHotlooks, onLegs, onMisc, onNfts, onTorso, srcBitmap, srcBitmap2, srcBitmap3, srcBitmap4, srcBitmap5, srcBitmap6, srcBitmap7, srcBitmap8 }: AvatarEditorContentLayoutTabbedViewProps) => {
    return (
        <Region
            name="tabbedView"
            layout={{ position: 'absolute', left: 0, width: 486, top: 4, height: 410, ...layout }}
        >
            <TabContext
                variant="3"
                name="mainTabs"
                layout={{ position: 'absolute', left: 0, width: 486, top: 5, height: 395 }}
            >
                <TabButton
                    variant="3"
                    name="generic"
                    onPointerTap={onGeneric}
                    layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 46 }}
                >
                    <ThemeImage
                        name="bitmap"
                        src={srcBitmap ?? layoutImage('avatar_editor_tabs_ae_tabs_generic.png')}
                        layout={{ position: 'absolute', left: 1, width: 52, top: -5, height: 42 }}
                    />
                </TabButton>
                <TabButton
                    variant="3"
                    name="head"
                    onPointerTap={onHead}
                    layout={{ position: 'absolute', left: 52, width: 52, top: 0, height: 46 }}
                >
                    <ThemeImage
                        name="bitmap"
                        src={srcBitmap2 ?? layoutImage('avatar_editor_tabs_ae_tabs_head.png')}
                        layout={{ position: 'absolute', left: 0, width: 52, top: -6, height: 42 }}
                    />
                </TabButton>
                <TabButton
                    variant="3"
                    name="torso"
                    onPointerTap={onTorso}
                    layout={{ position: 'absolute', left: 104, width: 52, top: 0, height: 46 }}
                >
                    <ThemeImage
                        name="bitmap"
                        src={srcBitmap3 ?? layoutImage('avatar_editor_tabs_ae_tabs_torso.png')}
                        layout={{ position: 'absolute', left: 0, width: 52, top: -6, height: 42 }}
                    />
                </TabButton>
                <TabButton
                    variant="3"
                    name="legs"
                    onPointerTap={onLegs}
                    layout={{ position: 'absolute', left: 156, width: 52, top: 0, height: 46 }}
                >
                    <ThemeImage
                        name="bitmap"
                        src={srcBitmap4 ?? layoutImage('avatar_editor_tabs_ae_tabs_legs.png')}
                        layout={{ position: 'absolute', left: 0, width: 52, top: -6, height: 42 }}
                    />
                </TabButton>
                <TabButton
                    variant="3"
                    name="misc"
                    onPointerTap={onMisc}
                    layout={{ position: 'absolute', left: 208, width: 52, top: 0, height: 46 }}
                >
                    <ThemeImage
                        name="bitmap"
                        src={srcBitmap5 ?? layoutImage('avatar_editor_tabs_ae_tabs_misc.png')}
                        layout={{ position: 'absolute', left: 0, width: 52, top: -4, height: 42 }}
                    />
                </TabButton>
                <TabButton
                    variant="3"
                    name="hotlooks"
                    onPointerTap={onHotlooks}
                    layout={{ position: 'absolute', left: 260, width: 52, top: 0, height: 46 }}
                >
                    <ThemeImage
                        name="bitmap"
                        src={srcBitmap6 ?? layoutImage('avatar_editor_tabs_ae_tabs_hotlooks.png')}
                        layout={{ position: 'absolute', left: 0, width: 52, top: -7, height: 42 }}
                    />
                </TabButton>
                <TabButton
                    variant="3"
                    name="effects"
                    onPointerTap={onEffects}
                    layout={{ position: 'absolute', left: 312, width: 52, top: 0, height: 46 }}
                >
                    <ThemeImage
                        name="bitmap"
                        src={srcBitmap7 ?? layoutImage('avatar_editor_tabs_ae_tabs_effects.png')}
                        layout={{ position: 'absolute', left: 0, width: 52, top: -5, height: 42 }}
                    />
                </TabButton>
                <TabButton
                    variant="3"
                    name="nfts"
                    onPointerTap={onNfts}
                    layout={{ position: 'absolute', left: 364, width: 52, top: 0, height: 46 }}
                >
                    <ThemeImage
                        name="bitmap"
                        src={srcBitmap8 ?? layoutImage('nft_icon_24x24.png')}
                        layout={{ position: 'absolute', left: 0, width: 52, top: -5, height: 42 }}
                    />
                </TabButton>
            </TabContext>
            <AvatarEditorContentLayoutContentArea {...contentArea} />
            <Region
                name="action_container"
                layout={{ position: 'absolute', left: 335, width: 122, top: 90, height: 210 }}
            />
            <AvatarEditorContentLayoutGridContainer {...gridContainer} />
        </Region>
    );
};

/** Named region `avatarEditor` of AvatarEditorContentLayout - configured through the parent's `avatarEditor` prop. */
export interface AvatarEditorContentLayoutAvatarEditorProps {
    captionAvatarInfoText?: string;
    captionEffectName?: string;
    captionEffectTimeLeft?: string;
    captionSaveToActivate?: string;
    layout?: BoxLayout;
    onGetMoreButton?: () => void;
    onRotateAvatar?: () => void;
    onSave?: () => void;
    srcProgressBarBitmap?: string;
    tabbedView?: AvatarEditorContentLayoutTabbedViewProps;
    visibleCollectibleAvatarInfo?: boolean;
}

export const AvatarEditorContentLayoutAvatarEditor = ({ captionAvatarInfoText, captionEffectName, captionEffectTimeLeft, captionSaveToActivate, layout, onGetMoreButton, onRotateAvatar, onSave, srcProgressBarBitmap, tabbedView, visibleCollectibleAvatarInfo }: AvatarEditorContentLayoutAvatarEditorProps) => {
    const t = useTranslation();

    return (
        <Region
            name="avatarEditor"
            layout={{ position: 'absolute', left: 1, width: 489, top: 70, height: 414, justifyContent: 'center', ...layout }}
        >
            <AvatarEditorContentLayoutTabbedView {...tabbedView} />
            <WidgetSlot
                widgetType="room_previewer"
                name="avatarWidget"
                options={{ 'room_previewer:offsetx': '-65', 'room_previewer:offsety': '-30', 'room_previewer:zoom': '2' }}
                layout={{ position: 'absolute', left: 351, width: 125, top: 88, height: 210 }}
            />
            <ButtonThick
                variant="3"
                name="save"
                onPointerTap={onSave}
                textStyle="text-style-button-shiny-bold"
                layout={{ position: 'absolute', marginLeft: 172.5, marginRight: -172.5, width: 122, top: 373, height: 28, minWidth: 100 }}
            >
                {t('avatareditor.save')}
            </ButtonThick>
            <Region
                name="effectParamsContainer"
                layout={{ position: 'absolute', left: 11, width: 468, top: 46, height: 352 }}
            >
                <Region
                    name="effect_name"
                    layout={{ position: 'absolute', left: 339, width: 120, top: 284, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionEffectName ?? 'xxx'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#666666', wordWrap: true, wordWrapWidth: 120, align: 'center' }}
                    />
                </Region>
                <Region
                    name="time_left_bg"
                    layout={{ position: 'absolute', left: 345, width: 120, top: 301, height: 18 }}
                >
                    <ThemeImage
                        name="progress_bar_bitmap"
                        src={srcProgressBarBitmap}
                        layout={{ position: 'absolute', left: 1, width: 120, top: 1, height: 16 }}
                    />
                    <Region
                        name="effect_time_left"
                        layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionEffectTimeLeft ?? '00:00 left'}
                            textOptions={{ fill: '#666666', align: 'center' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="save_to_activate"
                    layout={{ position: 'absolute', left: 9, width: 300, top: 327, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionSaveToActivate ?? t('avatareditor.save.to.activate')}
                        textOptions={{ fill: '#666666', wordWrap: true, wordWrapWidth: 300, align: 'center' }}
                    />
                </Region>
                <ButtonThick
                    variant="6"
                    name="get_more_button"
                    tintColor="#00aa00"
                    onPointerTap={onGetMoreButton}
                    textStyle="text-style-button-shiny-bold"
                    layout={{ position: 'absolute', right: 6, width: 115, top: 6, height: 28, maxWidth: 115 }}
                >
                    {t('avatareditor.effects.shop')}
                </ButtonThick>
            </Region>
            {(visibleCollectibleAvatarInfo ?? false) && (
                <Region
                    name="collectible_avatar_info"
                    backgroundColor="#454545"
                    layout={{ position: 'absolute', left: 356, width: 122, top: 345, height: 20 }}
                >
                    <Region
                        name="collectible_avatar_info_background"
                        backgroundColor="#454545"
                        layout={{ position: 'absolute', left: 0, width: 122, top: 0, height: 20 }}
                    />
                    <Region
                        name="avatar_info_text"
                        layout={{ position: 'absolute', left: 0, width: 122, top: 3, height: 20, minHeight: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionAvatarInfoText ?? 'Habbo Avatar'}
                            textOptions={{ fill: '#ff8823', align: 'center' }}
                        />
                    </Region>
                </Region>
            )}
            <Region
                name="rotate_avatar"
                onPointerTap={onRotateAvatar}
                cursor="pointer"
                layout={{ position: 'absolute', left: 389, width: 50, top: 295, height: 31 }}
            >
                <ThemeImage
                    src={layoutImage('avatar_editor_rotate_avatar_button.png')}
                    layout={{ position: 'absolute', left: 0, width: 44, top: 0, height: 29 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `avatarEditorContent` of AvatarEditorContentLayout - configured through the parent's `avatarEditorContent` prop. */
export interface AvatarEditorContentLayoutAvatarEditorContentProps {
    avatarEditor?: AvatarEditorContentLayoutAvatarEditorProps;
    captionAvatarName?: string;
    captionAvatarNameChange?: string;
    layout?: BoxLayout;
    onWardrobe?: () => void;
    srcWardrobeIcon?: string;
    visibleAvatarNameChange?: boolean;
}

export const AvatarEditorContentLayoutAvatarEditorContent = ({ avatarEditor, captionAvatarName, captionAvatarNameChange, layout, onWardrobe, srcWardrobeIcon, visibleAvatarNameChange }: AvatarEditorContentLayoutAvatarEditorContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="avatarEditorContent"
            layout={{ position: 'absolute', left: 0, width: 490, top: 0, height: 490, ...layout }}
        >
            <Region
                name="avatarNameEditor"
                layout={{ position: 'absolute', left: 1, width: 489, top: 0, height: 110, justifyContent: 'center' }}
            >
                <Region
                    name="name_background"
                    backgroundColor="#0e3f52"
                    layout={{ position: 'absolute', left: 0, width: 486, top: 0, height: 110 }}
                />
                <Region
                    name="avatar_name"
                    layout={{ position: 'absolute', marginLeft: -4.5, marginRight: 4.5, width: 400, top: 15, height: 35, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionAvatarName ?? t('avatareditor.title')}
                        textStyle="text-style-u-headline-big"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                {(visibleAvatarNameChange ?? false) && (
                    <Region
                        name="avatar_name_change"
                        layout={{ position: 'absolute', left: 170, width: 137, top: 50, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionAvatarNameChange ?? t('avatareditor.name.change')}
                            textOptions={{ fill: '#1b79ab' }}
                        />
                    </Region>
                )}
            </Region>
            <Region
                name="wardrobeButtonContainer"
                layout={{ position: 'absolute', left: 424, width: 55, top: 9, height: 30 }}
            >
                <Button
                    variant="3"
                    name="wardrobe"
                    onPointerTap={onWardrobe}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', left: 0, width: 55, top: 0, height: 30 }}
                />
                <ThemeImage
                    name="wardrobe_icon"
                    src={srcWardrobeIcon ?? layoutImage('avatar_editor_tabs_ae_tabs_wardrobe.png')}
                    layout={{ position: 'absolute', left: 0, width: 55, top: 0, height: 30 }}
                />
            </Region>
            <AvatarEditorContentLayoutAvatarEditor {...avatarEditor} />
            <Region
                name="sideContainer"
                layout={{ position: 'absolute', left: 487, width: 0, top: 0, height: 490 }}
            />
        </Region>
    );
};
