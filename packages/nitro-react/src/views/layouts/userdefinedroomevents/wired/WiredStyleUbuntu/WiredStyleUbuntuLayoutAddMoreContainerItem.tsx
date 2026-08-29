import { BoxLayout, ContainerButton, Region } from '#base/theme';

/** Row template `add_more_container` of WiredStyleUbuntuLayout - pass real rows through its `items…` slot. */
export interface WiredStyleUbuntuLayoutAddMoreContainerItemProps {
    layout?: BoxLayout;
    onAddMore?: () => void;
    visibleAddMore?: boolean;
}

export const WiredStyleUbuntuLayoutAddMoreContainerItem = ({ layout, onAddMore, visibleAddMore }: WiredStyleUbuntuLayoutAddMoreContainerItemProps) => {
    return (
        <Region
            name="add_more_container"
            layout={{ width: 26, height: 42, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            {(visibleAddMore ?? true) && (
                <ContainerButton
                    variant="3"
                    name="add_more"
                    onPointerTap={onAddMore}
                    layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 23, alignSelf: 'center', height: 22 }}
                />
            )}
        </Region>
    );
};
