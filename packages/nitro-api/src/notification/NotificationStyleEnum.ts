export enum NotificationStyleEnum {
    Achievement = "achievement",
    BadgeReceived = "badge_received",
    HabbiconReceived = "habbicon_received",
    ReceivedCredits = "receivedcredits",
    FriendOnline = "friendonline",
    FriendOffline = "friendoffline",
    ThirdPartyFriendOnline = "thirdpartyfriendonline",
    ThirdPartyFriendOffline = "thirdpartyfriendoffline",
    NftOpening = "nft_opening",
    TreasureHunt = "treasure_hunt",
    Wired = "wired",
    Info = "info",
    Club = "club",
    Vip = "vip",
    RecyclerOk = "recyclerok",
    SoundMachine = "soundmachine",
    Ltd = "ltd",
    PetLevel = "petlevel",
    ClubGift = "clubgift",
    Earning = "earning",
    RoomMessagesPosted = "roommessagesposted",
    Respect = "respect",
    BuyFurni = "buyfurni"
}

export const KNOWN_NOTIFICATION_STYLES = new Set<string>(Object.values(NotificationStyleEnum));