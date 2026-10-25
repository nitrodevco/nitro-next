import { TemplateBindings, TemplateWindow } from '#base/theme';

import { useButtonMenu, useMinimizedMenu } from '../object-menu/useButtonMenu';

/**
 * The bubble offering to breed with one particular plant - `BreedPetView`, drawn from its
 * `habbo-room-ui-com/breed_pet_menu` template: the plant's name in `profile_link`, the black rule
 * and the one `breed` row. Minimizing collapses it to `minimized_menu`, as the avatar menus do.
 */
export interface PetBreedMenuViewProps {
    /** The partner plant this bubble floats over. */
    name: string;
    onBreed: () => void;
}

export const PetBreedMenuView = ({ name, onBreed }: PetBreedMenuViewProps) => {
    const { showButton } = useButtonMenu();
    const { minimizedView, bindings: minimizeBindings } = useMinimizedMenu();

    if (minimizedView) return minimizedView;

    const bindings: TemplateBindings = {
        ...minimizeBindings,
        name: { caption: name, setCaptionAfterBuild: true },
    };

    showButton(bindings, 'breed', onBreed);

    return (
        <TemplateWindow
            id="habbo-room-ui-com/breed_pet_menu"
            bindings={bindings}
        />
    );
};
