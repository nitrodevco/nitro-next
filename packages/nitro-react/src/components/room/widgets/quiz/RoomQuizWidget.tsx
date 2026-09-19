import { RoomObjectCategoryEnum, RoomObjectUserType } from '@nitrodevco/nitro-api';
import { PollAnswerComposer } from '@nitrodevco/nitro-packets';
import { useEffect } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomObjectIdByWebId, useRoomQuizActions, useRoomStore } from '#base/context/room';
import { useConfigValue } from '#base/context/system';
import { QUIZ_VALUE_DISLIKE, QUIZ_VALUE_LIKE } from '#base/handlers';
import { RoomQuizAnswerSignView } from '#base/views/room-widgets/quiz/RoomQuizAnswerSignView';
import { RoomQuizView } from '#base/views/room-widgets/quiz/RoomQuizView';

import { RoomObjectMenuBubble } from '../object-menu/RoomObjectMenuBubble';

/** `poll.word.quiz.result.view.seconds` - how long the tally stays up once the question closes. */
const DEFAULT_RESULT_SECONDS = 4;

/** `poll.word.quiz.answer.bubble.seconds` - how long a thumb hangs over the person who gave it. */
const DEFAULT_ANSWER_BUBBLE_SECONDS = 3;

const MS_PER_SECOND = 1000;

/**
 * The quick question put to the whole room: the bubble across the top, and a thumb over each
 * person as they answer.
 *
 * The clock is counted down here rather than taken from the server, as `WordQuizWidget` did -
 * only the question's total duration ever arrives.
 */
export const RoomQuizWidget = () => {
    const quiz = useRoomStore(x => x.quiz);
    const quizAnswers = useRoomStore(x => x.quizAnswers);
    const { tickQuiz, setQuizAnswered, closeQuiz, removeQuizAnswer } = useRoomQuizActions();
    const { send } = useWebSocketContext();
    const resultSeconds = useConfigValue<number>('poll.word.quiz.result.view.seconds') ?? DEFAULT_RESULT_SECONDS;
    const answerBubbleSeconds = useConfigValue<number>('poll.word.quiz.answer.bubble.seconds') ?? DEFAULT_ANSWER_BUBBLE_SECONDS;

    const isOpen = !!quiz && !quiz.finished && (quiz.secondsLeft > 0);
    const isFinished = !!quiz?.finished;

    // The clock only runs while the question is open.
    useEffect(() => {
        if (!isOpen) return;

        const timer = setInterval(tickQuiz, MS_PER_SECOND);

        return () => {
            clearInterval(timer);
        };
    }, [ isOpen, tickQuiz ]);

    // Once the result is up it stays for its few seconds and then the bubble goes.
    useEffect(() => {
        if (!isFinished) return;

        const timer = setTimeout(closeQuiz, resultSeconds * MS_PER_SECOND);

        return () => {
            clearTimeout(timer);
        };
    }, [ isFinished, resultSeconds, closeQuiz ]);

    if (!quiz) return null;

    const answer = (value: string) => {
        if (quiz.answered) return;

        send(new PollAnswerComposer({ pollId: quiz.pollId, questionId: quiz.questionId, answers: [ value ] }));
        setQuizAnswered();
    };

    return (
        <>
            <RoomQuizView
                content={quiz.content}
                secondsLeft={quiz.secondsLeft}
                showResult={quiz.answered || quiz.finished || (quiz.secondsLeft <= 0)}
                likes={quiz.answerCounts[QUIZ_VALUE_LIKE] ?? 0}
                dislikes={quiz.answerCounts[QUIZ_VALUE_DISLIKE] ?? 0}
                onLike={() => answer(QUIZ_VALUE_LIKE)}
                onDislike={() => answer(QUIZ_VALUE_DISLIKE)}
            />
            {quizAnswers.map(entry => (
                <QuizAnswerSign
                    key={entry.key}
                    userId={entry.userId}
                    liked={entry.value === QUIZ_VALUE_LIKE}
                    seconds={answerBubbleSeconds}
                    onExpire={() => removeQuizAnswer(entry.key)}
                />
            ))}
        </>
    );
};

type QuizAnswerSignProps = {
    userId: number;
    liked: boolean;
    seconds: number;
    onExpire: () => void;
};

/** One thumb, following its avatar until its few seconds are up. */
const QuizAnswerSign = ({ userId, liked, seconds, onExpire }: QuizAnswerSignProps) => {
    const objectId = useRoomObjectIdByWebId(userId, RoomObjectUserType.User);

    // The answer expires whether or not its avatar is still here to show it.
    useEffect(() => {
        const timer = setTimeout(onExpire, seconds * MS_PER_SECOND);

        return () => {
            clearTimeout(timer);
        };
    }, [ seconds, onExpire ]);

    // Somebody who has since left the room has nothing to hang a thumb over.
    if (objectId === undefined) return null;

    return (
        <RoomObjectMenuBubble objectData={{ objectId, category: RoomObjectCategoryEnum.Unit }}>
            <RoomQuizAnswerSignView liked={liked} />
        </RoomObjectMenuBubble>
    );
};
