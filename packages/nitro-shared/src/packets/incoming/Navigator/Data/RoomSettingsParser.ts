import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export interface IRoomInfo {
    roomId: number;
    name: string;
    ownerId: number;
    ownerName: string;
    doorMode: number;
    population: number;
    playersMax: number;
    description: string;
    tradeType: number;
    score: number;
    ranking: number;
    categoryId: number;
    tags: string[];
    officialRoomPicRef: string;
    groupId: number;
    groupName: string;
    groupBadge: string;
    adName: string;
    adDescription: string;
    adExpiresIn: number;
    showOwner: boolean;
    allowPets: boolean;
    displayAd: boolean;
}

const THUMBNAIL_BITMASK = 1;
const GROUPDATA_BITMASK = 2;
const ROOMAD_BITMASK = 4;
const SHOWOWNER_BITMASK = 8;
const ALLOW_PETS_BITMASK = 16;
const DISPLAY_ROOMAD_BITMASK = 32;

export const RoomSettingsParser = (wrapper: IMessageDataWrapper) => {
    const info: IRoomInfo = {
        roomId: wrapper.readInt(),
        name: wrapper.readString(),
        ownerId: wrapper.readInt(),
        ownerName: wrapper.readString(),
        doorMode: wrapper.readInt(),
        population: wrapper.readInt(),
        playersMax: wrapper.readInt(),
        description: wrapper.readString(),
        tradeType: wrapper.readInt(),
        score: wrapper.readInt(),
        ranking: wrapper.readInt(),
        categoryId: wrapper.readInt(),
        tags: [],
        officialRoomPicRef: '',
        groupId: -1,
        groupName: '',
        groupBadge: '',
        adName: '',
        adDescription: '',
        adExpiresIn: -1,
        showOwner: false,
        allowPets: false,
        displayAd: false
    }

    let count = wrapper.readInt();

    while (count > 0) {
        info.tags.push(wrapper.readString());

        count--;
    }

    const bitmask = wrapper.readInt();

    if (bitmask & THUMBNAIL_BITMASK) info.officialRoomPicRef = wrapper.readString();

    if (bitmask & GROUPDATA_BITMASK) {
        info.groupId = wrapper.readInt();
        info.groupName = wrapper.readString();
        info.groupBadge = wrapper.readString();
    }

    if (bitmask & ROOMAD_BITMASK) {
        info.adName = wrapper.readString();
        info.adDescription = wrapper.readString();
        info.adExpiresIn = wrapper.readInt();
    }

    info.showOwner = (bitmask & SHOWOWNER_BITMASK) > 0;
    info.allowPets = (bitmask & ALLOW_PETS_BITMASK) > 0;
    info.displayAd = (bitmask & DISPLAY_ROOMAD_BITMASK) > 0;

    return info;
}