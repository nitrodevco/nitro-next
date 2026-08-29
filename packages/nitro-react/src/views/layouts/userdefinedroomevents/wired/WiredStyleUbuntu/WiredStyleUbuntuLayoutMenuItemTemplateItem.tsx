import { BoxLayout, CheckBox, Region, ThemeText } from '#base/theme';

/** Row template `menu_item_template` of WiredStyleUbuntuLayout - pass real rows through its `items…` slot. */
export interface WiredStyleUbuntuLayoutMenuItemTemplateItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onCheckbox?: () => void;
    onMenuItemTemplate?: () => void;
    visibleCheckbox?: boolean;
    visibleMenuItemTemplate?: boolean;
    visibleText?: boolean;
}

export const WiredStyleUbuntuLayoutMenuItemTemplateItem = ({ captionText, layout, onCheckbox, onMenuItemTemplate, visibleCheckbox, visibleMenuItemTemplate, visibleText }: WiredStyleUbuntuLayoutMenuItemTemplateItemProps) => {
    return (
        (visibleMenuItemTemplate ?? false) && (
            <Region
                name="menu_item_template"
                onPointerTap={onMenuItemTemplate}
                cursor="pointer"
                layout={{ width: 141, height: 20, flexShrink: 0, ...layout }}
            >
                {(visibleCheckbox ?? true) && (
                    <CheckBox
                        variant="3"
                        name="checkbox"
                        onPointerTap={onCheckbox}
                        layout={{ position: 'absolute', left: 8, width: 17, top: 3, height: 17, minHeight: 17, maxHeight: 17 }}
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
        )
    );
};
