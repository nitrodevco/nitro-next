import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CloseButton, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1099_pet_view_xml` (layout "pet_view", 1036x440) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PetViewLayoutProps {
    buttonList?: PetViewLayoutButtonListProps;
    infostandElementList?: PetViewLayoutInfostandElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const PetViewLayout = ({ buttonList, infostandElementList, layout, onClose }: PetViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1036, height: 440, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 1036, top: 0, height: 440, flexDirection: 'column', gap: 10 }}
            >
                <Border
                    variant="1"
                    name="info_border"
                    params={17}
                    layout={{ width: 190, height: 285, flexShrink: 0 }}
                >
                    <CloseButton
                        variant="1"
                        tags={[ 'close' ]}
                        params={17}
                        onPointerTap={onClose}
                        layout={{ position: 'absolute', left: 170, width: 18, top: 6, height: 16 }}
                    />
                    <PetViewLayoutInfostandElementList {...infostandElementList} />
                </Border>
                <PetViewLayoutButtonList {...buttonList} />
            </Region>
        </Region>
    );
};

/** Row template `name_text` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutNameTextItemProps {
    captionNameText?: string;
    layout?: BoxLayout;
}

export const PetViewLayoutNameTextItem = ({ captionNameText, layout }: PetViewLayoutNameTextItemProps) => {
    return (
        <Region
            name="name_text"
            params={208}
            layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionNameText ?? ''}
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Row template `breed_text` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutBreedTextItemProps {
    captionBreedText?: string;
    layout?: BoxLayout;
}

export const PetViewLayoutBreedTextItem = ({ captionBreedText, layout }: PetViewLayoutBreedTextItemProps) => {
    return (
        <Region
            name="breed_text"
            params={208}
            layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionBreedText ?? ''}
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Named region `level_container` of PetViewLayout - configured through the parent's `levelContainer` prop. */
export interface PetViewLayoutLevelContainerProps {
    captionLevelText?: string;
    captionStatusSkillText?: string;
    layout?: BoxLayout;
    srcSkillLevelIndicator?: string;
}

export const PetViewLayoutLevelContainer = ({ captionLevelText, captionStatusSkillText, layout, srcSkillLevelIndicator }: PetViewLayoutLevelContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="level_container"
            params={16}
            layout={{ position: 'absolute', left: 76, width: 95, top: 0, height: 78, justifyContent: 'center', ...layout }}
        >
            <Region
                name="level_text"
                params={208}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 46, top: 10, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionLevelText ?? t('pet.level')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="status_skill_text"
                params={208}
                layout={{ position: 'absolute', marginLeft: 11, marginRight: -11, width: 117, top: 31, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionStatusSkillText ?? t('infostand.pet.text.skill')}
                    textOptions={{ fill: '#a4a4a4' }}
                />
            </Region>
            <ThemeImage
                name="skill_level_indicator"
                params={208}
                src={srcSkillLevelIndicator}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 78, top: 47, height: 18 }}
            />
        </Region>
    );
};

/** Row template `image_container` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutImageContainerItemProps {
    layout?: BoxLayout;
    levelContainer?: PetViewLayoutLevelContainerProps;
    srcAvatarImage?: string;
}

export const PetViewLayoutImageContainerItem = ({ layout, levelContainer, srcAvatarImage }: PetViewLayoutImageContainerItemProps) => {
    return (
        <Region
            name="image_container"
            params={16}
            layout={{ width: 163, height: 83, flexShrink: 0, maxWidth: 163, ...layout }}
        >
            <ThemeImage
                name="avatar_image"
                params={16}
                src={srcAvatarImage}
                layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 83, maxWidth: 80 }}
            />
            <PetViewLayoutLevelContainer {...levelContainer} />
        </Region>
    );
};

/** Row template `status_happiness_container` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutStatusHappinessContainerItemProps {
    captionStatusHappinessText?: string;
    captionStatusHappinessValueText?: string;
    layout?: BoxLayout;
    srcStatusHappinessBitmap?: string;
    srcStatusHappinessIcon?: string;
}

export const PetViewLayoutStatusHappinessContainerItem = ({ captionStatusHappinessText, captionStatusHappinessValueText, layout, srcStatusHappinessBitmap, srcStatusHappinessIcon }: PetViewLayoutStatusHappinessContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="status_happiness_container"
            params={16}
            layout={{ width: 169, height: 34, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                name="status_happiness_text"
                params={208}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 150, top: 1, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionStatusHappinessText ?? t('infostand.pet.text.happiness')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <ThemeImage
                name="status_happiness_bitmap"
                params={16}
                src={srcStatusHappinessBitmap}
                layout={{ position: 'absolute', left: 6, width: 162, top: 17, height: 17 }}
            />
            <Region
                name="status_happiness_value_text"
                params={208}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 4, top: 18, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionStatusHappinessValueText ?? ''}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <ThemeImage
                name="status_happiness_icon"
                params={16}
                src={srcStatusHappinessIcon ?? layoutImage('icon_pet_happiness.png')}
                layout={{ position: 'absolute', left: 0, width: 18, top: 16, height: 18 }}
            />
        </Region>
    );
};

/** Row template `status_experience_container` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutStatusExperienceContainerItemProps {
    captionStatusExperienceText?: string;
    captionStatusExperienceValueText?: string;
    layout?: BoxLayout;
    srcStatusExperienceBitmap?: string;
    srcStatusExperienceIcon?: string;
}

export const PetViewLayoutStatusExperienceContainerItem = ({ captionStatusExperienceText, captionStatusExperienceValueText, layout, srcStatusExperienceBitmap, srcStatusExperienceIcon }: PetViewLayoutStatusExperienceContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="status_experience_container"
            params={16}
            layout={{ width: 169, height: 34, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                name="status_experience_text"
                params={208}
                layout={{ position: 'absolute', width: 155, top: 1, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionStatusExperienceText ?? t('infostand.pet.text.experience')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <ThemeImage
                name="status_experience_bitmap"
                params={16}
                src={srcStatusExperienceBitmap}
                layout={{ position: 'absolute', left: 6, width: 162, top: 17, height: 17 }}
            />
            <Region
                name="status_experience_value_text"
                params={208}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 4, top: 18, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionStatusExperienceValueText ?? ''}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <ThemeImage
                name="status_experience_icon"
                params={16}
                src={srcStatusExperienceIcon ?? layoutImage('icon_pet_experience.png')}
                layout={{ position: 'absolute', left: 0, width: 18, top: 16, height: 18 }}
            />
        </Region>
    );
};

/** Row template `status_energy_container` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutStatusEnergyContainerItemProps {
    captionStatusEnergyText?: string;
    captionStatusEnergyValueText?: string;
    layout?: BoxLayout;
    srcStatusEnergyBitmap?: string;
    srcStatusEnergyIcon?: string;
}

export const PetViewLayoutStatusEnergyContainerItem = ({ captionStatusEnergyText, captionStatusEnergyValueText, layout, srcStatusEnergyBitmap, srcStatusEnergyIcon }: PetViewLayoutStatusEnergyContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="status_energy_container"
            params={16}
            layout={{ width: 169, height: 34, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                name="status_energy_text"
                params={208}
                layout={{ position: 'absolute', width: 135, top: 1, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionStatusEnergyText ?? t('infostand.pet.text.energy')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <ThemeImage
                name="status_energy_bitmap"
                params={16}
                src={srcStatusEnergyBitmap}
                layout={{ position: 'absolute', left: 6, width: 162, top: 17, height: 17 }}
            />
            <Region
                name="status_energy_value_text"
                params={208}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 4, top: 18, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionStatusEnergyValueText ?? ''}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <ThemeImage
                name="status_energy_icon"
                params={16}
                src={srcStatusEnergyIcon ?? layoutImage('icon_pet_energy.png')}
                layout={{ position: 'absolute', left: 0, width: 18, top: 16, height: 18 }}
            />
        </Region>
    );
};

/** Row template `status_rarity_level` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutStatusRarityLevelItemProps {
    captionStatusRarityLevel?: string;
    layout?: BoxLayout;
}

export const PetViewLayoutStatusRarityLevelItem = ({ captionStatusRarityLevel, layout }: PetViewLayoutStatusRarityLevelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="status_rarity_level"
            params={208}
            layout={{ width: 151, height: 18, flexShrink: 0, minHeight: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionStatusRarityLevel ?? t('infostand.pet.text.raritylevel')}
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Named region `status_item_list_default` of PetViewLayout - configured through the parent's `statusItemListDefault` prop. */
export interface PetViewLayoutStatusItemListDefaultProps {
    itemsStatusItemListDefault?: ReactNode;
    layout?: BoxLayout;
}

export const PetViewLayoutStatusItemListDefault = ({ itemsStatusItemListDefault, layout }: PetViewLayoutStatusItemListDefaultProps) => {
    return (
        <Region
            name="status_item_list_default"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 142, flexDirection: 'column', ...layout }}
        >
            {itemsStatusItemListDefault ?? (
                <>
                    <PetViewLayoutStatusHappinessContainerItem />
                    <PetViewLayoutStatusExperienceContainerItem />
                    <PetViewLayoutStatusEnergyContainerItem />
                    <PetViewLayoutStatusRarityLevelItem />
                </>
            )}
        </Region>
    );
};

/** Row template `status_wellbeing_container` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutStatusWellbeingContainerItemProps {
    captionStatusWellbeingText?: string;
    captionStatusWellbeingValueText?: string;
    layout?: BoxLayout;
    srcStatusWellbeingBitmap?: string;
    srcStatusWellbeingIcon?: string;
}

export const PetViewLayoutStatusWellbeingContainerItem = ({ captionStatusWellbeingText, captionStatusWellbeingValueText, layout, srcStatusWellbeingBitmap, srcStatusWellbeingIcon }: PetViewLayoutStatusWellbeingContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="status_wellbeing_container"
            params={16}
            layout={{ width: 169, height: 34, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                name="status_wellbeing_text"
                params={208}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 144, top: 1, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionStatusWellbeingText ?? t('infostand.pet.text.wellbeing')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <ThemeImage
                name="status_wellbeing_bitmap"
                params={16}
                src={srcStatusWellbeingBitmap}
                layout={{ position: 'absolute', left: 6, width: 162, top: 17, height: 17 }}
            />
            <Region
                name="status_wellbeing_value_text"
                params={208}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 4, top: 18, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionStatusWellbeingValueText ?? ''}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <ThemeImage
                name="status_wellbeing_icon"
                params={16}
                src={srcStatusWellbeingIcon ?? layoutImage('icon_pet_wellbeing.png')}
                layout={{ position: 'absolute', left: 0, width: 18, top: 16, height: 18 }}
            />
        </Region>
    );
};

/** Row template `growth_status_text` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutGrowthStatusTextItemProps {
    captionGrowthStatusText?: string;
    layout?: BoxLayout;
}

export const PetViewLayoutGrowthStatusTextItem = ({ captionGrowthStatusText, layout }: PetViewLayoutGrowthStatusTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="growth_status_text"
            params={208}
            layout={{ width: 136, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionGrowthStatusText ?? t('infostand.pet.text.growth')}
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Row template `growth_status_widget` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutGrowthStatusWidgetItemProps {
    layout?: BoxLayout;
}

export const PetViewLayoutGrowthStatusWidgetItem = ({ layout }: PetViewLayoutGrowthStatusWidgetItemProps) => {
    return (
        <WidgetSlot
            widgetType="countdown"
            name="growth_status_widget"
            params={147664}
            options={{ 'countdown:seconds': '12054' }}
            layout={{ width: 99, height: 37, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `status_rarity_level` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutStatusRarityLevelItem2Props {
    captionStatusRarityLevel?: string;
    layout?: BoxLayout;
}

export const PetViewLayoutStatusRarityLevelItem2 = ({ captionStatusRarityLevel, layout }: PetViewLayoutStatusRarityLevelItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="status_rarity_level"
            params={208}
            layout={{ width: 151, height: 15, flexShrink: 0, minHeight: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionStatusRarityLevel ?? t('infostand.pet.text.raritylevel')}
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Row template `rarity_item_overlay_widget` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutRarityItemOverlayWidgetItemProps {
    layout?: BoxLayout;
}

export const PetViewLayoutRarityItemOverlayWidgetItem = ({ layout }: PetViewLayoutRarityItemOverlayWidgetItemProps) => {
    return (
        <WidgetSlot
            widgetType="rarity_item_overlay_preview"
            name="rarity_item_overlay_widget"
            params={16}
            layout={{ width: 40, height: 28, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `status_item_list_monsterplant` of PetViewLayout - configured through the parent's `statusItemListMonsterplant` prop. */
export interface PetViewLayoutStatusItemListMonsterplantProps {
    itemsStatusItemListMonsterplant?: ReactNode;
    layout?: BoxLayout;
}

export const PetViewLayoutStatusItemListMonsterplant = ({ itemsStatusItemListMonsterplant, layout }: PetViewLayoutStatusItemListMonsterplantProps) => {
    return (
        <Region
            name="status_item_list_monsterplant"
            params={16}
            visible={false}
            layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 137, flexDirection: 'column', gap: 2, ...layout }}
        >
            {itemsStatusItemListMonsterplant ?? (
                <>
                    <PetViewLayoutStatusWellbeingContainerItem />
                    <PetViewLayoutGrowthStatusTextItem />
                    <PetViewLayoutGrowthStatusWidgetItem />
                    <PetViewLayoutStatusRarityLevelItem2 />
                    <PetViewLayoutRarityItemOverlayWidgetItem />
                </>
            )}
        </Region>
    );
};

/** Row template `status_container` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutStatusContainerItemProps {
    layout?: BoxLayout;
    statusItemListDefault?: PetViewLayoutStatusItemListDefaultProps;
    statusItemListMonsterplant?: PetViewLayoutStatusItemListMonsterplantProps;
}

export const PetViewLayoutStatusContainerItem = ({ layout, statusItemListDefault, statusItemListMonsterplant }: PetViewLayoutStatusContainerItemProps) => {
    return (
        <Region
            name="status_container"
            params={16}
            layout={{ width: 170, height: 140, flexShrink: 0, ...layout }}
        >
            <PetViewLayoutStatusItemListDefault {...statusItemListDefault} />
            <PetViewLayoutStatusItemListMonsterplant {...statusItemListMonsterplant} />
        </Region>
    );
};

/** Row template `petrespect_container` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutPetrespectContainerItemProps {
    captionPetrespectText?: string;
    layout?: BoxLayout;
    srcPetrespectIcon?: string;
}

export const PetViewLayoutPetrespectContainerItem = ({ captionPetrespectText, layout, srcPetrespectIcon }: PetViewLayoutPetrespectContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="petrespect_container"
            params={16}
            layout={{ width: 164, height: 21, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                name="petrespect_text"
                params={208}
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 137, top: 5, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPetrespectText ?? t('infostand.text.petrespect')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <ThemeImage
                name="petrespect_icon"
                params={16}
                src={srcPetrespectIcon}
                layout={{ position: 'absolute', left: 0, width: 13, top: 3, height: 21 }}
            />
        </Region>
    );
};

/** Row template `age_text` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutAgeTextItemProps {
    captionAgeText?: string;
    layout?: BoxLayout;
}

export const PetViewLayoutAgeTextItem = ({ captionAgeText, layout }: PetViewLayoutAgeTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="age_text"
            params={208}
            layout={{ width: 42, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionAgeText ?? t('pet.age')}
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Row template `owner_text` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutOwnerTextItemProps {
    captionOwnerText?: string;
    layout?: BoxLayout;
}

export const PetViewLayoutOwnerTextItem = ({ captionOwnerText, layout }: PetViewLayoutOwnerTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="owner_text"
            params={208}
            layout={{ width: 128, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionOwnerText ?? t('infostand.text.petowner')}
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Named region `infostand_element_list` of PetViewLayout - configured through the parent's `infostandElementList` prop. */
export interface PetViewLayoutInfostandElementListProps {
    itemsInfostandElementList?: ReactNode;
    layout?: BoxLayout;
}

export const PetViewLayoutInfostandElementList = ({ itemsInfostandElementList, layout }: PetViewLayoutInfostandElementListProps) => {
    return (
        <Region
            name="infostand_element_list"
            params={16}
            layout={{ position: 'absolute', left: 10, width: 173, top: 10, height: 270, flexDirection: 'column', ...layout }}
        >
            {itemsInfostandElementList ?? (
                <>
                    <PetViewLayoutNameTextItem />
                    <PetViewLayoutBreedTextItem />
                    <PetViewLayoutImageContainerItem />
                    <PetViewLayoutStatusContainerItem />
                    <PetViewLayoutPetrespectContainerItem />
                    <PetViewLayoutAgeTextItem />
                    <PetViewLayoutOwnerTextItem />
                </>
            )}
        </Region>
    );
};

/** Named region `pick` of PetViewLayout - configured through the parent's `pick` prop. */
export interface PetViewLayoutPickProps {
    layout?: BoxLayout;
    onBtnPick?: () => void;
    onPick?: () => void;
}

export const PetViewLayoutPick = ({ layout, onBtnPick, onPick }: PetViewLayoutPickProps) => {
    const t = useTranslation();

    return (
        <Region
            name="pick"
            tags={[ 'CMD_BUTTON_REGION' ]}
            params={17}
            onPointerTap={onPick}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 54, top: 0, height: 25, ...layout }}
        >
            <Button
                variant="1"
                name="btn_pick"
                tags={[ 'CMD_BUTTON' ]}
                params={131089}
                onPointerTap={onBtnPick}
                textStyle="text-style-button-regular"
                layout={{ position: 'absolute', left: 0, width: 139, top: 0, height: 25 }}
            >
                {t('infostand.button.pickup')}
            </Button>
        </Region>
    );
};

/** Named region `train` of PetViewLayout - configured through the parent's `train` prop. */
export interface PetViewLayoutTrainProps {
    layout?: BoxLayout;
    onBtnTrain?: () => void;
    onTrain?: () => void;
}

export const PetViewLayoutTrain = ({ layout, onBtnTrain, onTrain }: PetViewLayoutTrainProps) => {
    const t = useTranslation();

    return (
        <Region
            name="train"
            tags={[ 'CMD_BUTTON_REGION' ]}
            params={17}
            onPointerTap={onTrain}
            cursor="pointer"
            layout={{ position: 'absolute', left: 64, width: 44, top: 0, height: 25, ...layout }}
        >
            <Button
                variant="1"
                name="btn_train"
                tags={[ 'CMD_BUTTON' ]}
                params={131089}
                onPointerTap={onBtnTrain}
                textStyle="text-style-button-regular"
                layout={{ position: 'absolute', left: 0, width: 132, top: 0, height: 25 }}
            >
                {t('infostand.button.train')}
            </Button>
        </Region>
    );
};

/** Named region `buy_food` of PetViewLayout - configured through the parent's `buyFood` prop. */
export interface PetViewLayoutBuyFoodProps {
    layout?: BoxLayout;
    onBtnBuyFood?: () => void;
    onBuyFood?: () => void;
}

export const PetViewLayoutBuyFood = ({ layout, onBtnBuyFood, onBuyFood }: PetViewLayoutBuyFoodProps) => {
    const t = useTranslation();

    return (
        <Region
            name="buy_food"
            tags={[ 'CMD_BUTTON_REGION' ]}
            params={17}
            onPointerTap={onBuyFood}
            cursor="pointer"
            layout={{ position: 'absolute', left: 118, width: 147, top: 0, height: 25, ...layout }}
        >
            <Button
                variant="1"
                name="btn_buy_food"
                tags={[ 'CMD_BUTTON' ]}
                params={131089}
                onPointerTap={onBtnBuyFood}
                textStyle="text-style-button-regular"
                layout={{ position: 'absolute', left: 0, width: 149, top: 0, height: 25 }}
            >
                {t('infostand.button.buyfood')}
            </Button>
        </Region>
    );
};

/** Named region `petrespect` of PetViewLayout - configured through the parent's `petrespect` prop. */
export interface PetViewLayoutPetrespectProps {
    layout?: BoxLayout;
    onBtnPetrespect?: () => void;
    onPetrespect?: () => void;
}

export const PetViewLayoutPetrespect = ({ layout, onBtnPetrespect, onPetrespect }: PetViewLayoutPetrespectProps) => {
    const t = useTranslation();

    return (
        <Region
            name="petrespect"
            tags={[ 'CMD_BUTTON_REGION' ]}
            params={17}
            onPointerTap={onPetrespect}
            cursor="pointer"
            layout={{ position: 'absolute', left: 275, width: 163, top: 0, height: 25, ...layout }}
        >
            <Button
                variant="1"
                name="btn_petrespect"
                tags={[ 'CMD_BUTTON' ]}
                params={131089}
                onPointerTap={onBtnPetrespect}
                textStyle="text-style-button-regular"
                layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 25 }}
            >
                {t('infostand.button.petrespect')}
            </Button>
        </Region>
    );
};

/** Named region `pettreat` of PetViewLayout - configured through the parent's `pettreat` prop. */
export interface PetViewLayoutPettreatProps {
    layout?: BoxLayout;
    onBtnPettreat?: () => void;
    onPettreat?: () => void;
}

export const PetViewLayoutPettreat = ({ layout, onBtnPettreat, onPettreat }: PetViewLayoutPettreatProps) => {
    const t = useTranslation();

    return (
        <Region
            name="pettreat"
            tags={[ 'CMD_BUTTON_REGION' ]}
            params={17}
            onPointerTap={onPettreat}
            cursor="pointer"
            layout={{ position: 'absolute', left: 275, width: 163, top: 0, height: 25, ...layout }}
        >
            <Button
                variant="1"
                name="btn_pettreat"
                tags={[ 'CMD_BUTTON' ]}
                params={131089}
                onPointerTap={onBtnPettreat}
                textStyle="text-style-button-regular"
                layout={{ position: 'absolute', left: 0, width: 152, top: 0, height: 25 }}
            >
                {t('infostand.button.pettreat')}
            </Button>
        </Region>
    );
};

/** Named region `kick` of PetViewLayout - configured through the parent's `kick` prop. */
export interface PetViewLayoutKickProps {
    layout?: BoxLayout;
    onBtnKick?: () => void;
    onKick?: () => void;
}

export const PetViewLayoutKick = ({ layout, onBtnKick, onKick }: PetViewLayoutKickProps) => {
    const t = useTranslation();

    return (
        <Region
            name="kick"
            tags={[ 'CMD_BUTTON_REGION' ]}
            params={17}
            onPointerTap={onKick}
            cursor="pointer"
            layout={{ position: 'absolute', left: 448, width: 141, top: 0, height: 25, ...layout }}
        >
            <Button
                variant="1"
                name="btn_kick"
                tags={[ 'CMD_BUTTON' ]}
                params={131089}
                onPointerTap={onBtnKick}
                textStyle="text-style-button-regular"
                layout={{ position: 'absolute', left: 0, width: 143, top: 0, height: 25 }}
            >
                {t('infostand.button.petkick')}
            </Button>
        </Region>
    );
};

/** Named region `rotate` of PetViewLayout - configured through the parent's `rotate` prop. */
export interface PetViewLayoutRotateProps {
    layout?: BoxLayout;
    onBtnRotate?: () => void;
    onRotate?: () => void;
}

export const PetViewLayoutRotate = ({ layout, onBtnRotate, onRotate }: PetViewLayoutRotateProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rotate"
            tags={[ 'CMD_BUTTON_REGION' ]}
            params={17}
            onPointerTap={onRotate}
            cursor="pointer"
            layout={{ position: 'absolute', left: 600, width: 132, top: 0, height: 25, ...layout }}
        >
            <Button
                variant="1"
                name="btn_rotate"
                tags={[ 'CMD_BUTTON' ]}
                params={131089}
                onPointerTap={onBtnRotate}
                textStyle="text-style-button-regular"
                layout={{ position: 'absolute', left: 0, width: 141, top: 0, height: 25 }}
            >
                {t('infostand.button.rotate')}
            </Button>
        </Region>
    );
};

/** Named region `move` of PetViewLayout - configured through the parent's `move` prop. */
export interface PetViewLayoutMoveProps {
    layout?: BoxLayout;
    onBtnMove?: () => void;
    onMove?: () => void;
}

export const PetViewLayoutMove = ({ layout, onBtnMove, onMove }: PetViewLayoutMoveProps) => {
    const t = useTranslation();

    return (
        <Region
            name="move"
            tags={[ 'CMD_BUTTON_REGION' ]}
            params={17}
            onPointerTap={onMove}
            cursor="pointer"
            layout={{ position: 'absolute', left: 589, width: 132, top: 0, height: 25, ...layout }}
        >
            <Button
                variant="1"
                name="btn_move"
                tags={[ 'CMD_BUTTON' ]}
                params={131089}
                onPointerTap={onBtnMove}
                textStyle="text-style-button-regular"
                layout={{ position: 'absolute', left: 0, width: 134, top: 0, height: 25 }}
            >
                {t('infostand.button.move')}
            </Button>
        </Region>
    );
};

/** Named region `button_list` of PetViewLayout - configured through the parent's `buttonList` prop. */
export interface PetViewLayoutButtonListProps {
    buyFood?: PetViewLayoutBuyFoodProps;
    kick?: PetViewLayoutKickProps;
    layout?: BoxLayout;
    move?: PetViewLayoutMoveProps;
    petrespect?: PetViewLayoutPetrespectProps;
    pettreat?: PetViewLayoutPettreatProps;
    pick?: PetViewLayoutPickProps;
    rotate?: PetViewLayoutRotateProps;
    train?: PetViewLayoutTrainProps;
}

export const PetViewLayoutButtonList = ({ buyFood, kick, layout, move, petrespect, pettreat, pick, rotate, train }: PetViewLayoutButtonListProps) => {
    return (
        <Region
            name="button_list"
            params={16}
            layout={{ width: 1000, height: 25, flexShrink: 0, ...layout }}
        >
            <PetViewLayoutPick {...pick} />
            <PetViewLayoutTrain {...train} />
            <PetViewLayoutBuyFood {...buyFood} />
            <PetViewLayoutPetrespect {...petrespect} />
            <PetViewLayoutPettreat {...pettreat} />
            <PetViewLayoutKick {...kick} />
            <PetViewLayoutRotate {...rotate} />
            <PetViewLayoutMove {...move} />
        </Region>
    );
};
