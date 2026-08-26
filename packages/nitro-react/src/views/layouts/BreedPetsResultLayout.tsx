import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `918_breed_pets_result_xml` (layout "breed_pets_result", 275x300) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BreedPetsResultLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onCloseButton?: () => void;
    onPickButton1?: () => void;
    onPickButton2?: () => void;
    onPlaceButton1?: () => void;
    onPlaceButton2?: () => void;
}

export const BreedPetsResultLayout = ({ layout, onClose, onCloseButton, onPickButton1, onPickButton2, onPlaceButton1, onPlaceButton2 }: BreedPetsResultLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={32769}
            caption={t('breedpetsresult.widget.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 275, height: 300, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="element_list"
                    params={147472}
                    layout={{ position: 'absolute', left: 0, width: 274, top: 0, height: 291, minWidth: 274, maxWidth: 274, flexDirection: 'column', gap: 10 }}
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
                            text="${breedpetsresult.widget.text "
                            textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
                        />
                    </Region>
                    <Region
                        name="description_sorry"
                        params={16}
                        visible={false}
                        layout={{ width: 254, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('breedpetsresult.widget.text.sorry')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
                        />
                    </Region>
                    <Region
                        name="info"
                        params={16}
                        layout={{ width: 254, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('breedpetsresult.widget.info')}
                            textStyle="text-style-u-italic"
                            textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
                        />
                    </Region>
                    <Region
                        name="info_sorry"
                        params={16}
                        visible={false}
                        layout={{ width: 254, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('breedpetsresult.widget.info.sorry')}
                            textStyle="text-style-u-italic"
                            textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
                        />
                    </Region>
                    <Region
                        name="preview_list"
                        params={4079632}
                        layout={{ width: 254, height: 122, flexShrink: 0, maxWidth: 254, flexDirection: 'row', gap: 10 }}
                    >
                        <Region
                            name="seed1_itemlist"
                            params={147472}
                            layout={{ width: 122, height: 122, flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'column', gap: 1 }}
                        >
                            <Region
                                name="seed_name"
                                params={16}
                                layout={{ width: 122, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('breedpetsresult.widget.seed1.name')}
                                    textOptions={{ align: 'center' }}
                                />
                            </Region>
                            <Region
                                name="preview_image_region"
                                params={17}
                                layout={{ width: 122, height: 130, flexShrink: 0, minWidth: 122, maxWidth: 122, minHeight: 130, maxHeight: 130 }}
                            >
                                <ThemeImage
                                    name="preview_image"
                                    params={16}
                                    src={undefined}
                                    layout={{ position: 'absolute', left: 0, width: 122, top: 0, height: 130, minWidth: 122, maxWidth: 122, minHeight: 130, maxHeight: 130 }}
                                />
                            </Region>
                            <Region
                                name="seed_rarity_level"
                                params={16}
                                layout={{ width: 134, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('breedpetsresult.widget.seed1.raritylevel')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 134, align: 'center' }}
                                />
                            </Region>
                            <Region
                                name="seed_description"
                                params={16}
                                layout={{ width: 122, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('breedpetsresult.widget.seed1.description')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
                                />
                            </Region>
                            <Region
                                name="info_mutate1"
                                params={16}
                                visible={false}
                                layout={{ width: 122, height: 33, flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('breedpetsresult.widget.info.mutation')}
                                    textStyle="text-style-u-italic"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="seed2_itemlist"
                            params={147472}
                            layout={{ width: 122, height: 122, flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'column', gap: 1 }}
                        >
                            <Region
                                name="seed_name"
                                params={16}
                                layout={{ width: 122, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('breedpetsresult.widget.seed2.name')}
                                    textOptions={{ align: 'center' }}
                                />
                            </Region>
                            <Region
                                name="preview_image_region2"
                                params={17}
                                layout={{ width: 122, height: 130, flexShrink: 0, minWidth: 122, maxWidth: 122, minHeight: 130, maxHeight: 130 }}
                            >
                                <ThemeImage
                                    name="preview_image2"
                                    params={16}
                                    src={undefined}
                                    layout={{ position: 'absolute', left: 0, width: 122, top: 0, height: 130, minWidth: 122, maxWidth: 122, minHeight: 130, maxHeight: 130 }}
                                />
                            </Region>
                            <Region
                                name="seed_rarity_level"
                                params={16}
                                layout={{ width: 134, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('breedpetsresult.widget.seed2.raritylevel')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 134, align: 'center' }}
                                />
                            </Region>
                            <Region
                                name="seed_description"
                                params={16}
                                layout={{ width: 122, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('breedpetsresult.widget.seed2.description')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
                                />
                            </Region>
                            <Region
                                name="info_mutate2"
                                params={16}
                                visible={false}
                                layout={{ width: 122, height: 33, flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('breedpetsresult.widget.info.mutation')}
                                    textStyle="text-style-u-italic"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
                                />
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        params={16}
                        layout={{ width: 244, height: 1, flexShrink: 0, minHeight: 1, maxHeight: 1 }}
                    />
                    <Region
                        name="preview_buttonlist"
                        params={4079632}
                        layout={{ width: 120, height: 30, flexShrink: 0, maxWidth: 254, flexDirection: 'row', gap: 10 }}
                    >
                        <Region
                            name="seed1_buttonlist"
                            params={933904}
                            layout={{ width: 122, height: 0, flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'column', gap: 1 }}
                        >
                            <Region
                                visible={false}
                                layout={{ width: 120, height: 30, flexShrink: 0, minWidth: 120, maxWidth: 120 }}
                            >
                                <ButtonThick
                                    variant="5"
                                    name="place_button1"
                                    params={131089}
                                    tintColor="#00aa00"
                                    onPointerTap={onPlaceButton1}
                                    layout={{ width: '100%', height: '100%' }}
                                >
                                    {t('breedpetsresult.widget.seed2.use')}
                                </ButtonThick>
                            </Region>
                            <Region
                                visible={false}
                                layout={{ width: 120, height: 30, flexShrink: 0, minWidth: 120, maxWidth: 120 }}
                            >
                                <Button
                                    variant="3"
                                    name="pick_button1"
                                    params={131089}
                                    onPointerTap={onPickButton1}
                                    layout={{ width: '100%', height: '100%' }}
                                >
                                    {t('breedpetsresult.widget.seed2.pick')}
                                </Button>
                            </Region>
                        </Region>
                        <Region
                            name="seed2_buttonlist"
                            params={933904}
                            layout={{ width: 122, height: 0, flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'column', gap: 1 }}
                        >
                            <Region
                                visible={false}
                                layout={{ width: 120, height: 30, flexShrink: 0, minWidth: 120, maxWidth: 120 }}
                            >
                                <ButtonThick
                                    variant="5"
                                    name="place_button2"
                                    params={131089}
                                    tintColor="#00aa00"
                                    onPointerTap={onPlaceButton2}
                                    layout={{ width: '100%', height: '100%' }}
                                >
                                    {t('breedpetsresult.widget.seed2.use')}
                                </ButtonThick>
                            </Region>
                            <Region
                                visible={false}
                                layout={{ width: 120, height: 30, flexShrink: 0, minWidth: 120, maxWidth: 120 }}
                            >
                                <Button
                                    variant="3"
                                    name="pick_button2"
                                    params={131089}
                                    onPointerTap={onPickButton2}
                                    layout={{ width: '100%', height: '100%' }}
                                >
                                    {t('breedpetsresult.widget.seed2.pick')}
                                </Button>
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="button_list"
                        params={4079632}
                        layout={{ width: 122, height: 30, flexShrink: 0, flexDirection: 'row', gap: 10 }}
                    >
                        <Button
                            variant="3"
                            name="close_button"
                            params={131089}
                            onPointerTap={onCloseButton}
                            layout={{ width: 122, height: 30, flexShrink: 0, minWidth: 122, maxWidth: 122 }}
                        >
                            {t('breedpetsresult.widget.close')}
                        </Button>
                    </Region>
                    <Region
                        name="separator"
                        params={16}
                        layout={{ width: 274, height: 1, flexShrink: 0, minWidth: 274, minHeight: 1 }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};
