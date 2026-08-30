import { useTranslation } from '#base/context';
import { BoxLayout, CheckBox, Region, ThemeText } from '#base/theme';

/** Named region `options_container` of AreaHideUiLayout - configured through the parent's `optionsContainer` prop. */
export interface AreaHideUiLayoutOptionsContainerProps {
    captionInvertInfo?: string;
    captionInvertTxt?: string;
    captionInvisibilityInfo?: string;
    captionInvisibilityTxt?: string;
    captionWallitemsTxt?: string;
    layout?: BoxLayout;
    onInvertCheckbox?: () => void;
    onInvisiblityCheckbox?: () => void;
    onWallitemsCheckbox?: () => void;
}

export const AreaHideUiLayoutOptionsContainer = ({ captionInvertInfo, captionInvertTxt, captionInvisibilityInfo, captionInvisibilityTxt, captionWallitemsTxt, layout, onInvertCheckbox, onInvisiblityCheckbox, onWallitemsCheckbox }: AreaHideUiLayoutOptionsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="options_container"
            layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 123, ...layout }}
        >
            <Region
                name="wallitem_option"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 55 }}
            >
                <CheckBox
                    variant="0"
                    name="wallitems_checkbox"
                    onPointerTap={onWallitemsCheckbox}
                    layout={{ position: 'absolute', left: 1, width: 18, top: 0, height: 18 }}
                />
                <ThemeText
                    text={captionWallitemsTxt ?? t('widget.areahide.options.wallitems')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 240 }}
                    name="wallitems_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', right: 2, width: 240, top: 0, height: 15 }}
                />
            </Region>
            <Region
                name="invert_option"
                layout={{ position: 'absolute', left: 0, right: 0, top: 20, height: 43 }}
            >
                <CheckBox
                    variant="0"
                    name="invert_checkbox"
                    onPointerTap={onInvertCheckbox}
                    layout={{ position: 'absolute', left: 1, width: 18, top: 0, height: 18 }}
                />
                <ThemeText
                    text={captionInvertTxt ?? t('widget.areahide.options.invert')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 240 }}
                    name="invert_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', right: 2, width: 240, top: 0, height: 15 }}
                />
                <ThemeText
                    text={captionInvertInfo ?? t('widget.areahide.options.invert.info')}
                    textStyle="text-style-u-small"
                    textOptions={{ fill: '#999999', wordWrap: true, wordWrapWidth: 242 }}
                    name="invert_info"
                    verticalAlign="top"
                    layout={{ position: 'absolute', right: 0, width: 242, bottom: -3, height: 30 }}
                />
            </Region>
            <Region
                name="invisibility_option"
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 55 }}
            >
                <CheckBox
                    variant="0"
                    name="invisiblity_checkbox"
                    onPointerTap={onInvisiblityCheckbox}
                    layout={{ position: 'absolute', left: 1, width: 18, top: 0, height: 18 }}
                />
                <ThemeText
                    text={captionInvisibilityTxt ?? t('widget.areahide.options.invisibility')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 240 }}
                    name="invisibility_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', right: 2, width: 240, top: 0, height: 15 }}
                />
                <ThemeText
                    text={captionInvisibilityInfo ?? t('widget.areahide.options.invisibility.info')}
                    textStyle="text-style-u-small"
                    textOptions={{ fill: '#999999', wordWrap: true, wordWrapWidth: 242 }}
                    name="invisibility_info"
                    verticalAlign="top"
                    layout={{ position: 'absolute', right: 0, width: 242, bottom: -1, height: 40 }}
                />
            </Region>
        </Region>
    );
};
