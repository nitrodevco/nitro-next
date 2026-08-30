import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';

import { MemenuDanceLayoutClubInfoItem } from './MemenuDanceLayoutClubInfoItem';

/** Named region `dance_container` of MemenuDanceLayout - configured through the parent's `danceContainer` prop. */
export interface MemenuDanceLayoutDanceContainerProps {
    captionDanceTitle?: string;
    itemsButtonContainer?: ReactNode;
    layout?: BoxLayout;
    line?: ReactNode;
    onBackBtn?: () => void;
    onStopDancingButton?: () => void;
}

export const MemenuDanceLayoutDanceContainer = ({ captionDanceTitle, itemsButtonContainer, layout, line, onBackBtn, onStopDancingButton }: MemenuDanceLayoutDanceContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="dance_container"
            layout={{ position: 'absolute', left: 0, width: 163, top: 0, height: 208, ...layout }}
        >
            <Border
                variant="1"
                name="dance_border"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 181, justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionDanceTitle ?? t('widget.memenu.dance')}
                    textOptions={{ fill: '#ffffff' }}
                    name="dance_title"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 38, top: 5, height: 13, maxWidth: 150 }}
                />
                <Region
                    name="line"
                    backgroundColor="#2f2f2f"
                    layout={{ position: 'absolute', left: 5, width: 152, top: 22, height: 1 }}
                >
                    {line}
                </Region>
                <Region
                    name="buttonContainer"
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
                onPointerTap={onBackBtn}
                layout={{ position: 'absolute', left: 0, width: 50, top: 182, height: 22 }}
            >
                {t('generic.back')}
            </Button>
            <Button
                variant="1"
                name="stop_dancing_button"
                onPointerTap={onStopDancingButton}
                layout={{ position: 'absolute', left: 52, width: 110, top: 182, height: 22 }}
            >
                {t('widget.memenu.dance.stop')}
            </Button>
        </Region>
    );
};
