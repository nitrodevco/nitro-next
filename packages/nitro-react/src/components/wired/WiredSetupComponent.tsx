/**
 * Mounts the wired setup dialog - the frame `UserDefinedRoomEventsCtrl.createWindow` builds and
 * `showFrame` adds to the desktop. The dialog is not a window of the window registry: it opens
 * when the server answers with one of the six `WiredFurni*` packets and closes when the edit
 * ends, so its visibility is the wired store's `setup`.
 *
 * The room selection hook is mounted here whether or not a box is being edited: Flash's
 * `stuffSelected` / `userSelected` run on every selection, and a click on a user has to reach
 * the server whenever the room has a "user clicks user" trigger.
 */
import { useWiredSetup } from '#base/context/wired';
import { useWiredRoomSelectionHandler } from '#base/hooks';
import { WiredSetupView } from '#base/views/wired-setup/WiredSetupView';

export const WiredSetupComponent = () => {
    const setup = useWiredSetup();

    useWiredRoomSelectionHandler();

    if (!setup) return null;

    // One mount per edit: `prepareForUpdate` closes the frame it had and builds the next one.
    return (
        <WiredSetupView
            key={setup.editId}
            setup={setup}
        />
    );
};
