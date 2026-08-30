import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `action_title` of TaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TaskProgressDialogLayoutActionTitleItemProps {
    captionActionTitle?: string;
    layout?: BoxLayout;
}

export const TaskProgressDialogLayoutActionTitleItem = ({ captionActionTitle, layout }: TaskProgressDialogLayoutActionTitleItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionActionTitle ?? t('talent.track.task.action.title')}
            textStyle="text-style-il-heading-2"
            textOptions={{ wordWrap: true, wordWrapWidth: 325 }}
            name="action_title"
            verticalAlign="top"
            layout={{ width: 325, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
