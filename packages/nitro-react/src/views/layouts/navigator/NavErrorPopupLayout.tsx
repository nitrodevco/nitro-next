import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3078_nav_error_popup_xml` (layout "nav_error_popup", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NavErrorPopupLayoutProps {
    layout?: BoxLayout;
    popupContainer?: NavErrorPopupLayoutPopupContainerProps;
}

export const NavErrorPopupLayout = ({ layout, popupContainer }: NavErrorPopupLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <NavErrorPopupLayoutPopupContainer {...popupContainer} />
        </Region>
    );
};

/** Named region `popup_container` of NavErrorPopupLayout - configured through the parent's `popupContainer` prop. */
export interface NavErrorPopupLayoutPopupContainerProps {
    captionErrorText?: string;
    layout?: BoxLayout;
    onPopupContainer?: () => void;
    srcPopupArrowDown?: string;
}

export const NavErrorPopupLayoutPopupContainer = ({ captionErrorText, layout, onPopupContainer, srcPopupArrowDown }: NavErrorPopupLayoutPopupContainerProps) => {
    return (
        <Region
            name="popup_container"
            params={1}
            onPointerTap={onPopupContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 184, top: 0, height: 33, ...layout }}
        >
            <Border
                variant="0"
                name="border"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 184, top: 0, height: 23 }}
            >
                <Region
                    name="error_text"
                    layout={{ position: 'absolute', left: 8, width: 173, top: 4, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionErrorText ?? 'PH loren ipsum dolor pubba hubba duppa papatiti'}
                        textOptions={{ fill: '#000000' }}
                    />
                </Region>
            </Border>
            <ThemeImage
                name="popup_arrow_down"
                params={16}
                src={srcPopupArrowDown}
                layout={{ position: 'absolute', left: 50, width: 11, top: 22, height: 11 }}
            />
        </Region>
    );
};
