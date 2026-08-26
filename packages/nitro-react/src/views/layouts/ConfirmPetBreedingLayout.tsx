import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1017_confirm_pet_breeding_xml` (layout "confirm_pet_breeding", 320x623) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ConfirmPetBreedingLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onSaveButton?: () => void;
}

export const ConfirmPetBreedingLayout = ({ layout, onClose, onSaveButton }: ConfirmPetBreedingLayoutProps) => {
    const t = useTranslation();
    const [ puppyNameInputValue, setPuppyNameInputValue ] = useState('');

    return (
        <Frame
            variant="100"
            params={32769}
            caption={t('breedpets.confirmation.widget.title')}
            onClose={onClose}
            layout={{ width: 320, height: 623, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="element_list"
                    params={147472}
                    layout={{ position: 'absolute', left: 0, width: 318, top: 0, height: 484, maxWidth: 318, flexDirection: 'column', gap: 10 }}
                >
                    <Region
                        name="title"
                        params={16}
                        layout={{ width: 264, height: 28, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('breedpets.confirmation.widget.request')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 264 }}
                        />
                    </Region>
                    <Border
                        variant="103"
                        name="parentContainer"
                        params={16}
                        layout={{ width: 314, height: 140, flexShrink: 0, minWidth: 310, maxWidth: 314 }}
                    >
                        <Region
                            name="preview_list"
                            params={147472}
                            layout={{ position: 'absolute', left: 10, width: 290, top: 7, height: 146, flexDirection: 'row', gap: 10 }}
                        >
                            <Region
                                name="pet1_itemlist"
                                params={147472}
                                layout={{ width: 140, height: 121, flexShrink: 0, minWidth: 140, maxWidth: 140, flexDirection: 'column', gap: 1 }}
                            >
                                <Region
                                    name="pet_name"
                                    params={16}
                                    layout={{ width: 140, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('breedpets.widget.pet1.name')}
                                        textStyle="text-style-il-heading-2"
                                        textOptions={{ align: 'center' }}
                                    />
                                </Region>
                                <ThemeImage
                                    name="preview_image"
                                    params={786448}
                                    src={undefined}
                                    layout={{ width: 140, height: 70, flexShrink: 0, minWidth: 140, maxWidth: 140, minHeight: 70, maxHeight: 70 }}
                                />
                                <Region
                                    name="pet_level"
                                    params={16}
                                    layout={{ width: 140, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('breedpets.widget.pet1.level')}
                                        textStyle="text-style-il-heading-3"
                                        textOptions={{ wordWrap: true, wordWrapWidth: 140, align: 'center' }}
                                    />
                                </Region>
                                <Region
                                    name="pet_description"
                                    params={16}
                                    layout={{ width: 140, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('breedpets.widget.pet1.description')}
                                        textOptions={{ wordWrap: true, wordWrapWidth: 140, align: 'center' }}
                                    />
                                </Region>
                            </Region>
                            <Region
                                name="pet2_itemlist"
                                params={147472}
                                layout={{ width: 140, height: 121, flexShrink: 0, minWidth: 140, maxWidth: 140, flexDirection: 'column', gap: 1 }}
                            >
                                <Region
                                    name="pet_name"
                                    params={16}
                                    layout={{ width: 140, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('breedpets.widget.pet2.name')}
                                        textStyle="text-style-il-heading-2"
                                        textOptions={{ align: 'center' }}
                                    />
                                </Region>
                                <ThemeImage
                                    name="preview_image2"
                                    params={16}
                                    src={undefined}
                                    layout={{ width: 140, height: 70, flexShrink: 0, minWidth: 140, maxWidth: 140, minHeight: 70, maxHeight: 70 }}
                                />
                                <Region
                                    name="pet_level"
                                    params={16}
                                    layout={{ width: 140, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('breedpets.widget.pet2.level')}
                                        textStyle="text-style-il-heading-3"
                                        textOptions={{ wordWrap: true, wordWrapWidth: 140, align: 'center' }}
                                    />
                                </Region>
                                <Region
                                    name="pet_description"
                                    params={16}
                                    layout={{ width: 140, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('breedpets.widget.pet2.description')}
                                        textOptions={{ wordWrap: true, wordWrapWidth: 140, align: 'center' }}
                                    />
                                </Region>
                            </Region>
                        </Region>
                    </Border>
                    <Region
                        name="puppy_namelist"
                        params={16}
                        layout={{ width: 300, height: 52, flexShrink: 0, minWidth: 300, flexDirection: 'column', gap: 2 }}
                    >
                        <Region
                            params={16}
                            layout={{ width: 70, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('breedpets.confirmation.widget.baby.name')}
                                textStyle="text-style-il-heading-3"
                            />
                        </Region>
                        <Border
                            variant="105"
                            params={16}
                            tintColor="#f0f0f0"
                            layout={{ width: 295, height: 31, flexShrink: 0 }}
                        >
                            <TextInput
                                value={puppyNameInputValue}
                                onChange={setPuppyNameInputValue}
                                maxLength={32}
                                layout={{ position: 'absolute', left: 5, width: 284, top: 5, height: 20 }}
                            />
                        </Border>
                    </Region>
                    <Region
                        name="breeding.title"
                        params={16}
                        layout={{ width: 78, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('breedpets.confirmation.widget.breeding.info')}
                            textStyle="text-style-il-heading-3"
                        />
                    </Region>
                    <Border
                        variant="102"
                        params={16}
                        layout={{ width: 295, height: 209, flexShrink: 0 }}
                    >
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 10, width: 287, top: 10, height: 199, flexDirection: 'column', gap: 5 }}
                        >
                            <Region
                                name="text"
                                params={16}
                                layout={{ width: 286, height: 40, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('breedpets.confirmation.widget.text')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 286 }}
                                />
                            </Region>
                            <Region
                                name="info"
                                params={16}
                                layout={{ width: 290, height: 40, flexShrink: 0, minWidth: 290, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('breedpets.confirmation.widget.info')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 290 }}
                                />
                            </Region>
                            <Region
                                name="category_list"
                                params={16}
                                layout={{ width: 282, height: 109, flexShrink: 0, flexDirection: 'column', gap: 2 }}
                            >
                                <Region
                                    name="rarityCategory1.container"
                                    params={16}
                                    layout={{ width: 280, height: 25, flexShrink: 0 }}
                                >
                                    <Region
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 104, top: 5, height: 15, minWidth: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('breedpets.confirmation.widget.raritycategory.1')}
                                            textStyle="text-style-il-heading-3"
                                        />
                                    </Region>
                                    <Region
                                        name="breeds1"
                                        params={16}
                                        layout={{ position: 'absolute', left: 90, width: 200, top: 0, height: 25, flexDirection: 'row', gap: 2 }}
                                    />
                                </Region>
                                <Region
                                    name="rarityCategory2.container"
                                    params={16}
                                    layout={{ width: 280, height: 25, flexShrink: 0 }}
                                >
                                    <Region
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 109, top: 5, height: 15, minWidth: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('breedpets.confirmation.widget.raritycategory.2')}
                                            textStyle="text-style-il-heading-3"
                                        />
                                    </Region>
                                    <Region
                                        name="breeds2"
                                        params={16}
                                        layout={{ position: 'absolute', left: 90, width: 200, top: 0, height: 25, flexDirection: 'row', gap: 2 }}
                                    />
                                </Region>
                                <Region
                                    name="rarityCategory3.container"
                                    params={16}
                                    layout={{ width: 280, height: 25, flexShrink: 0 }}
                                >
                                    <Region
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 143, top: 5, height: 15, minWidth: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('breedpets.confirmation.widget.raritycategory.3')}
                                            textStyle="text-style-il-heading-3"
                                        />
                                    </Region>
                                    <Region
                                        name="breeds3"
                                        params={16}
                                        layout={{ position: 'absolute', left: 90, width: 200, top: 0, height: 25, flexDirection: 'row', gap: 2 }}
                                    />
                                </Region>
                                <Region
                                    name="rarityCategory4.container"
                                    params={16}
                                    layout={{ width: 280, height: 25, flexShrink: 0 }}
                                >
                                    <Region
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 129, top: 5, height: 15, minWidth: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('breedpets.confirmation.widget.raritycategory.4')}
                                            textStyle="text-style-il-heading-3"
                                        />
                                    </Region>
                                    <Region
                                        name="breeds4"
                                        params={16}
                                        layout={{ position: 'absolute', left: 90, width: 200, top: 0, height: 20, flexDirection: 'row', gap: 2 }}
                                    />
                                </Region>
                            </Region>
                        </Region>
                    </Border>
                </Region>
                <Region
                    name="button_list"
                    params={147472}
                    layout={{ position: 'absolute', left: 10, width: 295, top: 524, height: 54, minWidth: 295, maxWidth: 295, flexDirection: 'column', gap: 3 }}
                >
                    <Button
                        variant="102"
                        name="save_button"
                        params={917521}
                        onPointerTap={onSaveButton}
                        layout={{ width: 122, height: 30, flexShrink: 0, minWidth: 122, maxWidth: 122 }}
                    >
                        {t('breedpets.confirmation.widget.button.breed')}
                    </Button>
                    <Region
                        name="cancel_button"
                        params={131089}
                        layout={{ width: 295, height: 21, flexShrink: 0, minWidth: 295, maxWidth: 295 }}
                    >
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 295, top: 0, height: 16, minWidth: 295, maxWidth: 295, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('breedpets.confirmation.widget.button.cancel')}
                                textStyle="text-style-il-link-regular"
                                textOptions={{ align: 'center' }}
                            />
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
