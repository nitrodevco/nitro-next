import { useWindowVisibility } from '#base/hooks';
import { AvatarEditor } from '#base/views/avatar-editor/AvatarEditor';

export const AvatarEditorComponent = () => {
    const { isWindowVisible } = useWindowVisibility('avatar_editor');

    if (!isWindowVisible) return null;

    return <AvatarEditor />;
};
