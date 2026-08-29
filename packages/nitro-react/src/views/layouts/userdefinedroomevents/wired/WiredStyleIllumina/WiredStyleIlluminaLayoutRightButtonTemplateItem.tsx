import { BoxLayout, ContainerButton, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `right_button_template` of WiredStyleIlluminaLayout - pass real rows through its `items…` slot. */
export interface WiredStyleIlluminaLayoutRightButtonTemplateItemProps {
    layout?: BoxLayout;
    onRightButtonTemplate?: () => void;
    srcTypeImage?: string;
    visibleTypeImage?: boolean;
}

export const WiredStyleIlluminaLayoutRightButtonTemplateItem = ({ layout, onRightButtonTemplate, srcTypeImage, visibleTypeImage }: WiredStyleIlluminaLayoutRightButtonTemplateItemProps) => {
    return (
        <ContainerButton
            variant="105"
            name="right_button_template"
            dynamicStyle="button"
            onPointerTap={onRightButtonTemplate}
            layout={{ width: 17, height: 19, flexShrink: 0, ...layout }}
        >
            {(visibleTypeImage ?? true) && (
                <ThemeImage
                    name="type_image"
                    src={srcTypeImage ?? layoutImage('wired_styles_illumina_icon_source_global.png')}
                    layout={{ position: 'absolute', left: 4, top: 6, height: 7 }}
                />
            )}
        </ContainerButton>
    );
};
