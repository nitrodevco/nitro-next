import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { GamesMainLayoutPageList, GamesMainLayoutPageListProps } from './GamesMainLayoutPageList';

/** Named region `instructions_container` of GamesMainLayout - configured through the parent's `instructionsContainer` prop. */
export interface GamesMainLayoutInstructionsContainerProps {
    captionInstructionsBack?: string;
    captionInstructionText?: string;
    layout?: BoxLayout;
    onInstructionsBack?: () => void;
    onInstructionsNext?: () => void;
    onInstructionsPrev?: () => void;
    pageList?: GamesMainLayoutPageListProps;
    srcInstructionsImage?: string;
    tintInstructionsImage?: string;
    visibleInstructionsContainer?: boolean;
}

export const GamesMainLayoutInstructionsContainer = ({ captionInstructionsBack, captionInstructionText, layout, onInstructionsBack, onInstructionsNext, onInstructionsPrev, pageList, srcInstructionsImage, tintInstructionsImage, visibleInstructionsContainer }: GamesMainLayoutInstructionsContainerProps) => {
    const t = useTranslation();

    return (
        (visibleInstructionsContainer ?? false) && (
            <Region
                name="instructions_container"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 436, justifyContent: 'center', ...layout }}
            >
                <ThemeImage
                    name="instructions_image"
                    src={srcInstructionsImage}
                    tint={tintInstructionsImage}
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 250, top: 80, height: 166 }}
                />
                <Region
                    name="instructions_back"
                    layout={{ position: 'absolute', left: 18, width: 160, top: 324, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    onPointerTap={onInstructionsBack}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionInstructionsBack ?? t('snowwar.instructions.back')}
                        textOptions={{ fill: '#1077ac' }}
                    />
                </Region>
                <Region
                    name="instructions_prev"
                    onPointerTap={onInstructionsPrev}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 10, width: 50, top: 140, height: 50 }}
                >
                    <ThemeImage
                        src={layoutImage('scroll_left.png')}
                        layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                    />
                </Region>
                <Region
                    name="instructions_next"
                    onPointerTap={onInstructionsNext}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 345, width: 50, top: 140, height: 50 }}
                >
                    <ThemeImage
                        src={layoutImage('scroll_right.png')}
                        layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                    />
                </Region>
                <ThemeText
                    text={captionInstructionText ?? 'lorem ipsum'}
                    textOptions={{ fill: '#1077ac', wordWrap: true, wordWrapWidth: 280, align: 'center' }}
                    name="instruction_text"
                    verticalAlign="top"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 280, top: 269, height: 21 }}
                />
                <GamesMainLayoutPageList {...pageList} />
            </Region>
        )
    );
};
