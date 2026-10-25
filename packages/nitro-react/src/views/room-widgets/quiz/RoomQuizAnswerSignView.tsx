/**
 * The thumb that pops up over whoever just answered the room's question - `WordQuizWidget`'s answer
 * bubble, built from `habbo-room-ui-com`'s `wordquiz_like` or `wordquiz_unlike` layout
 * (`ASSET_NAME_LIKE` / `ASSET_NAME_DISLIKE`) as the answer is a 1 or not. The two layouts differ only
 * in the colour and the thumb; the widget places the bubble over the avatar.
 */
import { TemplateWindow } from '#base/theme';

export interface RoomQuizAnswerSignViewProps {
    /** True for a thumb up, false for a thumb down. */
    liked: boolean;
}

const LIKE_TEMPLATE = 'habbo-room-ui-com/wordquiz_like_xml';
const DISLIKE_TEMPLATE = 'habbo-room-ui-com/wordquiz_unlike_xml';

export const RoomQuizAnswerSignView = ({ liked }: RoomQuizAnswerSignViewProps) => <TemplateWindow id={liked ? LIKE_TEMPLATE : DISLIKE_TEMPLATE} />;
