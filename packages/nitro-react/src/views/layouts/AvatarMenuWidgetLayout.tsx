import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, ContainerButton, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1062_avatar_menu_widget_xml` (layout "avatar_menu_widget", 151x1462) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarMenuWidgetLayoutProps {
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
    onButton44?: () => void;
    onButton45?: () => void;
    onButton46?: () => void;
    onButton47?: () => void;
    onButton48?: () => void;
    onButton49?: () => void;
    onButton5?: () => void;
    onButton50?: () => void;
    onButton51?: () => void;
    onButton52?: () => void;
    onButton53?: () => void;
    onButton54?: () => void;
    onButton55?: () => void;
    onButton56?: () => void;
    onButton6?: () => void;
    onButton7?: () => void;
    onButton8?: () => void;
    onButton9?: () => void;
}

export const AvatarMenuWidgetLayout = ({ layout, onButton, onButton10, onButton11, onButton12, onButton13, onButton14, onButton15, onButton16, onButton17, onButton18, onButton19, onButton2, onButton20, onButton21, onButton22, onButton23, onButton24, onButton25, onButton26, onButton27, onButton28, onButton29, onButton3, onButton30, onButton31, onButton32, onButton33, onButton34, onButton35, onButton36, onButton37, onButton38, onButton39, onButton4, onButton40, onButton41, onButton42, onButton43, onButton44, onButton45, onButton46, onButton47, onButton48, onButton49, onButton5, onButton50, onButton51, onButton52, onButton53, onButton54, onButton55, onButton56, onButton6, onButton7, onButton8, onButton9 }: AvatarMenuWidgetLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 151, height: 1462, ...layout }}>
            <Bubble
                variant="0"
                params={1048865}
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 151, top: -530, height: 1462 }}
            >
                <Region
                    name="border"
                    params={12583056}
                    layout={{ position: 'absolute', left: 0, width: 143, top: 0, height: 1458 }}
                >
                    <Region
                        name="profile_link"
                        params={145}
                        layout={{ position: 'absolute', left: 0, width: 143, top: 7, height: 16 }}
                    >
                        <Region
                            name="name"
                            params={208}
                            layout={{ position: 'absolute', left: 31, width: 80, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="my_name_here"
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                        <ThemeImage
                            name="relationship_status"
                            params={16}
                            src={undefined}
                            layout={{ position: 'absolute', left: 5, width: 16, top: 1, height: 14 }}
                        />
                    </Region>
                    <Region
                        params={144}
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 2, width: 139, top: 27, height: 1 }}
                    />
                    <Region
                        name="buttons"
                        params={8519824}
                        layout={{ position: 'absolute', left: 2, width: 139, top: 28, height: 1402, flexDirection: 'column', gap: 1 }}
                    >
                        <Region
                            name="open_profile"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.open_profile')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="friend"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton2}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.friend')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="trade"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton3}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.trade')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="whisper"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton4}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.whisper')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="respect"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton5}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.respect')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="replenish_respect"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton6}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.replenish_respect')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                                <ThemeImage
                                    tags={[ '#icon' ]}
                                    params={16}
                                    src={layoutImage('pursearea_duckets_icon.png')}
                                    layout={{ position: 'absolute', left: 110, width: 15, top: 10, height: 15 }}
                                />
                            </ContainerButton>
                        </Region>
                        <Region
                            name="blow"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton7}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text="infostand.button.blow"
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="perform"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton8}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.link.perform')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                                <Icon
                                    variant="5"
                                    name="icon"
                                    tags={[ 'arrow_right' ]}
                                    params={80}
                                    layout={{ position: 'absolute', left: 128, width: 5, top: 12, height: 10 }}
                                />
                            </ContainerButton>
                        </Region>
                        <Region
                            name="relationship"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton9}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.link.relationship')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                                <Icon
                                    variant="5"
                                    name="icon"
                                    tags={[ 'arrow_right' ]}
                                    params={80}
                                    layout={{ position: 'absolute', left: 128, width: 5, top: 12, height: 10 }}
                                />
                            </ContainerButton>
                        </Region>
                        <Region
                            name="kick"
                            tags={[ 'moderate' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'moderate' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton10}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.kick')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="mute"
                            tags={[ 'moderate' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'moderate' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton11}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.mute')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                                <Icon
                                    variant="5"
                                    name="icon"
                                    tags={[ 'arrow_right' ]}
                                    params={80}
                                    layout={{ position: 'absolute', left: 128, width: 5, top: 12, height: 10 }}
                                />
                            </ContainerButton>
                        </Region>
                        <Region
                            name="mute_2min"
                            tags={[ 'moderate' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'moderate' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton12}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.mute_2min')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="mute_5min"
                            tags={[ 'moderate' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'moderate' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton13}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.mute_5min')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="mute_10min"
                            tags={[ 'moderate' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'moderate' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton14}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.mute_10min')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="ban_with_duration"
                            tags={[ 'moderate' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'moderate' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton15}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.ban')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                                <Icon
                                    variant="5"
                                    name="icon"
                                    tags={[ 'arrow_right' ]}
                                    params={80}
                                    layout={{ position: 'absolute', left: 128, width: 5, top: 12, height: 10 }}
                                />
                            </ContainerButton>
                        </Region>
                        <Region
                            name="ban_hour"
                            tags={[ 'moderate' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'moderate' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton16}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.ban_hour')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="ban_day"
                            tags={[ 'moderate' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'moderate' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton17}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.ban_day')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="perm_ban"
                            tags={[ 'moderate' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'moderate' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton18}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.perm_ban')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="give_rights"
                            tags={[ 'moderate' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'moderate' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton19}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.giverights')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="remove_rights"
                            tags={[ 'moderate' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'moderate' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton20}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.removerights')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="unignore"
                            tags={[ 'moderate' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'moderate' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton21}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.unignore')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="ignore"
                            tags={[ 'moderate' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'moderate' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton22}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.ignore')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="report"
                            tags={[ 'moderate' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'moderate' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton23}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.report')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="moderate"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton24}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.link.moderate')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                                <Icon
                                    variant="5"
                                    name="icon"
                                    tags={[ 'arrow_right' ]}
                                    params={80}
                                    layout={{ position: 'absolute', left: 128, width: 5, top: 12, height: 10 }}
                                />
                            </ContainerButton>
                        </Region>
                        <Region
                            name="relationship_grid"
                            tags={[ 'grid' ]}
                            params={144}
                            layout={{ width: 137, height: 25, flexShrink: 0, flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}
                        >
                            <Region
                                name="relationship_heart"
                                params={16}
                                layout={{ width: 45, height: 25, flexShrink: 0 }}
                            >
                                <ContainerButton
                                    variant="0"
                                    name="button"
                                    params={17}
                                    tintColor="#2d2a27"
                                    onPointerTap={onButton25}
                                    layout={{ position: 'absolute', left: -3, width: 49, top: -3, height: 29 }}
                                >
                                    <ThemeImage
                                        params={16}
                                        src={layoutImage('relationship_status_heart.png')}
                                        layout={{ position: 'absolute', left: 0, width: 49, top: 7, height: 17 }}
                                    />
                                </ContainerButton>
                            </Region>
                            <Region
                                name="relationship_smile"
                                params={16}
                                layout={{ width: 45, height: 25, flexShrink: 0 }}
                            >
                                <ContainerButton
                                    variant="0"
                                    name="button"
                                    params={17}
                                    tintColor="#2d2a27"
                                    onPointerTap={onButton26}
                                    layout={{ position: 'absolute', left: -3, width: 49, top: -3, height: 29 }}
                                >
                                    <ThemeImage
                                        params={2192}
                                        src={layoutImage('relationship_status_smile.png')}
                                        layout={{ position: 'absolute', left: 0, width: 49, top: 7, height: 17 }}
                                    />
                                </ContainerButton>
                            </Region>
                            <Region
                                name="relationship_bobba"
                                params={16}
                                layout={{ width: 45, height: 25, flexShrink: 0 }}
                            >
                                <ContainerButton
                                    variant="0"
                                    name="button"
                                    params={17}
                                    tintColor="#2d2a27"
                                    onPointerTap={onButton27}
                                    layout={{ position: 'absolute', left: -3, width: 49, top: -3, height: 29 }}
                                >
                                    <ThemeImage
                                        params={2192}
                                        src={layoutImage('relationship_status_bobba.png')}
                                        layout={{ position: 'absolute', left: 0, width: 49, top: 7, height: 17 }}
                                    />
                                </ContainerButton>
                            </Region>
                        </Region>
                        <Region
                            name="no_relationship"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton28}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('avatar.widget.clear_relationship')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="actions"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton29}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.link.actions')}
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
                            name="pass_handitem"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton30}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('avatar.widget.pass_hand_item')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="change_bot_name"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton31}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('avatar.widget.change_bot_name')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="dress_up"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton32}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('avatar.widget.dress_up')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="setup_chat"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton33}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('avatar.widget.setup_chat')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="random_walk"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton34}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('avatar.widget.random_walk')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="dance"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton35}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('avatar.widget.dance')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="pick"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton36}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('avatar.widget.pick_up')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="nux_proceed_1"
                            tags={[ 'action' ]}
                            params={144}
                            visible={false}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton37}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('avatar.widget.nux.proceed')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="nux_take_tour"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton38}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('avatar.widget.nux.take.tour')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="nux_again"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton39}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('avatar.widget.nux.again')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="nux_restart"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton40}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text="NUX RESTART"
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="nux_next_day"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton41}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text="NUX NEXT DAY"
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="link_template"
                            tags={[ 'action' ]}
                            params={144}
                            visible={false}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton42}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text="PH"
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="ambassador"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton43}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.link.ambassador')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                                <Icon
                                    variant="5"
                                    name="icon"
                                    tags={[ 'arrow_right' ]}
                                    params={80}
                                    layout={{ position: 'absolute', left: 128, width: 5, top: 12, height: 10 }}
                                />
                            </ContainerButton>
                        </Region>
                        <Region
                            name="ambassador_alert"
                            tags={[ 'ambassador' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'ambassador' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton44}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.ambassador.alert')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="ambassador_kick"
                            tags={[ 'ambassador' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'ambassador' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton45}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.kick')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="ambassador_mute_2min"
                            tags={[ 'ambassador' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'ambassador' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton46}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.mute_2min')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="ambassador_mute_10min"
                            tags={[ 'ambassador' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'ambassador' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton47}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.mute_10min')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="ambassador_mute_15min"
                            tags={[ 'ambassador' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'ambassador' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton48}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.mute_15min')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="ambassador_mute_60min"
                            tags={[ 'ambassador' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'ambassador' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton49}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.mute_60min')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="ambassador_mute_18hour"
                            tags={[ 'ambassador' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'ambassador' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton50}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.mute_18hour')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="ambassador_mute_36hour"
                            tags={[ 'ambassador' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'ambassador' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton51}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.mute_36hour')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="ambassador_mute_72hour"
                            tags={[ 'ambassador' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'ambassador' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton52}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.mute_72hour')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="ambassador_unmute"
                            tags={[ 'ambassador' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'ambassador' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton53}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.unmute')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ff8133', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="donate_to_all"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton54}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('avatar.widget.dta')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="donate_to_user"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton55}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('avatar.widget.dtu')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="wired_inspect"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 137, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton56}
                                layout={{ position: 'absolute', left: -3, width: 143, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 137, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
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
                        params={1169}
                        layout={{ position: 'absolute', left: 3, width: 136, top: 1429, height: 18 }}
                    >
                        <Icon
                            variant="7"
                            name="icon"
                            params={208}
                            layout={{ position: 'absolute', left: 62, width: 12, top: 7, height: 11 }}
                        />
                    </Region>
                </Region>
            </Bubble>
        </Region>
    );
};
