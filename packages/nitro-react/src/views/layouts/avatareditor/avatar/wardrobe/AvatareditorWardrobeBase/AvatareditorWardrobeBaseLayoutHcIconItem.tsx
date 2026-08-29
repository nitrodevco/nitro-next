import { BoxLayout, Icon } from '#base/theme';

/** Row template `hc_icon` of AvatareditorWardrobeBaseLayout - pass real rows through its `items…` slot. */
export interface AvatareditorWardrobeBaseLayoutHcIconItemProps {
    layout?: BoxLayout;
}

export const AvatareditorWardrobeBaseLayoutHcIconItem = ({ layout }: AvatareditorWardrobeBaseLayoutHcIconItemProps) => {
    return (
        <Icon
            variant="13"
            name="hc_icon"
            layout={{ width: 18, height: 15, flexShrink: 0, ...layout }}
        />
    );
};
