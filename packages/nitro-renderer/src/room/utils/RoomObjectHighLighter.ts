import { IRoom, IRoomObject, IRoomObjectHighLighter, RoomObjectCategoryEnum, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { ColorMatrix, ColorMatrixFilter, Filter } from 'pixi.js';
import { GlowFilter } from 'pixi-filters';

import { WiredFurnitureBorderFilter } from '../../utils';
import { FurnitureVisualization } from '../object';

/**
 * Port of Flash `roomevents/wired_setup/RoomObjectHighLighter.as`, plus the room side of
 * `roomevents/wired_menu/tabs/tab_variable_overview/VariableHoldersHighlighter.as`, which marks
 * its furni through the same static helpers. See `IRoomObjectHighLighter` for why it lives in the
 * engine.
 *
 * Every look is a list of filters added to `FurnitureVisualization.filters`, and a look is
 * recognised on a furni by the identity of its filters, as in Flash. The lists are shared by
 * every furni and every room: a filter here has no per-object state, so marking a thousand furni
 * costs one shader each, not a thousand.
 *
 * - picked furni (`_filterBW`): washed out to blue-grey with its black outline turned white.
 *   Wall items (`_filterBWWall`) also get a white inner glow, as they have no outline to speak of.
 *   It goes in front of whatever else the furni carries.
 * - with two pick sets, the first set is tinted yellow (`_dualPicking1Filter`) and the second
 *   blue (`_dualPicking2Filter`) on top of that; a furni in both sets carries both tints.
 * - the wired box being edited: a translucent cyan tint.
 * - variable holders: nearly the same tint with a cyan inner glow - the furni twin of
 *   `AvatarVisualization`'s `figure_highlight_variable_holder` look.
 *
 * Pixi's colour matrix takes its offsets in 0-1 where Flash's are 0-255. A Flash inner
 * `GlowFilter(colour, 1, blur, blur, strength)` becomes a `GlowFilter` of that distance with only
 * an inner strength, the mapping `AvatarVisualization` uses.
 */
export class RoomObjectHighLighter implements IRoomObjectHighLighter {
    private static FILTER_BW: Filter[] | undefined = undefined;
    private static FILTER_BW_WALL: Filter[] | undefined = undefined;
    private static ACTIVE_WIRED_FILTER: Filter[] | undefined = undefined;
    private static DUAL_PICKING_1_FILTER: Filter[] | undefined = undefined;
    private static DUAL_PICKING_2_FILTER: Filter[] | undefined = undefined;
    private static VARIABLE_HOLDER_FILTER: Filter[] | undefined = undefined;

    constructor(private _room: IRoom) { }

    public show(furniId: number, dualPicking: boolean, picks: number): void {
        this.activateFurni(this.getFurni(furniId), furniId < 0, dualPicking, picks);
    }

    public hide(furniId: number, dualPicking: boolean, picks: number): void {
        this.inactivateFurni(this.getFurni(furniId), furniId < 0, dualPicking, picks);
    }

    public showAll(furniIds: Iterable<number>, dualPicking: boolean, picks: number): void {
        for (const furniId of furniIds) this.show(furniId, dualPicking, picks);
    }

    public hideAll(furniIds: Iterable<number>, dualPicking: boolean, picks: number): void {
        for (const furniId of furniIds) this.hide(furniId, dualPicking, picks);
    }

    public highlightActiveWired(furniId: number): void {
        RoomObjectHighLighter.addFiltersToFurni(this.getFurni(furniId), RoomObjectHighLighter.getActiveWiredFilter());
    }

    public unhighlightActiveWired(furniId: number): void {
        RoomObjectHighLighter.removeFiltersFromFurni(this.getFurni(furniId), RoomObjectHighLighter.getActiveWiredFilter());
    }

    /**
     * Flash has no such call: `UserDefinedRoomEventsCtrl.close` hides both of its pick sets and
     * the active wired by id. This does the same for a caller that no longer has the ids.
     */
    public clear(): void {
        const filters = [
            ...RoomObjectHighLighter.getFilterBWWall(),
            ...RoomObjectHighLighter.getDualPicking1Filter(),
            ...RoomObjectHighLighter.getDualPicking2Filter(),
            ...RoomObjectHighLighter.getActiveWiredFilter(),
        ];

        for (const category of [ RoomObjectCategoryEnum.Floor, RoomObjectCategoryEnum.Wall ]) {
            for (const object of this._room.getRoomObjectsForCategory(category)) RoomObjectHighLighter.removeFiltersFromFurni(object, filters);
        }
    }

    public highlightVariableHolderFurni(furniId: number): void {
        RoomObjectHighLighter.addFiltersToFurni(this.getFurni(furniId), RoomObjectHighLighter.getVariableHolderFilter());
    }

    public unhighlightVariableHolderFurni(furniId: number): void {
        RoomObjectHighLighter.removeFiltersFromFurni(this.getFurni(furniId), RoomObjectHighLighter.getVariableHolderFilter());
    }

    /**
     * Flash told the two kinds of unit apart by the user data's type: a pet is drawn by a
     * furniture visualization and takes the furni filters, everything else is an avatar and
     * takes the model flag `AvatarVisualization` draws. The visualization itself says as much.
     */
    public highlightVariableHolderUser(roomIndex: number): void {
        const object = this._room.getRoomObject(roomIndex, RoomObjectCategoryEnum.Unit);

        if (!object) return;

        if (object.visualization instanceof FurnitureVisualization) RoomObjectHighLighter.addFiltersToFurni(object, RoomObjectHighLighter.getVariableHolderFilter());
        else object.model.setValue(RoomObjectVariableEnum.FigureHighlightVariableHolder, 1);
    }

    public unhighlightVariableHolderUser(roomIndex: number): void {
        RoomObjectHighLighter.removeVariableHolderFromUser(this._room.getRoomObject(roomIndex, RoomObjectCategoryEnum.Unit));
    }

    /** `VariableHoldersHighlighter.clear`, for a caller that no longer has the ids. */
    public clearVariableHolders(): void {
        const filters = RoomObjectHighLighter.getVariableHolderFilter();

        for (const category of [ RoomObjectCategoryEnum.Floor, RoomObjectCategoryEnum.Wall ]) {
            for (const object of this._room.getRoomObjectsForCategory(category)) RoomObjectHighLighter.removeFiltersFromFurni(object, filters);
        }

        for (const object of this._room.getRoomObjectsForCategory(RoomObjectCategoryEnum.Unit)) RoomObjectHighLighter.removeVariableHolderFromUser(object);
    }

    private static removeVariableHolderFromUser(object: IRoomObject | undefined): void {
        if (!object) return;

        if (object.visualization instanceof FurnitureVisualization) RoomObjectHighLighter.removeFiltersFromFurni(object, RoomObjectHighLighter.getVariableHolderFilter());
        else if (object.model.getValue<number>(RoomObjectVariableEnum.FigureHighlightVariableHolder) > 0) object.model.setValue(RoomObjectVariableEnum.FigureHighlightVariableHolder, 0);
    }

    private getFurni(furniId: number): IRoomObject | undefined {
        if (furniId < 0) return this._room.getRoomObject(-furniId, RoomObjectCategoryEnum.Wall);

        return this._room.getRoomObject(furniId, RoomObjectCategoryEnum.Floor);
    }

    private activateFurni(object: IRoomObject | undefined, isWallItem: boolean, dualPicking: boolean, picks: number): void {
        RoomObjectHighLighter.addFiltersToFurni(object, isWallItem ? RoomObjectHighLighter.getFilterBWWall() : RoomObjectHighLighter.getFilterBW(), true);

        if (dualPicking) RoomObjectHighLighter.addFiltersToFurni(object, picks === 1 ? RoomObjectHighLighter.getDualPicking1Filter() : RoomObjectHighLighter.getDualPicking2Filter());
    }

    /** A furni that is still in the other pick set keeps the picked look, so it is put back. */
    private inactivateFurni(object: IRoomObject | undefined, isWallItem: boolean, dualPicking: boolean, picks: number): void {
        const pickedFilter = isWallItem ? RoomObjectHighLighter.getFilterBWWall() : RoomObjectHighLighter.getFilterBW();

        RoomObjectHighLighter.removeFiltersFromFurni(object, pickedFilter);

        if (!dualPicking) return;

        RoomObjectHighLighter.removeFiltersFromFurni(object, picks === 1 ? RoomObjectHighLighter.getDualPicking1Filter() : RoomObjectHighLighter.getDualPicking2Filter());

        if (RoomObjectHighLighter.hasFilters(object, picks === 1 ? RoomObjectHighLighter.getDualPicking2Filter() : RoomObjectHighLighter.getDualPicking1Filter())) RoomObjectHighLighter.addFiltersToFurni(object, pickedFilter, true);
    }

    private static getFurniVisualization(object: IRoomObject | undefined): FurnitureVisualization | undefined {
        return (object?.visualization instanceof FurnitureVisualization) ? object.visualization : undefined;
    }

    private static addFiltersToFurni(object: IRoomObject | undefined, filters: Filter[], prepend: boolean = false): void {
        const visualization = RoomObjectHighLighter.getFurniVisualization(object);

        if (!visualization || RoomObjectHighLighter.hasFilters(object, filters)) return;

        visualization.filters = prepend ? filters.concat(visualization.filters) : visualization.filters.concat(filters);
    }

    private static removeFiltersFromFurni(object: IRoomObject | undefined, filters: Filter[]): void {
        const visualization = RoomObjectHighLighter.getFurniVisualization(object);

        if (!visualization || !visualization.filters.length) return;

        const remaining = visualization.filters.filter(filter => filters.indexOf(filter) === -1);

        if (remaining.length !== visualization.filters.length) visualization.filters = remaining;
    }

    /** True when the furni carries any one of `filters`. */
    private static hasFilters(object: IRoomObject | undefined, filters: Filter[]): boolean {
        const visualization = RoomObjectHighLighter.getFurniVisualization(object);

        if (!visualization) return false;

        return visualization.filters.some(filter => filters.indexOf(filter) !== -1);
    }

    private static createColorMatrixFilter(matrix: ColorMatrix): ColorMatrixFilter {
        const filter = new ColorMatrixFilter({ resolution: 'inherit' });

        filter.matrix = matrix;

        return filter;
    }

    private static getFilterBW(): Filter[] {
        if (!RoomObjectHighLighter.FILTER_BW) RoomObjectHighLighter.FILTER_BW = [ new WiredFurnitureBorderFilter() ];

        return RoomObjectHighLighter.FILTER_BW;
    }

    /** Shares the picked filter with `getFilterBW`, as Flash's two lists share theirs. */
    private static getFilterBWWall(): Filter[] {
        if (!RoomObjectHighLighter.FILTER_BW_WALL) RoomObjectHighLighter.FILTER_BW_WALL = [ ...RoomObjectHighLighter.getFilterBW(), new GlowFilter({ color: 0xFFFFFF, alpha: 1, distance: 5, outerStrength: 0, innerStrength: 3 }) ];

        return RoomObjectHighLighter.FILTER_BW_WALL;
    }

    private static getActiveWiredFilter(): Filter[] {
        if (!RoomObjectHighLighter.ACTIVE_WIRED_FILTER) RoomObjectHighLighter.ACTIVE_WIRED_FILTER = [ RoomObjectHighLighter.createColorMatrixFilter([ 0.9, 0, 0, 0, 0, 0, 1, 0, 0, 40 / 255, 0, 0, 1, 0, 80 / 255, 0, 0, 0, 0.8, 0 ]) ];

        return RoomObjectHighLighter.ACTIVE_WIRED_FILTER;
    }

    private static getDualPicking1Filter(): Filter[] {
        if (!RoomObjectHighLighter.DUAL_PICKING_1_FILTER) RoomObjectHighLighter.DUAL_PICKING_1_FILTER = [ RoomObjectHighLighter.createColorMatrixFilter([ 1.13, 0, 0, 0, 35 / 255, 0, 1.13, 0, 0, 35 / 255, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0 ]) ];

        return RoomObjectHighLighter.DUAL_PICKING_1_FILTER;
    }

    private static getDualPicking2Filter(): Filter[] {
        if (!RoomObjectHighLighter.DUAL_PICKING_2_FILTER) RoomObjectHighLighter.DUAL_PICKING_2_FILTER = [ RoomObjectHighLighter.createColorMatrixFilter([ 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1.15, 0, 40 / 255, 0, 0, 0, 1, 0 ]) ];

        return RoomObjectHighLighter.DUAL_PICKING_2_FILTER;
    }

    private static getVariableHolderFilter(): Filter[] {
        if (!RoomObjectHighLighter.VARIABLE_HOLDER_FILTER) RoomObjectHighLighter.VARIABLE_HOLDER_FILTER = [ RoomObjectHighLighter.createColorMatrixFilter([ 0.9, 0, 0, 0, 0, 0, 1, 0, 0, 40 / 255, 0, 0, 1, 0, 80 / 255, 0, 0, 0, 0.85, 0 ]), new GlowFilter({ color: 0xBBF7FA, alpha: 1, distance: 4, outerStrength: 0, innerStrength: 4 }) ];

        return RoomObjectHighLighter.VARIABLE_HOLDER_FILTER;
    }
}
