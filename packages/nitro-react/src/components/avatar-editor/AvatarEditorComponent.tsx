import { useWindowVisibility } from '#base/hooks';
import { AvatarEditor } from '#base/views/avatar-editor/AvatarEditor';

/** The avatar editor's mount: `AvatarEditor` while the `avatar_editor` window is open. */
export const AvatarEditorComponent = () => {
    const { isWindowVisible } = useWindowVisibility('avatar_editor');

    if (!isWindowVisible) return null;

    return <AvatarEditor />;
};
