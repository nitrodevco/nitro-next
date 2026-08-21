import { useIsWindowVisible } from "#base/context";
import { AvatarEditorView } from "#base/views/avatar-editor/AvatarEditorView"

export const AvatarEditorComponent = () => {
    const isVisible = useIsWindowVisible('avatar_editor');

    if (!isVisible) return null;

    return <AvatarEditorView />;
}