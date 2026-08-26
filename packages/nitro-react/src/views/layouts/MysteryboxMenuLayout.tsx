import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1068_mysterybox_menu_xml` (layout "mysterybox_menu", 115x86) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MysteryboxMenuLayoutProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const MysteryboxMenuLayout = ({ layout, onButton }: MysteryboxMenuLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 115, height: 86, ...layout }}>
            <Bubble
                variant="0"
                params={1048865}
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, top: 27, height: 86 }}
            >
                <Region
                    name="border"
                    params={12582928}
                    layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 76 }}
                >
                    <Region
                        params={17}
                        layout={{ position: 'absolute', left: 0, width: 107, top: 7, height: 16 }}
                    >
                        <Region
                            params={208}
                            layout={{ position: 'absolute', left: 0, width: 135, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('mysterybox.context.title')}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        params={144}
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 2, width: 103, top: 27, height: 1 }}
                    />
                    <Region
                        name="buttons"
                        params={8519888}
                        layout={{ position: 'absolute', left: 2, width: 103, top: 28, height: 26, flexDirection: 'column', gap: 1 }}
                    >
                        <Region
                            name="use"
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
                                        text={t('mysterybox.context.other.use')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                    </Region>
                    <Region
                        name="minimize"
                        params={1041}
                        layout={{ position: 'absolute', left: 4, width: 100, top: 55, height: 18 }}
                    >
                        <Icon
                            variant="7"
                            name="icon"
                            params={16}
                            layout={{ position: 'absolute', left: 45, width: 13, top: 7, height: 10 }}
                        />
                    </Region>
                </Region>
            </Bubble>
        </Region>
    );
};
