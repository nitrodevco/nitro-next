import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';

/** Generated from `834_memenu_dance_xml` (layout "memenu_dance", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuDanceLayoutProps {
    captionDanceTitle?: string;
    itemsButtonContainer?: ReactNode;
    layout?: BoxLayout;
    onBackBtn?: () => void;
    onStopDancingButton?: () => void;
}

export const MemenuDanceLayout = ({ captionDanceTitle, itemsButtonContainer, layout, onBackBtn, onStopDancingButton }: MemenuDanceLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Region
                name="dance_container"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 163, top: 0, height: 208 }}
            >
                <Border
                    variant="1"
                    name="dance_border"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 163, top: 0, height: 181, justifyContent: 'center' }}
                >
                    <Region
                        name="dance_title"
                        params={786640}
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 38, top: 5, height: 13, maxWidth: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionDanceTitle ?? t('widget.memenu.dance')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="line"
                        params={16}
                        backgroundColor="#2f2f2f"
                        layout={{ position: 'absolute', left: 5, width: 152, top: 22, height: 1 }}
                    />
                    <Region
                        name="buttonContainer"
                        params={17}
                        layout={{ position: 'absolute', left: 9, width: 145, top: 33, height: 140, flexDirection: 'column', gap: 4 }}
                    >
                        {itemsButtonContainer ?? (
                            <MemenuDanceLayoutClubInfoItem />
                        )}
                    </Region>
                </Border>
                <Button
                    variant="1"
                    name="back_btn"
                    params={131089}
                    onPointerTap={onBackBtn}
                    layout={{ position: 'absolute', left: 0, width: 50, top: 182, height: 22 }}
                >
                    {t('generic.back')}
                </Button>
                <Button
                    variant="1"
                    name="stop_dancing_button"
                    params={131089}
                    onPointerTap={onStopDancingButton}
                    layout={{ position: 'absolute', left: 52, width: 110, top: 182, height: 22 }}
                >
                    {t('widget.memenu.dance.stop')}
                </Button>
            </Region>
        </Region>
    );
};

/** Row template `club_info` of MemenuDanceLayout - pass real rows through its `items…` slot. */
export interface MemenuDanceLayoutClubInfoItemProps {
    captionClubInfo?: string;
    layout?: BoxLayout;
}

export const MemenuDanceLayoutClubInfoItem = ({ captionClubInfo, layout }: MemenuDanceLayoutClubInfoItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="club_info"
            params={16}
            layout={{ width: 145, height: 50, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionClubInfo ?? t('widget.memenu.dance.clubinfo')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 145 }}
            />
        </Region>
    );
};
