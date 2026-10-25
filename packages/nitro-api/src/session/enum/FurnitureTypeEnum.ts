/**
 * The product types a catalog offer or furni definition carries - the Flash `PRODUCT_TYPE_*`
 * constants (`com/sulake/habbo/catalog/enum`, obfuscated class name). The values are the wire
 * strings, so the token types keep Flash's upper case.
 */
export enum FurnitureTypeEnum {
    Floor = 's',
    Wall = 'i',
    Effect = 'e',
    Badge = 'b',
    Robot = 'r',
    HabboClub = 'h',
    Pet = 'p',
    Nft = 'n',
    GameToken = 'GAME_TOKEN',
    MintToken = 'MINT_TOKEN',
    ChatStyle = 'chat_style',
    Habbicon = 'habbicon',
}
