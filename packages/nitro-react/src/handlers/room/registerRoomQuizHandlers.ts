import { AvatarGestureType, RoomObjectUserType } from '@nitrodevco/nitro-api';
import { QuestionAnsweredEventMessage, QuestionEventMessage, QuestionFinishedEventMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/** `WordQuizWidget.VALUE_KEY_LIKE` - the in-room quiz only ever has these two answers. */
export const QUIZ_VALUE_LIKE = '1';
export const QUIZ_VALUE_DISLIKE = '0';

/** Milliseconds to seconds; the question's clock arrives as the former and is counted in the latter. */
const MS_PER_SECOND = 1000;

/**
 * The quick question a room can be asked - `WordQuizWidgetHandler`. Answers are public: everyone
 * sees the running tally, and whoever answers pulls the face that goes with their answer.
 */
export const registerRoomQuizHandlers = ({ subscribe }: WebSocketConnection) => {
    const getRoom = () => roomStore.getState().room;
    const { startQuiz, finishQuiz, addQuizAnswer } = roomStore.getState();

    return subscribeAll(subscribe, [
        on(QuestionEventMessage, (data) => {
            startQuiz(data.pollId, data.question.id, data.question.content, Math.floor(data.duration / MS_PER_SECOND));
        }),

        on(QuestionAnsweredEventMessage, (data) => {
            addQuizAnswer(data.userId, data.value, data.answerCounts);

            const room = getRoom();

            if (!room) return;

            const user = roomStore.getState().getUserByWebId(data.userId, RoomObjectUserType.User);

            if (!user) return;

            // Flash pulled the face to match the answer, so the room reads at a glance.
            room.updateRoomObjectUserGesture(
                user.objectId,
                (data.value === QUIZ_VALUE_DISLIKE) ? AvatarGestureType.Sad : AvatarGestureType.Smile,
            );
        }),

        on(QuestionFinishedEventMessage, (data) => {
            finishQuiz(data.questionId, data.answerCounts);
        }),
    ]);
};
