import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1067_breed_pets_confirmation_xml` (layout "breed_pets_confirmation", 274x387) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BreedPetsConfirmationLayoutProps {
    layout?: BoxLayout;
    onAcceptButton?: () => void;
    onCancelButton?: () => void;
    onClose?: () => void;
    onSaveButton?: () => void;
}

export const BreedPetsConfirmationLayout = ({ layout, onAcceptButton, onCancelButton, onClose, onSaveButton }: BreedPetsConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={32769}
            caption={t('breedpets.widget.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 274, height: 387, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="element_list"
                    params={147472}
                    layout={{ position: 'absolute', left: 0, width: 272, top: 0, height: 279, maxWidth: 272, flexDirection: 'column', gap: 10 }}
                >
                    <Region
                        name="separator"
                        params={16}
                        layout={{ width: 274, height: 1, flexShrink: 0 }}
                    />
                    <Region
                        name="description"
                        params={16}
                        layout={{ width: 254, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('breedpets.widget.text')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
                        />
                    </Region>
                    <Region
                        name="request"
                        params={16}
                        layout={{ width: 254, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('breedpets.widget.request')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
                        />
                    </Region>
                    <Region
                        name="info"
                        params={16}
                        layout={{ width: 254, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('breedpets.widget.info')}
                            textStyle="text-style-u-italic"
                            textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
                        />
                    </Region>
                    <Region
                        name="preview_list"
                        params={147472}
                        layout={{ width: 254, height: 122, flexShrink: 0, flexDirection: 'row', gap: 10 }}
                    >
                        <Region
                            name="plant1_itemlist"
                            params={147472}
                            layout={{ width: 122, height: 122, flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'column', gap: 1 }}
                        >
                            <Region
                                name="plant_name"
                                params={16}
                                layout={{ width: 122, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('breedpets.widget.plant1.name')}
                                    textOptions={{ align: 'center' }}
                                />
                            </Region>
                            <ThemeImage
                                name="preview_image"
                                params={16}
                                src={undefined}
                                layout={{ width: 122, height: 130, flexShrink: 0, minWidth: 122, maxWidth: 122, minHeight: 130, maxHeight: 130 }}
                            />
                            <Region
                                name="plant_rarity_level"
                                params={16}
                                layout={{ width: 134, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('breedpets.widget.plant1.raritylevel')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 134, align: 'center' }}
                                />
                            </Region>
                            <Region
                                name="plant_description"
                                params={16}
                                layout={{ width: 122, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('breedpets.widget.plant1.description')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="plant2_itemlist"
                            params={147472}
                            layout={{ width: 122, height: 122, flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'column', gap: 1 }}
                        >
                            <Region
                                name="plant_name"
                                params={16}
                                layout={{ width: 122, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('breedpets.widget.plant2.name')}
                                    textOptions={{ align: 'center' }}
                                />
                            </Region>
                            <ThemeImage
                                name="preview_image2"
                                params={16}
                                src={undefined}
                                layout={{ width: 122, height: 130, flexShrink: 0, minWidth: 122, maxWidth: 122, minHeight: 130, maxHeight: 130 }}
                            />
                            <Region
                                name="plant_rarity_level"
                                params={16}
                                layout={{ width: 134, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('breedpets.widget.plant2.raritylevel')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 134, align: 'center' }}
                                />
                            </Region>
                            <Region
                                name="plant_description"
                                params={16}
                                layout={{ width: 122, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('breedpets.widget.plant2.description')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
                                />
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="separator"
                        params={16}
                        layout={{ width: 274, height: 1, flexShrink: 0 }}
                    />
                    <Region
                        name="button_list"
                        params={147472}
                        layout={{ width: 254, height: 30, flexShrink: 0, minWidth: 254, maxWidth: 254, flexDirection: 'row', gap: 10 }}
                    >
                        <Button
                            variant="3"
                            name="cancel_button"
                            params={131089}
                            onPointerTap={onCancelButton}
                            layout={{ width: 122, height: 30, flexShrink: 0, minWidth: 122, maxWidth: 122 }}
                        >
                            {t('breedpets.widget.cancel')}
                        </Button>
                        <ButtonThick
                            variant="5"
                            name="save_button"
                            params={131089}
                            tintColor="#00aa00"
                            onPointerTap={onSaveButton}
                            layout={{ width: 122, height: 30, flexShrink: 0, minWidth: 122, maxWidth: 122 }}
                        >
                            {t('breedpets.widget.use')}
                        </ButtonThick>
                        <ButtonThick
                            variant="5"
                            name="accept_button"
                            params={131089}
                            tintColor="#00aa00"
                            onPointerTap={onAcceptButton}
                            layout={{ width: 122, height: 30, flexShrink: 0, minWidth: 122, maxWidth: 122 }}
                        >
                            {t('breedpets.widget.accept')}
                        </ButtonThick>
                    </Region>
                    <Region
                        params={16}
                        layout={{ width: 272, height: 1, flexShrink: 0, minWidth: 272 }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};
