import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, CheckBox, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `843_own_pet_menu_xml` (layout "context_menu_widget", 115x600) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface OwnPetMenuLayoutProps {
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
    onButton3?: () => void;
    onButton4?: () => void;
    onButton5?: () => void;
    onButton6?: () => void;
    onButton7?: () => void;
    onButton8?: () => void;
    onButton9?: () => void;
    onToggleBreedingPermissionCheckbox?: () => void;
    onToggleRidingPermissionCheckbox?: () => void;
}

export const OwnPetMenuLayout = ({ layout, onButton, onButton10, onButton11, onButton12, onButton13, onButton14, onButton15, onButton16, onButton17, onButton18, onButton19, onButton2, onButton3, onButton4, onButton5, onButton6, onButton7, onButton8, onButton9, onToggleBreedingPermissionCheckbox, onToggleRidingPermissionCheckbox }: OwnPetMenuLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 115, height: 600, ...layout }}>
            <Bubble
                variant="0"
                params={1048865}
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 115, top: 0, height: 600 }}
            >
                <Region
                    name="border"
                    params={12582928}
                    layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 590 }}
                >
                    <Region
                        name="profile_link"
                        params={1}
                        layout={{ position: 'absolute', left: 0, width: 107, top: -1, height: 28, maxHeight: 28 }}
                    >
                        <Region
                            name="name"
                            params={3280}
                            layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 28, maxHeight: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text="Incarnatus Hairbullis"
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 107, align: 'center' }}
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
                        layout={{ position: 'absolute', left: 2, width: 103, top: 28, height: 540, flexDirection: 'column', gap: 1 }}
                    >
                        <Region
                            name="buy_saddle"
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
                                        text={t('infostand.button.buy_saddle')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="mount"
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
                                onPointerTap={onButton2}
                                layout={{ position: 'absolute', left: -3, width: 107, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 101, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.mount')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="toggle_riding_permission"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 101, height: 40, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton3}
                                layout={{ position: 'absolute', left: -3, width: 107, top: -4, height: 46 }}
                            >
                                <CheckBox
                                    variant="1"
                                    name="toggle_riding_permission_checkbox"
                                    params={17}
                                    onPointerTap={onToggleRidingPermissionCheckbox}
                                    layout={{ position: 'absolute', left: 9, width: 20, top: 17, height: 20 }}
                                />
                                <Region
                                    name="label"
                                    params={3088}
                                    layout={{ position: 'absolute', left: 26, width: 78, top: 3, height: 40, maxWidth: 78, maxHeight: 46, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.toggle_riding_permission')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 78 }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="dismount"
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
                                onPointerTap={onButton4}
                                layout={{ position: 'absolute', left: -3, width: 107, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 101, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.dismount')}
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
                            layout={{ width: 101, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton5}
                                layout={{ position: 'absolute', left: -3, width: 107, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 101, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.petrespect')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="treat"
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
                                onPointerTap={onButton6}
                                layout={{ position: 'absolute', left: -3, width: 107, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={16}
                                    layout={{ position: 'absolute', left: 3, width: 101, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.pettreat')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="pass_handitem"
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
                                onPointerTap={onButton7}
                                layout={{ position: 'absolute', left: -3, width: 107, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 101, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.give_handitem_to_pet')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="train"
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
                                onPointerTap={onButton8}
                                layout={{ position: 'absolute', left: -3, width: 107, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 101, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.train')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="pick_up"
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
                                onPointerTap={onButton9}
                                layout={{ position: 'absolute', left: -3, width: 107, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 101, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.pickup')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="saddle_off"
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
                                onPointerTap={onButton10}
                                layout={{ position: 'absolute', left: -3, width: 107, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 101, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.saddleoff')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="give_water"
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
                                onPointerTap={onButton11}
                                layout={{ position: 'absolute', left: -3, width: 107, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 101, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.givewater')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="give_light"
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
                                onPointerTap={onButton12}
                                layout={{ position: 'absolute', left: -3, width: 107, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 101, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.givelight')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="breed"
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
                                onPointerTap={onButton13}
                                layout={{ position: 'absolute', left: -3, width: 107, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 101, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.breed')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="harvest"
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
                                onPointerTap={onButton14}
                                layout={{ position: 'absolute', left: -3, width: 107, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 101, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.harvest')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="revive"
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
                                onPointerTap={onButton15}
                                layout={{ position: 'absolute', left: -3, width: 107, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 101, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.revive')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="compost"
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
                                onPointerTap={onButton16}
                                layout={{ position: 'absolute', left: -3, width: 107, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 101, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.compost')}
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
                            layout={{ width: 101, height: 26, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton17}
                                layout={{ position: 'absolute', left: -3, width: 107, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 101, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
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
                            name="toggle_breeding_permission"
                            tags={[ 'action' ]}
                            params={144}
                            layout={{ width: 101, height: 40, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="button"
                                tags={[ 'action' ]}
                                params={2193}
                                tintColor="#2d2a27"
                                onPointerTap={onButton18}
                                layout={{ position: 'absolute', left: -3, width: 107, top: -4, height: 46 }}
                            >
                                <CheckBox
                                    variant="1"
                                    name="toggle_breeding_permission_checkbox"
                                    params={17}
                                    onPointerTap={onToggleBreedingPermissionCheckbox}
                                    layout={{ position: 'absolute', left: 9, width: 20, top: 17, height: 20 }}
                                />
                                <Region
                                    name="label"
                                    params={3088}
                                    layout={{ position: 'absolute', left: 26, width: 78, top: 0, height: 46, maxWidth: 78, maxHeight: 46, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('infostand.button.toggle_breeding_permission')}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 78 }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="wired_inspect"
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
                                onPointerTap={onButton19}
                                layout={{ position: 'absolute', left: -3, width: 107, top: -4, height: 35 }}
                            >
                                <Region
                                    name="label"
                                    params={144}
                                    layout={{ position: 'absolute', left: 3, width: 101, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
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
                        layout={{ position: 'absolute', left: 4, width: 100, top: 567, height: 19 }}
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
