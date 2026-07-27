export const GridFlowType = {
    row: 'grid-flow-row',
    col: 'grid-flow-col',
    dense: 'grid-flow-dense',
    rowDense: 'grid-flow-row-dense',
    colDense: 'grid-flow-col-dense'
};

export type GridFlowType = keyof typeof GridFlowType;
