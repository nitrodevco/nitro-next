import { IPollQuestion, PollAnswerComposer, PollQuestionType, PollRejectComposer, PollStartComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomPollActions, useRoomStore } from '#base/context/room';
import { RoomPollOfferView } from '#base/views/room-widgets/poll/RoomPollOfferView';
import { RoomPollQuestionView } from '#base/views/room-widgets/poll/RoomPollQuestionView';

/** What the widget is holding while a poll's questions are being answered. */
type PollProgress = {
    /** Which poll this belongs to, so a second poll starts over rather than resuming this one. */
    pollId: number;
    /** Index into the poll's top-level questions. */
    index: number;
    /**
     * The category the last answer pointed at. A net-promoter poll asks a follow-up chosen by
     * what was just answered; every other poll leaves this at zero and walks straight through.
     */
    category: number;
    /** Set while the follow-up for `category` is the question on screen. */
    inFollowUp: boolean;
    selected: string[];
    text: string;
};

const EMPTY_PROGRESS: PollProgress = { pollId: 0, index: 0, category: 0, inFollowUp: false, selected: [], text: '' };

/**
 * Polls the server puts to the user: the offer, then its questions one at a time.
 *
 * Each answer is sent as it is given rather than all at the end, as `PollContentDialog` did, so
 * a poll abandoned halfway keeps whatever was answered.
 */
export const RoomPollWidget = () => {
    const poll = useRoomStore(x => x.poll);
    const { closePoll } = useRoomPollActions();
    const { send } = useWebSocketContext();
    const [ progress, setProgress ] = useState<PollProgress>(EMPTY_PROGRESS);

    const pollId = poll?.id ?? 0;

    // A different poll starts from its first question with nothing filled in.
    if (pollId !== progress.pollId) setProgress({ ...EMPTY_PROGRESS, pollId });

    if (!poll) return null;

    if (!poll.contents) return (
        <RoomPollOfferView
            headline={poll.headline}
            summary={poll.summary}
            onAccept={() => send(new PollStartComposer({ pollId: poll.id }))}
            onDecline={() => {
                send(new PollRejectComposer({ pollId: poll.id }));
                closePoll();
            }}
            // "Later" is silent: Flash sent nothing and simply dropped the window.
            onLater={closePoll}
        />
    );

    const questions = poll.contents.questions;
    const parent: IPollQuestion | undefined = questions[progress.index];

    /*
     * `PollContentDialog.getNextQuestion`: a net-promoter poll asks the follow-up whose category
     * matches the answer just given before moving on to the next top-level question.
     */
    const followUp = (poll.contents.npsPoll && progress.category)
        ? parent?.children.find(child => child.questionCategory === progress.category)
        : undefined;
    const question = progress.inFollowUp ? followUp : parent;

    if (!question) {
        closePoll();

        return null;
    }

    const isSingle = question.questionType === PollQuestionType.SingleChoice;
    const isText = (question.questionType === PollQuestionType.TextLine) || (question.questionType === PollQuestionType.TextArea);

    const toggleChoice = (value: string) => setProgress(previous => ({
        ...previous,
        selected: isSingle
            ? [ value ]
            : (previous.selected.includes(value)
                    ? previous.selected.filter(other => other !== value)
                    : [ ...previous.selected, value ]),
    }));

    const submit = () => {
        const answers = isText ? [ progress.text ] : progress.selected;

        // Nothing chosen is not an answer; Flash refused the same way rather than sending empty.
        if (!answers.length || (isText && !progress.text.length)) return;

        send(new PollAnswerComposer({ pollId: poll.id, questionId: question.questionId, answers }));

        /*
         * Only a choice on the top-level question of a net-promoter poll can open a follow-up,
         * and its `choiceType` names which one.
         */
        const category = (poll.contents?.npsPoll && !progress.inFollowUp && isSingle)
            ? (question.questionChoices.find(choice => choice.value === answers[0])?.choiceType ?? 0)
            : 0;

        const goToFollowUp = !progress.inFollowUp
            && !!category
            && parent.children.some(child => child.questionCategory === category);

        setProgress(previous => ({
            ...previous,
            index: goToFollowUp ? previous.index : (previous.index + 1),
            category,
            inFollowUp: goToFollowUp,
            selected: [],
            text: '',
        }));
    };

    return (
        <RoomPollQuestionView
            headline={poll.headline}
            question={question}
            number={progress.index + 1}
            count={questions.length}
            selected={progress.selected}
            text={progress.text}
            onToggleChoice={toggleChoice}
            onChangeText={text => setProgress(previous => ({ ...previous, text }))}
            onSubmit={submit}
            onCancel={closePoll}
        />
    );
};
