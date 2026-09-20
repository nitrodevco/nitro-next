/**
 * `selectors/InNeighborhood.buildInputs` (`§_-6q§`, `§_-xp§`) - the `neighborhood_selection`
 * section: the floor editor, whose tool row holds add tile, remove tile (followed by a splitter),
 * set root tile and, at the right end, the size toggle (`enlarge_image` / `reduce_image`,
 * disabled while the drawing does not fit the small size - `updateResolutionButtonUI`); under it,
 * right aligned, the root tile's `x:` and `y:` inputs (-64 to 64, 20 wide).
 */
import { FLOOR_DRAW_MODE_ADD_TILE, FLOOR_DRAW_MODE_REMOVE_TILE, FLOOR_DRAW_MODE_SET_ROOT_TILE, IN_NEIGHBORHOOD_ROOT_INPUT_WIDTH, IN_NEIGHBORHOOD_ROOT_MAX, IN_NEIGHBORHOOD_ROOT_MIN, InNeighborhoodSelectorForm, isNeighborhoodSmallModeAllowed, toggleInNeighborhoodBigMode, WiredElementView } from '#base/wired';

import { WiredAlignRight } from '../../kit/WiredAlignRight';
import { WiredAssetButtonRow } from '../../kit/WiredAssetButtonRow';
import { WiredFloorDrawing } from '../../kit/WiredFloorDrawing';
import { WiredFloorEditor } from '../../kit/WiredFloorEditor';
import { WiredNamedNumberInput } from '../../kit/WiredNamedNumberInput';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';
import { useWiredStyle } from '../../kit/WiredStyleContext';

export const InNeighborhoodView: WiredElementView<InNeighborhoodSelectorForm> = ({ form, setForm }) => {
    const style = useWiredStyle();
    const smallModeAllowed = isNeighborhoodSmallModeAllowed(form.plan);

    const buttons = (
        <WiredAssetButtonRow buttons={[
            { asset: 'add', onPress: () => setForm({ mode: FLOOR_DRAW_MODE_ADD_TILE }), selected: form.mode === FLOOR_DRAW_MODE_ADD_TILE },
            { asset: 'remove', onPress: () => setForm({ mode: FLOOR_DRAW_MODE_REMOVE_TILE }), selected: form.mode === FLOOR_DRAW_MODE_REMOVE_TILE, followedBySplitter: true },
            { asset: 'reference', onPress: () => setForm({ mode: FLOOR_DRAW_MODE_SET_ROOT_TILE }), selected: form.mode === FLOOR_DRAW_MODE_SET_ROOT_TILE },
            {
                asset: form.bigMode ? 'reduce_image' : 'enlarge_image',
                onPress: () => setForm(toggleInNeighborhoodBigMode),
                alignRight: true,
                disabled: !smallModeAllowed,
            },
        ]}
        />
    );

    return (
        <WiredSection title="${wiredfurni.params.neighborhood_selection}">
            <WiredSimpleList>
                <WiredFloorEditor buttons={buttons}>
                    <WiredFloorDrawing
                        plan={form.plan}
                        smallMode={!form.bigMode}
                        rootX={form.rootX}
                        rootY={form.rootY}
                        mode={form.mode}
                        onPlanChange={plan => setForm({ plan })}
                        onRootTileChange={(rootX, rootY) => setForm({ rootX, rootY })}
                    />
                </WiredFloorEditor>
                <WiredAlignRight>
                    <WiredSimpleList
                        vertical={false}
                        spacing={style.genericHorizontalSpacing}
                        staticWidth="content"
                    >
                        <WiredNamedNumberInput
                            name="x:"
                            value={form.rootX}
                            onChange={rootX => setForm({ rootX })}
                            min={IN_NEIGHBORHOOD_ROOT_MIN}
                            max={IN_NEIGHBORHOOD_ROOT_MAX}
                            width={IN_NEIGHBORHOOD_ROOT_INPUT_WIDTH}
                        />
                        <WiredNamedNumberInput
                            name="y:"
                            value={form.rootY}
                            onChange={rootY => setForm({ rootY })}
                            min={IN_NEIGHBORHOOD_ROOT_MIN}
                            max={IN_NEIGHBORHOOD_ROOT_MAX}
                            width={IN_NEIGHBORHOOD_ROOT_INPUT_WIDTH}
                        />
                    </WiredSimpleList>
                </WiredAlignRight>
            </WiredSimpleList>
        </WiredSection>
    );
};
