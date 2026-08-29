import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { AvatarEditorContentLayoutHeadContent, AvatarEditorContentLayoutHeadContentProps } from './AvatarEditorContentLayoutHeadContent';
import { AvatarEditorContentLayoutTorsoContent, AvatarEditorContentLayoutTorsoContentProps } from './AvatarEditorContentLayoutTorsoContent';

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
    itemsHotlooks?: ReactNode;
    itemsNfts?: ReactNode;
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
    tabEffects?: ReactNode;
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

export const AvatarEditorContentLayoutContentArea = ({ captionEffectsTitle, captionHotlooksChoose, captionHotlooksTitle, captionNftsChoose, captionNftsTitle, captionTabBoyTitle, captionTabGirlTitle, headContent, itemsHotlooks, itemsNfts, layout, onTabBelts, onTabBoy, onTabEffects, onTabGirl, onTabMisc, onTabPants, onTabPets, onTabShoes, srcTabBelts, srcTabBoy, srcTabEffects, srcTabGirl, srcTabMisc, srcTabPants, srcTabPets, srcTabShoes, tabEffects, torsoContent, visibleEffectsContent, visibleGenericContent, visibleHeadContent, visibleHotlooksContent, visibleLegsContent, visibleMiscContent, visibleNftsContent, visibleTorsoContent }: AvatarEditorContentLayoutContentAreaProps) => {
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
                    >
                        {itemsHotlooks}
                    </Region>
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
                        >
                            {itemsNfts}
                        </Region>
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
                    >
                        {tabEffects}
                    </Region>
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
