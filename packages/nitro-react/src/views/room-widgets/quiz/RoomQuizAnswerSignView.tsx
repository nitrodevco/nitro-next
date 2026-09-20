import { Border, LayoutImage, Region, ThemeImage } from '#base/theme';

export interface RoomQuizAnswerSignViewProps {
    /** True for a thumb up, false for a thumb down. */
    liked: boolean;
}

/**
 * The thumb that pops up over whoever just answered the room's question, on the `quiz_like` /
 * `quiz_unlike` layouts (32x32). Its position comes from the bubble it is put inside.
 */
export const RoomQuizAnswerSignView = ({ liked }: RoomQuizAnswerSignViewProps) => (
    <Region layout={{ position: 'relative', width: 32, height: 32 }}>
        <Border
            variant="2"
            name="white"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        />
        <Border
            variant="2"
            name="colored"
            tintColor={liked ? '#007841' : '#b32e22'}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        />
        <ThemeImage
            src={LayoutImage(liked ? 'room-ui/word_quiz_thum_up.png' : 'room-ui/word_quiz_thum_down.png')}
            layout={{ position: 'absolute', left: 5, width: 22, top: 5, height: 22 }}
        />
    </Region>
);
