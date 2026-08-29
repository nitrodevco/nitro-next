import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Row template `mini_button_bg` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutMiniButtonBgItemProps {
    layout?: BoxLayout;
    onMiniButtonClick?: () => void;
    srcMiniButtonIcon?: string;
    visibleMiniButtonClick?: boolean;
    visibleMiniButtonIcon?: boolean;
}

export const WiredStyleVolterLayoutMiniButtonBgItem = ({ layout, onMiniButtonClick, srcMiniButtonIcon, visibleMiniButtonClick, visibleMiniButtonIcon }: WiredStyleVolterLayoutMiniButtonBgItemProps) => {
    return (
        <Region
            name="mini_button_bg"
            backgroundColor="#000000"
            layout={{ width: 13, height: 17, flexShrink: 0, minHeight: 17, maxHeight: 17, ...layout }}
        >
            {(visibleMiniButtonClick ?? true) && (
                <Region
                    name="mini_button_click"
                    backgroundColor="#333333"
                    onPointerTap={onMiniButtonClick}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 15, minHeight: 15, maxHeight: 15 }}
                >
                    {(visibleMiniButtonIcon ?? true) && (
                        <ThemeImage
                            name="mini_button_icon"
                            src={srcMiniButtonIcon}
                            layout={{ position: 'absolute', left: 0, width: 13, top: 0, height: 15 }}
                        />
                    )}
                </Region>
            )}
        </Region>
    );
};
