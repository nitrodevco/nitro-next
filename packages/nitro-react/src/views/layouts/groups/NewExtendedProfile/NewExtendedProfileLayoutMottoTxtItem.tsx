import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `motto_txt` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutMottoTxtItemProps {
    captionMottoTxt?: string;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutMottoTxtItem = ({ captionMottoTxt, layout }: NewExtendedProfileLayoutMottoTxtItemProps) => {
    return (
        <ThemeText
            text={captionMottoTxt ?? ''}
            textStyle="text-style-u-italic"
            textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
            name="motto_txt"
            verticalAlign="top"
            layout={{ width: 200, height: 30, flexShrink: 0, ...layout }}
        />
    );
};
