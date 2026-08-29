import { BoxLayout, ContainerButton, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `middle_button_template` of WiredStyleIlluminaLayout - pass real rows through its `items…` slot. */
export interface WiredStyleIlluminaLayoutMiddleButtonTemplateItemProps {
    layout?: BoxLayout;
    onMiddleButtonTemplate?: () => void;
    srcTypeImage?: string;
    visibleTypeImage?: boolean;
}

export const WiredStyleIlluminaLayoutMiddleButtonTemplateItem = ({ layout, onMiddleButtonTemplate, srcTypeImage, visibleTypeImage }: WiredStyleIlluminaLayoutMiddleButtonTemplateItemProps) => {
    return (
        <ContainerButton
            variant="106"
            name="middle_button_template"
            dynamicStyle="button"
            onPointerTap={onMiddleButtonTemplate}
            layout={{ width: 14, height: 19, flexShrink: 0, ...layout }}
        >
            {(visibleTypeImage ?? true) && (
                <ThemeImage
                    name="type_image"
                    src={srcTypeImage ?? layoutImage('wired_styles_illumina_icon_source_users.png')}
                    layout={{ position: 'absolute', left: 3, top: 5, height: 10 }}
                />
            )}
        </ContainerButton>
    );
};
