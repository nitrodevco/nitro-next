import { BoxLayout, ContainerButton, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `left_button_template` of WiredStyleIlluminaLayout - pass real rows through its `items…` slot. */
export interface WiredStyleIlluminaLayoutLeftButtonTemplateItemProps {
    layout?: BoxLayout;
    onLeftButtonTemplate?: () => void;
    srcTypeImage?: string;
    visibleTypeImage?: boolean;
}

export const WiredStyleIlluminaLayoutLeftButtonTemplateItem = ({ layout, onLeftButtonTemplate, srcTypeImage, visibleTypeImage }: WiredStyleIlluminaLayoutLeftButtonTemplateItemProps) => {
    return (
        <ContainerButton
            variant="104"
            name="left_button_template"
            dynamicStyle="button"
            onPointerTap={onLeftButtonTemplate}
            layout={{ width: 17, height: 19, flexShrink: 0, ...layout }}
        >
            {(visibleTypeImage ?? true) && (
                <ThemeImage
                    name="type_image"
                    src={srcTypeImage ?? layoutImage('wired_styles_illumina_icon_source_furni.png')}
                    layout={{ position: 'absolute', left: 6, top: 4, height: 11 }}
                />
            )}
        </ContainerButton>
    );
};
