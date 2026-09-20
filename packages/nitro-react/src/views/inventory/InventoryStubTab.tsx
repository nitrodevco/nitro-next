import { Border, Dropmenu } from '#base/theme';

/**
 * Shared shape behind theme/InventoryPetsView.tsx, InventoryBotsView.tsx and
 * InventoryBadgesView.tsx - all three DOM sources are byte-identical stubs (an empty bordered
 * search box + a bare Dropmenu, no data, no search behavior). Ported at that same stub fidelity
 * as one shared component rather than three copies. DOM's `<input type="text">` here carries no
 * keyboard-typing behavior, so it's rendered as an empty bordered box rather than inventing search
 * functionality DOM lacks. The input has no explicit DOM sizing at all - a bare,
 * un-styled `<input>` collapses to the browser's own default input width, which Pixi has no
 * equivalent default for, so the inner Border here is left unsized rather than guessing a
 * pixel width DOM's own source never specified.
 */
export const InventoryStubTab = () => (
    <Border
        tintColor="#CACACA"
        layout={{ flexDirection: 'row', gap: 6, padding: 4 }}
    >
        <Border layout={{}} />
        <Dropmenu />
    </Border>
);
