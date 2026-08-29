import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `furni_option` of WiredMenuViewLayout - pass real rows through its `items…` slot. */
export interface WiredMenuViewLayoutFurniOptionItemProps {
    layout?: BoxLayout;
    onTypeFurniButton?: () => void;
    visibleTypeFurniButton?: boolean;
}

export const WiredMenuViewLayoutFurniOptionItem = ({ layout, onTypeFurniButton, visibleTypeFurniButton }: WiredMenuViewLayoutFurniOptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="furni_option"
            layout={{ width: 37, height: 37, flexShrink: 0, ...layout }}
        >
            {(visibleTypeFurniButton ?? true) && (
                <Button
                    variant="3"
                    name="type_furni_button"
                    tooltip={t('wiredfurni.params.sourcetype.furni')}
                    onPointerTap={onTypeFurniButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 36 }}
                />
            )}
            <ThemeImage
                src={layoutImage('icon_wired_variable_furni_large.png')}
                layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 37 }}
            />
        </Region>
    );
};
