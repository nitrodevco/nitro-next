import { BoxLayout, ContainerButton, Region, ThemeImage } from '#base/theme';

/** Row template `sign_13` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign13ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
    srcSignIcon13?: string;
    tintSignIcon13?: string;
    visibleButton?: boolean;
    visibleSignIcon13?: boolean;
}

export const OwnAvatarMenuLayoutSign13Item = ({ layout, onButton, srcSignIcon13, tintSignIcon13, visibleButton, visibleSignIcon13 }: OwnAvatarMenuLayoutSign13ItemProps) => {
    return (
        <Region
            name="sign_13"
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
                    {(visibleSignIcon13 ?? true) && (
                        <ThemeImage
                            name="sign_icon_13"
                            src={srcSignIcon13}
                            tint={tintSignIcon13}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                    )}
                </ContainerButton>
            )}
        </Region>
    );
};
