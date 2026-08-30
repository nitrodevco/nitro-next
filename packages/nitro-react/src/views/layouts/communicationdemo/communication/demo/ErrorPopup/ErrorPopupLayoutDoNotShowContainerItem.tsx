import { useTranslation } from '#base/context';
import { BoxLayout, CheckBox, Region, ThemeText } from '#base/theme';

/** Row template `do_not_show_container` of ErrorPopupLayout - pass real rows through its `items…` slot. */
export interface ErrorPopupLayoutDoNotShowContainerItemProps {
    layout?: BoxLayout;
    onDoNotShowCbx?: () => void;
    visibleDoNotShowCbx?: boolean;
}

export const ErrorPopupLayoutDoNotShowContainerItem = ({ layout, onDoNotShowCbx, visibleDoNotShowCbx }: ErrorPopupLayoutDoNotShowContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="do_not_show_container"
            layout={{ width: 265, height: 20, flexShrink: 0, ...layout }}
        >
            {(visibleDoNotShowCbx ?? true) && (
                <CheckBox
                    variant="3"
                    name="do_not_show_cbx"
                    onPointerTap={onDoNotShowCbx}
                    layout={{ position: 'absolute', left: 0, width: 17, top: 1, height: 17 }}
                />
            )}
            <ThemeText
                text={t('error_window.do_not_show')}
                layout={{ position: 'absolute', left: 20, width: 110, top: 0, height: 17 }}
            />
        </Region>
    );
};
