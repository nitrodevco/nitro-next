import { BoxLayout, ContainerButton, Region, ThemeImage } from '#base/theme';

/** Row template `sign_16` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign16ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
    srcSignIcon16?: string;
    tintSignIcon16?: string;
    visibleButton?: boolean;
    visibleSignIcon16?: boolean;
}

export const OwnAvatarMenuLayoutSign16Item = ({ layout, onButton, srcSignIcon16, tintSignIcon16, visibleButton, visibleSignIcon16 }: OwnAvatarMenuLayoutSign16ItemProps) => {
    return (
        <Region
            name="sign_16"
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
                    {(visibleSignIcon16 ?? true) && (
                        <ThemeImage
                            name="sign_icon_16"
                            src={srcSignIcon16}
                            tint={tintSignIcon16}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                    )}
                </ContainerButton>
            )}
        </Region>
    );
};
