import { BoxLayout, ContainerButton, Region, ThemeImage } from '#base/theme';

/** Row template `sign_11` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign11ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
    srcSignIconHeart?: string;
    tintSignIconHeart?: string;
    visibleButton?: boolean;
    visibleSignIconHeart?: boolean;
}

export const OwnAvatarMenuLayoutSign11Item = ({ layout, onButton, srcSignIconHeart, tintSignIconHeart, visibleButton, visibleSignIconHeart }: OwnAvatarMenuLayoutSign11ItemProps) => {
    return (
        <Region
            name="sign_11"
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
                    {(visibleSignIconHeart ?? true) && (
                        <ThemeImage
                            name="sign_icon_heart"
                            src={srcSignIconHeart}
                            tint={tintSignIconHeart}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                    )}
                </ContainerButton>
            )}
        </Region>
    );
};
