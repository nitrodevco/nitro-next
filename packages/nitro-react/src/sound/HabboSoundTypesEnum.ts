/**
 * The client's own sounds by the id its classes ask for them with - Flash's `HabboSoundTypesEnum`.
 * `HabboSoundManager.getSoundBySoundId` maps each onto the mp3 `HabboSoundManagerFlash10Com`
 * embeds, which ships here in the `sounds` bundle (`public/assets/sounds`).
 */
export class HabboSoundTypesEnum {
    public static readonly SOUND_CALL_FOR_HELP = 'HBST_call_for_help';
    public static readonly SOUND_CREDIT_BALANCE = 'HBST_purchase';
    public static readonly SOUND_DUCKET_BALANCE = 'HBST_pixels';
    public static readonly SOUND_MESSAGE_SENT = 'HBST_message_sent';
    public static readonly SOUND_MESSAGE_RECEIVED = 'HBST_message_received';
    public static readonly SOUND_GUIDE_INVITATION = 'HBST_guide_invitation';
    public static readonly SOUND_GUIDE_REQUEST = 'HBST_guide_request';
    public static readonly SOUND_RESPECT = 'HBST_respect';
    public static readonly GAMES_SW_GET_SNOWBALL = 'HBSTG_snowwar_get_snowball';
    public static readonly GAMES_SW_HIT1 = 'HBSTG_snowwar_hit1';
    public static readonly GAMES_SW_HIT2 = 'HBSTG_snowwar_hit2';
    public static readonly GAMES_SW_HIT3 = 'HBSTG_snowwar_hit3';
    public static readonly GAMES_SW_MAKE_SNOWBALL = 'HBSTG_snowwar_make_snowball';
    public static readonly GAMES_SW_MISS = 'HBSTG_snowwar_miss';
    public static readonly GAMES_SW_THROW = 'HBSTG_snowwar_throw';
    public static readonly GAMES_SW_WALK = 'HBSTG_snowwar_walk';
    public static readonly GAMES_IG_COUNTDOWN = 'HBSTG_ig_countdown';
    public static readonly GAMES_IG_WINNING = 'HBSTG_ig_winning';
    public static readonly GAMES_IG_LOSING = 'HBSTG_ig_losing';
    public static readonly FURNITURE_SOUND_CUCKOO_CLOCK = 'FURNITURE_cuckoo_clock';
    public static readonly CAMERA_SHUTTER = 'CAMERA_shutter';
}
