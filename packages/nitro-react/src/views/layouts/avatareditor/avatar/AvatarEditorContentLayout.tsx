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

/** Named region `name_background` of AvatarEditorContentLayout - configured through the parent's `nameBackground` prop. */
export interface AvatarEditorContentLayoutNameBackgroundProps {
    layout?: BoxLayout;
}

export const AvatarEditorContentLayoutNameBackground = ({ layout }: AvatarEditorContentLayoutNameBackgroundProps) => {
    return (
        <Region
            name="name_background"
            backgroundColor="#0e3f52"
            layout={{ position: 'absolute', left: 0, width: 486, top: 0, height: 110, ...layout }}
        />
    );
};

/** Named region `avatarNameEditor` of AvatarEditorContentLayout - configured through the parent's `avatarNameEditor` prop. */
export interface AvatarEditorContentLayoutAvatarNameEditorProps {
    captionAvatarName?: string;
    captionAvatarNameChange?: string;
    layout?: BoxLayout;
    nameBackground?: AvatarEditorContentLayoutNameBackgroundProps;
}

export const AvatarEditorContentLayoutAvatarNameEditor = ({ captionAvatarName, captionAvatarNameChange, layout, nameBackground }: AvatarEditorContentLayoutAvatarNameEditorProps) => {
    const t = useTranslation();

    return (
        <Region
            name="avatarNameEditor"
            layout={{ position: 'absolute', left: 1, width: 489, top: 0, height: 110, justifyContent: 'center', ...layout }}
        >
            <AvatarEditorContentLayoutNameBackground {...nameBackground} />
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
            <Region
                name="avatar_name_change"
                visible={false}
                layout={{ position: 'absolute', left: 170, width: 137, top: 50, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionAvatarNameChange ?? t('avatareditor.name.change')}
                    textOptions={{ fill: '#1b79ab' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `wardrobeButtonContainer` of AvatarEditorContentLayout - configured through the parent's `wardrobeButtonContainer` prop. */
export interface AvatarEditorContentLayoutWardrobeButtonContainerProps {
    layout?: BoxLayout;
    onWardrobe?: () => void;
    srcWardrobeIcon?: string;
}

export const AvatarEditorContentLayoutWardrobeButtonContainer = ({ layout, onWardrobe, srcWardrobeIcon }: AvatarEditorContentLayoutWardrobeButtonContainerProps) => {
    return (
        <Region
            name="wardrobeButtonContainer"
            layout={{ position: 'absolute', left: 424, width: 55, top: 9, height: 30, ...layout }}
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
    );
};

/** Named region `tab_boy` of AvatarEditorContentLayout - configured through the parent's `tabBoy` prop. */
export interface AvatarEditorContentLayoutTabBoyProps {
    layout?: BoxLayout;
    onTabBoy?: () => void;
    srcTabBoy?: string;
}

export const AvatarEditorContentLayoutTabBoy = ({ layout, onTabBoy, srcTabBoy }: AvatarEditorContentLayoutTabBoyProps) => {
    return (
        <Region
            name="tab_boy"
            onPointerTap={onTabBoy}
            cursor="pointer"
            layout={{ position: 'absolute', left: 6, width: 47, top: 0, height: 35, ...layout }}
        >
            <ThemeImage
                name="tab_boy"
                src={srcTabBoy ?? layoutImage('avatar_editor_tabs_gender_male_off.png')}
                layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
            />
        </Region>
    );
};

/** Named region `tab_girl` of AvatarEditorContentLayout - configured through the parent's `tabGirl` prop. */
export interface AvatarEditorContentLayoutTabGirlProps {
    layout?: BoxLayout;
    onTabGirl?: () => void;
    srcTabGirl?: string;
}

export const AvatarEditorContentLayoutTabGirl = ({ layout, onTabGirl, srcTabGirl }: AvatarEditorContentLayoutTabGirlProps) => {
    return (
        <Region
            name="tab_girl"
            onPointerTap={onTabGirl}
            cursor="pointer"
            layout={{ position: 'absolute', left: 100, width: 47, top: 0, height: 35, ...layout }}
        >
            <ThemeImage
                name="tab_girl"
                src={srcTabGirl ?? layoutImage('avatar_editor_tabs_gender_female_off.png')}
                layout={{ position: 'absolute', left: 0, width: 48, top: 0, height: 35 }}
            />
        </Region>
    );
};

/** Named region `generic_content` of AvatarEditorContentLayout - configured through the parent's `genericContent` prop. */
export interface AvatarEditorContentLayoutGenericContentProps {
    captionTabBoyTitle?: string;
    captionTabGirlTitle?: string;
    layout?: BoxLayout;
    tabBoy?: AvatarEditorContentLayoutTabBoyProps;
    tabGirl?: AvatarEditorContentLayoutTabGirlProps;
    visibleGenericContent?: boolean;
}

export const AvatarEditorContentLayoutGenericContent = ({ captionTabBoyTitle, captionTabGirlTitle, layout, tabBoy, tabGirl, visibleGenericContent }: AvatarEditorContentLayoutGenericContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="generic_content"
            visible={visibleGenericContent ?? false}
            layout={{ position: 'absolute', left: 20, width: 250, top: 10, height: 35, ...layout }}
        >
            <AvatarEditorContentLayoutTabBoy {...tabBoy} />
            <Region
                name="tab_boy_title"
                layout={{ position: 'absolute', left: 50, width: 143, top: 10, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTabBoyTitle ?? t('avatareditor.generic.boy')} />
            </Region>
            <AvatarEditorContentLayoutTabGirl {...tabGirl} />
            <Region
                name="tab_girl_title"
                layout={{ position: 'absolute', left: 150, width: 141, top: 10, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTabGirlTitle ?? t('avatareditor.generic.girl')} />
            </Region>
        </Region>
    );
};

/** Named region `tab_hair` of AvatarEditorContentLayout - configured through the parent's `tabHair` prop. */
export interface AvatarEditorContentLayoutTabHairProps {
    layout?: BoxLayout;
    onTabHair?: () => void;
    srcTabHair?: string;
}

export const AvatarEditorContentLayoutTabHair = ({ layout, onTabHair, srcTabHair }: AvatarEditorContentLayoutTabHairProps) => {
    return (
        <Region
            name="tab_hair"
            onPointerTap={onTabHair}
            cursor="pointer"
            layout={{ position: 'absolute', left: 6, width: 47, top: 0, height: 35, ...layout }}
        >
            <ThemeImage
                name="tab_hair"
                src={srcTabHair ?? layoutImage('avatar_editor_tabs_head_hair_off.png')}
                layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
            />
        </Region>
    );
};

/** Named region `tab_hat` of AvatarEditorContentLayout - configured through the parent's `tabHat` prop. */
export interface AvatarEditorContentLayoutTabHatProps {
    layout?: BoxLayout;
    onTabHat?: () => void;
    srcTabHat?: string;
}

export const AvatarEditorContentLayoutTabHat = ({ layout, onTabHat, srcTabHat }: AvatarEditorContentLayoutTabHatProps) => {
    return (
        <Region
            name="tab_hat"
            onPointerTap={onTabHat}
            cursor="pointer"
            layout={{ position: 'absolute', left: 58, width: 47, top: 0, height: 35, ...layout }}
        >
            <ThemeImage
                name="tab_hat"
                src={srcTabHat ?? layoutImage('avatar_editor_tabs_head_hats_off.png')}
                layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
            />
        </Region>
    );
};

/** Named region `tab_accessories` of AvatarEditorContentLayout - configured through the parent's `tabAccessories` prop. */
export interface AvatarEditorContentLayoutTabAccessoriesProps {
    layout?: BoxLayout;
    onTabAccessories?: () => void;
    srcTabAccessories?: string;
}

export const AvatarEditorContentLayoutTabAccessories = ({ layout, onTabAccessories, srcTabAccessories }: AvatarEditorContentLayoutTabAccessoriesProps) => {
    return (
        <Region
            name="tab_accessories"
            onPointerTap={onTabAccessories}
            cursor="pointer"
            layout={{ position: 'absolute', left: 110, width: 47, top: 0, height: 35, ...layout }}
        >
            <ThemeImage
                name="tab_accessories"
                src={srcTabAccessories ?? layoutImage('avatar_editor_tabs_head_accessories_off.png')}
                layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
            />
        </Region>
    );
};

/** Named region `tab_eyewear` of AvatarEditorContentLayout - configured through the parent's `tabEyewear` prop. */
export interface AvatarEditorContentLayoutTabEyewearProps {
    layout?: BoxLayout;
    onTabEyewear?: () => void;
    srcTabEyewear?: string;
}

export const AvatarEditorContentLayoutTabEyewear = ({ layout, onTabEyewear, srcTabEyewear }: AvatarEditorContentLayoutTabEyewearProps) => {
    return (
        <Region
            name="tab_eyewear"
            onPointerTap={onTabEyewear}
            cursor="pointer"
            layout={{ position: 'absolute', left: 162, width: 47, top: 0, height: 35, ...layout }}
        >
            <ThemeImage
                name="tab_eyewear"
                src={srcTabEyewear ?? layoutImage('avatar_editor_tabs_head_eyewear_off.png')}
                layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
            />
        </Region>
    );
};

/** Named region `tab_masks` of AvatarEditorContentLayout - configured through the parent's `tabMasks` prop. */
export interface AvatarEditorContentLayoutTabMasksProps {
    layout?: BoxLayout;
    onTabMasks?: () => void;
    srcTabMasks?: string;
}

export const AvatarEditorContentLayoutTabMasks = ({ layout, onTabMasks, srcTabMasks }: AvatarEditorContentLayoutTabMasksProps) => {
    return (
        <Region
            name="tab_masks"
            onPointerTap={onTabMasks}
            cursor="pointer"
            layout={{ position: 'absolute', left: 214, width: 47, top: 0, height: 35, ...layout }}
        >
            <ThemeImage
                name="tab_masks"
                src={srcTabMasks ?? layoutImage('avatar_editor_tabs_head_face_accessories_off.png')}
                layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
            />
        </Region>
    );
};

/** Named region `head_content` of AvatarEditorContentLayout - configured through the parent's `headContent` prop. */
export interface AvatarEditorContentLayoutHeadContentProps {
    layout?: BoxLayout;
    tabAccessories?: AvatarEditorContentLayoutTabAccessoriesProps;
    tabEyewear?: AvatarEditorContentLayoutTabEyewearProps;
    tabHair?: AvatarEditorContentLayoutTabHairProps;
    tabHat?: AvatarEditorContentLayoutTabHatProps;
    tabMasks?: AvatarEditorContentLayoutTabMasksProps;
    visibleHeadContent?: boolean;
}

export const AvatarEditorContentLayoutHeadContent = ({ layout, tabAccessories, tabEyewear, tabHair, tabHat, tabMasks, visibleHeadContent }: AvatarEditorContentLayoutHeadContentProps) => {
    return (
        <Region
            name="head_content"
            visible={visibleHeadContent ?? false}
            layout={{ position: 'absolute', left: 20, width: 280, top: 10, height: 35, ...layout }}
        >
            <AvatarEditorContentLayoutTabHair {...tabHair} />
            <AvatarEditorContentLayoutTabHat {...tabHat} />
            <AvatarEditorContentLayoutTabAccessories {...tabAccessories} />
            <AvatarEditorContentLayoutTabEyewear {...tabEyewear} />
            <AvatarEditorContentLayoutTabMasks {...tabMasks} />
        </Region>
    );
};

/** Named region `tab_shirt` of AvatarEditorContentLayout - configured through the parent's `tabShirt` prop. */
export interface AvatarEditorContentLayoutTabShirtProps {
    layout?: BoxLayout;
    onTabShirt?: () => void;
    srcTabShirt?: string;
}

export const AvatarEditorContentLayoutTabShirt = ({ layout, onTabShirt, srcTabShirt }: AvatarEditorContentLayoutTabShirtProps) => {
    return (
        <Region
            name="tab_shirt"
            onPointerTap={onTabShirt}
            cursor="pointer"
            layout={{ position: 'absolute', left: 6, width: 47, top: 0, height: 35, ...layout }}
        >
            <ThemeImage
                name="tab_shirt"
                src={srcTabShirt ?? layoutImage('avatar_editor_tabs_top_shirt_off.png')}
                layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
            />
        </Region>
    );
};

/** Named region `tab_prints` of AvatarEditorContentLayout - configured through the parent's `tabPrints` prop. */
export interface AvatarEditorContentLayoutTabPrintsProps {
    layout?: BoxLayout;
    onTabPrints?: () => void;
    srcTabPrints?: string;
}

export const AvatarEditorContentLayoutTabPrints = ({ layout, onTabPrints, srcTabPrints }: AvatarEditorContentLayoutTabPrintsProps) => {
    return (
        <Region
            name="tab_prints"
            onPointerTap={onTabPrints}
            cursor="pointer"
            layout={{ position: 'absolute', left: 58, width: 47, top: 0, height: 35, ...layout }}
        >
            <ThemeImage
                name="tab_prints"
                src={srcTabPrints ?? layoutImage('avatar_editor_tabs_top_prints_off.png')}
                layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
            />
        </Region>
    );
};

/** Named region `tab_jacket` of AvatarEditorContentLayout - configured through the parent's `tabJacket` prop. */
export interface AvatarEditorContentLayoutTabJacketProps {
    layout?: BoxLayout;
    onTabJacket?: () => void;
    srcTabJacket?: string;
}

export const AvatarEditorContentLayoutTabJacket = ({ layout, onTabJacket, srcTabJacket }: AvatarEditorContentLayoutTabJacketProps) => {
    return (
        <Region
            name="tab_jacket"
            onPointerTap={onTabJacket}
            cursor="pointer"
            layout={{ position: 'absolute', left: 110, width: 47, top: 0, height: 35, ...layout }}
        >
            <ThemeImage
                name="tab_jacket"
                src={srcTabJacket ?? layoutImage('avatar_editor_tabs_top_jacket_off.png')}
                layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
            />
        </Region>
    );
};

/** Named region `tab_accessories` of AvatarEditorContentLayout - configured through the parent's `tabAccessories` prop. */
export interface AvatarEditorContentLayoutTabAccessories2Props {
    layout?: BoxLayout;
    onTabAccessories?: () => void;
    srcTabAccessories?: string;
}

export const AvatarEditorContentLayoutTabAccessories2 = ({ layout, onTabAccessories, srcTabAccessories }: AvatarEditorContentLayoutTabAccessories2Props) => {
    return (
        <Region
            name="tab_accessories"
            onPointerTap={onTabAccessories}
            cursor="pointer"
            layout={{ position: 'absolute', left: 162, width: 47, top: 0, height: 35, ...layout }}
        >
            <ThemeImage
                name="tab_accessories"
                src={srcTabAccessories ?? layoutImage('avatar_editor_tabs_top_accessories_off.png')}
                layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
            />
        </Region>
    );
};

/** Named region `torso_content` of AvatarEditorContentLayout - configured through the parent's `torsoContent` prop. */
export interface AvatarEditorContentLayoutTorsoContentProps {
    layout?: BoxLayout;
    tabAccessories?: AvatarEditorContentLayoutTabAccessories2Props;
    tabJacket?: AvatarEditorContentLayoutTabJacketProps;
    tabPrints?: AvatarEditorContentLayoutTabPrintsProps;
    tabShirt?: AvatarEditorContentLayoutTabShirtProps;
    visibleTorsoContent?: boolean;
}

export const AvatarEditorContentLayoutTorsoContent = ({ layout, tabAccessories, tabJacket, tabPrints, tabShirt, visibleTorsoContent }: AvatarEditorContentLayoutTorsoContentProps) => {
    return (
        <Region
            name="torso_content"
            visible={visibleTorsoContent ?? false}
            layout={{ position: 'absolute', left: 20, width: 210, top: 10, height: 35, ...layout }}
        >
            <AvatarEditorContentLayoutTabShirt {...tabShirt} />
            <AvatarEditorContentLayoutTabPrints {...tabPrints} />
            <AvatarEditorContentLayoutTabJacket {...tabJacket} />
            <AvatarEditorContentLayoutTabAccessories2 {...tabAccessories} />
        </Region>
    );
};

/** Named region `tab_pants` of AvatarEditorContentLayout - configured through the parent's `tabPants` prop. */
export interface AvatarEditorContentLayoutTabPantsProps {
    layout?: BoxLayout;
    onTabPants?: () => void;
    srcTabPants?: string;
}

export const AvatarEditorContentLayoutTabPants = ({ layout, onTabPants, srcTabPants }: AvatarEditorContentLayoutTabPantsProps) => {
    return (
        <Region
            name="tab_pants"
            onPointerTap={onTabPants}
            cursor="pointer"
            layout={{ position: 'absolute', left: 6, width: 47, top: 0, height: 35, ...layout }}
        >
            <ThemeImage
                name="tab_pants"
                src={srcTabPants ?? layoutImage('avatar_editor_tabs_bottom_trousers_off.png')}
                layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
            />
        </Region>
    );
};

/** Named region `tab_shoes` of AvatarEditorContentLayout - configured through the parent's `tabShoes` prop. */
export interface AvatarEditorContentLayoutTabShoesProps {
    layout?: BoxLayout;
    onTabShoes?: () => void;
    srcTabShoes?: string;
}

export const AvatarEditorContentLayoutTabShoes = ({ layout, onTabShoes, srcTabShoes }: AvatarEditorContentLayoutTabShoesProps) => {
    return (
        <Region
            name="tab_shoes"
            onPointerTap={onTabShoes}
            cursor="pointer"
            layout={{ position: 'absolute', left: 58, width: 47, top: 0, height: 35, ...layout }}
        >
            <ThemeImage
                name="tab_shoes"
                src={srcTabShoes ?? layoutImage('avatar_editor_tabs_bottom_shoes_off.png')}
                layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
            />
        </Region>
    );
};

/** Named region `tab_belts` of AvatarEditorContentLayout - configured through the parent's `tabBelts` prop. */
export interface AvatarEditorContentLayoutTabBeltsProps {
    layout?: BoxLayout;
    onTabBelts?: () => void;
    srcTabBelts?: string;
}

export const AvatarEditorContentLayoutTabBelts = ({ layout, onTabBelts, srcTabBelts }: AvatarEditorContentLayoutTabBeltsProps) => {
    return (
        <Region
            name="tab_belts"
            onPointerTap={onTabBelts}
            cursor="pointer"
            layout={{ position: 'absolute', left: 110, width: 47, top: 0, height: 35, ...layout }}
        >
            <ThemeImage
                name="tab_belts"
                src={srcTabBelts ?? layoutImage('avatar_editor_tabs_bottom_accessories_off.png')}
                layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
            />
        </Region>
    );
};

/** Named region `legs_content` of AvatarEditorContentLayout - configured through the parent's `legsContent` prop. */
export interface AvatarEditorContentLayoutLegsContentProps {
    layout?: BoxLayout;
    tabBelts?: AvatarEditorContentLayoutTabBeltsProps;
    tabPants?: AvatarEditorContentLayoutTabPantsProps;
    tabShoes?: AvatarEditorContentLayoutTabShoesProps;
    visibleLegsContent?: boolean;
}

export const AvatarEditorContentLayoutLegsContent = ({ layout, tabBelts, tabPants, tabShoes, visibleLegsContent }: AvatarEditorContentLayoutLegsContentProps) => {
    return (
        <Region
            name="legs_content"
            visible={visibleLegsContent ?? false}
            layout={{ position: 'absolute', left: 20, width: 170, top: 10, height: 35, ...layout }}
        >
            <AvatarEditorContentLayoutTabPants {...tabPants} />
            <AvatarEditorContentLayoutTabShoes {...tabShoes} />
            <AvatarEditorContentLayoutTabBelts {...tabBelts} />
        </Region>
    );
};

/** Named region `hotlooks` of AvatarEditorContentLayout - configured through the parent's `hotlooks` prop. */
export interface AvatarEditorContentLayoutHotlooksProps {
    layout?: BoxLayout;
}

export const AvatarEditorContentLayoutHotlooks = ({ layout }: AvatarEditorContentLayoutHotlooksProps) => {
    return (
        <Region
            name="hotlooks"
            layout={{ position: 'absolute', left: 4, width: 299, top: 65, height: 220, flexDirection: 'row', flexWrap: 'wrap', gap: 7, ...layout }}
        />
    );
};

/** Named region `hotlooks_content` of AvatarEditorContentLayout - configured through the parent's `hotlooksContent` prop. */
export interface AvatarEditorContentLayoutHotlooksContentProps {
    captionHotlooksChoose?: string;
    captionHotlooksTitle?: string;
    hotlooks?: AvatarEditorContentLayoutHotlooksProps;
    layout?: BoxLayout;
    visibleHotlooksContent?: boolean;
}

export const AvatarEditorContentLayoutHotlooksContent = ({ captionHotlooksChoose, captionHotlooksTitle, hotlooks, layout, visibleHotlooksContent }: AvatarEditorContentLayoutHotlooksContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="hotlooks_content"
            visible={visibleHotlooksContent ?? false}
            layout={{ position: 'absolute', left: 20, width: 310, top: 10, height: 290, ...layout }}
        >
            <Region
                name="hotlooksTitle"
                layout={{ position: 'absolute', left: 0, width: 262, top: 0, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionHotlooksTitle ?? t('avatareditor.hotlooks.title')} />
            </Region>
            <Region
                name="hotlooksChoose"
                layout={{ position: 'absolute', left: 0, width: 168, top: 28, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionHotlooksChoose ?? t('avatareditor.hotlooks.choose')} />
            </Region>
            <AvatarEditorContentLayoutHotlooks {...hotlooks} />
        </Region>
    );
};

/** Named region `nfts` of AvatarEditorContentLayout - configured through the parent's `nfts` prop. */
export interface AvatarEditorContentLayoutNftsProps {
    layout?: BoxLayout;
}

export const AvatarEditorContentLayoutNfts = ({ layout }: AvatarEditorContentLayoutNftsProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 4, width: 299, top: 65, height: 220, ...layout }}
        >
            <Region
                name="nfts"
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `nfts_content` of AvatarEditorContentLayout - configured through the parent's `nftsContent` prop. */
export interface AvatarEditorContentLayoutNftsContentProps {
    captionNftsChoose?: string;
    captionNftsTitle?: string;
    layout?: BoxLayout;
    nfts?: AvatarEditorContentLayoutNftsProps;
    visibleNftsContent?: boolean;
}

export const AvatarEditorContentLayoutNftsContent = ({ captionNftsChoose, captionNftsTitle, layout, nfts, visibleNftsContent }: AvatarEditorContentLayoutNftsContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="nfts_content"
            visible={visibleNftsContent ?? false}
            layout={{ position: 'absolute', left: 20, width: 310, top: 10, height: 290, ...layout }}
        >
            <Region
                name="nftsTitle"
                layout={{ position: 'absolute', left: 0, width: 217, top: 0, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionNftsTitle ?? t('avatareditor.nfts.title')} />
            </Region>
            <Region
                name="nftsChoose"
                layout={{ position: 'absolute', left: 0, width: 140, top: 28, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionNftsChoose ?? t('avatareditor.nfts.choose')} />
            </Region>
            <AvatarEditorContentLayoutNfts {...nfts} />
        </Region>
    );
};

/** Named region `tab_effects` of AvatarEditorContentLayout - configured through the parent's `tabEffects` prop. */
export interface AvatarEditorContentLayoutTabEffectsProps {
    layout?: BoxLayout;
    onTabEffects?: () => void;
}

export const AvatarEditorContentLayoutTabEffects = ({ layout, onTabEffects }: AvatarEditorContentLayoutTabEffectsProps) => {
    return (
        <Region
            name="tab_effects"
            onPointerTap={onTabEffects}
            cursor="pointer"
            layout={{ position: 'absolute', left: 6, width: 47, top: 0, height: 35, ...layout }}
        />
    );
};

/** Named region `effects_content` of AvatarEditorContentLayout - configured through the parent's `effectsContent` prop. */
export interface AvatarEditorContentLayoutEffectsContentProps {
    captionEffectsTitle?: string;
    layout?: BoxLayout;
    srcTabEffects?: string;
    tabEffects?: AvatarEditorContentLayoutTabEffectsProps;
    visibleEffectsContent?: boolean;
}

export const AvatarEditorContentLayoutEffectsContent = ({ captionEffectsTitle, layout, srcTabEffects, tabEffects, visibleEffectsContent }: AvatarEditorContentLayoutEffectsContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="effects_content"
            visible={visibleEffectsContent ?? false}
            layout={{ position: 'absolute', left: 20, width: 140, top: 10, height: 35, ...layout }}
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
                <ThemeText text={captionEffectsTitle ?? t('inventory.effects')} />
            </Region>
            <AvatarEditorContentLayoutTabEffects {...tabEffects} />
        </Region>
    );
};

/** Named region `tab_pets` of AvatarEditorContentLayout - configured through the parent's `tabPets` prop. */
export interface AvatarEditorContentLayoutTabPetsProps {
    layout?: BoxLayout;
    onTabPets?: () => void;
    srcTabPets?: string;
}

export const AvatarEditorContentLayoutTabPets = ({ layout, onTabPets, srcTabPets }: AvatarEditorContentLayoutTabPetsProps) => {
    return (
        <Region
            name="tab_pets"
            onPointerTap={onTabPets}
            cursor="pointer"
            layout={{ position: 'absolute', left: 6, width: 47, top: 0, height: 35, ...layout }}
        >
            <ThemeImage
                name="tab_pets"
                src={srcTabPets ?? layoutImage('avatar_editor_tabs_icon_misc_pets_off.png')}
                layout={{ position: 'absolute', left: 0, width: 47, top: 0, height: 35 }}
            />
        </Region>
    );
};

/** Named region `tab_misc` of AvatarEditorContentLayout - configured through the parent's `tabMisc` prop. */
export interface AvatarEditorContentLayoutTabMiscProps {
    layout?: BoxLayout;
    onTabMisc?: () => void;
    srcTabMisc?: string;
}

export const AvatarEditorContentLayoutTabMisc = ({ layout, onTabMisc, srcTabMisc }: AvatarEditorContentLayoutTabMiscProps) => {
    return (
        <Region
            name="tab_misc"
            onPointerTap={onTabMisc}
            cursor="pointer"
            layout={{ position: 'absolute', left: 58, width: 47, top: 0, height: 35, ...layout }}
        >
            <ThemeImage
                name="tab_misc"
                src={srcTabMisc ?? layoutImage('avatar_editor_tabs_icon_misc_misc_off.png')}
                layout={{ position: 'absolute', left: 0, width: 48, top: 0, height: 35 }}
            />
        </Region>
    );
};

/** Named region `misc_content` of AvatarEditorContentLayout - configured through the parent's `miscContent` prop. */
export interface AvatarEditorContentLayoutMiscContentProps {
    layout?: BoxLayout;
    tabMisc?: AvatarEditorContentLayoutTabMiscProps;
    tabPets?: AvatarEditorContentLayoutTabPetsProps;
    visibleMiscContent?: boolean;
}

export const AvatarEditorContentLayoutMiscContent = ({ layout, tabMisc, tabPets, visibleMiscContent }: AvatarEditorContentLayoutMiscContentProps) => {
    return (
        <Region
            name="misc_content"
            visible={visibleMiscContent ?? false}
            layout={{ position: 'absolute', left: 20, width: 250, top: 10, height: 35, ...layout }}
        >
            <AvatarEditorContentLayoutTabPets {...tabPets} />
            <AvatarEditorContentLayoutTabMisc {...tabMisc} />
        </Region>
    );
};

/** Named region `contentArea` of AvatarEditorContentLayout - configured through the parent's `contentArea` prop. */
export interface AvatarEditorContentLayoutContentAreaProps {
    effectsContent?: AvatarEditorContentLayoutEffectsContentProps;
    genericContent?: AvatarEditorContentLayoutGenericContentProps;
    headContent?: AvatarEditorContentLayoutHeadContentProps;
    hotlooksContent?: AvatarEditorContentLayoutHotlooksContentProps;
    layout?: BoxLayout;
    legsContent?: AvatarEditorContentLayoutLegsContentProps;
    miscContent?: AvatarEditorContentLayoutMiscContentProps;
    nftsContent?: AvatarEditorContentLayoutNftsContentProps;
    torsoContent?: AvatarEditorContentLayoutTorsoContentProps;
}

export const AvatarEditorContentLayoutContentArea = ({ effectsContent, genericContent, headContent, hotlooksContent, layout, legsContent, miscContent, nftsContent, torsoContent }: AvatarEditorContentLayoutContentAreaProps) => {
    return (
        <Region
            name="contentArea"
            layout={{ position: 'absolute', left: 2, width: 486, top: 36, height: 365, ...layout }}
        >
            <AvatarEditorContentLayoutGenericContent {...genericContent} />
            <AvatarEditorContentLayoutHeadContent {...headContent} />
            <AvatarEditorContentLayoutTorsoContent {...torsoContent} />
            <AvatarEditorContentLayoutLegsContent {...legsContent} />
            <AvatarEditorContentLayoutHotlooksContent {...hotlooksContent} />
            <AvatarEditorContentLayoutNftsContent {...nftsContent} />
            <AvatarEditorContentLayoutEffectsContent {...effectsContent} />
            <AvatarEditorContentLayoutMiscContent {...miscContent} />
        </Region>
    );
};

/** Named region `action_container` of AvatarEditorContentLayout - configured through the parent's `actionContainer` prop. */
export interface AvatarEditorContentLayoutActionContainerProps {
    layout?: BoxLayout;
}

export const AvatarEditorContentLayoutActionContainer = ({ layout }: AvatarEditorContentLayoutActionContainerProps) => {
    return (
        <Region
            name="action_container"
            layout={{ position: 'absolute', left: 335, width: 122, top: 90, height: 210, ...layout }}
        />
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

/** Named region `thumbs` of AvatarEditorContentLayout - configured through the parent's `thumbs` prop. */
export interface AvatarEditorContentLayoutThumbsProps {
    itemsThumbs?: ReactNode;
    layout?: BoxLayout;
}

export const AvatarEditorContentLayoutThumbs = ({ itemsThumbs, layout }: AvatarEditorContentLayoutThumbsProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 330, top: 0, height: 200, ...layout }}
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

/** Named region `palette0` of AvatarEditorContentLayout - configured through the parent's `palette0` prop. */
export interface AvatarEditorContentLayoutPalette0Props {
    itemsPalette0?: ReactNode;
    layout?: BoxLayout;
}

export const AvatarEditorContentLayoutPalette0 = ({ itemsPalette0, layout }: AvatarEditorContentLayoutPalette0Props) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 165, top: 210, height: 93, ...layout }}
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
    );
};

/** Named region `palette1` of AvatarEditorContentLayout - configured through the parent's `palette1` prop. */
export interface AvatarEditorContentLayoutPalette1Props {
    layout?: BoxLayout;
}

export const AvatarEditorContentLayoutPalette1 = ({ layout }: AvatarEditorContentLayoutPalette1Props) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 165, width: 165, top: 210, height: 93, ...layout }}
        >
            <Region
                name="palette1"
                layout={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `grid_container` of AvatarEditorContentLayout - configured through the parent's `gridContainer` prop. */
export interface AvatarEditorContentLayoutGridContainerProps {
    captionContentNotification?: string;
    captionContentTitle?: string;
    layout?: BoxLayout;
    palette0?: AvatarEditorContentLayoutPalette0Props;
    palette1?: AvatarEditorContentLayoutPalette1Props;
    thumbs?: AvatarEditorContentLayoutThumbsProps;
}

export const AvatarEditorContentLayoutGridContainer = ({ captionContentNotification, captionContentTitle, layout, palette0, palette1, thumbs }: AvatarEditorContentLayoutGridContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="grid_container"
            layout={{ position: 'absolute', left: 20, width: 330, top: 94, height: 302, ...layout }}
        >
            <AvatarEditorContentLayoutThumbs {...thumbs} />
            <AvatarEditorContentLayoutPalette0 {...palette0} />
            <AvatarEditorContentLayoutPalette1 {...palette1} />
            <Region
                name="content_notification"
                layout={{ position: 'absolute', left: 0, width: 298, top: 30, height: 128, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionContentNotification ?? t('avatar.editor.content.notification')} />
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
    actionContainer?: AvatarEditorContentLayoutActionContainerProps;
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

export const AvatarEditorContentLayoutTabbedView = ({ actionContainer, contentArea, gridContainer, layout, onEffects, onGeneric, onHead, onHotlooks, onLegs, onMisc, onNfts, onTorso, srcBitmap, srcBitmap2, srcBitmap3, srcBitmap4, srcBitmap5, srcBitmap6, srcBitmap7, srcBitmap8 }: AvatarEditorContentLayoutTabbedViewProps) => {
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
            <AvatarEditorContentLayoutActionContainer {...actionContainer} />
            <AvatarEditorContentLayoutGridContainer {...gridContainer} />
        </Region>
    );
};

/** Named region `time_left_bg` of AvatarEditorContentLayout - configured through the parent's `timeLeftBg` prop. */
export interface AvatarEditorContentLayoutTimeLeftBgProps {
    captionEffectTimeLeft?: string;
    layout?: BoxLayout;
    srcProgressBarBitmap?: string;
}

export const AvatarEditorContentLayoutTimeLeftBg = ({ captionEffectTimeLeft, layout, srcProgressBarBitmap }: AvatarEditorContentLayoutTimeLeftBgProps) => {
    return (
        <Region
            name="time_left_bg"
            layout={{ position: 'absolute', left: 345, width: 120, top: 301, height: 18, ...layout }}
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
    );
};

/** Named region `effectParamsContainer` of AvatarEditorContentLayout - configured through the parent's `effectParamsContainer` prop. */
export interface AvatarEditorContentLayoutEffectParamsContainerProps {
    captionEffectName?: string;
    captionSaveToActivate?: string;
    layout?: BoxLayout;
    onGetMoreButton?: () => void;
    timeLeftBg?: AvatarEditorContentLayoutTimeLeftBgProps;
}

export const AvatarEditorContentLayoutEffectParamsContainer = ({ captionEffectName, captionSaveToActivate, layout, onGetMoreButton, timeLeftBg }: AvatarEditorContentLayoutEffectParamsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="effectParamsContainer"
            layout={{ position: 'absolute', left: 11, width: 468, top: 46, height: 352, ...layout }}
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
            <AvatarEditorContentLayoutTimeLeftBg {...timeLeftBg} />
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
    );
};

/** Named region `collectible_avatar_info_background` of AvatarEditorContentLayout - configured through the parent's `collectibleAvatarInfoBackground` prop. */
export interface AvatarEditorContentLayoutCollectibleAvatarInfoBackgroundProps {
    layout?: BoxLayout;
}

export const AvatarEditorContentLayoutCollectibleAvatarInfoBackground = ({ layout }: AvatarEditorContentLayoutCollectibleAvatarInfoBackgroundProps) => {
    return (
        <Region
            name="collectible_avatar_info_background"
            backgroundColor="#454545"
            layout={{ position: 'absolute', left: 0, width: 122, top: 0, height: 20, ...layout }}
        />
    );
};

/** Named region `collectible_avatar_info` of AvatarEditorContentLayout - configured through the parent's `collectibleAvatarInfo` prop. */
export interface AvatarEditorContentLayoutCollectibleAvatarInfoProps {
    captionAvatarInfoText?: string;
    collectibleAvatarInfoBackground?: AvatarEditorContentLayoutCollectibleAvatarInfoBackgroundProps;
    layout?: BoxLayout;
    visibleCollectibleAvatarInfo?: boolean;
}

export const AvatarEditorContentLayoutCollectibleAvatarInfo = ({ captionAvatarInfoText, collectibleAvatarInfoBackground, layout, visibleCollectibleAvatarInfo }: AvatarEditorContentLayoutCollectibleAvatarInfoProps) => {
    return (
        <Region
            name="collectible_avatar_info"
            visible={visibleCollectibleAvatarInfo ?? false}
            backgroundColor="#454545"
            layout={{ position: 'absolute', left: 356, width: 122, top: 345, height: 20, ...layout }}
        >
            <AvatarEditorContentLayoutCollectibleAvatarInfoBackground {...collectibleAvatarInfoBackground} />
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
    );
};

/** Named region `rotate_avatar` of AvatarEditorContentLayout - configured through the parent's `rotateAvatar` prop. */
export interface AvatarEditorContentLayoutRotateAvatarProps {
    layout?: BoxLayout;
    onRotateAvatar?: () => void;
}

export const AvatarEditorContentLayoutRotateAvatar = ({ layout, onRotateAvatar }: AvatarEditorContentLayoutRotateAvatarProps) => {
    return (
        <Region
            name="rotate_avatar"
            onPointerTap={onRotateAvatar}
            cursor="pointer"
            layout={{ position: 'absolute', left: 389, width: 50, top: 295, height: 31, ...layout }}
        >
            <ThemeImage
                src={layoutImage('avatar_editor_rotate_avatar_button.png')}
                layout={{ position: 'absolute', left: 0, width: 44, top: 0, height: 29 }}
            />
        </Region>
    );
};

/** Named region `avatarEditor` of AvatarEditorContentLayout - configured through the parent's `avatarEditor` prop. */
export interface AvatarEditorContentLayoutAvatarEditorProps {
    collectibleAvatarInfo?: AvatarEditorContentLayoutCollectibleAvatarInfoProps;
    effectParamsContainer?: AvatarEditorContentLayoutEffectParamsContainerProps;
    layout?: BoxLayout;
    onSave?: () => void;
    rotateAvatar?: AvatarEditorContentLayoutRotateAvatarProps;
    tabbedView?: AvatarEditorContentLayoutTabbedViewProps;
}

export const AvatarEditorContentLayoutAvatarEditor = ({ collectibleAvatarInfo, effectParamsContainer, layout, onSave, rotateAvatar, tabbedView }: AvatarEditorContentLayoutAvatarEditorProps) => {
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
            <AvatarEditorContentLayoutEffectParamsContainer {...effectParamsContainer} />
            <AvatarEditorContentLayoutCollectibleAvatarInfo {...collectibleAvatarInfo} />
            <AvatarEditorContentLayoutRotateAvatar {...rotateAvatar} />
        </Region>
    );
};

/** Named region `sideContainer` of AvatarEditorContentLayout - configured through the parent's `sideContainer` prop. */
export interface AvatarEditorContentLayoutSideContainerProps {
    layout?: BoxLayout;
}

export const AvatarEditorContentLayoutSideContainer = ({ layout }: AvatarEditorContentLayoutSideContainerProps) => {
    return (
        <Region
            name="sideContainer"
            layout={{ position: 'absolute', left: 487, width: 0, top: 0, height: 490, ...layout }}
        />
    );
};

/** Named region `avatarEditorContent` of AvatarEditorContentLayout - configured through the parent's `avatarEditorContent` prop. */
export interface AvatarEditorContentLayoutAvatarEditorContentProps {
    avatarEditor?: AvatarEditorContentLayoutAvatarEditorProps;
    avatarNameEditor?: AvatarEditorContentLayoutAvatarNameEditorProps;
    layout?: BoxLayout;
    sideContainer?: AvatarEditorContentLayoutSideContainerProps;
    wardrobeButtonContainer?: AvatarEditorContentLayoutWardrobeButtonContainerProps;
}

export const AvatarEditorContentLayoutAvatarEditorContent = ({ avatarEditor, avatarNameEditor, layout, sideContainer, wardrobeButtonContainer }: AvatarEditorContentLayoutAvatarEditorContentProps) => {
    return (
        <Region
            name="avatarEditorContent"
            layout={{ position: 'absolute', left: 0, width: 490, top: 0, height: 490, ...layout }}
        >
            <AvatarEditorContentLayoutAvatarNameEditor {...avatarNameEditor} />
            <AvatarEditorContentLayoutWardrobeButtonContainer {...wardrobeButtonContainer} />
            <AvatarEditorContentLayoutAvatarEditor {...avatarEditor} />
            <AvatarEditorContentLayoutSideContainer {...sideContainer} />
        </Region>
    );
};
