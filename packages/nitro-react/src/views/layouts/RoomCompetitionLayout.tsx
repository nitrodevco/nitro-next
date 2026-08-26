import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `134_RoomCompetition_xml` (layout "RoomCompetition", 448x86) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomCompetitionLayoutProps {
    layout?: BoxLayout;
    onActionButton?: () => void;
}

export const RoomCompetitionLayout = ({ layout, onActionButton }: RoomCompetitionLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 448, height: 86, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 448, top: 0, height: 86 }}>
                <Border
                    variant="1"
                    name="dont_show_again_container"
                    params={128}
                    layout={{ position: 'absolute', left: 0, width: 448, top: 0, height: 86 }}
                >
                    <Region
                        name="dont_show_info_txt"
                        tags={[ 'COLORABLE' ]}
                        params={786640}
                        layout={{ position: 'absolute', left: 122, width: 205, top: 24, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="You will see this again adad adada ad"
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#bbbbbb' }}
                        />
                    </Region>
                    <Region
                        name="dont_show_again_txt"
                        tags={[ 'COLORABLE' ]}
                        params={3145936}
                        layout={{ position: 'absolute', left: 101, width: 247, top: 40, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('roomcompetition.dontshowagain.dontshow')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="dont_show_again_region"
                        params={145}
                        layout={{ position: 'absolute', left: 0, width: 448, top: 46, height: 21 }}
                    />
                </Border>
                <Border
                    variant="104"
                    name="normal_container"
                    params={128}
                    layout={{ position: 'absolute', left: 0, width: 448, top: 0, height: 96 }}
                >
                    <Region
                        name="caption_txt"
                        params={144}
                        layout={{ position: 'absolute', left: 57, width: 250, top: 14, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Caption txt PH"
                            textStyle="text-style-il-heading-2"
                            textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                        />
                    </Region>
                    <Region
                        name="info_region"
                        params={17}
                        layout={{ position: 'absolute', left: 57, width: 250, top: 46, height: 50 }}
                    >
                        <Region
                            name="info_txt"
                            tags={[ 'COLORABLE' ]}
                            params={144}
                            layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 50, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Link text ph"
                                textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                            />
                        </Region>
                    </Region>
                    <Button
                        variant="100"
                        name="action_button"
                        params={393297}
                        onPointerTap={onActionButton}
                        layout={{ position: 'absolute', left: 295, width: 150, top: 24, height: 55, minWidth: 150, maxWidth: 150 }}
                    >
                        Submit Btn PH
                    </Button>
                    <Region
                        name="close_region"
                        params={262225}
                        layout={{ position: 'absolute', left: 431, width: 11, top: 5, height: 12 }}
                    >
                        <ThemeImage
                            name="close_icon"
                            params={16}
                            src={layoutImage('icons_close.png')}
                            layout={{ position: 'absolute', left: 0, width: 11, top: 0, height: 12 }}
                        />
                    </Region>
                    <ThemeImage
                        name="vote_image"
                        params={16}
                        src="${image.library.url}reception/vote_placeholder.png"
                        layout={{ position: 'absolute', left: 3, width: 55, top: 16, height: 52 }}
                    />
                    <ThemeImage
                        name="submit_image"
                        params={16}
                        src="${image.library.url}reception/your_room_placeholder.png"
                        layout={{ position: 'absolute', left: 2, width: 55, top: 9, height: 60 }}
                    />
                    <Region
                        name="required_furnis_itemgrid"
                        params={8781904}
                        layout={{ position: 'absolute', left: 315, width: 115, top: 32, height: 36, flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}
                    >
                        <Region
                            name="furni_container"
                            params={16}
                            layout={{ width: 32, height: 35, flexShrink: 0 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('common_chisel.png')}
                                layout={{ position: 'absolute', left: 0, width: 32, top: 4, height: 31 }}
                            />
                            <ThemeImage
                                name="furni_icon"
                                params={16}
                                src={undefined}
                                layout={{ position: 'absolute', left: 0, width: 32, top: 4, height: 31 }}
                            />
                            <ThemeImage
                                name="tick_icon"
                                params={16}
                                src={layoutImage('icons_tickmark.png')}
                                layout={{ position: 'absolute', left: 21, width: 11, top: 0, height: 10 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="button_info_txt"
                        params={262224}
                        layout={{ position: 'absolute', left: 294, width: 153, top: 16, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text="kjhlk jh lkj hklj"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
