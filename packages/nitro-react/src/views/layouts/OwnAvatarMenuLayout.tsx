import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, ContainerButton, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `958_own_avatar_menu_xml` (layout "context_menu_widget", 115x887) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface OwnAvatarMenuLayoutProps {
    layout?: BoxLayout;
    onButton?: () => void;
    onButton10?: () => void;
    onButton11?: () => void;
    onButton12?: () => void;
    onButton13?: () => void;
    onButton14?: () => void;
    onButton15?: () => void;
    onButton16?: () => void;
    onButton17?: () => void;
    onButton18?: () => void;
    onButton19?: () => void;
    onButton2?: () => void;
    onButton20?: () => void;
    onButton21?: () => void;
    onButton22?: () => void;
    onButton23?: () => void;
    onButton24?: () => void;
    onButton25?: () => void;
    onButton26?: () => void;
    onButton27?: () => void;
    onButton28?: () => void;
    onButton29?: () => void;
    onButton3?: () => void;
    onButton30?: () => void;
    onButton31?: () => void;
    onButton32?: () => void;
    onButton33?: () => void;
    onButton34?: () => void;
    onButton35?: () => void;
    onButton36?: () => void;
    onButton37?: () => void;
    onButton38?: () => void;
    onButton39?: () => void;
    onButton4?: () => void;
    onButton40?: () => void;
    onButton41?: () => void;
    onButton42?: () => void;
    onButton43?: () => void;
    onButton5?: () => void;
    onButton6?: () => void;
    onButton7?: () => void;
    onButton8?: () => void;
    onButton9?: () => void;
}

export const OwnAvatarMenuLayout = ({ layout, onButton, onButton10, onButton11, onButton12, onButton13, onButton14, onButton15, onButton16, onButton17, onButton18, onButton19, onButton2, onButton20, onButton21, onButton22, onButton23, onButton24, onButton25, onButton26, onButton27, onButton28, onButton29, onButton3, onButton30, onButton31, onButton32, onButton33, onButton34, onButton35, onButton36, onButton37, onButton38, onButton39, onButton4, onButton40, onButton41, onButton42, onButton43, onButton5, onButton6, onButton7, onButton8, onButton9 }: OwnAvatarMenuLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 115, height: 887, ...layout }}>
            <Bubble
                variant="0"
                params={1048865}
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 20, width: 115, top: 0, height: 887 }}
            >
                <Region
                    name="border"
                    params={12582928}
                    layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 877 }}
                >
                    <Region
                        name="profile_link"
                        params={17}
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
                        layout={{ position: 'absolute', left: 1, width: 105, top: 28, height: 827, flexDirection: 'column', gap: 1 }}
                    >
                        <Region
                            name="change_name"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('widget.avatar.change_name')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="decorate"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton2}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('widget.avatar.decorate')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="change_looks"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton3}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('widget.memenu.myclothes')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="sit"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton4}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('widget.memenu.sit')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="stand"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton5}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('widget.memenu.stand')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="wave"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton6}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('widget.memenu.wave')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="blow"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton7}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('widget.memenu.blow')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                                <Icon
                                    variant="14"
                                    name="icon_vip"
                                    params={80}
                                    layout={{ position: 'absolute', left: 88, width: 15, top: 10, height: 15 }}
                                />
                            </ContainerButton>
                        </Region>
                        <Region
                            name="67"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton8}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('widget.memenu.expression_67')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                                <Icon
                                    variant="14"
                                    name="icon_vip"
                                    params={80}
                                    layout={{ position: 'absolute', left: 88, width: 15, top: 10, height: 15 }}
                                />
                            </ContainerButton>
                        </Region>
                        <Region
                            name="jump"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton9}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('widget.memenu.jump')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                                <Icon
                                    variant="14"
                                    name="icon_vip"
                                    params={80}
                                    layout={{ position: 'absolute', left: 88, width: 15, top: 10, height: 15 }}
                                />
                            </ContainerButton>
                        </Region>
                        <Region
                            name="laugh"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton10}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('widget.memenu.laugh')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                                <Icon
                                    variant="14"
                                    name="icon_vip"
                                    params={80}
                                    layout={{ position: 'absolute', left: 88, width: 15, top: 10, height: 15 }}
                                />
                            </ContainerButton>
                        </Region>
                        <Region
                            name="idle"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton11}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('widget.memenu.idle')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="expressions"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton12}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.link.expressions')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                                <Icon
                                    variant="5"
                                    name="icon"
                                    tags={[ 'arrow_right' ]}
                                    params={16}
                                    layout={{ position: 'absolute', left: 92, width: 5, top: 12, height: 10 }}
                                />
                            </ContainerButton>
                        </Region>
                        <Region
                            name="dance_menu"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton13}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('widget.memenu.dance')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                                <Icon
                                    variant="5"
                                    name="icon"
                                    tags={[ 'arrow_right' ]}
                                    params={16}
                                    layout={{ position: 'absolute', left: 92, width: 5, top: 12, height: 10 }}
                                />
                            </ContainerButton>
                        </Region>
                        <Region
                            name="dance"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton14}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('widget.memenu.dance')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="dance_stop"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton15}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('widget.memenu.dance.stop')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="dance_1"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton16}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('widget.memenu.dance1')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="dance_2"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton17}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('widget.memenu.dance2')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="dance_3"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton18}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('widget.memenu.dance3')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="dance_4"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton19}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('widget.memenu.dance4')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="signs_grid"
                            tags={[ 'grid' ]}
                            params={144}
                            layout={{ width: 103, height: 152, flexShrink: 0, flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}
                        >
                            <Region
                                name="sign_1"
                                params={16}
                                layout={{ width: 34, height: 25, flexShrink: 0 }}
                            >
                                <ContainerButton
                                    variant="0"
                                    name="button"
                                    params={17}
                                    tintColor="#2d2a27"
                                    onPointerTap={onButton20}
                                    layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
                                >
                                    <Region
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 39, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text="1"
                                            textStyle="text-style-u-bold"
                                            textOptions={{ fill: '#ffffff', align: 'center' }}
                                        />
                                    </Region>
                                </ContainerButton>
                            </Region>
                            <Region
                                name="sign_2"
                                params={16}
                                layout={{ width: 33, height: 25, flexShrink: 0 }}
                            >
                                <ContainerButton
                                    variant="0"
                                    name="button"
                                    params={17}
                                    tintColor="#2d2a27"
                                    onPointerTap={onButton21}
                                    layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
                                >
                                    <Region
                                        params={2192}
                                        layout={{ position: 'absolute', left: 0, width: 39, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text="2"
                                            textStyle="text-style-u-bold"
                                            textOptions={{ fill: '#ffffff', align: 'center' }}
                                        />
                                    </Region>
                                </ContainerButton>
                            </Region>
                            <Region
                                name="sign_3"
                                params={16}
                                layout={{ width: 33, height: 25, flexShrink: 0 }}
                            >
                                <ContainerButton
                                    variant="0"
                                    name="button"
                                    params={17}
                                    tintColor="#2d2a27"
                                    onPointerTap={onButton22}
                                    layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
                                >
                                    <Region
                                        params={2192}
                                        layout={{ position: 'absolute', left: 0, width: 39, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text="3"
                                            textStyle="text-style-u-bold"
                                            textOptions={{ fill: '#ffffff', align: 'center' }}
                                        />
                                    </Region>
                                </ContainerButton>
                            </Region>
                            <Region
                                name="sign_4"
                                params={16}
                                layout={{ width: 33, height: 25, flexShrink: 0 }}
                            >
                                <ContainerButton
                                    variant="0"
                                    name="button"
                                    params={17}
                                    tintColor="#2d2a27"
                                    onPointerTap={onButton23}
                                    layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
                                >
                                    <Region
                                        params={2192}
                                        layout={{ position: 'absolute', left: 0, width: 39, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text="4"
                                            textStyle="text-style-u-bold"
                                            textOptions={{ fill: '#ffffff', align: 'center' }}
                                        />
                                    </Region>
                                </ContainerButton>
                            </Region>
                            <Region
                                name="sign_5"
                                params={16}
                                layout={{ width: 33, height: 25, flexShrink: 0 }}
                            >
                                <ContainerButton
                                    variant="0"
                                    name="button"
                                    params={17}
                                    tintColor="#2d2a27"
                                    onPointerTap={onButton24}
                                    layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
                                >
                                    <Region
                                        params={2192}
                                        layout={{ position: 'absolute', left: 0, width: 39, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text="5"
                                            textStyle="text-style-u-bold"
                                            textOptions={{ fill: '#ffffff', align: 'center' }}
                                        />
                                    </Region>
                                </ContainerButton>
                            </Region>
                            <Region
                                name="sign_6"
                                params={16}
                                layout={{ width: 33, height: 25, flexShrink: 0 }}
                            >
                                <ContainerButton
                                    variant="0"
                                    name="button"
                                    params={17}
                                    tintColor="#2d2a27"
                                    onPointerTap={onButton25}
                                    layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
                                >
                                    <Region
                                        params={2192}
                                        layout={{ position: 'absolute', left: 0, width: 39, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text="6"
                                            textStyle="text-style-u-bold"
                                            textOptions={{ fill: '#ffffff', align: 'center' }}
                                        />
                                    </Region>
                                </ContainerButton>
                            </Region>
                            <Region
                                name="sign_7"
                                params={16}
                                layout={{ width: 33, height: 25, flexShrink: 0 }}
                            >
                                <ContainerButton
                                    variant="0"
                                    name="button"
                                    params={17}
                                    tintColor="#2d2a27"
                                    onPointerTap={onButton26}
                                    layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
                                >
                                    <Region
                                        params={2192}
                                        layout={{ position: 'absolute', left: 0, width: 39, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text="7"
                                            textStyle="text-style-u-bold"
                                            textOptions={{ fill: '#ffffff', align: 'center' }}
                                        />
                                    </Region>
                                </ContainerButton>
                            </Region>
                            <Region
                                name="sign_8"
                                params={16}
                                layout={{ width: 33, height: 25, flexShrink: 0 }}
                            >
                                <ContainerButton
                                    variant="0"
                                    name="button"
                                    params={17}
                                    tintColor="#2d2a27"
                                    onPointerTap={onButton27}
                                    layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
                                >
                                    <Region
                                        params={2192}
                                        layout={{ position: 'absolute', left: 0, width: 39, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text="8"
                                            textStyle="text-style-u-bold"
                                            textOptions={{ fill: '#ffffff', align: 'center' }}
                                        />
                                    </Region>
                                </ContainerButton>
                            </Region>
                            <Region
                                name="sign_9"
                                params={16}
                                layout={{ width: 33, height: 25, flexShrink: 0 }}
                            >
                                <ContainerButton
                                    variant="0"
                                    name="button"
                                    params={17}
                                    tintColor="#2d2a27"
                                    onPointerTap={onButton28}
                                    layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
                                >
                                    <Region
                                        params={2192}
                                        layout={{ position: 'absolute', left: 0, width: 39, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text="9"
                                            textStyle="text-style-u-bold"
                                            textOptions={{ fill: '#ffffff', align: 'center' }}
                                        />
                                    </Region>
                                </ContainerButton>
                            </Region>
                            <Region
                                name="sign_10"
                                params={16}
                                layout={{ width: 33, height: 25, flexShrink: 0 }}
                            >
                                <ContainerButton
                                    variant="0"
                                    name="button"
                                    params={17}
                                    tintColor="#2d2a27"
                                    onPointerTap={onButton29}
                                    layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
                                >
                                    <Region
                                        params={2192}
                                        layout={{ position: 'absolute', left: 0, width: 39, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text="10"
                                            textStyle="text-style-u-bold"
                                            textOptions={{ fill: '#ffffff', align: 'center' }}
                                        />
                                    </Region>
                                </ContainerButton>
                            </Region>
                            <Region
                                name="sign_11"
                                params={16}
                                layout={{ width: 33, height: 25, flexShrink: 0 }}
                            >
                                <ContainerButton
                                    variant="0"
                                    name="button"
                                    params={17}
                                    tintColor="#2d2a27"
                                    onPointerTap={onButton30}
                                    layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
                                >
                                    <ThemeImage
                                        name="sign_icon_heart"
                                        tags={[ 'icon' ]}
                                        params={2192}
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 29 }}
                                    />
                                </ContainerButton>
                            </Region>
                            <Region
                                name="sign_12"
                                params={16}
                                layout={{ width: 33, height: 25, flexShrink: 0 }}
                            >
                                <ContainerButton
                                    variant="0"
                                    name="button"
                                    params={17}
                                    tintColor="#2d2a27"
                                    onPointerTap={onButton31}
                                    layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
                                >
                                    <ThemeImage
                                        name="sign_icon_skull"
                                        tags={[ 'icon' ]}
                                        params={2192}
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 29 }}
                                    />
                                </ContainerButton>
                            </Region>
                            <Region
                                name="sign_0"
                                params={16}
                                layout={{ width: 33, height: 25, flexShrink: 0 }}
                            >
                                <ContainerButton
                                    variant="0"
                                    name="button"
                                    params={17}
                                    tintColor="#2d2a27"
                                    onPointerTap={onButton32}
                                    layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
                                >
                                    <Region
                                        params={2192}
                                        layout={{ position: 'absolute', left: 0, width: 39, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text="0"
                                            textStyle="text-style-u-bold"
                                            textOptions={{ fill: '#ffffff', align: 'center' }}
                                        />
                                    </Region>
                                </ContainerButton>
                            </Region>
                            <Region
                                name="sign_13"
                                params={16}
                                layout={{ width: 33, height: 25, flexShrink: 0 }}
                            >
                                <ContainerButton
                                    variant="0"
                                    name="button"
                                    params={17}
                                    tintColor="#2d2a27"
                                    onPointerTap={onButton33}
                                    layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
                                >
                                    <ThemeImage
                                        name="sign_icon_13"
                                        tags={[ 'icon' ]}
                                        params={2192}
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 29 }}
                                    />
                                </ContainerButton>
                            </Region>
                            <Region
                                name="sign_15"
                                params={16}
                                layout={{ width: 33, height: 25, flexShrink: 0 }}
                            >
                                <ContainerButton
                                    variant="0"
                                    name="button"
                                    params={17}
                                    tintColor="#2d2a27"
                                    onPointerTap={onButton34}
                                    layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
                                >
                                    <ThemeImage
                                        name="sign_icon_15"
                                        tags={[ 'icon' ]}
                                        params={2192}
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 29 }}
                                    />
                                </ContainerButton>
                            </Region>
                            <Region
                                name="sign_14"
                                params={16}
                                layout={{ width: 33, height: 25, flexShrink: 0 }}
                            >
                                <ContainerButton
                                    variant="0"
                                    name="button"
                                    params={17}
                                    tintColor="#2d2a27"
                                    onPointerTap={onButton35}
                                    layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
                                >
                                    <ThemeImage
                                        name="sign_icon_14"
                                        tags={[ 'icon' ]}
                                        params={2192}
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 29 }}
                                    />
                                </ContainerButton>
                            </Region>
                            <Region
                                name="sign_17"
                                params={16}
                                layout={{ width: 33, height: 25, flexShrink: 0 }}
                            >
                                <ContainerButton
                                    variant="0"
                                    name="button"
                                    params={17}
                                    tintColor="#2d2a27"
                                    onPointerTap={onButton36}
                                    layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
                                >
                                    <ThemeImage
                                        name="sign_icon_17"
                                        tags={[ 'icon' ]}
                                        params={2192}
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 29 }}
                                    />
                                </ContainerButton>
                            </Region>
                            <Region
                                name="sign_16"
                                params={16}
                                layout={{ width: 33, height: 25, flexShrink: 0 }}
                            >
                                <ContainerButton
                                    variant="0"
                                    name="button"
                                    params={17}
                                    tintColor="#2d2a27"
                                    onPointerTap={onButton37}
                                    layout={{ position: 'absolute', left: -3, width: 39, top: -3, height: 29 }}
                                >
                                    <ThemeImage
                                        name="sign_icon_16"
                                        tags={[ 'icon' ]}
                                        params={2192}
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 0, width: 39, top: 0, height: 29 }}
                                    />
                                </ContainerButton>
                            </Region>
                        </Region>
                        <Region
                            name="signs"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton38}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.show.signs')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                                <Icon
                                    variant="5"
                                    name="icon"
                                    tags={[ 'arrow_right' ]}
                                    params={16}
                                    layout={{ position: 'absolute', left: 92, width: 5, top: 12, height: 10 }}
                                />
                            </ContainerButton>
                        </Region>
                        <Region
                            name="back"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton39}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('generic.back')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                                <Icon
                                    variant="4"
                                    name="icon"
                                    tags={[ 'arrow_left' ]}
                                    params={16}
                                    layout={{ position: 'absolute', left: 10, width: 5, top: 12, height: 10 }}
                                />
                            </ContainerButton>
                        </Region>
                        <Region
                            name="handitem"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton40}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('avatar.widget.drop_hand_item')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="effects"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton41}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('widget.memenu.effects')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="more"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton42}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.link.more')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                                <Icon
                                    variant="5"
                                    name="icon"
                                    tags={[ 'arrow_right' ]}
                                    params={16}
                                    layout={{ position: 'absolute', left: 92, width: 5, top: 12, height: 10 }}
                                />
                            </ContainerButton>
                        </Region>
                        <Region
                            name="wired_inspect"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 103, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton43}
                                layout={{ position: 'absolute', left: -3, width: 109, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 103, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.wired_inspect')}
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
                        layout={{ position: 'absolute', left: 4, width: 100, top: 855, height: 18 }}
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
