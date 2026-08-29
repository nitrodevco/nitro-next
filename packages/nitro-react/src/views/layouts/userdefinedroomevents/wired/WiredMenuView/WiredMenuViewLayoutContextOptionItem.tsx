import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `context_option` of WiredMenuViewLayout - pass real rows through its `items…` slot. */
export interface WiredMenuViewLayoutContextOptionItemProps {
    layout?: BoxLayout;
    onTypeContextButton?: () => void;
    visibleTypeContextButton?: boolean;
}

export const WiredMenuViewLayoutContextOptionItem = ({ layout, onTypeContextButton, visibleTypeContextButton }: WiredMenuViewLayoutContextOptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="context_option"
            layout={{ width: 37, height: 37, flexShrink: 0, ...layout }}
        >
            {(visibleTypeContextButton ?? true) && (
                <Button
                    variant="3"
                    name="type_context_button"
                    tooltip={t('wiredfurni.params.sourcetype.context')}
                    onPointerTap={onTypeContextButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 36 }}
                />
            )}
            <ThemeImage
                src={layoutImage('icon_wired_variable_context_large.png')}
                layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 37 }}
            />
        </Region>
    );
};
