import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

import { TaskProgressDialogLayoutUnverifiedContainer, TaskProgressDialogLayoutUnverifiedContainerProps } from './TaskProgressDialogLayoutUnverifiedContainer';

/** Row template `email_container` of TaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TaskProgressDialogLayoutEmailContainerItemProps {
    captionVerifiedTxt?: string;
    layout?: BoxLayout;
    unverifiedContainer?: TaskProgressDialogLayoutUnverifiedContainerProps;
    visibleUnverifiedContainer?: boolean;
    visibleVerifiedTxt?: boolean;
}

export const TaskProgressDialogLayoutEmailContainerItem = ({ captionVerifiedTxt, layout, unverifiedContainer, visibleUnverifiedContainer, visibleVerifiedTxt }: TaskProgressDialogLayoutEmailContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="email_container"
            layout={{ width: 320, height: 60, flexShrink: 0, ...layout }}
        >
            {(visibleUnverifiedContainer ?? false) && (
                <TaskProgressDialogLayoutUnverifiedContainer {...unverifiedContainer} />
            )}
            {(visibleVerifiedTxt ?? false) && (
                <ThemeText
                    text={captionVerifiedTxt ?? t('talent.track.progress.emailverified')}
                    textStyle="text-style-il-heading-3"
                    textOptions={{ wordWrap: true, wordWrapWidth: 320 }}
                    name="verified_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            )}
        </Region>
    );
};
