import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CloseButton, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1099_pet_view_xml` (layout "pet_view", 1036x440) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PetViewLayoutProps {
    layout?: BoxLayout;
    onBtnBuyFood?: () => void;
    onBtnKick?: () => void;
    onBtnMove?: () => void;
    onBtnPetrespect?: () => void;
    onBtnPettreat?: () => void;
    onBtnPick?: () => void;
    onBtnRotate?: () => void;
    onBtnTrain?: () => void;
    onClose?: () => void;
}

export const PetViewLayout = ({ layout, onBtnBuyFood, onBtnKick, onBtnMove, onBtnPetrespect, onBtnPettreat, onBtnPick, onBtnRotate, onBtnTrain, onClose }: PetViewLayoutProps) => {
    const t = useTranslation();

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
                    <Region
                        name="infostand_element_list"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 173, top: 10, height: 270, flexDirection: 'column' }}
                    >
                        <Region
                            name="name_text"
                            params={208}
                            layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        />
                        <Region
                            name="breed_text"
                            params={208}
                            layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        />
                        <Region
                            name="image_container"
                            params={16}
                            layout={{ width: 163, height: 83, flexShrink: 0, maxWidth: 163 }}
                        >
                            <ThemeImage
                                name="avatar_image"
                                params={16}
                                src={undefined}
                                layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 83, maxWidth: 80 }}
                            />
                            <Region
                                name="level_container"
                                params={16}
                                layout={{ position: 'absolute', left: 76, width: 95, top: 0, height: 78 }}
                            >
                                <Region
                                    name="level_text"
                                    params={208}
                                    layout={{ position: 'absolute', left: 24, width: 46, top: 10, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('pet.level')}
                                        textOptions={{ fill: '#ffffff' }}
                                    />
                                </Region>
                                <Region
                                    name="status_skill_text"
                                    params={208}
                                    layout={{ position: 'absolute', left: 0, width: 117, top: 31, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('infostand.pet.text.skill')}
                                        textOptions={{ fill: '#a4a4a4' }}
                                    />
                                </Region>
                                <ThemeImage
                                    name="skill_level_indicator"
                                    params={208}
                                    src={undefined}
                                    layout={{ position: 'absolute', left: 8, width: 78, top: 47, height: 18 }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="status_container"
                            params={16}
                            layout={{ width: 170, height: 140, flexShrink: 0 }}
                        >
                            <Region
                                name="status_item_list_default"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 142, flexDirection: 'column' }}
                            >
                                <Region
                                    name="status_happiness_container"
                                    params={16}
                                    layout={{ width: 169, height: 34, flexShrink: 0 }}
                                >
                                    <Region
                                        name="status_happiness_text"
                                        params={208}
                                        layout={{ position: 'absolute', left: 9, width: 150, top: 1, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('infostand.pet.text.happiness')}
                                            textOptions={{ fill: '#ffffff' }}
                                        />
                                    </Region>
                                    <ThemeImage
                                        name="status_happiness_bitmap"
                                        params={16}
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 6, width: 162, top: 17, height: 17 }}
                                    />
                                    <Region
                                        name="status_happiness_value_text"
                                        params={208}
                                        layout={{ position: 'absolute', left: 82, width: 4, top: 18, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    />
                                    <ThemeImage
                                        name="status_happiness_icon"
                                        params={16}
                                        src={layoutImage('icon_pet_happiness.png')}
                                        layout={{ position: 'absolute', left: 0, width: 18, top: 16, height: 18 }}
                                    />
                                </Region>
                                <Region
                                    name="status_experience_container"
                                    params={16}
                                    layout={{ width: 169, height: 34, flexShrink: 0 }}
                                >
                                    <Region
                                        name="status_experience_text"
                                        params={208}
                                        layout={{ position: 'absolute', left: 7, width: 155, top: 1, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('infostand.pet.text.experience')}
                                            textOptions={{ fill: '#ffffff' }}
                                        />
                                    </Region>
                                    <ThemeImage
                                        name="status_experience_bitmap"
                                        params={16}
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 6, width: 162, top: 17, height: 17 }}
                                    />
                                    <Region
                                        name="status_experience_value_text"
                                        params={208}
                                        layout={{ position: 'absolute', left: 82, width: 4, top: 18, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    />
                                    <ThemeImage
                                        name="status_experience_icon"
                                        params={16}
                                        src={layoutImage('icon_pet_experience.png')}
                                        layout={{ position: 'absolute', left: 0, width: 18, top: 16, height: 18 }}
                                    />
                                </Region>
                                <Region
                                    name="status_energy_container"
                                    params={16}
                                    layout={{ width: 169, height: 34, flexShrink: 0 }}
                                >
                                    <Region
                                        name="status_energy_text"
                                        params={208}
                                        layout={{ position: 'absolute', left: 17, width: 135, top: 1, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('infostand.pet.text.energy')}
                                            textOptions={{ fill: '#ffffff' }}
                                        />
                                    </Region>
                                    <ThemeImage
                                        name="status_energy_bitmap"
                                        params={16}
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 6, width: 162, top: 17, height: 17 }}
                                    />
                                    <Region
                                        name="status_energy_value_text"
                                        params={208}
                                        layout={{ position: 'absolute', left: 82, width: 4, top: 18, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    />
                                    <ThemeImage
                                        name="status_energy_icon"
                                        params={16}
                                        src={layoutImage('icon_pet_energy.png')}
                                        layout={{ position: 'absolute', left: 0, width: 18, top: 16, height: 18 }}
                                    />
                                </Region>
                                <Region
                                    name="status_rarity_level"
                                    params={208}
                                    layout={{ width: 151, height: 18, flexShrink: 0, minHeight: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('infostand.pet.text.raritylevel')}
                                        textOptions={{ fill: '#ffffff' }}
                                    />
                                </Region>
                            </Region>
                            <Region
                                name="status_item_list_monsterplant"
                                params={16}
                                visible={false}
                                layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 137, flexDirection: 'column', gap: 2 }}
                            >
                                <Region
                                    name="status_wellbeing_container"
                                    params={16}
                                    layout={{ width: 169, height: 34, flexShrink: 0 }}
                                >
                                    <Region
                                        name="status_wellbeing_text"
                                        params={208}
                                        layout={{ position: 'absolute', left: 12, width: 144, top: 1, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('infostand.pet.text.wellbeing')}
                                            textOptions={{ fill: '#ffffff' }}
                                        />
                                    </Region>
                                    <ThemeImage
                                        name="status_wellbeing_bitmap"
                                        params={16}
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 6, width: 162, top: 17, height: 17 }}
                                    />
                                    <Region
                                        name="status_wellbeing_value_text"
                                        params={208}
                                        layout={{ position: 'absolute', left: 82, width: 4, top: 18, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    />
                                    <ThemeImage
                                        name="status_wellbeing_icon"
                                        params={16}
                                        src={layoutImage('icon_pet_wellbeing.png')}
                                        layout={{ position: 'absolute', left: 0, width: 18, top: 16, height: 18 }}
                                    />
                                </Region>
                                <Region
                                    name="growth_status_text"
                                    params={208}
                                    layout={{ width: 136, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('infostand.pet.text.growth')}
                                        textOptions={{ fill: '#ffffff' }}
                                    />
                                </Region>
                                <WidgetSlot
                                    widgetType="countdown"
                                    name="growth_status_widget"
                                    params={147664}
                                    options={{ 'countdown:seconds': '12054' }}
                                    layout={{ width: 99, height: 37, flexShrink: 0 }}
                                />
                                <Region
                                    name="status_rarity_level"
                                    params={208}
                                    layout={{ width: 151, height: 15, flexShrink: 0, minHeight: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('infostand.pet.text.raritylevel')}
                                        textOptions={{ fill: '#ffffff' }}
                                    />
                                </Region>
                                <WidgetSlot
                                    widgetType="rarity_item_overlay_preview"
                                    name="rarity_item_overlay_widget"
                                    params={16}
                                    layout={{ width: 40, height: 28, flexShrink: 0 }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="petrespect_container"
                            params={16}
                            layout={{ width: 164, height: 21, flexShrink: 0 }}
                        >
                            <Region
                                name="petrespect_text"
                                params={208}
                                layout={{ position: 'absolute', left: 14, width: 137, top: 5, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('infostand.text.petrespect')}
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <ThemeImage
                                name="petrespect_icon"
                                params={16}
                                src={undefined}
                                layout={{ position: 'absolute', left: 0, width: 13, top: 3, height: 21 }}
                            />
                        </Region>
                        <Region
                            name="age_text"
                            params={208}
                            layout={{ width: 42, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('pet.age')}
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                        <Region
                            name="owner_text"
                            params={208}
                            layout={{ width: 128, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('infostand.text.petowner')}
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    </Region>
                </Border>
                <Region
                    name="button_list"
                    params={16}
                    layout={{ width: 1000, height: 25, flexShrink: 0 }}
                >
                    <Region
                        name="pick"
                        tags={[ 'CMD_BUTTON_REGION' ]}
                        params={17}
                        layout={{ position: 'absolute', left: 0, width: 54, top: 0, height: 25 }}
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
                    <Region
                        name="train"
                        tags={[ 'CMD_BUTTON_REGION' ]}
                        params={17}
                        layout={{ position: 'absolute', left: 64, width: 44, top: 0, height: 25 }}
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
                    <Region
                        name="buy_food"
                        tags={[ 'CMD_BUTTON_REGION' ]}
                        params={17}
                        layout={{ position: 'absolute', left: 118, width: 147, top: 0, height: 25 }}
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
                    <Region
                        name="petrespect"
                        tags={[ 'CMD_BUTTON_REGION' ]}
                        params={17}
                        layout={{ position: 'absolute', left: 275, width: 163, top: 0, height: 25 }}
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
                    <Region
                        name="pettreat"
                        tags={[ 'CMD_BUTTON_REGION' ]}
                        params={17}
                        layout={{ position: 'absolute', left: 275, width: 163, top: 0, height: 25 }}
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
                    <Region
                        name="kick"
                        tags={[ 'CMD_BUTTON_REGION' ]}
                        params={17}
                        layout={{ position: 'absolute', left: 448, width: 141, top: 0, height: 25 }}
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
                    <Region
                        name="rotate"
                        tags={[ 'CMD_BUTTON_REGION' ]}
                        params={17}
                        layout={{ position: 'absolute', left: 600, width: 132, top: 0, height: 25 }}
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
                    <Region
                        name="move"
                        tags={[ 'CMD_BUTTON_REGION' ]}
                        params={17}
                        layout={{ position: 'absolute', left: 589, width: 132, top: 0, height: 25 }}
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
                </Region>
            </Region>
        </Region>
    );
};
