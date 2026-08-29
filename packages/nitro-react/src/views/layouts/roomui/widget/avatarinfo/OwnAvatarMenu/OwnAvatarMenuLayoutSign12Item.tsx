import { BoxLayout, ContainerButton, Region, ThemeImage } from '#base/theme';

/** Row template `sign_12` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign12ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
    srcSignIconSkull?: string;
    tintSignIconSkull?: string;
    visibleButton?: boolean;
    visibleSignIconSkull?: boolean;
}

export const OwnAvatarMenuLayoutSign12Item = ({ layout, onButton, srcSignIconSkull, tintSignIconSkull, visibleButton, visibleSignIconSkull }: OwnAvatarMenuLayoutSign12ItemProps) => {
    return (
        <Region
            name="sign_12"
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
                    {(visibleSignIconSkull ?? true) && (
                        <ThemeImage
                            name="sign_icon_skull"
                            src={srcSignIconSkull}
                            tint={tintSignIconSkull}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                    )}
                </ContainerButton>
            )}
        </Region>
    );
};
