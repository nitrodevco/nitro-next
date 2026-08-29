import { BoxLayout, Icon } from '#base/theme';

/** Row template `icon_habboclub` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutIconHabboclubItemProps {
    layout?: BoxLayout;
}

export const RentablespaceLayoutIconHabboclubItem = ({ layout }: RentablespaceLayoutIconHabboclubItemProps) => {
    return (
        <Icon
            variant="15"
            name="icon_habboclub"
            layout={{ width: 37, height: 40, flexShrink: 0, ...layout }}
        />
    );
};
