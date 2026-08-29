import { BoxLayout, CheckBox, Region, ThemeText } from '#base/theme';

/** Row template `menu_item_template` of WiredStyleIlluminaLayout - pass real rows through its `items…` slot. */
export interface WiredStyleIlluminaLayoutMenuItemTemplateItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onCheckbox?: () => void;
    onMenuItemTemplate?: () => void;
    visibleCheckbox?: boolean;
    visibleText?: boolean;
}

export const WiredStyleIlluminaLayoutMenuItemTemplateItem = ({ captionText, layout, onCheckbox, onMenuItemTemplate, visibleCheckbox, visibleText }: WiredStyleIlluminaLayoutMenuItemTemplateItemProps) => {
    return (
        <Region
            name="menu_item_template"
            onPointerTap={onMenuItemTemplate}
            cursor="pointer"
            layout={{ width: 141, height: 20, flexShrink: 0, ...layout }}
        >
            {(visibleCheckbox ?? false) && (
                <CheckBox
                    variant="101"
                    name="checkbox"
                    onPointerTap={onCheckbox}
                    layout={{ position: 'absolute', left: 6, width: 19, top: 1, height: 21, minHeight: 21, maxHeight: 21 }}
                />
            )}
            {(visibleText ?? true) && (
                <Region
                    name="text"
                    layout={{ position: 'absolute', left: 28, width: 101, top: 3, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionText ?? 'Copy configuration'}
                        textStyle="text-style-il-regular"
                    />
                </Region>
            )}
        </Region>
    );
};
