import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3078_nav_error_popup_xml` (layout "nav_error_popup", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NavErrorPopupLayoutProps {
    captionErrorText?: string;
    layout?: BoxLayout;
    onPopupContainer?: () => void;
    srcPopupArrowDown?: string;
    tintPopupArrowDown?: string;
}

export const NavErrorPopupLayout = ({ captionErrorText, layout, onPopupContainer, srcPopupArrowDown, tintPopupArrowDown }: NavErrorPopupLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Region
                name="popup_container"
                onPointerTap={onPopupContainer}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 184, top: 0, height: 33 }}
            >
                <Border
                    variant="0"
                    name="border"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 10 }}
                >
                    <ThemeText
                        text={captionErrorText ?? 'PH loren ipsum dolor pubba hubba duppa papatiti'}
                        textOptions={{ fill: '#000000' }}
                        name="error_text"
                        layout={{ position: 'absolute', left: 8, right: 3, top: 4, bottom: -1 }}
                    />
                </Border>
                <ThemeImage
                    name="popup_arrow_down"
                    src={srcPopupArrowDown}
                    tint={tintPopupArrowDown}
                    layout={{ position: 'absolute', left: 50, width: 11, bottom: 0, height: 11 }}
                />
            </Region>
        </Region>
    );
};
