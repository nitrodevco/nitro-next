import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1029_use_product_menu_xml` (layout "context_menu_widget", 115x302) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductMenuLayoutProps {
    layout?: BoxLayout;
    onButton?: () => void;
    onButton2?: () => void;
    onButton3?: () => void;
    onButton4?: () => void;
    onButton5?: () => void;
    onButton6?: () => void;
    onButton7?: () => void;
    onButton8?: () => void;
    onButton9?: () => void;
}

export const UseProductMenuLayout = ({ layout, onButton, onButton2, onButton3, onButton4, onButton5, onButton6, onButton7, onButton8, onButton9 }: UseProductMenuLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 115, height: 302, ...layout }}>
            <Bubble
                variant="0"
                params={1048865}
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, top: 9, height: 302 }}
            >
                <Region
                    name="border"
                    params={12582928}
                    layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 292 }}
                >
                    <Region
                        name="profile_link"
                        params={1}
                        layout={{ position: 'absolute', left: 0, width: 107, top: 7, height: 16 }}
                    >
                        <Region
                            name="name"
                            params={208}
                            layout={{ position: 'absolute', left: 13, width: 80, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="my_name_here"
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
                        layout={{ position: 'absolute', left: 1, width: 104, top: 28, height: 242, flexDirection: 'column', gap: 1 }}
                    >
                        <Region
                            name="use_product"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 102, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton}
                                layout={{ position: 'absolute', left: -3, width: 108, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 102, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.useproduct')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="use_product_shampoo"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 102, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton2}
                                layout={{ position: 'absolute', left: -3, width: 108, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 102, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.useproduct_shampoo')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="use_product_custom_part"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 102, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton3}
                                layout={{ position: 'absolute', left: -3, width: 108, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 102, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.useproduct_custom_part')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="use_product_custom_part_shampoo"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 102, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton4}
                                layout={{ position: 'absolute', left: -3, width: 108, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 102, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.useproduct_custom_part_shampoo')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="use_product_saddle"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 102, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton5}
                                layout={{ position: 'absolute', left: -3, width: 108, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 102, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.useproduct_saddle')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="replace_product_saddle"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 102, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton6}
                                layout={{ position: 'absolute', left: -3, width: 108, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 102, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.replaceproduct_saddle')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="revive_monsterplant"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 102, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton7}
                                layout={{ position: 'absolute', left: -3, width: 108, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 102, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.revive_monsterplant')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="rebreed_monsterplant"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 102, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton8}
                                layout={{ position: 'absolute', left: -3, width: 108, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 102, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.rebreed_monsterplant')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="fertilize_monsterplant"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 102, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton9}
                                layout={{ position: 'absolute', left: -3, width: 108, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 102, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.fertilize_monsterplant')}
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
                        layout={{ position: 'absolute', left: 2, width: 100, top: 271, height: 18 }}
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
