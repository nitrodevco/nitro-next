import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, CloseButton, ContainerButton, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `31_entity_xml` (layout "entity", 127x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface EntityLayoutProps {
    layout?: BoxLayout;
    onBubbleButtonAccept?: () => void;
    onBubbleButtonClose?: () => void;
}

export const EntityLayout = ({ layout, onBubbleButtonAccept, onBubbleButtonClose }: EntityLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 127, height: 36, ...layout }}>
            <Border
                variant="6"
                name="frame"
                params={1}
                tintColor="#a5cd5d"
                layout={{ position: 'absolute', left: 0, width: 127, top: 101, height: 36 }}
            >
                <Region
                    name="icons"
                    params={262224}
                    layout={{ position: 'absolute', left: 117, width: 0, top: -13, height: 25, flexDirection: 'row', gap: 2 }}
                />
                <Region
                    name="pieces"
                    params={2192}
                    layout={{ position: 'absolute', left: 3, width: 121, top: 7, height: 30, minHeight: 30, flexDirection: 'column' }}
                >
                    <Region
                        name="header"
                        params={145}
                        layout={{ width: 119, height: 24, flexShrink: 0 }}
                    >
                        <Region
                            name="name"
                            tags={[ 'label' ]}
                            params={16}
                            layout={{ position: 'absolute', left: 33, width: 86, top: 2, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        />
                        <Region
                            name="region_profile"
                            params={145}
                            layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 24 }}
                        >
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: -11, width: 50, top: -25, height: 70 }}
                            >
                                <ThemeImage
                                    name="canvas"
                                    params={3932160}
                                    src={undefined}
                                    layout={{ position: 'absolute', left: 20, width: 10, top: 30, height: 10 }}
                                />
                            </Region>
                        </Region>
                    </Region>
                </Region>
                <Bubble
                    variant="0"
                    name="bubble"
                    params={1}
                    tintColor="#9dbf5a"
                    layout={{ position: 'absolute', left: -6, width: 139, top: -113, height: 120 }}
                >
                    <Region
                        name="bubble_title"
                        params={8388752}
                        layout={{ position: 'absolute', left: 5, width: 93, top: 4, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('friendbar.game_invite.title')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 93, align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="bubble_message"
                        params={8388752}
                        layout={{ position: 'absolute', left: 5, width: 110, top: 32, height: 4, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    />
                    <CloseButton
                        variant="3"
                        name="bubble_button_close"
                        params={81}
                        onPointerTap={onBubbleButtonClose}
                        layout={{ position: 'absolute', left: 101, width: 19, top: 3, height: 20 }}
                    />
                    <ContainerButton
                        variant="3"
                        name="bubble_button_accept"
                        params={394449}
                        onPointerTap={onBubbleButtonAccept}
                        layout={{ position: 'absolute', left: 13, width: 96, top: 46, height: 27, maxWidth: 110 }}
                    >
                        <Icon
                            variant="8"
                            name="bubble_icon"
                            params={16}
                            tintColor="#00a900"
                            layout={{ position: 'absolute', left: 7, width: 17, top: 6, height: 16 }}
                        />
                        <Region
                            name="bubble_caption"
                            params={16}
                            layout={{ position: 'absolute', left: 16, width: 71, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('friendbar.request.accept')}
                                textStyle="text-style-button-shiny-bold"
                                textOptions={{ align: 'center' }}
                            />
                        </Region>
                    </ContainerButton>
                    <Region
                        name="bubble_click_region_reject"
                        params={1233}
                        layout={{ position: 'absolute', left: 2, width: 118, top: 79, height: 15 }}
                    >
                        <Region
                            name="bubble_link_reject"
                            params={4194320}
                            layout={{ position: 'absolute', left: 0, width: 119, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('friendbar.request.decline')}
                                textStyle="text-style-u-small"
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                    </Region>
                </Bubble>
            </Border>
        </Region>
    );
};
