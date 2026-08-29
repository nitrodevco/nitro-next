import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `heart_randomusername` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutHeartRandomusernameItemProps {
    captionHeartRandomusername?: string;
    layout?: BoxLayout;
    onHeartRandomusername?: () => void;
}

export const UserViewLayoutHeartRandomusernameItem = ({ captionHeartRandomusername, layout, onHeartRandomusername }: UserViewLayoutHeartRandomusernameItemProps) => {
    return (
        <Region
            name="heart_randomusername"
            layout={{ width: 48, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            onPointerTap={onHeartRandomusername}
            cursor="pointer"
        >
            <ThemeText
                text={captionHeartRandomusername ?? 'user PH'}
                textStyle="text-style-bold"
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};
