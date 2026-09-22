import { useTranslation } from '#base/context/system';
import { Border, LayoutImage, Region, ThemeImage } from '#base/theme';

export interface RoomQuizAnswerSignViewProps {
    /** True for a thumb up, false for a thumb down. */
    liked: boolean;
}

/**
 * The thumb that pops up over whoever just answered the room's question, on the `quiz_like` /
 * `quiz_unlike` layouts (32x32). Its position comes from the bubble it is
 * put inside. The two layouts differ only in the colour and in the thumb, which sits 3px lower
 * pointing down.
 */
export const RoomQuizAnswerSignView = ({ liked }: RoomQuizAnswerSignViewProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 32, height: 32 }}>
            <Region layout={{ position: 'absolute', left: 0, width: 32, top: 0, height: 32 }}>
                <Border
                    variant="2"
                    name="white"
                    layout={{ position: 'absolute', left: 0, width: 32, top: 0, height: 32 }}
                />
                <Border
                    variant="2"
                    name="colored"
                    tintColor={liked ? '#007841' : '#b32e22'}
                    layout={{ position: 'absolute', left: 0, width: 32, top: 0, height: 32 }}
                />
                <Region
                    name="button_like"
                    tooltip={t('quizz.like.button.tooltip')}
                    dynamicStyle="brightness_and_shadow_under"
                    layout={{ position: 'absolute', left: 0, width: 32, top: 0, height: 32, minWidth: 32, maxWidth: 32 }}
                >
                    <ThemeImage
                        src={LayoutImage(liked ? 'room-ui/word_quiz_thum_up.png' : 'room-ui/word_quiz_thum_down.png')}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center', etchingColor: 0x48000000 }}
                        dynamicRole="icon"
                        layout={{ position: 'absolute', left: 5, width: 22, top: liked ? 5 : 8, height: 22 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
