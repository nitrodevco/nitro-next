/**
 * The operator radios several wired boxes build, which Flash writes out inline in each class that
 * uses one:
 *
 * - the six-way comparison, `createRadioGroup([ RadioButtonParam(2, ">"), (5, "≥"), (1, "="),
 *   (3, "≤"), (0, "<"), (4, "≠") ], null, 6)`, of the variable value condition (`§_-d1W§`),
 *   `ChestHasAmount` and the with-variable selectors' base (`selectors/§_-U1w§`);
 * - the three-way `operator.0` to `.2` radio of `actiontypes/AdjustClock` and `SetFurniAltitude`.
 */

/** The six comparison operators, ids in the order Flash lists them: `>` 2, `≥` 5, `=` 1, `≤` 3, `<` 0, `≠` 4. */
export const WIRED_COMPARISON_OPERATORS: readonly { id: number; label: string }[] = [
    { id: 2, label: '>' },
    { id: 5, label: '≥' },
    { id: 1, label: '=' },
    { id: 3, label: '≤' },
    { id: 0, label: '<' },
    { id: 4, label: '≠' },
];

/** `RadioButtonParam(0, l("operator.0"))` ... `(2, l("operator.2"))`. */
export const WIRED_OPERATOR_OPTIONS: readonly { id: number; label: string }[] = [ 0, 1, 2 ].map(id => ({ id, label: `\${wiredfurni.params.operator.${id}}` }));
