import { TemplateBindings, TemplateWindow } from '#base/theme';

import { useButtonMenu, useMinimizedMenu } from '../object-menu/useButtonMenu';

/** The `use_product_menu` row each product mode shows (`UseProductView.updateButtons`). */
export type UseProductMenuRow
    = | 'use_product'
        | 'use_product_shampoo'
        | 'use_product_custom_part'
        | 'use_product_custom_part_shampoo'
        | 'use_product_saddle'
        | 'replace_product_saddle'
        | 'revive_monsterplant'
        | 'rebreed_monsterplant'
        | 'fertilize_monsterplant';

export interface UseProductMenuViewProps {
    /** The pet this bubble floats over. */
    name: string;
    row: UseProductMenuRow;
    onUse: () => void;
}

/**
 * The bubble offering a product to one pet - `UseProductView`, drawn from its `use_product_menu`
 * template: the pet's name in `profile_link`, the black rule and the one row of `buttons` the
 * product's mode names. Minimizing collapses it to `minimized_menu`, as the avatar menus do.
 */
export const UseProductMenuView = ({ name, row, onUse }: UseProductMenuViewProps) => {
    const { showButton } = useButtonMenu();
    const { minimizedView, bindings: minimizeBindings } = useMinimizedMenu();

    if (minimizedView) return minimizedView;

    const bindings: TemplateBindings = {
        ...minimizeBindings,
        name: { caption: name, setCaptionAfterBuild: true },
        buttons: { show: [ row ] },
    };

    showButton(bindings, row, onUse);

    return (
        <TemplateWindow
            id="habbo-room-ui-com/use_product_menu"
            bindings={bindings}
        />
    );
};
