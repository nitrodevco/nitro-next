import { AvatarEditorContextProvider, useIsWindowVisible } from '#base/context';
import { AvatarEditor } from '#base/views/avatar-editor/AvatarEditor';

export const AvatarEditorComponent = () => {
    const isVisible = useIsWindowVisible('avatar_editor');

    // if (!isVisible) return null;

    return (
        <AvatarEditorContextProvider>
            <AvatarEditor />
        </AvatarEditorContextProvider>
    );
};
