import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `instruction` of TaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TaskProgressDialogLayoutInstructionItemProps {
    captionInstruction?: string;
    layout?: BoxLayout;
}

export const TaskProgressDialogLayoutInstructionItem = ({ captionInstruction, layout }: TaskProgressDialogLayoutInstructionItemProps) => {
    return (
        <Region
            name="instruction"
            layout={{ width: 285, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionInstruction ?? 'Give 10 scratches to a pet.'}
                textStyle="text-style-il-heading-2"
                textOptions={{ wordWrap: true, wordWrapWidth: 285 }}
            />
        </Region>
    );
};
