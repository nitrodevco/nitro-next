/**
 * The Builders Club membership as the catalogue knows it - the builder fields of Flash's
 * `HabboCatalog`: the furni limit and the membership's seconds left (with and without the grace
 * period) as `BuildersClubSubscriptionStatusMessage` last sent them, the time that packet landed
 * (`_builderMembershipUpdateTime`, so `builderSecondsLeft` keeps counting down from it), the
 * furni the user has placed (`BuildersClubFurniCountMessage`), and what `refreshBuilderStatus`
 * last worked out for the window header.
 *
 * The floor plan editor keeps a countdown of its own in the user store (`BCFloorPlanEditor`'s
 * `_bcSecondsLeft`, which it counts down by ten every ten seconds), exactly as Flash keeps the two
 * apart; this is `HabboCatalog`'s copy, which counts from the packet's arrival.
 *
 * `youAreOwnerSerial` is the port's: `BuilderCatalogWidget` listens to `YouAreOwnerMessageEvent`
 * itself, and a view registers no packet listeners, so the catalogue's handler counts the packets
 * and the widget acts on each new one (`onYouAreOwner`).
 */
import { StateCreator } from 'zustand';

type State = {
    builderFurniLimit: number;
    builderMaxFurniLimit: number;
    /** `§_-L16§`: the membership's seconds left when the status packet arrived. */
    builderSecondsLeftAtUpdate: number;
    /** `§_-b2f§`: the same with the grace period. */
    builderSecondsLeftWithGraceAtUpdate: number;
    /** `_builderMembershipUpdateTime`: `performance.now()` when the status packet arrived. */
    builderMembershipUpdateTime: number;
    /** `§_-C2h§` (`builderFurniCount`): -1 until the server has said. */
    builderFurniCount: number;
    /** `§_-SI§`: a member at the last `refreshBuilderStatus`. */
    builderIsMember: boolean;
    /** `§_-QM§`: in the membership or its grace period at the last `refreshBuilderStatus`. */
    builderIsInGrace: boolean;
    /** The seconds `refreshBuilderStatus` put into `builder.header.status.membership`'s `duration`. */
    builderStatusSecondsLeft: number;
    /** When `refreshBuilderStatus` last ran - `_builderMembershipDisplayUpdateTime`. */
    builderMembershipDisplayUpdateTime: number;
    youAreOwnerSerial: number;
};

type Actions = {
    setBuildersClubSubscription: (secondsLeft: number, secondsLeftWithGrace: number, furniLimit: number, maxFurniLimit: number, updateTime: number) => void;
    setBuilderFurniCount: (builderFurniCount: number) => void;
    setBuilderStatus: (builderIsMember: boolean, builderIsInGrace: boolean, builderStatusSecondsLeft: number, builderMembershipDisplayUpdateTime: number) => void;
    countYouAreOwner: () => void;
};

export const CatalogBuildersClubSliceInitialState: State = {
    builderFurniLimit: 0,
    builderMaxFurniLimit: 0,
    builderSecondsLeftAtUpdate: 0,
    builderSecondsLeftWithGraceAtUpdate: 0,
    builderMembershipUpdateTime: 0,
    builderFurniCount: -1,
    builderIsMember: false,
    builderIsInGrace: false,
    builderStatusSecondsLeft: 0,
    builderMembershipDisplayUpdateTime: 0,
    youAreOwnerSerial: 0,
};

export type CatalogBuildersClubSlice = State & Actions;

export const createCatalogBuildersClubSlice: StateCreator<CatalogBuildersClubSlice, [], [], CatalogBuildersClubSlice> = set => ({
    ...CatalogBuildersClubSliceInitialState,
    setBuildersClubSubscription: (builderSecondsLeftAtUpdate, builderSecondsLeftWithGraceAtUpdate, builderFurniLimit, builderMaxFurniLimit, builderMembershipUpdateTime) => set({ builderSecondsLeftAtUpdate, builderSecondsLeftWithGraceAtUpdate, builderFurniLimit, builderMaxFurniLimit, builderMembershipUpdateTime }),
    setBuilderFurniCount: builderFurniCount => set({ builderFurniCount }),
    setBuilderStatus: (builderIsMember, builderIsInGrace, builderStatusSecondsLeft, builderMembershipDisplayUpdateTime) => set({ builderIsMember, builderIsInGrace, builderStatusSecondsLeft, builderMembershipDisplayUpdateTime }),
    countYouAreOwner: () => set(x => ({ youAreOwnerSerial: x.youAreOwnerSerial + 1 })),
});
