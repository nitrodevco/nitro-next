/** Server id <-> name tables shared by the Variable FX logic and visualization (Flash `VariableFxServerTables` + friends). */

export type VariableFxIconAlignment = 'left' | 'right' | 'double';

export class VariableFxCategory {
    public static HEALTH_POINTS: string = 'health_points';
    public static PROGRESS_BAR: string = 'progress_bar';
    public static LEVELLING_PROGRESS: string = 'levelling_progress';
    public static STATUS_BAR: string = 'status_bar';
    public static BOSS_BAR: string = 'boss_bar';
    public static NUMBER_DISPLAY: string = 'number_display';

    public static HEALTH_POINTS_ID: number = 0;
    public static PROGRESS_BAR_ID: number = 1;
    public static LEVELLING_PROGRESS_ID: number = 2;
    public static STATUS_BAR_ID: number = 3;
    public static BOSS_BAR_ID: number = 4;
    public static NUMBER_DISPLAY_ID: number = 5;
}

export class VariableFxWidth {
    public static NOT_APPLICABLE: string = 'not_applicable';
    public static EXTRA_SMALL: string = 'extra_small';
    public static SMALL: string = 'small';
    public static MEDIUM: string = 'medium';
    public static LARGE: string = 'large';
    public static EXTRA_LARGE: string = 'extra_large';
    public static BIG_MAHOOSIVE_CHONKY: string = 'big_mahoosive_chonky';
}

export class VariableFxRendererName {
    public static CLASSIC_PROGRESS: string = 'classic_progress';
    public static CLASSIC_MINI_PROGRESS: string = 'classic_mini_progress';
    public static BLOCK_PROGRESS: string = 'block_progress';
    public static STRIPED_PROGRESS: string = 'striped_progress';
    public static ARROW_PROGRESS: string = 'arrow_progress';
    public static HEALTH_PROGRESS: string = 'health_progress';
    public static MASKED_HEART_FILL: string = 'masked_heart_fill';
    public static STACKED_HEALTH_POINTS: string = 'stacked_health_points';
    public static THERMOMETER_HEALTH_POINTS: string = 'thermometer_health_points';
    public static LEVEL_WITH_PROGRESS: string = 'level_with_progress';
    public static LEVEL_WITH_BAR_AND_NUMERICAL_PROGRESS: string = 'level_with_bar_and_numerical_progress';
    public static BOSS_HEALTH_BAR: string = 'boss_health_bar';
    public static NUMERICAL_PROGRESS: string = 'numerical_progress';
    public static NUMBER_RECOLORABLE: string = 'number_recolorable';
    public static NUMBER_BAKED_COLORS: string = 'number_baked_colors';

    public static CLASSIC_PROGRESS_ID: number = 0;
    public static CLASSIC_MINI_PROGRESS_ID: number = 1;
    public static BLOCK_PROGRESS_ID: number = 2;
    public static STRIPED_PROGRESS_ID: number = 3;
    public static ARROW_PROGRESS_ID: number = 4;
    public static HEALTH_PROGRESS_ID: number = 10;
    public static MASKED_HEART_FILL_ID: number = 11;
    public static STACKED_HEALTH_POINTS_ID: number = 12;
    public static THERMOMETER_HEALTH_POINTS_ID: number = 13;
    public static LEVEL_WITH_PROGRESS_ID: number = 20;
    public static LEVEL_WITH_BAR_AND_NUMERICAL_PROGRESS_ID: number = 21;
    public static BOSS_HEALTH_BAR_ID: number = 100;
    public static NUMERICAL_PROGRESS_ID: number = 101;
    public static NUMBER_RECOLORABLE_ID: number = 200;
    public static NUMBER_BAKED_COLORS_ID: number = 201;

    private static NAMES_BY_ID: Map<number, string> = new Map([
        [ 0, 'classic_progress' ],
        [ 1, 'classic_mini_progress' ],
        [ 2, 'block_progress' ],
        [ 3, 'striped_progress' ],
        [ 4, 'arrow_progress' ],
        [ 10, 'health_progress' ],
        [ 11, 'masked_heart_fill' ],
        [ 12, 'stacked_health_points' ],
        [ 13, 'thermometer_health_points' ],
        [ 20, 'level_with_progress' ],
        [ 21, 'level_with_bar_and_numerical_progress' ],
        [ 100, 'boss_health_bar' ],
        [ 101, 'numerical_progress' ],
        [ 200, 'number_recolorable' ],
        [ 201, 'number_baked_colors' ],
    ]);

    public static resolveById(id: number): string | undefined {
        return VariableFxRendererName.NAMES_BY_ID.get(id);
    }

    public static resolveId(name: string): number {
        for (const [ id, candidate ] of VariableFxRendererName.NAMES_BY_ID) if (candidate === name) return id;

        return -1;
    }
}

const CATEGORY_NAMES_BY_ID: Map<number, string> = new Map([
    [ 0, VariableFxCategory.HEALTH_POINTS ],
    [ 1, VariableFxCategory.PROGRESS_BAR ],
    [ 2, VariableFxCategory.LEVELLING_PROGRESS ],
    [ 3, VariableFxCategory.STATUS_BAR ],
    [ 4, VariableFxCategory.BOSS_BAR ],
    [ 5, VariableFxCategory.NUMBER_DISPLAY ],
]);

const COLOR_NAMES_BY_ID: Map<number, string> = new Map([
    [ -1, 'NOT_APPLICABLE' ],
    [ 1, 'GREEN' ],
    [ 2, 'LIME_GREEN' ],
    [ 3, 'YELLOW' ],
    [ 4, 'ORANGE' ],
    [ 5, 'RED' ],
    [ 6, 'CYAN' ],
    [ 7, 'BLUE' ],
    [ 8, 'PURPLE' ],
    [ 9, 'PINK' ],
    [ 10, 'BROWN' ],
    [ 11, 'BEIGE' ],
    [ 12, 'TEAL' ],
    [ 13, 'INDIGO' ],
    [ 14, 'MAGENTA' ],
    [ 15, 'LIGHT_BLUE' ],
    [ 16, 'FIRE_ORANGE' ],
    [ 17, 'DARK_GREEN' ],
    [ 18, 'DARK_BLUE' ],
    [ 19, 'WHITE' ],
    [ 100, 'BRONZE' ],
    [ 101, 'SILVER' ],
    [ 102, 'GOLD' ],
    [ 103, 'DIAMOND' ],
    [ 104, 'EMERALD' ],
    [ 1000, 'DYNAMIC_RED_TO_GREEN' ],
    [ 1001, 'DYNAMIC_LEVELLING' ],
    [ 1002, 'DYNAMIC_TEAM_COLOR' ],
]);

const WIDTH_NAMES_BY_ID: Map<number, string> = new Map([
    [ -1, VariableFxWidth.NOT_APPLICABLE ],
    [ 0, VariableFxWidth.EXTRA_SMALL ],
    [ 1, VariableFxWidth.SMALL ],
    [ 2, VariableFxWidth.MEDIUM ],
    [ 3, VariableFxWidth.LARGE ],
    [ 4, VariableFxWidth.EXTRA_LARGE ],
    [ 100, VariableFxWidth.BIG_MAHOOSIVE_CHONKY ],
]);

export class VariableFxServerTables {
    public static getCategoryIds(): number[] {
        return [ ...CATEGORY_NAMES_BY_ID.keys() ];
    }

    public static getColorIds(): number[] {
        return [ ...COLOR_NAMES_BY_ID.keys() ];
    }

    public static getWidthIds(): number[] {
        return [ ...WIDTH_NAMES_BY_ID.keys() ];
    }

    public static getRendererIds(): number[] {
        return [ 0, 1, 2, 3, 4, 10, 11, 12, 13, 20, 21, 100, 101, 200, 201 ];
    }

    public static resolveCategoryById(id: number): string | undefined {
        return CATEGORY_NAMES_BY_ID.get(id);
    }

    public static resolveCategoryId(name: string): number {
        for (const [ id, candidate ] of CATEGORY_NAMES_BY_ID) if (candidate === name) return id;

        return -1;
    }

    public static resolveColorById(id: number): string {
        return COLOR_NAMES_BY_ID.get(id) ?? 'NOT_APPLICABLE';
    }

    public static resolveColorId(name: string): number {
        for (const [ id, candidate ] of COLOR_NAMES_BY_ID) if (candidate === name) return id;

        return -1;
    }

    public static resolveWidthById(id: number): string {
        return WIDTH_NAMES_BY_ID.get(id) ?? VariableFxWidth.MEDIUM;
    }

    public static resolveWidthId(name: string): number {
        for (const [ id, candidate ] of WIDTH_NAMES_BY_ID) if (candidate === name) return id;

        return 2;
    }

    public static resolveRendererById(id: number): string | undefined {
        return VariableFxRendererName.resolveById(id);
    }

    public static resolveRendererId(name: string): number {
        return VariableFxRendererName.resolveId(name);
    }
}
