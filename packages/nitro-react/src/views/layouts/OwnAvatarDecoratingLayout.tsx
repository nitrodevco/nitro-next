import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, ContainerButton, Region, ThemeText } from '#base/theme';

/** Generated from `1097_own_avatar_decorating_xml` (layout "context_menu_widget", 115x49) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface OwnAvatarDecoratingLayoutProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const OwnAvatarDecoratingLayout = ({ layout, onButton }: OwnAvatarDecoratingLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 115, height: 49, ...layout }}>
            <Bubble
                variant="0"
                params={1048865}
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, top: 376, height: 49 }}
            >
                <Region
                    name="border"
                    params={12582928}
                    layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 76 }}
                >
                    <Region
                        params={144}
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 2, width: 103, top: 7, height: 1 }}
                    />
                    <Region
                        name="buttons"
                        params={8519888}
                        layout={{ position: 'absolute', left: 2, width: 103, top: 7, height: 26, flexDirection: 'column', gap: 1 }}
                    >
                        <Region
                            name="decorate"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 101, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton}
                                layout={{ position: 'absolute', left: -3, width: 107, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 101, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('widget.avatar.stop_decorating')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                    </Region>
                </Region>
            </Bubble>
        </Region>
    );
};
