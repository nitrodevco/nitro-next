import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `global_option` of WiredMenuViewLayout - pass real rows through its `items…` slot. */
export interface WiredMenuViewLayoutGlobalOptionItem2Props {
    layout?: BoxLayout;
    onTypeGlobalButton?: () => void;
    visibleTypeGlobalButton?: boolean;
}

export const WiredMenuViewLayoutGlobalOptionItem2 = ({ layout, onTypeGlobalButton, visibleTypeGlobalButton }: WiredMenuViewLayoutGlobalOptionItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="global_option"
            layout={{ width: 37, height: 37, flexShrink: 0, ...layout }}
        >
            {(visibleTypeGlobalButton ?? true) && (
                <Button
                    variant="3"
                    name="type_global_button"
                    tooltip={t('wiredfurni.params.sourcetype.global')}
                    onPointerTap={onTypeGlobalButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 36 }}
                />
            )}
            <ThemeImage
                src={layoutImage('icon_wired_variable_global_large.png')}
                layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 37 }}
            />
        </Region>
    );
};
