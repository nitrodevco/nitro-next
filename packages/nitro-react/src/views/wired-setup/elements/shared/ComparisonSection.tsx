/**
 * The `comparison_selection` section several boxes build the same way in their `buildInputs`
 * (`TeamHasScore`, `ClockTimeMatches`, `FurniHasAltitude`, `LevelMatches`, `§_-je§`, `VariableAge`,
 * `selectors/FurniWithAltitude`): a radio of `comparison.<id>` - less than, equal, greater than -
 * one per row (`RadioButtonParam(0, l("comparison.0"))` ... `(2, l("comparison.2"))`).
 * `VariableAge` offers only two of the three, in two columns, through `ids` and `columns`.
 */
import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

/** Less than, equal, greater than. */
const COMPARISON_IDS: readonly number[] = [ 0, 1, 2 ];

export interface ComparisonSectionProps {
    selected: number;
    onSelect: (comparison: number) => void;
    /** The radio's ids, `comparison.<id>` each. Default 0, 1 and 2. */
    ids?: readonly number[];
    /** The radio's column count (`createRadioGroup(..., null, columns)`). Default 1. */
    columns?: number;
}

export const ComparisonSection = ({ selected, onSelect, ids = COMPARISON_IDS, columns = 1 }: ComparisonSectionProps) => (
    <WiredSection title="${wiredfurni.params.comparison_selection}">
        <WiredRadioGroup
            options={ids.map(id => ({ id, label: `\${wiredfurni.params.comparison.${id}}` }))}
            selected={selected}
            onSelect={onSelect}
            columns={columns}
        />
    </WiredSection>
);
