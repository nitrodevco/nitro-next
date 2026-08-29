import { Border, BoxLayout } from '#base/theme';

/** Row template `divider` of SanctionInfoLayout - pass real rows through its `items…` slot. */
export interface SanctionInfoLayoutDividerItemProps {
    layout?: BoxLayout;
}

export const SanctionInfoLayoutDividerItem = ({ layout }: SanctionInfoLayoutDividerItemProps) => {
    return (
        <Border
            variant="3"
            name="divider"
            tintColor="#000000"
            layout={{ width: 404, height: 1, flexShrink: 0, ...layout }}
        />
    );
};
