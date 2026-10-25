import { StateCreator } from 'zustand';

/** The in-room quick question everyone in the room is asked at once. */
export interface RoomQuiz {
    pollId: number;
    /** The id answers are sent against - the question's own, not the poll's. */
    questionId: number;
    content: string;
    /** Seconds left to answer; zero once the clock has run out or there was never one. */
    secondsLeft: number;
    /** Set once we have answered: the bubble turns into the tally. */
    answered: boolean;
    /** Set when the server closes the question, which is when everyone sees the result. */
    finished: boolean;
    /** Votes so far, keyed by choice value ("0" against, "1" for). */
    answerCounts: Record<string, number>;
}

/** Somebody else's answer, shown as a thumb over their head for a moment. */
export interface RoomQuizAnswer {
    /** Unique per answer, so the same person answering twice gets two signs. */
    key: number;
    userId: number;
    value: string;
}

type State = {
    quiz: RoomQuiz | undefined;
    quizAnswers: RoomQuizAnswer[];
};

type Actions = {
    startQuiz: (pollId: number, questionId: number, content: string, secondsLeft: number) => void;
    /** Counts the seconds down; the question closes itself when the clock runs out. */
    tickQuiz: () => void;
    setQuizAnswered: () => void;
    finishQuiz: (questionId: number, answerCounts: Record<string, number>) => void;
    addQuizAnswer: (userId: number, value: string, answerCounts: Record<string, number>) => void;
    removeQuizAnswer: (key: number) => void;
    closeQuiz: () => void;
};

export const RoomQuizSliceInitialState: State = {
    quiz: undefined,
    quizAnswers: [],
};

export type RoomQuizSlice = State & Actions;

let nextAnswerKey = 0;

export const createRoomQuizSlice: StateCreator<RoomQuizSlice, [], [], RoomQuizSlice> = set => ({
    ...RoomQuizSliceInitialState,
    startQuiz: (pollId, questionId, content, secondsLeft) => set({
        quiz: { pollId, questionId, content, secondsLeft, answered: false, finished: false, answerCounts: {} },
        quizAnswers: [],
    }),
    tickQuiz: () => set(x => (x.quiz
        ? { quiz: { ...x.quiz, secondsLeft: Math.max(0, x.quiz.secondsLeft - 1) } }
        : x)),
    setQuizAnswered: () => set(x => (x.quiz ? { quiz: { ...x.quiz, answered: true } } : x)),
    // A result for a question that is no longer the one on screen is somebody else's.
    finishQuiz: (questionId, answerCounts) => set(x => ((x.quiz && (x.quiz.questionId === questionId))
        ? { quiz: { ...x.quiz, finished: true, answerCounts } }
        : x)),
    addQuizAnswer: (userId, value, answerCounts) => set(x => ({
        quiz: x.quiz ? { ...x.quiz, answerCounts } : x.quiz,
        quizAnswers: [ ...x.quizAnswers, { key: nextAnswerKey++, userId, value } ],
    })),
    removeQuizAnswer: key => set(x => ({ quizAnswers: x.quizAnswers.filter(answer => answer.key !== key) })),
    closeQuiz: () => set({ quiz: undefined, quizAnswers: [] }),
});
