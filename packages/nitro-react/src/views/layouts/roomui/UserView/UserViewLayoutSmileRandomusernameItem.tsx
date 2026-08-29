import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `smile_randomusername` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutSmileRandomusernameItemProps {
    captionSmileRandomusername?: string;
    layout?: BoxLayout;
    onSmileRandomusername?: () => void;
}

export const UserViewLayoutSmileRandomusernameItem = ({ captionSmileRandomusername, layout, onSmileRandomusername }: UserViewLayoutSmileRandomusernameItemProps) => {
    return (
        <Region
            name="smile_randomusername"
            layout={{ width: 48, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            onPointerTap={onSmileRandomusername}
            cursor="pointer"
        >
            <ThemeText
                text={captionSmileRandomusername ?? 'user PH'}
                textStyle="text-style-bold"
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};
