import { BoxLayout, ContainerButton, Region, ThemeText } from '#base/theme';

/** Row template `sign_7` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign7ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
    visibleButton?: boolean;
}

export const OwnAvatarMenuLayoutSign7Item = ({ layout, onButton, visibleButton }: OwnAvatarMenuLayoutSign7ItemProps) => {
    return (
        <Region
            name="sign_7"
            layout={{ width: 33, height: 25, flexShrink: 0, ...layout }}
        >
            {(visibleButton ?? true) && (
                <ContainerButton
                    variant="0"
                    name="button"
                    tintColor="#2d2a27"
                    onPointerTap={onButton}
                    layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
                >
                    <ThemeText
                        text="7"
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </ContainerButton>
            )}
        </Region>
    );
};
