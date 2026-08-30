import { ReactNode } from 'react';

import { BoxLayout, Button, Region, ThemeText } from '#base/theme';

/** Named region `fields` of UserInfoLayout - configured through the parent's `fields` prop. */
export interface UserInfoLayoutFieldsProps {
    captionAbusiveCfhCountTxt?: string;
    captionBanCountTxt?: string;
    captionCautionCountTxt?: string;
    captionCfhCountTxt?: string;
    captionEmailAddressTxt?: string;
    captionIdBansTxt?: string;
    captionLastLoginTxt?: string;
    captionLastPurchaseTxt?: string;
    captionLastSanctionTimeTxt?: string;
    captionNameTxt?: string;
    captionOnlineTxt?: string;
    captionRegisteredTxt?: string;
    captionTradingLockCountTxt?: string;
    captionTradingLockExpiryTxt?: string;
    captionUserClassTxt?: string;
    captionViewBanCountTxt?: string;
    captionViewCautionCountTxt?: string;
    captionViewIdBansTxt?: string;
    captionViewTradingLockCountTxt?: string;
    layout?: BoxLayout;
    onButtons?: () => void;
    onChatlogBut?: () => void;
    onFields?: () => void;
    onHabboinfotoolBut?: () => void;
    onMessageBut?: () => void;
    onModactionBut?: () => void;
    onRoomvisitsBut?: () => void;
    shade1?: ReactNode;
    shade2?: ReactNode;
    shade22?: ReactNode;
    shade23?: ReactNode;
    shade24?: ReactNode;
    shade25?: ReactNode;
    shade26?: ReactNode;
    shade27?: ReactNode;
}

export const UserInfoLayoutFields = ({ captionAbusiveCfhCountTxt, captionBanCountTxt, captionCautionCountTxt, captionCfhCountTxt, captionEmailAddressTxt, captionIdBansTxt, captionLastLoginTxt, captionLastPurchaseTxt, captionLastSanctionTimeTxt, captionNameTxt, captionOnlineTxt, captionRegisteredTxt, captionTradingLockCountTxt, captionTradingLockExpiryTxt, captionUserClassTxt, captionViewBanCountTxt, captionViewCautionCountTxt, captionViewIdBansTxt, captionViewTradingLockCountTxt, layout, onButtons, onChatlogBut, onFields, onHabboinfotoolBut, onMessageBut, onModactionBut, onRoomvisitsBut, shade1, shade2, shade22, shade23, shade24, shade25, shade26, shade27 }: UserInfoLayoutFieldsProps) => {
    return (
        <Region
            name="fields"
            onPointerTap={onFields}
            cursor="pointer"
            layout={{ position: 'absolute', left: 5, right: 5, top: 5, bottom: 3, ...layout }}
        >
            <Region
                name="shade1"
                backgroundColor="#a2d6ea"
                layout={{ position: 'absolute', left: 0, width: 187, top: 0, height: 13 }}
            >
                {shade1}
            </Region>
            <Region
                name="shade2"
                backgroundColor="#a2d6ea"
                layout={{ position: 'absolute', left: 0, width: 187, top: 26, height: 13 }}
            >
                {shade2}
            </Region>
            <Region
                name="shade2"
                backgroundColor="#a2d6ea"
                layout={{ position: 'absolute', left: 0, width: 187, top: 52, height: 13 }}
            >
                {shade22}
            </Region>
            <Region
                name="shade2"
                backgroundColor="#a2d6ea"
                layout={{ position: 'absolute', left: 0, width: 187, top: 78, height: 13 }}
            >
                {shade23}
            </Region>
            <Region
                name="shade2"
                backgroundColor="#a2d6ea"
                layout={{ position: 'absolute', left: 0, width: 187, top: 104, height: 13 }}
            >
                {shade24}
            </Region>
            <Region
                name="shade2"
                backgroundColor="#a2d6ea"
                layout={{ position: 'absolute', left: 0, width: 187, top: 130, height: 13 }}
            >
                {shade25}
            </Region>
            <Region
                name="shade2"
                backgroundColor="#a2d6ea"
                layout={{ position: 'absolute', left: 0, width: 187, top: 156, height: 13 }}
            >
                {shade26}
            </Region>
            <Region
                name="shade2"
                backgroundColor="#a2d6ea"
                layout={{ position: 'absolute', left: 0, width: 187, bottom: -1, height: 13 }}
            >
                {shade27}
            </Region>
            <ThemeText
                text="Name"
                layout={{ position: 'absolute', left: 0, width: 70, top: 0, height: 13 }}
            />
            <ThemeText
                text="CFHs"
                layout={{ position: 'absolute', left: 0, width: 70, top: 13, height: 13 }}
            />
            <ThemeText
                text="Abusive CFHs"
                layout={{ position: 'absolute', left: 0, width: 70, top: 26, height: 13 }}
            />
            <ThemeText
                text="Cautions"
                layout={{ position: 'absolute', left: 0, width: 70, top: 39, height: 13 }}
            />
            <ThemeText
                text="Bans"
                layout={{ position: 'absolute', left: 0, width: 70, top: 52, height: 13 }}
            />
            <ThemeText
                text="Last sanction"
                layout={{ position: 'absolute', left: 0, width: 75, top: 65, height: 13 }}
            />
            <ThemeText
                text="Trade locks"
                layout={{ position: 'absolute', left: 0, width: 70, top: 78, height: 13 }}
            />
            <ThemeText
                text="Lock Expires"
                layout={{ position: 'absolute', left: 0, width: 70, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 13 }}
            />
            <ThemeText
                text="Last Login"
                layout={{ position: 'absolute', left: 0, width: 70, top: 104, height: 13 }}
            />
            <ThemeText
                text="Online"
                layout={{ position: 'absolute', left: 0, width: 70, top: 117, height: 13 }}
            />
            <ThemeText
                text="Purchase"
                layout={{ position: 'absolute', left: 0, width: 70, top: 130, height: 13 }}
            />
            <ThemeText
                text={captionEmailAddressTxt ?? 'yes'}
                name="email_address_txt"
                layout={{ position: 'absolute', left: 0, width: 184, top: 143, height: 13 }}
            />
            <ThemeText
                text="Banned Accs."
                layout={{ position: 'absolute', left: 0, width: 70, top: 156, height: 13 }}
            />
            <ThemeText
                text="Registered"
                layout={{ position: 'absolute', left: 0, width: 70, bottom: 12, height: 13 }}
            />
            <ThemeText
                text={captionUserClassTxt ?? '-'}
                name="user_class_txt"
                layout={{ position: 'absolute', left: 0, width: 184, bottom: -1, height: 13 }}
            />
            <ThemeText
                text={captionNameTxt ?? 'sulka'}
                name="name_txt"
                layout={{ position: 'absolute', left: 70, width: 114, top: 0, height: 13 }}
            />
            <ThemeText
                text={captionRegisteredTxt ?? '0'}
                name="registered_txt"
                layout={{ position: 'absolute', left: 70, width: 114, bottom: 12, height: 13 }}
            />
            <ThemeText
                text={captionCfhCountTxt ?? '34'}
                name="cfh_count_txt"
                layout={{ position: 'absolute', left: 70, width: 70, top: 13, height: 13 }}
            />
            <ThemeText
                text={captionAbusiveCfhCountTxt ?? '2'}
                name="abusive_cfh_count_txt"
                layout={{ position: 'absolute', left: 70, width: 70, top: 26, height: 13 }}
            />
            <ThemeText
                text={captionCautionCountTxt ?? '8'}
                name="caution_count_txt"
                layout={{ position: 'absolute', left: 70, width: 70, top: 39, height: 13 }}
            />
            <ThemeText
                text={captionViewCautionCountTxt ?? 'view'}
                name="view_caution_count_txt"
                layout={{ position: 'absolute', left: 150, width: 30, top: 39, height: 13 }}
            />
            <ThemeText
                text={captionBanCountTxt ?? '3'}
                name="ban_count_txt"
                layout={{ position: 'absolute', left: 70, width: 70, top: 52, height: 13 }}
            />
            <Region
                name="view_ban_count_txt"
                layout={{ position: 'absolute', left: 150, width: 30, top: 52, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                backgroundColor="#a2d6ea"
            >
                {captionViewBanCountTxt ?? 'view'}
            </Region>
            <ThemeText
                text={captionLastSanctionTimeTxt ?? '2015-09-22 14:57'}
                name="last_sanction_time_txt"
                layout={{ position: 'absolute', left: 76, width: 100, top: 65, height: 13 }}
            />
            <ThemeText
                text={captionTradingLockCountTxt ?? '3'}
                name="trading_lock_count_txt"
                layout={{ position: 'absolute', left: 70, width: 114, top: 78, height: 13 }}
            />
            <Region
                name="view_trading_lock_count_txt"
                layout={{ position: 'absolute', left: 150, width: 30, top: 78, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                backgroundColor="#a2d6ea"
            >
                {captionViewTradingLockCountTxt ?? 'view'}
            </Region>
            <ThemeText
                text={captionTradingLockExpiryTxt ?? 'No active lock'}
                name="trading_lock_expiry_txt"
                layout={{ position: 'absolute', left: 70, width: 114, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 13 }}
            />
            <ThemeText
                text={captionLastLoginTxt ?? '5 minutes ago'}
                name="last_login_txt"
                layout={{ position: 'absolute', left: 70, width: 114, top: 104, height: 13 }}
            />
            <ThemeText
                text={captionOnlineTxt ?? 'Yes'}
                name="online_txt"
                layout={{ position: 'absolute', left: 70, width: 70, top: 117, height: 13 }}
            />
            <ThemeText
                text={captionLastPurchaseTxt ?? 'Yes'}
                name="last_purchase_txt"
                layout={{ position: 'absolute', left: 70, width: 114, top: 130, height: 13 }}
            />
            <ThemeText
                text={captionIdBansTxt ?? 'Yes'}
                name="id_bans_txt"
                layout={{ position: 'absolute', left: 70, width: 114, top: 156, height: 13 }}
            />
            <Region
                name="view_id_bans_txt"
                layout={{ position: 'absolute', left: 150, width: 30, top: 156, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                backgroundColor="#a2d6ea"
            >
                {captionViewIdBansTxt ?? 'view'}
            </Region>
            <Region
                name="buttons"
                onPointerTap={onButtons}
                cursor="pointer"
                layout={{ position: 'absolute', right: 0, width: 80, top: 0, height: 122 }}
            >
                <Button
                    variant="0"
                    name="chatlog_but"
                    onPointerTap={onChatlogBut}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 21, minWidth: 80, maxWidth: 80 }}
                >
                    Room Chat
                </Button>
                <Button
                    variant="0"
                    name="message_but"
                    onPointerTap={onMessageBut}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 22, height: 21, maxWidth: 80 }}
                >
                    Send Message
                </Button>
                <Button
                    variant="0"
                    name="roomvisits_but"
                    onPointerTap={onRoomvisitsBut}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 44, height: 21, minWidth: 80, maxWidth: 80 }}
                >
                    Room Visits
                </Button>
                <Button
                    variant="0"
                    name="modaction_but"
                    onPointerTap={onModactionBut}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 88, height: 21, minWidth: 80, maxWidth: 80 }}
                >
                    Mod Action
                </Button>
                <Button
                    variant="0"
                    name="habboinfotool_but"
                    onPointerTap={onHabboinfotoolBut}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 66, height: 21, minWidth: 80, maxWidth: 80 }}
                >
                    Habbo Info
                </Button>
            </Region>
        </Region>
    );
};
