import { BoxLayout, CheckBox, Region, ThemeText } from '#base/theme';

/** Row template `menu_item_template` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutMenuItemTemplateItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onCheckbox?: () => void;
    onMenuItemTemplate?: () => void;
    visibleCheckbox?: boolean;
    visibleText?: boolean;
}

export const WiredStyleVolterBlueLayoutMenuItemTemplateItem = ({ captionText, layout, onCheckbox, onMenuItemTemplate, visibleCheckbox, visibleText }: WiredStyleVolterBlueLayoutMenuItemTemplateItemProps) => {
    return (
        <Region
            name="menu_item_template"
            onPointerTap={onMenuItemTemplate}
            cursor="pointer"
            layout={{ width: 141, height: 20, flexShrink: 0, ...layout }}
        >
            {(visibleCheckbox ?? true) && (
                <CheckBox
                    variant="2"
                    name="checkbox"
                    onPointerTap={onCheckbox}
                    layout={{ position: 'absolute', left: 6, width: 16, top: 3, height: 16 }}
                />
            )}
            {(visibleText ?? true) && (
                <ThemeText
                    text={captionText ?? 'Copy configuration'}
                    textStyle="text-style-regular"
                    textOptions={{ fill: '#222222' }}
                    name="text"
                    layout={{ position: 'absolute', left: 28, width: 99, top: 3, height: 13 }}
                />
            )}
        </Region>
    );
};
