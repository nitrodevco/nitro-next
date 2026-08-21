import { useIsWindowVisible } from "#base/context";
import { AvatarEditorViewPixi } from "#base/views-pixi/avatar-editor/AvatarEditorViewPixi"

export const AvatarEditorComponent = () => {
    const isVisible = useIsWindowVisible('avatar_editor');

    if (!isVisible) return null;

    return <AvatarEditorViewPixi />;
}