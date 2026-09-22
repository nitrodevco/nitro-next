import { RoomControllerLevelEnum, RoomThicknessType, SecurityLevelEnum } from '@nitrodevco/nitro-api';
import { useEffect, useMemo, useState } from 'react';

import { requestFloorPlanData, saveFloorPlan, saveFloorPlanImport } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useNavigatorStore } from '#base/context/navigator';
import { useOwnControllerLevel, useRoomFloorPlanActions, useRoomStore } from '#base/context/room';
import { useIsWindowVisible, useTranslation, useWindowActions } from '#base/context/system';
import { useOwnSecurityLevel, useUserActions, useUserStore } from '#base/context/user';
import { createFloorPlanModel, floorPlanModelText, FloorPlanTile } from '#base/utils';
import { FloorPlanEditorView } from '#base/views/room-widgets/floor-plan-editor/FloorPlanEditorView';

/**
 * The floor plan editor - `BCFloorPlanEditor`. Flash kept it in the window manager and opened it
 * from the room info panel (`RoomInfoViewCtrl.onFloorPlanEditorButtonClick`); here it is a room
 * widget, because everything it edits belongs to the room you are standing in and goes with it.
 *
 * Its gates:
 *
 * - `RoomInfoViewCtrl.refreshButtons` only offers the button at `roomControllerLevel >= 1`, so
 *   the window is only mounted for someone with rights in the room. The same check is in
 *   `RoomInfoView`, and repeated here so a stale window closes itself on the way into a room
 *   where the rights are gone.
 * - `BCFloorPlanEditor.createEditorWindow` / `onBcCountdownTimerEvent` enable the save only while
 *   Builder's Club has time left, or for `hasSecurity(4)`.
 * - `onPerkAllowances`: `BUILDER_AT_WORK` is what lifts the 3025 tile cap.
 *
 * Flash asked for the entry tile and the occupied tiles every time the window was shown, and the
 * map itself never - the room already sent it on the way in. That is kept.
 */

/** `BCFloorPlanEditor.onPerkAllowances` - the perk that lifts `FloorPlanCache`'s area cap. */
const LARGE_FLOOR_PLANS_PERK = 'BUILDER_AT_WORK';

/** `BCFloorPlanEditor._bcSecondsCountdownTimer` ticks every ten seconds and takes ten off. */
const BC_COUNTDOWN_MS = 10000;
const BC_COUNTDOWN_SECONDS = 10;

export const FloorPlanEditorWidget = () => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const isVisible = useIsWindowVisible('floor_plan_editor');
    const controllerLevel = useOwnControllerLevel();
    const securityLevel = useOwnSecurityLevel();

    const rows = useRoomStore(x => x.floorPlanRows);
    const receivedModel = useRoomStore(x => x.floorPlanReceivedModel);
    const occupiedTiles = useRoomStore(x => x.floorPlanOccupiedTiles);
    const entryPoint = useRoomStore(x => x.floorPlanEntryPoint);
    const entryPointDir = useRoomStore(x => x.floorPlanEntryPointDir);
    const fixedWallsHeight = useRoomStore(x => x.floorPlanFixedWallsHeight);
    const wallThickness = useRoomStore(x => x.floorPlanWallThickness);
    const floorThickness = useRoomStore(x => x.floorPlanFloorThickness);

    const perks = useNavigatorStore(x => x.perks);
    const buildersClubSecondsLeft = useUserStore(x => x.buildersClubSecondsLeft);

    const { hideWindow, showSimpleAlert } = useWindowActions();
    const { decreaseBuildersClubSecondsLeft } = useUserActions();
    const { setFloorPlanRows, setFloorPlanReceivedModel, setFloorPlanEntryPoint, setFloorPlanEntryPointDir, setFloorPlanThickness, setFloorPlanFixedWallsHeight } = useRoomFloorPlanActions();

    /** `FloorPlanCache._showedPopup` - one alert per received map, however many times the limit is hit. */
    const [ alertedFor, setAlertedFor ] = useState<string | undefined>(undefined);

    const largeFloorPlansAllowed = perks.some(perk => ((perk.code === LARGE_FLOOR_PLANS_PERK) && perk.isAllowed));
    const model = useMemo(
        () => createFloorPlanModel(rows.map(row => `${row}\r`).join(''), { reserved: occupiedTiles, largeFloorPlansAllowed }),
        [ rows, occupiedTiles, largeFloorPlansAllowed ],
    );

    useEffect(() => {
        if (!isVisible) return;

        requestFloorPlanData(send);
    }, [ isVisible, send ]);

    useEffect(() => {
        if (!isVisible || (buildersClubSecondsLeft <= 0)) return;

        const interval = setInterval(() => decreaseBuildersClubSecondsLeft(BC_COUNTDOWN_SECONDS), BC_COUNTDOWN_MS);

        return () => clearInterval(interval);
    }, [ isVisible, buildersClubSecondsLeft, decreaseBuildersClubSecondsLeft ]);

    if (!isVisible) return null;

    /* `RoomInfoViewCtrl.refreshButtons`: the editor is only offered to someone with rights in the room. */
    if (Number(controllerLevel) < Number(RoomControllerLevelEnum.Guest)) return null;

    /* `createEditorWindow` / `onBcCountdownTimerEvent`: Builder's Club, or `hasSecurity(4)`. */
    const canSave = (buildersClubSecondsLeft > 0) || (Number(securityLevel) >= Number(SecurityLevelEnum.Employee));
    const modelData = floorPlanModelText(model);

    const onCommit = (nextRows: string[], nextEntryPoint: FloorPlanTile | null) => {
        setFloorPlanRows(nextRows);

        if (nextEntryPoint) setFloorPlanEntryPoint(nextEntryPoint);
    };

    return (
        <FloorPlanEditorView
            model={model}
            modelData={modelData}
            receivedModel={receivedModel}
            entryPoint={entryPoint}
            entryPointDir={entryPointDir}
            wallThickness={wallThickness}
            floorThickness={floorThickness}
            fixedWallsHeight={fixedWallsHeight}
            canSave={canSave}
            onCommit={onCommit}
            onSizeLimitReached={() => {
                if (alertedFor === receivedModel) return;

                setAlertedFor(receivedModel);
                // `FloorPlanCache`: `simpleAlert("${floor.plan.editor.alert}", null, "${floor.plan.editor.size.limit.exceeded}")`.
                showSimpleAlert({ caption: t('floor.plan.editor.alert'), message: t('floor.plan.editor.size.limit.exceeded') });
            }}
            onEntryPointDirChange={setFloorPlanEntryPointDir}
            onThicknessChange={(nextWallThickness: RoomThicknessType, nextFloorThickness: RoomThicknessType) => setFloorPlanThickness(nextWallThickness, nextFloorThickness)}
            onFixedWallsHeightChange={setFloorPlanFixedWallsHeight}
            onSave={fixedHeight => saveFloorPlan(send, {
                modelData,
                entryPointX: entryPoint?.x ?? 0,
                entryPointY: entryPoint?.y ?? 0,
                entryPointDir,
                wallThickness,
                floorThickness,
                fixedWallsHeight: fixedHeight,
            })}
            onReload={() => {
                // `reload` puts the last received map back and asks for the door and the occupied tiles again.
                setFloorPlanReceivedModel(receivedModel);
                setAlertedFor(undefined);
                requestFloorPlanData(send);
            }}
            onSaveImport={importedModelData => saveFloorPlanImport(send, {
                modelData: importedModelData,
                entryPointX: entryPoint?.x ?? 0,
                entryPointY: entryPoint?.y ?? 0,
                entryPointDir,
                wallThickness,
                floorThickness,
            })}
            onClose={() => hideWindow('floor_plan_editor')}
        />
    );
};
