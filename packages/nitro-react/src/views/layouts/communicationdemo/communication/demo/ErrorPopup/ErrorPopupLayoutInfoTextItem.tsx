import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `info_text` of ErrorPopupLayout - pass real rows through its `items…` slot. */
export interface ErrorPopupLayoutInfoTextItemProps {
    captionInfoText?: string;
    layout?: BoxLayout;
}

export const ErrorPopupLayoutInfoTextItem = ({ captionInfoText, layout }: ErrorPopupLayoutInfoTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="info_text"
            layout={{ width: 265, height: 28, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionInfoText ?? t('error_window.info')}
                textOptions={{ wordWrap: true, wordWrapWidth: 265, align: 'center' }}
            />
        </Region>
    );
};
