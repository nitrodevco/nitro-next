import { BoxLayout, ContainerButton, Region, ThemeImage } from '#base/theme';

/** Row template `sign_15` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSign15ItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
    srcSignIcon15?: string;
    tintSignIcon15?: string;
    visibleButton?: boolean;
    visibleSignIcon15?: boolean;
}

export const OwnAvatarMenuLayoutSign15Item = ({ layout, onButton, srcSignIcon15, tintSignIcon15, visibleButton, visibleSignIcon15 }: OwnAvatarMenuLayoutSign15ItemProps) => {
    return (
        <Region
            name="sign_15"
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
                    {(visibleSignIcon15 ?? true) && (
                        <ThemeImage
                            name="sign_icon_15"
                            src={srcSignIcon15}
                            tint={tintSignIcon15}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                    )}
                </ContainerButton>
            )}
        </Region>
    );
};
