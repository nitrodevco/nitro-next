import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `action_description` of TaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TaskProgressDialogLayoutActionDescriptionItemProps {
    captionActionDescription?: string;
    layout?: BoxLayout;
}

export const TaskProgressDialogLayoutActionDescriptionItem = ({ captionActionDescription, layout }: TaskProgressDialogLayoutActionDescriptionItemProps) => {
    return (
        <ThemeText
            text={captionActionDescription ?? 'You can find the Habbo Way by clicking.'}
            textOptions={{ wordWrap: true, wordWrapWidth: 325 }}
            name="action_description"
            verticalAlign="top"
            layout={{ width: 325, height: 30, flexShrink: 0, minHeight: 30, ...layout }}
        />
    );
};
