import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `handitem_txt` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutHanditemTxtItemProps {
    captionHanditemTxt?: string;
    layout?: BoxLayout;
    visibleHanditemTxt?: boolean;
}

export const UserViewLayoutHanditemTxtItem = ({ captionHanditemTxt, layout, visibleHanditemTxt }: UserViewLayoutHanditemTxtItemProps) => {
    const t = useTranslation();

    return (
        (visibleHanditemTxt ?? false) && (
            <ThemeText
                text={captionHanditemTxt ?? t('infostand.text.handitem')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
                name="handitem_txt"
                verticalAlign="top"
                layout={{ width: 170, height: 17, flexShrink: 0, ...layout }}
            />
        )
    );
};
