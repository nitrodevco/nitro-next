import { BoxLayout, ContainerButton, Region, ThemeImage } from '#base/theme';

/** Row template `sign_17` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign17ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
    srcSignIcon17?: string;
    tintSignIcon17?: string;
    visibleButton?: boolean;
    visibleSignIcon17?: boolean;
}

export const OwnAvatarMenuLayoutSign17Item = ({ layout, onButton, srcSignIcon17, tintSignIcon17, visibleButton, visibleSignIcon17 }: OwnAvatarMenuLayoutSign17ItemProps) => {
    return (
        <Region
            name="sign_17"
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
                    {(visibleSignIcon17 ?? true) && (
                        <ThemeImage
                            name="sign_icon_17"
                            src={srcSignIcon17}
                            tint={tintSignIcon17}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                    )}
                </ContainerButton>
            )}
        </Region>
    );
};
