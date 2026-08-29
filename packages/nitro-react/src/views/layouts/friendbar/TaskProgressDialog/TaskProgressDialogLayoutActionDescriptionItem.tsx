import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `action_description` of TaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TaskProgressDialogLayoutActionDescriptionItemProps {
    captionActionDescription?: string;
    layout?: BoxLayout;
}

export const TaskProgressDialogLayoutActionDescriptionItem = ({ captionActionDescription, layout }: TaskProgressDialogLayoutActionDescriptionItemProps) => {
    return (
        <Region
            name="action_description"
            layout={{ width: 325, height: 30, flexShrink: 0, minHeight: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionActionDescription ?? 'You can find the Habbo Way by clicking.'}
                textOptions={{ wordWrap: true, wordWrapWidth: 325 }}
            />
        </Region>
    );
};
