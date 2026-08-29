import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `bobba_randomusername` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutBobbaRandomusernameItemProps {
    captionBobbaRandomusername?: string;
    layout?: BoxLayout;
    onBobbaRandomusername?: () => void;
}

export const UserViewLayoutBobbaRandomusernameItem = ({ captionBobbaRandomusername, layout, onBobbaRandomusername }: UserViewLayoutBobbaRandomusernameItemProps) => {
    return (
        <Region
            name="bobba_randomusername"
            layout={{ width: 48, height: 13, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            onPointerTap={onBobbaRandomusername}
            cursor="pointer"
        >
            <ThemeText
                text={captionBobbaRandomusername ?? 'user PH'}
                textStyle="text-style-bold"
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};
