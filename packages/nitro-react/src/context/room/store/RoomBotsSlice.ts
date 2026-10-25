import { IBotSkillWithCommand } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** The skill configuration windows a rentable bot's menu opens: `BotSkillConfigurationViewBase`. */
export const BOT_SKILL_SETUP_CHAT = 2;
export const BOT_SKILL_CHANGE_NAME = 5;

export interface RoomBotSkillConfiguration {
    botId: number;
    skillType: number;
    /** The bot's current setting for that skill, once the server has answered. */
    data: string | undefined;
}

type State = {
    /** The skills that carry a command (links, NUX steps), by bot server id - `BotSkillListUpdateMessage`. */
    botSkillsById: Record<number, IBotSkillWithCommand[]>;
    botSkillConfiguration: RoomBotSkillConfiguration | undefined;
    /** A bot whose menu the server asked to open, until it is opened. */
    forcedBotMenuId: number | undefined;
};

type Actions = {
    setBotSkills: (botId: number, skills: IBotSkillWithCommand[]) => void;
    openBotSkillConfiguration: (botId: number, skillType: number) => void;
    /** Ignored unless it answers the window that is open. */
    setBotSkillConfigurationData: (botId: number, skillType: number, data: string) => void;
    closeBotSkillConfiguration: () => void;
    setForcedBotMenuId: (botId: number | undefined) => void;
};

export const RoomBotsSliceInitialState: State = {
    botSkillsById: {},
    botSkillConfiguration: undefined,
    forcedBotMenuId: undefined,
};

export type RoomBotsSlice = State & Actions;

export const createRoomBotsSlice: StateCreator<RoomBotsSlice, [], [], RoomBotsSlice> = set => ({
    ...RoomBotsSliceInitialState,
    setBotSkills: (botId, skills) => set(x => ({ botSkillsById: { ...x.botSkillsById, [botId]: skills } })),
    openBotSkillConfiguration: (botId, skillType) => set({ botSkillConfiguration: { botId, skillType, data: undefined } }),
    setBotSkillConfigurationData: (botId, skillType, data) => set((x) => {
        const open = x.botSkillConfiguration;

        if (!open || (open.botId !== botId) || (open.skillType !== skillType)) return x;

        return { botSkillConfiguration: { ...open, data } };
    }),
    closeBotSkillConfiguration: () => set({ botSkillConfiguration: undefined }),
    setForcedBotMenuId: forcedBotMenuId => set({ forcedBotMenuId }),
});
