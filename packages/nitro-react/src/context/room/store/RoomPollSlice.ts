import { PollContentsEventMessageType } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/**
 * A poll the server has put to the user: first the offer to take part, then its questions once
 * they have said yes. Flash kept one `PollSession` per poll id; only one is ever on screen, so
 * the port keeps the current one.
 */
export interface RoomPoll {
    id: number;
    headline: string;
    summary: string;
    contents: PollContentsEventMessageType | undefined;
}

type State = {
    poll: RoomPoll | undefined;
    /** The message behind `PollErrorEventMessage`, shown as its own alert. */
    pollError: string | undefined;
};

type Actions = {
    offerPoll: (id: number, headline: string, summary: string) => void;
    setPollContents: (contents: PollContentsEventMessageType) => void;
    closePoll: () => void;
    setPollError: (pollError: string | undefined) => void;
};

export const RoomPollSliceInitialState: State = {
    poll: undefined,
    pollError: undefined,
};

export type RoomPollSlice = State & Actions;

export const createRoomPollSlice: StateCreator<RoomPollSlice, [], [], RoomPollSlice> = set => ({
    ...RoomPollSliceInitialState,
    offerPoll: (id, headline, summary) => set({ poll: { id, headline, summary, contents: undefined } }),
    // The contents name their own poll, and a poll nobody accepted should not open questions.
    setPollContents: contents => set(x => ((x.poll && (x.poll.id === contents.id)) ? { poll: { ...x.poll, contents } } : x)),
    closePoll: () => set({ poll: undefined }),
    setPollError: pollError => set({ pollError }),
});
