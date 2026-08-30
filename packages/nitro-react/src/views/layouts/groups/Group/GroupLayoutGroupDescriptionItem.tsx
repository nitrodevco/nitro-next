import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `group_description` of GroupLayout - pass real rows through its `items…` slot. */
export interface GroupLayoutGroupDescriptionItemProps {
    captionGroupDescription?: string;
    layout?: BoxLayout;
}

export const GroupLayoutGroupDescriptionItem = ({ captionGroupDescription, layout }: GroupLayoutGroupDescriptionItemProps) => {
    return (
        <ThemeText
            text={captionGroupDescription ?? 'Group Desc: pasdsad sadaddsad sadsa as dasd sad asd sada sdas das dsad sad asd asd ad ada sdas dsa das dsa dsad jhg jhg jh gjh gjh g'}
            textOptions={{ wordWrap: true, wordWrapWidth: 215 }}
            name="group_description"
            verticalAlign="top"
            layout={{ width: 215, height: 120, flexShrink: 0, ...layout }}
        />
    );
};
