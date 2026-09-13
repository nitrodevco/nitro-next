import { AvatarEditorContextProvider } from '#base/context';
import { useAvatarEditorVisibility } from '#base/hooks';
import { AvatarEditor } from '#base/views/avatar-editor/AvatarEditor';

export const AvatarEditorComponent = () => {
    const { isWindowVisible } = useAvatarEditorVisibility();

    if (!isWindowVisible) return null;

    return (
        <AvatarEditorContextProvider>
            <AvatarEditor />
        </AvatarEditorContextProvider>
    );
};
