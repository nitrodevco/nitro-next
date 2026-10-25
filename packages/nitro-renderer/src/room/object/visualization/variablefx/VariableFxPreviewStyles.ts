import { VariableFxCategory, VariableFxRendererName, VariableFxWidth } from './VariableFxTables';

/** One server style (category + style id) with the renderer/colour/width choices the wired editor offers and its default extras. */
export class VariableFxPreviewStyleDefinition {
    public defaultConfigExtra: Map<string, string>;
    public defaultStatusExtra: Map<string, string>;

    constructor(
        public allowedColors: string[],
        public allowedRenderers: string[],
        public allowedWidths: string[],
        public category: string,
        public categoryId: number,
        public defaultColor: string,
        public defaultRenderer: string,
        public defaultWidth: string,
        public serverStyle: string,
        public styleId: number,
        defaultConfigExtra?: Map<string, string>,
        defaultStatusExtra?: Map<string, string>,
    ) {
        this.defaultConfigExtra = defaultConfigExtra ?? new Map();
        this.defaultStatusExtra = defaultStatusExtra ?? new Map();
    }
}

const extra = (...pairs: string[]): Map<string, string> => {
    const map = new Map<string, string>();

    for (let i = 0; i + 1 < pairs.length; i += 2) map.set(pairs[i], pairs[i + 1]);

    return map;
};

const normalColors = (): string[] => [ 'GREEN', 'LIME_GREEN', 'YELLOW', 'ORANGE', 'RED', 'CYAN', 'BLUE', 'PURPLE', 'PINK', 'BROWN', 'BEIGE', 'TEAL', 'INDIGO', 'MAGENTA', 'LIGHT_BLUE', 'FIRE_ORANGE', 'DARK_GREEN', 'DARK_BLUE', 'WHITE', 'BRONZE', 'SILVER', 'GOLD', 'DIAMOND', 'EMERALD' ];
const allAndTeamColors = (): string[] => [ ...normalColors(), 'DYNAMIC_TEAM_COLOR' ];
const allAndRedToGreenColors = (): string[] => [ ...normalColors(), 'DYNAMIC_RED_TO_GREEN', 'DYNAMIC_TEAM_COLOR' ];
const levellingColors = (): string[] => [ ...normalColors(), 'DYNAMIC_LEVELLING', 'DYNAMIC_TEAM_COLOR' ];
const dynamicRedToGreenColors = (): string[] => [ 'DYNAMIC_RED_TO_GREEN' ];
const numberTeamColors = (): string[] => [ 'RED', 'GREEN', 'BLUE', 'YELLOW', 'WHITE', 'DYNAMIC_TEAM_COLOR' ];
const smallToLargeWidths = (): string[] => [ VariableFxWidth.SMALL, VariableFxWidth.MEDIUM, VariableFxWidth.LARGE ];
const sToXlWidths = (): string[] => [ VariableFxWidth.SMALL, VariableFxWidth.MEDIUM, VariableFxWidth.LARGE, VariableFxWidth.EXTRA_LARGE ];
const xsToXlWidths = (): string[] => [ VariableFxWidth.EXTRA_SMALL, VariableFxWidth.SMALL, VariableFxWidth.MEDIUM, VariableFxWidth.LARGE, VariableFxWidth.EXTRA_LARGE ];
const lToXxlWidths = (): string[] => [ VariableFxWidth.LARGE, VariableFxWidth.EXTRA_LARGE, VariableFxWidth.BIG_MAHOOSIVE_CHONKY ];
const statusRenderers = (): string[] => [ VariableFxRendererName.BLOCK_PROGRESS, VariableFxRendererName.STRIPED_PROGRESS, VariableFxRendererName.ARROW_PROGRESS ];
const levelStatusExtra = (): Map<string, string> => extra('current_level', '1', 'is_maxed', 'false', 'max_level', '25');

const definition = (allowedColors: string[], allowedRenderers: string[], allowedWidths: string[], category: string, categoryId: number, defaultColor: string, defaultRenderer: string, defaultWidth: string, serverStyle: string, styleId: number, defaultConfigExtra?: Map<string, string>, defaultStatusExtra?: Map<string, string>): VariableFxPreviewStyleDefinition => {
    return new VariableFxPreviewStyleDefinition(allowedColors, allowedRenderers, allowedWidths, category, categoryId, defaultColor, defaultRenderer, defaultWidth, serverStyle, styleId, defaultConfigExtra, defaultStatusExtra);
};

const statusDefinition = (serverStyle: string, styleId: number, icon: string, color: string, metallic: boolean = false): VariableFxPreviewStyleDefinition => {
    return definition([ 'NOT_APPLICABLE' ], statusRenderers(), xsToXlWidths(), VariableFxCategory.STATUS_BAR, VariableFxCategory.STATUS_BAR_ID, 'NOT_APPLICABLE', VariableFxRendererName.BLOCK_PROGRESS, VariableFxWidth.MEDIUM, serverStyle, styleId, extra('icon', icon, 'color', color, 'metallic', String(metallic)));
};

let definitions: VariableFxPreviewStyleDefinition[] | undefined = undefined;

const initialize = (): VariableFxPreviewStyleDefinition[] => {
    if (definitions) return definitions;

    definitions = [
        definition(allAndTeamColors(), [ 'classic_progress' ], xsToXlWidths(), 'progress_bar', 1, 'GREEN', 'classic_progress', 'medium', 'CLASSIC_BAR', 0),
        definition(allAndTeamColors(), [ 'block_progress' ], xsToXlWidths(), 'progress_bar', 1, 'GREEN', 'block_progress', 'medium', 'BLOCK_BAR', 1),
        definition(allAndTeamColors(), [ 'striped_progress' ], xsToXlWidths(), 'progress_bar', 1, 'GREEN', 'striped_progress', 'medium', 'STRIPED_BAR', 2),
        definition(allAndTeamColors(), [ 'arrow_progress' ], xsToXlWidths(), 'progress_bar', 1, 'GREEN', 'arrow_progress', 'medium', 'ARROW_BAR', 3),
        definition(allAndTeamColors(), [ 'classic_mini_progress' ], xsToXlWidths(), 'progress_bar', 1, 'GREEN', 'classic_mini_progress', 'medium', 'CLASSIC_MINI_BAR', 4),
        definition(dynamicRedToGreenColors(), [ 'health_progress' ], smallToLargeWidths(), 'health_points', 0, 'DYNAMIC_RED_TO_GREEN', 'health_progress', 'medium', 'HEALTH_BAR', 0, extra('icon', 'misc_heart')),
        definition(allAndTeamColors(), [ 'masked_heart_fill' ], [ 'not_applicable' ], 'health_points', 0, 'RED', 'masked_heart_fill', 'not_applicable', 'SINGLE_HEART', 3),
        definition(allAndTeamColors(), [ 'stacked_health_points' ], [ 'medium', 'large' ], 'health_points', 0, 'RED', 'stacked_health_points', 'medium', 'STACKED', 1),
        definition([ 'NOT_APPLICABLE' ], [ 'thermometer_health_points' ], xsToXlWidths(), 'health_points', 0, 'NOT_APPLICABLE', 'thermometer_health_points', 'medium', 'THERMOMETER', 2),
        definition(levellingColors(), [ 'level_with_progress' ], smallToLargeWidths(), 'levelling_progress', 2, 'DYNAMIC_LEVELLING', 'level_with_progress', 'medium', 'LEVEL_AND_BAR', 0, extra('sub_renderer', '2'), levelStatusExtra()),
        definition(levellingColors(), [ 'level_with_bar_and_numerical_progress' ], sToXlWidths(), 'levelling_progress', 2, 'DYNAMIC_LEVELLING', 'level_with_bar_and_numerical_progress', 'medium', 'LEVEL_DETAILS', 1, extra('sub_renderer', '1'), levelStatusExtra()),
        definition([ 'RED' ], [ 'boss_health_bar' ], lToXxlWidths(), 'boss_bar', 4, 'RED', 'boss_health_bar', 'extra_large', 'BOSS_HEALTH_AND_SKULL', 0, extra('icon', 'misc_skull', 'icon_alignment', 'double')),
        definition(allAndRedToGreenColors(), [ 'boss_health_bar' ], lToXxlWidths(), 'boss_bar', 4, 'RED', 'boss_health_bar', 'extra_large', 'BOSS_HEALTH', 1),
        definition(numberTeamColors(), [ 'number_baked_colors' ], [ 'not_applicable' ], 'number_display', 5, 'GREEN', 'number_baked_colors', 'not_applicable', 'NUMBER_FREEZE', 0, extra('design', 'freeze_style')),
        definition(allAndTeamColors(), [ 'number_recolorable' ], [ 'not_applicable' ], 'number_display', 5, 'GREEN', 'number_recolorable', 'not_applicable', 'NUMBER_SHALIMAR', 1, extra('design', 'shalimar')),
        definition(allAndTeamColors(), [ 'number_recolorable' ], [ 'not_applicable' ], 'number_display', 5, 'GREEN', 'number_recolorable', 'not_applicable', 'NUMBER_BLOCKY', 2, extra('design', 'blocky')),
        statusDefinition('STATUS_ENERGY', 0, 'energy', '#ffd83d'),
        statusDefinition('STATUS_SHIELD', 1, 'shield', '#4aa9f6'),
        statusDefinition('STATUS_MAGIC', 2, 'magic', '#8751d1'),
        statusDefinition('STATUS_FOOD', 3, 'food', '#ff9f24'),
        statusDefinition('STATUS_STAMINA', 4, 'stamina', '#86d213'),
        statusDefinition('STATUS_POISON', 5, 'poison', '#8ddc35'),
        statusDefinition('STATUS_MANA', 6, 'mana', '#268fff'),
        statusDefinition('STATUS_HEALTH', 7, 'health', '#7dce35'),
        statusDefinition('STATUS_GOLD', 8, 'gold', '#ffc83d', true),
        statusDefinition('STATUS_GEMS', 9, 'gems', '#416bdd', true),
        statusDefinition('STATUS_HONOR', 10, 'honor', '#fac384'),
        statusDefinition('STATUS_REPUTATION', 11, 'reputation', '#ffd83d'),
        statusDefinition('STATUS_COOLDOWN', 12, 'cooldown', '#b8c3cc'),
        statusDefinition('STATUS_TIME_LEFT', 13, 'timeleft', '#74b9e8'),
        statusDefinition('STATUS_BURNING', 14, 'burning', '#ff5a1f'),
        statusDefinition('STATUS_FREEZING', 15, 'freezing', '#82cfff'),
        definition(dynamicRedToGreenColors(), statusRenderers(), xsToXlWidths(), 'status_bar', 3, 'DYNAMIC_RED_TO_GREEN', 'block_progress', 'medium', 'STATUS_BATTERY', 16, extra('icon', 'battery')),
        statusDefinition('STATUS_REPAIRING', 17, 'repairing', '#c9c5b8', true),
        statusDefinition('STATUS_STEALTH', 18, 'stealth', '#6254a8'),
        statusDefinition('STATUS_UPGRADING', 19, 'upgrading', '#6bdc34'),
        statusDefinition('STATUS_STAR_POWER', 20, 'star_power', '#ffd900', true),
        statusDefinition('STATUS_WATER', 21, 'droplet', '#4aabf5'),
    ];

    return definitions;
};

export class VariableFxPreviewStyles {
    public static get DEFINITIONS(): VariableFxPreviewStyleDefinition[] {
        return initialize();
    }

    public static getByServerStyle(serverStyle: string): VariableFxPreviewStyleDefinition | undefined {
        return initialize().find(item => item.serverStyle === serverStyle);
    }

    public static getByCategoryAndStyleId(categoryId: number, styleId: number): VariableFxPreviewStyleDefinition | undefined {
        return initialize().find(item => item.categoryId === categoryId && item.styleId === styleId);
    }

    public static getByCategoryId(categoryId: number): VariableFxPreviewStyleDefinition[] {
        return initialize().filter(item => item.categoryId === categoryId);
    }

    public static getImplementedServerStyles(): string[] {
        return initialize().map(item => item.serverStyle);
    }
}
