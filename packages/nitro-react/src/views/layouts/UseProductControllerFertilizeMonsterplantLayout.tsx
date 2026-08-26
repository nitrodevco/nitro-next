import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `831_use_product_controller_fertilize_monsterplant_xml` (layout "use_product_fertilize_monsterplant", 290x257) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductControllerFertilizeMonsterplantLayoutProps {
    layout?: BoxLayout;
    onCancelText?: () => void;
    onSaveButton?: () => void;
}

export const UseProductControllerFertilizeMonsterplantLayout = ({ layout, onCancelText, onSaveButton }: UseProductControllerFertilizeMonsterplantLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 290, height: 257, ...layout }}>
            <Region
                name="element_list"
                params={147472}
                layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 257, maxWidth: 290, flexDirection: 'column', gap: 10 }}
            >
                <Region
                    name="separator"
                    params={16}
                    layout={{ width: 270, height: 1, flexShrink: 0 }}
                />
                <Region
                    name="preview_list"
                    params={147472}
                    layout={{ width: 270, height: 184, flexShrink: 0, minWidth: 270, maxWidth: 270, flexDirection: 'row', gap: 10 }}
                >
                    <Region
                        name="plant_itemlist"
                        params={147472}
                        layout={{ width: 130, height: 238, flexShrink: 0, minWidth: 130, maxWidth: 130, flexDirection: 'column', gap: 1 }}
                    >
                        <Region
                            name="plant_name"
                            params={16}
                            layout={{ width: 122, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('useproduct.widget.monsterplant.plant.name')}
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
                            layout={{ width: 134, height: 44, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('useproduct.widget.monsterplant.plant.raritylevel')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 134, align: 'center' }}
                            />
                        </Region>
                        <Region
                            name="plant_description"
                            params={16}
                            layout={{ width: 122, height: 44, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('useproduct.widget.monsterplant.plant.description')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        params={147472}
                        layout={{ width: 130, height: 104, flexShrink: 0, minWidth: 130, maxWidth: 130, flexDirection: 'column', gap: 1 }}
                    >
                        <Region
                            name="separator"
                            params={16}
                            layout={{ width: 130, height: 17, flexShrink: 0, minWidth: 130, maxWidth: 130 }}
                        />
                        <Region
                            name="description"
                            params={16}
                            layout={{ width: 130, height: 44, flexShrink: 0, minWidth: 130, maxWidth: 130, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('useproduct.widget.text.fertilize_monsterplant')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 130 }}
                            />
                        </Region>
                        <Region
                            name="separator"
                            params={16}
                            layout={{ width: 130, height: 10, flexShrink: 0, minWidth: 130, maxWidth: 130 }}
                        />
                        <Region
                            name="info"
                            params={16}
                            layout={{ width: 130, height: 30, flexShrink: 0, minWidth: 130, maxWidth: 130, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('useproduct.widget.info.fertilize_monsterplant')}
                                textStyle="text-style-u-italic"
                                textOptions={{ wordWrap: true, wordWrapWidth: 130 }}
                            />
                        </Region>
                    </Region>
                </Region>
                <Region
                    name="separator"
                    params={16}
                    layout={{ width: 270, height: 1, flexShrink: 0 }}
                />
                <Region
                    params={16}
                    layout={{ width: 270, height: 30, flexShrink: 0, minHeight: 30, flexDirection: 'row', gap: 10 }}
                >
                    <Button
                        variant="3"
                        name="cancel_text"
                        params={131089}
                        onPointerTap={onCancelText}
                        layout={{ width: 130, height: 30, flexShrink: 0, minWidth: 130, maxWidth: 130 }}
                    >
                        {t('useproduct.widget.cancel')}
                    </Button>
                    <ButtonThick
                        variant="5"
                        name="save_button"
                        params={131089}
                        tintColor="#00aa00"
                        onPointerTap={onSaveButton}
                        layout={{ width: 130, height: 30, flexShrink: 0, minWidth: 130, maxWidth: 130 }}
                    >
                        {t('useproduct.widget.fertilize')}
                    </ButtonThick>
                </Region>
                <Region
                    name="separator"
                    params={16}
                    layout={{ width: 270, height: 1, flexShrink: 0 }}
                />
            </Region>
        </Region>
    );
};
