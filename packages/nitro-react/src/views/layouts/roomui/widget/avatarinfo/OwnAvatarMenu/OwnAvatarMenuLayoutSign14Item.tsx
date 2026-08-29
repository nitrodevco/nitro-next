import { BoxLayout, ContainerButton, Region, ThemeImage } from '#base/theme';

/** Row template `sign_14` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign14ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
    srcSignIcon14?: string;
    tintSignIcon14?: string;
    visibleButton?: boolean;
    visibleSignIcon14?: boolean;
}

export const OwnAvatarMenuLayoutSign14Item = ({ layout, onButton, srcSignIcon14, tintSignIcon14, visibleButton, visibleSignIcon14 }: OwnAvatarMenuLayoutSign14ItemProps) => {
    return (
        <Region
            name="sign_14"
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
                    {(visibleSignIcon14 ?? true) && (
                        <ThemeImage
                            name="sign_icon_14"
                            src={srcSignIcon14}
                            tint={tintSignIcon14}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                    )}
                </ContainerButton>
            )}
        </Region>
    );
};
