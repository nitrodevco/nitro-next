import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

/** Row template `button_template` of SearchTreeDropdownLayout - pass real rows through its `items…` slot. */
export interface SearchTreeDropdownLayoutButtonTemplateItemProps {
    buttonShadow?: ReactNode;
    layout?: BoxLayout;
    onButtonTemplate?: () => void;
    srcButtonImg?: string;
    visibleButtonBorder?: boolean;
    visibleButtonImg?: boolean;
    visibleButtonShadow?: boolean;
}

export const SearchTreeDropdownLayoutButtonTemplateItem = ({ buttonShadow, layout, onButtonTemplate, srcButtonImg, visibleButtonBorder, visibleButtonImg, visibleButtonShadow }: SearchTreeDropdownLayoutButtonTemplateItemProps) => {
    return (
        <Region
            name="button_template"
            onPointerTap={onButtonTemplate}
            cursor="pointer"
            layout={{ width: 30, height: 20, flexShrink: 0, ...layout }}
        >
            {(visibleButtonBorder ?? true) && (
                <Border
                    variant="3"
                    name="button_border"
                    tintColor="#fafafa"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    {(visibleButtonImg ?? true) && (
                        <ThemeImage
                            name="button_img"
                            src={srcButtonImg}
                            layout={{ position: 'absolute', left: 0, top: 0 }}
                        />
                    )}
                </Border>
            )}
            {(visibleButtonShadow ?? true) && (
                <Region
                    name="button_shadow"
                    backgroundColor="#dddddd"
                    layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2 }}
                >
                    {buttonShadow}
                </Region>
            )}
        </Region>
    );
};
