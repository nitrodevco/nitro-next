import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `prev_next_buttons` of HabboWayQuizLayout - configured through the parent's `prevNextButtons` prop. */
export interface HabboWayQuizLayoutPrevNextButtonsProps {
    layout?: BoxLayout;
    nextDimmer?: ReactNode;
    onNextButton?: () => void;
    onPrevButton?: () => void;
    prevDimmer?: ReactNode;
}

export const HabboWayQuizLayoutPrevNextButtons = ({ layout, nextDimmer, onNextButton, onPrevButton, prevDimmer }: HabboWayQuizLayoutPrevNextButtonsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="prev_next_buttons"
            layout={{ position: 'absolute', left: 0, width: 498, bottom: -10, height: 65, ...layout }}
        >
            <ContainerButton
                variant="101"
                name="prev_button"
                tintColor="#bbbbbb"
                onPointerTap={onPrevButton}
                layout={{ position: 'absolute', left: 16, width: 208, top: 0, height: 53 }}
            >
                <Region layout={{ position: 'absolute', left: 11, top: 11, flexDirection: 'row' }}>
                    <ThemeImage
                        src={layoutImage('help_habboway_prev.png')}
                        layout={{ width: 25, height: 30, flexShrink: 0 }}
                    />
                    <ThemeImage
                        src={layoutImage('illumina_light_separator_vertical.png')}
                        layout={{ width: 2, height: 20, flexShrink: 0 }}
                    />
                    <Region layout={{ width: 170, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('habbo.way.previous.button')}
                            textStyle="text-style-il-button"
                        />
                    </Region>
                </Region>
            </ContainerButton>
            <ContainerButton
                variant="101"
                name="next_button"
                tintColor="#bbbbbb"
                onPointerTap={onNextButton}
                layout={{ position: 'absolute', right: 17, width: 185, top: 0, height: 53 }}
            >
                <Region layout={{ position: 'absolute', left: 11, top: 11, flexDirection: 'row' }}>
                    <Region layout={{ width: 136, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('habbo.way.next.button')}
                            textStyle="text-style-il-button"
                        />
                    </Region>
                    <ThemeImage
                        src={layoutImage('illumina_light_separator_vertical.png')}
                        layout={{ width: 2, height: 20, flexShrink: 0 }}
                    />
                    <ThemeImage
                        src={layoutImage('help_habboway_next.png')}
                        layout={{ width: 25, height: 30, flexShrink: 0 }}
                    />
                    <Region layout={{ width: 11, height: 30, flexShrink: 0 }} />
                </Region>
            </ContainerButton>
            <Region
                name="prev_dimmer"
                backgroundColor="#e2e2e2"
                layout={{ position: 'absolute', left: 14, width: 240, top: 1, height: 58 }}
            >
                {prevDimmer}
            </Region>
            <Region
                name="next_dimmer"
                backgroundColor="#e2e2e2"
                layout={{ position: 'absolute', left: 243, width: 240, top: 1, height: 58 }}
            >
                {nextDimmer}
            </Region>
        </Region>
    );
};
