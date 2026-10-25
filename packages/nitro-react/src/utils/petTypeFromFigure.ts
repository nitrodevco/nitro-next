/**
 * A pet's type from its figure string (`"<type> <palette> <color> ..."`) - Flash
 * `InfoStandWidgetHandler.getPetType` / `AvatarInfoWidgetHandler`, which read the type off the pet's
 * room user data rather than the pet info packet (that one carries the breed, not the type).
 * Compare the result with `PetType` (`PetType.MONSTERPLANT`, `PetType.HORSE`). -1 for no figure.
 */
export const petTypeFromFigure = (figure: string | undefined): number => {
    const type = parseInt((figure ?? '').split(' ')[0], 10);

    return Number.isNaN(type) ? -1 : type;
};
