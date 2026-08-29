import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `motto_txt` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutMottoTxtItemProps {
    captionMottoTxt?: string;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutMottoTxtItem = ({ captionMottoTxt, layout }: NewExtendedProfileLayoutMottoTxtItemProps) => {
    return (
        <Region
            name="motto_txt"
            layout={{ width: 200, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionMottoTxt ?? ''}
                textStyle="text-style-u-italic"
                textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
            />
        </Region>
    );
};
