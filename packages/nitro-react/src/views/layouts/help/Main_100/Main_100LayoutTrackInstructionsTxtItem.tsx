import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `track_instructions_txt` of Main_100Layout - pass real rows through its `items…` slot. */
export interface Main_100LayoutTrackInstructionsTxtItemProps {
    captionTrackInstructionsTxt?: string;
    layout?: BoxLayout;
}

export const Main_100LayoutTrackInstructionsTxtItem = ({ captionTrackInstructionsTxt, layout }: Main_100LayoutTrackInstructionsTxtItemProps) => {
    return (
        <ThemeText
            text={captionTrackInstructionsTxt ?? 'Complete tasks to earn points and unlock rewards'}
            textOptions={{ wordWrap: true, wordWrapWidth: 157 }}
            name="track_instructions_txt"
            verticalAlign="top"
            layout={{ width: 157, height: 28, flexShrink: 0, ...layout }}
        />
    );
};
