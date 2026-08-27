import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Region, ScrollArea, TabButton, TabContext, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `3113_AvatarEditorContent_xml` (layout "avatarEditorContent", 490x490) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarEditorContentLayoutProps {
    captionAvatarInfoText?: string;
    captionAvatarName?: string;
    captionAvatarNameChange?: string;
    captionContentNotification?: string;
    captionContentTitle?: string;
    captionEffectName?: string;
    captionEffectsTitle?: string;
    captionEffectTimeLeft?: string;
    captionHotlooksChoose?: string;
    captionHotlooksTitle?: string;
    captionNftsChoose?: string;
    captionNftsTitle?: string;
    captionSaveToActivate?: string;
    captionTabBoyTitle?: string;
    captionTabGirlTitle?: string;
    itemsPalette0?: ReactNode;
    itemsThumbs?: ReactNode;
    layout?: BoxLayout;
    onEffects?: () => void;
    onGeneric?: () => void;
    onGetMoreButton?: () => void;
    onHead?: () => void;
    onHotlooks?: () => void;
    onLegs?: () => void;
    onMisc?: () => void;
    onNfts?: () => void;
    onRotateAvatar?: () => void;
    onSave?: () => void;
    onTabAccessories?: () => void;
    onTabAccessories2?: () => void;
    onTabBelts?: () => void;
    onTabBoy?: () => void;
    onTabEffects?: () => void;
    onTabEyewear?: () => void;
    onTabGirl?: () => void;
    onTabHair?: () => void;
    onTabHat?: () => void;
    onTabJacket?: () => void;
    onTabMasks?: () => void;
    onTabMisc?: () => void;
    onTabPants?: () => void;
    onTabPets?: () => void;
    onTabPrints?: () => void;
    onTabShirt?: () => void;
    onTabShoes?: () => void;
    onTorso?: () => void;
    onWardrobe?: () => void;
    srcBitmap?: string;
    srcBitmap2?: string;
    srcBitmap3?: string;
    srcBitmap4?: string;
    srcBitmap5?: string;
    srcBitmap6?: string;
    srcBitmap7?: string;
    srcBitmap8?: string;
    srcProgressBarBitmap?: string;
    srcTabAccessories?: string;
    srcTabAccessories2?: string;
    srcTabBelts?: string;
    srcTabBoy?: string;
    srcTabEffects?: string;
    srcTabEyewear?: string;
    srcTabGirl?: string;
    srcTabHair?: string;
    srcTabHat?: string;
    srcTabJacket?: string;
    srcTabMasks?: string;
    srcTabMisc?: string;
    srcTabPants?: string;
    srcTabPets?: string;
    srcTabPrints?: string;
    srcTabShirt?: string;
    srcTabShoes?: string;
    srcWardrobeIcon?: string;
    visibleCollectibleAvatarInfo?: boolean;
    visibleEffectsContent?: boolean;
    visibleGenericContent?: boolean;
    visibleHeadContent?: boolean;
    visibleHotlooksContent?: boolean;
    visibleLegsContent?: boolean;
    visibleMiscContent?: boolean;
    visibleNftsContent?: boolean;
    visibleTorsoContent?: boolean;
}

export const AvatarEditorContentLayout = ({ captionAvatarInfoText, captionAvatarName, captionAvatarNameChange, captionContentNotification, captionContentTitle, captionEffectName, captionEffectsTitle, captionEffectTimeLeft, captionHotlooksChoose, captionHotlooksTitle, captionNftsChoose, captionNftsTitle, captionSaveToActivate, captionTabBoyTitle, captionTabGirlTitle, itemsPalette0, itemsThumbs, layout, onEffects, onGeneric, onGetMoreButton, onHead, onHotlooks, onLegs, onMisc, onNfts, onRotateAvatar, onSave, onTabAccessories, onTabAccessories2, onTabBelts, onTabBoy, onTabEffects, onTabEyewear, onTabGirl, onTabHair, onTabHat, onTabJacket, onTabMasks, onTabMisc, onTabPants, onTabPets, onTabPrints, onTabShirt, onTabShoes, onTorso, onWardrobe, srcBitmap, srcBitmap2, srcBitmap3, srcBitmap4, srcBitmap5, srcBitmap6, srcBitmap7, srcBitmap8, srcProgressBarBitmap, srcTabAccessories, srcTabAccessories2, srcTabBelts, srcTabBoy, srcTabEffects, srcTabEyewear, srcTabGirl, srcTabHair, srcTabHat, srcTabJacket, srcTabMasks, srcTabMisc, srcTabPants, srcTabPets, srcTabPrints, srcTabShirt, srcTabShoes, srcWardrobeIcon, visibleCollectibleAvatarInfo, visibleEffectsContent, visibleGenericContent, visibleHeadContent, visibleHotlooksContent, visibleLegsContent, visibleMiscContent, visibleNftsContent, visibleTorsoContent }: AvatarEditorContentLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 490, height: 490, ...layout }}>
            <Region
                name="avatarEditorContent"
                params={4358160}
                layout={{ position: 'absolute', left: 0, width: 490, top: 0, height: 490 }}
            >
                <Region
                    name="avatarNameEditor"
                    params={16}
                    layout={{ position: 'absolute', left: 1, width: 489, top: 0, height: 110 }}
                >
                    <Region
                        name="name_background"
                        params={17}
                        backgroundColor="#0e3f52"
                        layout={{ position: 'absolute', left: 0, width: 486, top: 0, height: 110 }}
                    />
                    <Region
                        name="avatar_name"
                        params={786448}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -204.5, width: 400, top: 15, height: 35, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionAvatarName ?? t('avatareditor.title')}
                            textStyle="text-style-u-headline-big"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="avatar_name_change"
                        params={1}
                        visible={false}
                        layout={{ position: 'absolute', left: 170, width: 137, top: 50, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionAvatarNameChange ?? t('avatareditor.name.change')}
                            textOptions={{ fill: '#1b79ab' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="wardrobeButtonContainer"
                    params={16}
                    layout={{ position: 'absolute', left: 424, width: 55, top: 9, height: 30 }}
                >
                    <Button
                        variant="3"
                        name="wardrobe"
                        params={131089}
                        onPointerTap={onWardrobe}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ position: 'absolute', left: 0, width: 55, top: 0, height: 30 }}
                    />
                    <ThemeImage
                        name="wardrobe_icon"
                        tags={[ 'BITMAP' ]}
                        params={16}
                        src={srcWardrobeIcon ?? layoutImage('avatar_editor_tabs_ae_tabs_wardrobe.png')}
                        layout={{ position: 'absolute', left: 0, width: 55, top: 0, height: 30 }}
                    />
                </Region>
                <Region
                    name="avatarEditor"
                    params={4358160}
                    layout={{ position: 'absolute', left: 1, width: 489, top: 70, height: 414 }}
                >
                    <Region
                        name="tabbedView"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 486, top: 4, height: 410 }}
                    >
                        <TabContext
                            variant="3"
                            name="mainTabs"
                            params={17}
                            layout={{ position: 'absolute', left: 0, width: 486, top: 5, height: 395 }}
                        >
                            <TabButton
                                variant="3"
                                name="generic"
                                params={17}
                                onPointerTap={onGeneric}
                                layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 46 }}
                            >
                                <ThemeImage
                                    name="bitmap"
                                    tags={[ 'BITMAP' ]}
                                    params={16}
                                    src={srcBitmap ?? layoutImage('avatar_editor_tabs_ae_tabs_generic.png')}
                                    layout={{ position: 'absolute', left: 1, width: 52, top: -5, height: 42 }}
                                />
                            </TabButton>
                            <TabButton
                                variant="3"
                                name="head"
                                params={17}
                                onPointerTap={onHead}
                                layout={{ position: 'absolute', left: 52, width: 52, top: 0, height: 46 }}
                            >
                                <ThemeImage
                                    name="bitmap"
                                    tags={[ 'BITMAP' ]}
                                    params={16}
                                    src={srcBitmap2 ?? layoutImage('avatar_editor_tabs_ae_tabs_head.png')}
                                    layout={{ position: 'absolute', left: 0, width: 52, top: -6, height: 42 }}
                                />
                            </TabButton>
                            <TabButton
                                variant="3"
                                name="torso"
                                params={17}
                                onPointerTap={onTorso}
                                layout={{ position: 'absolute', left: 104, width: 52, top: 0, height: 46 }}
                            >
                                <ThemeImage
                                    name="bitmap"
                                    tags={[ 'BITMAP' ]}
                                    params={16}
                                    src={srcBitmap3 ?? layoutImage('avatar_editor_tabs_ae_tabs_torso.png')}
                                    layout={{ position: 'absolute', left: 0, width: 52, top: -6, height: 42 }}
                                />
                            </TabButton>
                            <TabButton
                                variant="3"
                                name="legs"
                                params={17}
                                onPointerTap={onLegs}
                                layout={{ position: 'absolute', left: 156, width: 52, top: 0, height: 46 }}
                            >
                                <ThemeImage
                                    name="bitmap"
                                    tags={[ 'BITMAP' ]}
                                    params={16}
                                    src={srcBitmap4 ?? layoutImage('avatar_editor_tabs_ae_tabs_legs.png')}
                                    layout={{ position: 'absolute', left: 0, width: 52, top: -6, height: 42 }}
                                />
                            </TabButton>
                            <TabButton
                                variant="3"
                                name="misc"
                                params={17}
                                onPointerTap={onMisc}
                                layout={{ position: 'absolute', left: 208, width: 52, top: 0, height: 46 }}
                            >
                                <ThemeImage
                                    name="bitmap"
                                    tags={[ 'BITMAP' ]}
                                    params={16}
                                    src={srcBitmap5 ?? layoutImage('avatar_editor_tabs_ae_tabs_misc.png')}
                                    layout={{ position: 'absolute', left: 0, width: 52, top: -4, height: 42 }}
                                />
                            </TabButton>
                            <TabButton
                                variant="3"
                                name="hotlooks"
                                params={17}
                                onPointerTap={onHotlooks}
                                layout={{ position: 'absolute', left: 260, width: 52, top: 0, height: 46 }}
                            >
                                <ThemeImage
                                    name="bitmap"
                                    tags={[ 'BITMAP' ]}
                                    params={16}
                                    src={srcBitmap6 ?? layoutImage('avatar_editor_tabs_ae_tabs_hotlooks.png')}
                                    layout={{ position: 'absolute', left: 0, width: 52, top: -7, height: 42 }}
                                />
                            </TabButton>
                            <TabButton
                                variant="3"
                                name="effects"
                                params={17}
                                onPointerTap={onEffects}
                                layout={{ position: 'absolute', left: 312, width: 52, top: 0, height: 46 }}
                            >
                                <ThemeImage
                                    name="bitmap"
                                    tags={[ 'BITMAP' ]}
                                    params={16}
                                    src={srcBitmap7 ?? layoutImage('avatar_editor_tabs_ae_tabs_effects.png')}
                                    layout={{ position: 'absolute', left: 0, width: 52, top: -5, height: 42 }}
                                />
                            </TabButton>
                            <TabButton
                                variant="3"
                                name="nfts"
                                params={17}
                                onPointerTap={onNfts}
                                layout={{ position: 'absolute', left: 364, width: 52, top: 0, height: 46 }}
                            >
                                <ThemeImage
                                    name="bitmap"
                                    tags={[ 'BITMAP' ]}
                                    params={16}
                                    src={srcBitmap8 ?? layoutImage('nft_icon_24x24.png')}
                                    layout={{ position: 'absolute', left: 0, width: 52, top: -5, height: 42 }}
                                />
                            </TabButton>
                        </TabContext>
                        <Region
                            name="contentArea"
                            params={16}
                            layout={{ position: 'absolute', left: 2, width: 486, top: 36, height: 365 }}
                        >
                            <Region
                                name="generic_content"
                                params={16}
                                visible={visibleGenericContent ?? false}
                                layout={{ position: 'absolute', left: 20, width: 250, top: 10, height: 35 }}
                            >
                                <Region
                                    name="tab_boy"
                                    params={17}
                                    onPointerTap={onTabBoy}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 6, width: 47, top: 0, height: 35 }}
                                >
                                    <ThemeImage
                                        name="tab_boy"
                                        tags={[ 'BITMAP' ]}
                                        params={16}
                                        src={srcTabBoy ?? layoutImage('avatar_editor_tabs_gender_male_off.png')}
                                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                                    />
                                </Region>
                                <Region
                                    name="tab_boy_title"
                                    params={16}
                                    layout={{ position: 'absolute', left: 50, width: 143, top: 10, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={captionTabBoyTitle ?? t('avatareditor.generic.boy')} />
                                </Region>
                                <Region
                                    name="tab_girl"
                                    params={17}
                                    onPointerTap={onTabGirl}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 100, width: 47, top: 0, height: 35 }}
                                >
                                    <ThemeImage
                                        name="tab_girl"
                                        tags={[ 'BITMAP' ]}
                                        params={16}
                                        src={srcTabGirl ?? layoutImage('avatar_editor_tabs_gender_female_off.png')}
                                        layout={{ position: 'absolute', left: 0, width: 48, top: 0, height: 35 }}
                                    />
                                </Region>
                                <Region
                                    name="tab_girl_title"
                                    params={16}
                                    layout={{ position: 'absolute', left: 150, width: 141, top: 10, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={captionTabGirlTitle ?? t('avatareditor.generic.girl')} />
                                </Region>
                            </Region>
                            <Region
                                name="head_content"
                                params={16}
                                visible={visibleHeadContent ?? false}
                                layout={{ position: 'absolute', left: 20, width: 280, top: 10, height: 35 }}
                            >
                                <Region
                                    name="tab_hair"
                                    params={17}
                                    onPointerTap={onTabHair}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 6, width: 47, top: 0, height: 35 }}
                                >
                                    <ThemeImage
                                        name="tab_hair"
                                        tags={[ 'BITMAP' ]}
                                        params={16}
                                        src={srcTabHair ?? layoutImage('avatar_editor_tabs_head_hair_off.png')}
                                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                                    />
                                </Region>
                                <Region
                                    name="tab_hat"
                                    params={17}
                                    onPointerTap={onTabHat}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 58, width: 47, top: 0, height: 35 }}
                                >
                                    <ThemeImage
                                        name="tab_hat"
                                        tags={[ 'BITMAP' ]}
                                        params={16}
                                        src={srcTabHat ?? layoutImage('avatar_editor_tabs_head_hats_off.png')}
                                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                                    />
                                </Region>
                                <Region
                                    name="tab_accessories"
                                    params={17}
                                    onPointerTap={onTabAccessories}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 110, width: 47, top: 0, height: 35 }}
                                >
                                    <ThemeImage
                                        name="tab_accessories"
                                        tags={[ 'BITMAP' ]}
                                        params={16}
                                        src={srcTabAccessories ?? layoutImage('avatar_editor_tabs_head_accessories_off.png')}
                                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                                    />
                                </Region>
                                <Region
                                    name="tab_eyewear"
                                    params={17}
                                    onPointerTap={onTabEyewear}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 162, width: 47, top: 0, height: 35 }}
                                >
                                    <ThemeImage
                                        name="tab_eyewear"
                                        tags={[ 'BITMAP' ]}
                                        params={16}
                                        src={srcTabEyewear ?? layoutImage('avatar_editor_tabs_head_eyewear_off.png')}
                                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                                    />
                                </Region>
                                <Region
                                    name="tab_masks"
                                    params={17}
                                    onPointerTap={onTabMasks}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 214, width: 47, top: 0, height: 35 }}
                                >
                                    <ThemeImage
                                        name="tab_masks"
                                        tags={[ 'BITMAP' ]}
                                        params={16}
                                        src={srcTabMasks ?? layoutImage('avatar_editor_tabs_head_face_accessories_off.png')}
                                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                                    />
                                </Region>
                            </Region>
                            <Region
                                name="torso_content"
                                params={16}
                                visible={visibleTorsoContent ?? false}
                                layout={{ position: 'absolute', left: 20, width: 210, top: 10, height: 35 }}
                            >
                                <Region
                                    name="tab_shirt"
                                    params={17}
                                    onPointerTap={onTabShirt}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 6, width: 47, top: 0, height: 35 }}
                                >
                                    <ThemeImage
                                        name="tab_shirt"
                                        tags={[ 'BITMAP' ]}
                                        params={16}
                                        src={srcTabShirt ?? layoutImage('avatar_editor_tabs_top_shirt_off.png')}
                                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                                    />
                                </Region>
                                <Region
                                    name="tab_prints"
                                    params={17}
                                    onPointerTap={onTabPrints}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 58, width: 47, top: 0, height: 35 }}
                                >
                                    <ThemeImage
                                        name="tab_prints"
                                        tags={[ 'BITMAP' ]}
                                        params={16}
                                        src={srcTabPrints ?? layoutImage('avatar_editor_tabs_top_prints_off.png')}
                                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                                    />
                                </Region>
                                <Region
                                    name="tab_jacket"
                                    params={17}
                                    onPointerTap={onTabJacket}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 110, width: 47, top: 0, height: 35 }}
                                >
                                    <ThemeImage
                                        name="tab_jacket"
                                        tags={[ 'BITMAP' ]}
                                        params={16}
                                        src={srcTabJacket ?? layoutImage('avatar_editor_tabs_top_jacket_off.png')}
                                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                                    />
                                </Region>
                                <Region
                                    name="tab_accessories"
                                    params={17}
                                    onPointerTap={onTabAccessories2}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 162, width: 47, top: 0, height: 35 }}
                                >
                                    <ThemeImage
                                        name="tab_accessories"
                                        tags={[ 'BITMAP' ]}
                                        params={16}
                                        src={srcTabAccessories2 ?? layoutImage('avatar_editor_tabs_top_accessories_off.png')}
                                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                                    />
                                </Region>
                            </Region>
                            <Region
                                name="legs_content"
                                params={16}
                                visible={visibleLegsContent ?? false}
                                layout={{ position: 'absolute', left: 20, width: 170, top: 10, height: 35 }}
                            >
                                <Region
                                    name="tab_pants"
                                    params={17}
                                    onPointerTap={onTabPants}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 6, width: 47, top: 0, height: 35 }}
                                >
                                    <ThemeImage
                                        name="tab_pants"
                                        tags={[ 'BITMAP' ]}
                                        params={16}
                                        src={srcTabPants ?? layoutImage('avatar_editor_tabs_bottom_trousers_off.png')}
                                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                                    />
                                </Region>
                                <Region
                                    name="tab_shoes"
                                    params={17}
                                    onPointerTap={onTabShoes}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 58, width: 47, top: 0, height: 35 }}
                                >
                                    <ThemeImage
                                        name="tab_shoes"
                                        tags={[ 'BITMAP' ]}
                                        params={16}
                                        src={srcTabShoes ?? layoutImage('avatar_editor_tabs_bottom_shoes_off.png')}
                                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                                    />
                                </Region>
                                <Region
                                    name="tab_belts"
                                    params={17}
                                    onPointerTap={onTabBelts}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 110, width: 47, top: 0, height: 35 }}
                                >
                                    <ThemeImage
                                        name="tab_belts"
                                        tags={[ 'BITMAP' ]}
                                        params={16}
                                        src={srcTabBelts ?? layoutImage('avatar_editor_tabs_bottom_accessories_off.png')}
                                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                                    />
                                </Region>
                            </Region>
                            <Region
                                name="hotlooks_content"
                                params={16}
                                visible={visibleHotlooksContent ?? false}
                                layout={{ position: 'absolute', left: 20, width: 310, top: 10, height: 290 }}
                            >
                                <Region
                                    name="hotlooksTitle"
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 262, top: 0, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={captionHotlooksTitle ?? t('avatareditor.hotlooks.title')} />
                                </Region>
                                <Region
                                    name="hotlooksChoose"
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 168, top: 28, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={captionHotlooksChoose ?? t('avatareditor.hotlooks.choose')} />
                                </Region>
                                <Region
                                    name="hotlooks"
                                    tags={[ 'WARDROBE_HOTLOOKS_ITEM_GRID' ]}
                                    params={16}
                                    layout={{ position: 'absolute', left: 4, width: 299, top: 65, height: 220, flexDirection: 'row', flexWrap: 'wrap', gap: 7 }}
                                />
                            </Region>
                            <Region
                                name="nfts_content"
                                params={16}
                                visible={visibleNftsContent ?? false}
                                layout={{ position: 'absolute', left: 20, width: 310, top: 10, height: 290 }}
                            >
                                <Region
                                    name="nftsTitle"
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 217, top: 0, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={captionNftsTitle ?? t('avatareditor.nfts.title')} />
                                </Region>
                                <Region
                                    name="nftsChoose"
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 140, top: 28, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={captionNftsChoose ?? t('avatareditor.nfts.choose')} />
                                </Region>
                                <ScrollArea
                                    orientation="vertical"
                                    layout={{ position: 'absolute', left: 4, width: 299, top: 65, height: 220 }}
                                >
                                    <Region
                                        name="nfts"
                                        tags={[ 'WARDROBE_NFTS_ITEM_GRID' ]}
                                        params={16}
                                        layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, width: '100%' }}
                                    />
                                </ScrollArea>
                            </Region>
                            <Region
                                name="effects_content"
                                params={16}
                                visible={visibleEffectsContent ?? false}
                                layout={{ position: 'absolute', left: 20, width: 140, top: 10, height: 35 }}
                            >
                                <ThemeImage
                                    name="tab_effects"
                                    tags={[ 'BITMAP' ]}
                                    params={16}
                                    src={srcTabEffects ?? layoutImage('avatar_editor_tabs_effects_fx.png')}
                                    layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                                />
                                <Region
                                    name="effectsTitle"
                                    params={16}
                                    layout={{ position: 'absolute', left: 40, width: 169, top: 4, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={captionEffectsTitle ?? t('inventory.effects')} />
                                </Region>
                                <Region
                                    name="tab_effects"
                                    params={17}
                                    onPointerTap={onTabEffects}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 6, width: 47, top: 0, height: 35 }}
                                />
                            </Region>
                            <Region
                                name="misc_content"
                                params={16}
                                visible={visibleMiscContent ?? false}
                                layout={{ position: 'absolute', left: 20, width: 250, top: 10, height: 35 }}
                            >
                                <Region
                                    name="tab_pets"
                                    params={17}
                                    onPointerTap={onTabPets}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 6, width: 47, top: 0, height: 35 }}
                                >
                                    <ThemeImage
                                        name="tab_pets"
                                        tags={[ 'BITMAP' ]}
                                        params={16}
                                        src={srcTabPets ?? layoutImage('avatar_editor_tabs_icon_misc_pets_off.png')}
                                        layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
                                    />
                                </Region>
                                <Region
                                    name="tab_misc"
                                    params={17}
                                    onPointerTap={onTabMisc}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 58, width: 47, top: 0, height: 35 }}
                                >
                                    <ThemeImage
                                        name="tab_misc"
                                        tags={[ 'BITMAP' ]}
                                        params={16}
                                        src={srcTabMisc ?? layoutImage('avatar_editor_tabs_icon_misc_misc_off.png')}
                                        layout={{ position: 'absolute', left: 0, width: 48, top: 0, height: 35 }}
                                    />
                                </Region>
                            </Region>
                        </Region>
                        <Region
                            name="action_container"
                            params={16}
                            layout={{ position: 'absolute', left: 335, width: 122, top: 90, height: 210 }}
                        />
                        <Region
                            name="grid_container"
                            params={16}
                            layout={{ position: 'absolute', left: 20, width: 330, top: 94, height: 302 }}
                        >
                            <ScrollArea
                                orientation="vertical"
                                layout={{ position: 'absolute', left: 0, width: 330, top: 0, height: 200 }}
                            >
                                <Region
                                    name="thumbs"
                                    tags={[ 'CATEGORYNAME_ITEM_GRID' ]}
                                    params={16}
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
                                    tags={[ 'CATEGORY_COLOUR_ITEM_GRID' ]}
                                    params={16}
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
                                    tags={[ 'CATEGORY_COLOUR_ITEM_GRID' ]}
                                    params={16}
                                    layout={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}
                                />
                            </ScrollArea>
                            <Region
                                name="content_notification"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 298, top: 30, height: 128, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={captionContentNotification ?? t('avatar.editor.content.notification')} />
                            </Region>
                            <Region
                                name="content_title"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 300, top: 0, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionContentTitle ?? t('avatar.editor.content.title')}
                                    textStyle="text-style-u-bold"
                                />
                            </Region>
                        </Region>
                    </Region>
                    <WidgetSlot
                        widgetType="room_previewer"
                        name="avatarWidget"
                        tags={[ 'AVATAR' ]}
                        params={16}
                        options={{ 'room_previewer:offsetx': '-65', 'room_previewer:offsety': '-30', 'room_previewer:zoom': '2' }}
                        layout={{ position: 'absolute', left: 351, width: 125, top: 88, height: 210 }}
                    />
                    <ButtonThick
                        variant="3"
                        name="save"
                        params={917521}
                        onPointerTap={onSave}
                        textStyle="text-style-button-shiny-bold"
                        layout={{ position: 'absolute', left: '50%', marginLeft: 111.5, width: 122, top: 373, height: 28, minWidth: 100 }}
                    >
                        {t('avatareditor.save')}
                    </ButtonThick>
                    <Region
                        name="effectParamsContainer"
                        params={16}
                        layout={{ position: 'absolute', left: 11, width: 468, top: 46, height: 352 }}
                    >
                        <Region
                            name="effect_name"
                            params={16}
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
                            params={16}
                            layout={{ position: 'absolute', left: 345, width: 120, top: 301, height: 18 }}
                        >
                            <ThemeImage
                                name="progress_bar_bitmap"
                                params={16}
                                src={srcProgressBarBitmap}
                                layout={{ position: 'absolute', left: 1, width: 120, top: 1, height: 16 }}
                            />
                            <Region
                                name="effect_time_left"
                                params={16}
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
                            params={16}
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
                            params={393217}
                            tintColor="#00aa00"
                            onPointerTap={onGetMoreButton}
                            textStyle="text-style-button-shiny-bold"
                            layout={{ position: 'absolute', right: 6, width: 115, top: 6, height: 28, maxWidth: 115 }}
                        >
                            {t('avatareditor.effects.shop')}
                        </ButtonThick>
                    </Region>
                    <Region
                        name="collectible_avatar_info"
                        params={16}
                        visible={visibleCollectibleAvatarInfo ?? false}
                        backgroundColor="#454545"
                        layout={{ position: 'absolute', left: 356, width: 122, top: 345, height: 20 }}
                    >
                        <Region
                            name="collectible_avatar_info_background"
                            params={16}
                            backgroundColor="#454545"
                            layout={{ position: 'absolute', left: 0, width: 122, top: 0, height: 20 }}
                        />
                        <Region
                            name="avatar_info_text"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 122, top: 3, height: 20, minHeight: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionAvatarInfoText ?? 'Habbo Avatar'}
                                textOptions={{ fill: '#ff8823', align: 'center' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="rotate_avatar"
                        params={17}
                        onPointerTap={onRotateAvatar}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 389, width: 50, top: 295, height: 31 }}
                    >
                        <ThemeImage
                            params={16}
                            src={layoutImage('avatar_editor_rotate_avatar_button.png')}
                            layout={{ position: 'absolute', left: 0, width: 44, top: 0, height: 29 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="sideContainer"
                    params={16}
                    layout={{ position: 'absolute', left: 487, width: 0, top: 0, height: 490 }}
                />
            </Region>
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
            params={17}
            onPointerTap={onThumbTemplate}
            cursor="pointer"
            layout={{ width: 50, height: 50, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="hover"
                tags={[ 'BG_COLOR' ]}
                params={16}
                src={srcHover ?? layoutImage('avatar_editor_parts_hilite.png')}
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
            />
            <ThemeImage
                name="bitmap"
                tags={[ 'BITMAP' ]}
                params={16}
                src={srcBitmap}
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50, minWidth: 50, maxWidth: 50 }}
            />
            <ThemeImage
                name="club_icon"
                tags={[ 'CLUB_ICON' ]}
                params={16}
                src={srcClubIcon ?? layoutImage('icons_hc_icon_small.png')}
                layout={{ position: 'absolute', left: 40, width: 10, top: 40, height: 9 }}
            />
            <ThemeImage
                name="sellable_icon"
                tags={[ 'SELLABLE_ICON' ]}
                params={16}
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
            params={17}
            onPointerTap={onPaletteTemplate}
            cursor="pointer"
            layout={{ width: 15, height: 23, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="color"
                tags={[ 'COLOR_IMAGE' ]}
                params={16}
                src={srcColor}
                layout={{ position: 'absolute', left: 1, width: 13, top: 0, height: 21 }}
            />
            <ThemeImage
                name="border"
                tags={[ 'BORDER' ]}
                params={16}
                src={srcBorder ?? layoutImage('avatar_editor_editor_clr_13x21_1.png')}
                layout={{ position: 'absolute', left: 1, width: 13, top: 0, height: 21 }}
            />
            <ThemeImage
                name="club_icon"
                tags={[ 'CLUB_ICON' ]}
                params={16}
                src={srcClubIcon ?? layoutImage('icons_hc_icon_small.png')}
                layout={{ position: 'absolute', left: 3, width: 10, top: 10, height: 9 }}
            />
        </Region>
    );
};
