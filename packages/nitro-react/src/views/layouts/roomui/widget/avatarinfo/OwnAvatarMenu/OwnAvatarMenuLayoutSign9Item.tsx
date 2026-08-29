import { BoxLayout, ContainerButton, Region, ThemeText } from '#base/theme';

/** Row template `sign_9` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign9ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
    visibleButton?: boolean;
}

export const OwnAvatarMenuLayoutSign9Item = ({ layout, onButton, visibleButton }: OwnAvatarMenuLayoutSign9ItemProps) => {
    return (
        <Region
            name="sign_9"
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
                        text="9"
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </ContainerButton>
            )}
        </Region>
    );
};
