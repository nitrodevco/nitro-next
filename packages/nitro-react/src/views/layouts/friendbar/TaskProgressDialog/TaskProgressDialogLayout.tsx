import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

import { TaskProgressDialogLayoutList, TaskProgressDialogLayoutListProps } from './TaskProgressDialogLayoutList';

/** Generated from `34_task_progress_dialog_xml` (layout "task_progress_dialog", 378x370) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TaskProgressDialogLayoutProps {
    layout?: BoxLayout;
    list?: TaskProgressDialogLayoutListProps;
    onClose?: () => void;
}

export const TaskProgressDialogLayout = ({ layout, list, onClose }: TaskProgressDialogLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            caption={t('talent.track.task.progress.dialog.title')}
            onClose={onClose}
            layout={{ width: 378, height: 370, ...layout }}
        >
            <TaskProgressDialogLayoutList {...list} />
        </Frame>
    );
};
