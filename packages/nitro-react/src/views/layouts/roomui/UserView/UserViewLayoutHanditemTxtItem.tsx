import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

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
            <Region
                name="handitem_txt"
                layout={{ width: 170, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
            >
                <ThemeText
                    text={captionHanditemTxt ?? t('infostand.text.handitem')}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
                />
            </Region>
        )
    );
};
