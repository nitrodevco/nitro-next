/**
 * Mounts the cursed dragon adoption (`CursedDragonAdoptionController` / `CursedDragonAdoptionView`)
 * while its window is up - opened by `cursed_dragon_adoption/open` (`openCursedDragonAdoption`),
 * closed by its close button (`CursedDragonAdoptionView.hide`).
 */
import { useIsWindowVisible, useWindowActions } from '#base/context/system';
import { CursedDragonAdoptionView } from '#base/views/cursed-dragon-adoption/CursedDragonAdoptionView';

export const CursedDragonAdoptionComponent = () => {
    const isVisible = useIsWindowVisible('cursed_dragon_adoption');
    const { hideWindow } = useWindowActions();

    if (!isVisible) return null;

    return <CursedDragonAdoptionView onClose={() => hideWindow('cursed_dragon_adoption')} />;
};
