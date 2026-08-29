import { Border, BoxLayout, Button, Region } from '#base/theme';

/** Generated from `1122_user_info_xml` (layout "user_info", 280x194) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UserInfoLayoutProps {
    captionLoadingTxt?: string;
    fields?: UserInfoLayoutFieldsProps;
    layout?: BoxLayout;
    visibleLoadingTxt?: boolean;
}

export const UserInfoLayout = ({ captionLoadingTxt, fields, layout, visibleLoadingTxt }: UserInfoLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 280, height: 194, ...layout }}>
            <Border
                variant="0"
                name="user_info"
                layout={{ position: 'absolute', left: 0, width: 280, top: 0, height: 202 }}
            >
                {(visibleLoadingTxt ?? false) && (
                    <Region
                        name="loading_txt"
                        layout={{ position: 'absolute', left: 120, width: 70, top: 45, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        backgroundColor="#ffffff"
                    >
                        {captionLoadingTxt ?? 'Loading...'}
                    </Region>
                )}
                <UserInfoLayoutFields {...fields} />
            </Border>
        </Region>
    );
};

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
}

export const UserInfoLayoutFields = ({ captionAbusiveCfhCountTxt, captionBanCountTxt, captionCautionCountTxt, captionCfhCountTxt, captionEmailAddressTxt, captionIdBansTxt, captionLastLoginTxt, captionLastPurchaseTxt, captionLastSanctionTimeTxt, captionNameTxt, captionOnlineTxt, captionRegisteredTxt, captionTradingLockCountTxt, captionTradingLockExpiryTxt, captionUserClassTxt, captionViewBanCountTxt, captionViewCautionCountTxt, captionViewIdBansTxt, captionViewTradingLockCountTxt, layout, onButtons, onChatlogBut, onFields, onHabboinfotoolBut, onMessageBut, onModactionBut, onRoomvisitsBut }: UserInfoLayoutFieldsProps) => {
    return (
        <Region
            name="fields"
            onPointerTap={onFields}
            cursor="pointer"
            layout={{ position: 'absolute', left: 5, width: 270, top: 5, height: 194, ...layout }}
        >
            <Region
                name="shade1"
                backgroundColor="#a2d6ea"
                layout={{ position: 'absolute', left: 0, width: 187, top: 0, height: 13 }}
            />
            <Region
                name="shade2"
                backgroundColor="#a2d6ea"
                layout={{ position: 'absolute', left: 0, width: 187, top: 26, height: 13 }}
            />
            <Region
                name="shade2"
                backgroundColor="#a2d6ea"
                layout={{ position: 'absolute', left: 0, width: 187, top: 52, height: 13 }}
            />
            <Region
                name="shade2"
                backgroundColor="#a2d6ea"
                layout={{ position: 'absolute', left: 0, width: 187, top: 78, height: 13 }}
            />
            <Region
                name="shade2"
                backgroundColor="#a2d6ea"
                layout={{ position: 'absolute', left: 0, width: 187, top: 104, height: 13 }}
            />
            <Region
                name="shade2"
                backgroundColor="#a2d6ea"
                layout={{ position: 'absolute', left: 0, width: 187, top: 130, height: 13 }}
            />
            <Region
                name="shade2"
                backgroundColor="#a2d6ea"
                layout={{ position: 'absolute', left: 0, width: 187, top: 156, height: 13 }}
            />
            <Region
                name="shade2"
                backgroundColor="#a2d6ea"
                layout={{ position: 'absolute', left: 0, width: 187, top: 182, height: 13 }}
            />
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                Name
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 13, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                CFHs
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 26, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                Abusive CFHs
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 39, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                Cautions
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 52, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                Bans
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 75, top: 65, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                Last sanction
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 78, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                Trade locks
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 91, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                Lock Expires
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 104, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                Last Login
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 117, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                Online
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 130, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                Purchase
            </Region>
            <Region
                name="email_address_txt"
                layout={{ position: 'absolute', left: 0, width: 184, top: 143, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionEmailAddressTxt ?? 'yes'}
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 156, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                Banned Accs.
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 169, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                Registered
            </Region>
            <Region
                name="user_class_txt"
                layout={{ position: 'absolute', left: 0, width: 184, top: 182, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionUserClassTxt ?? '-'}
            </Region>
            <Region
                name="name_txt"
                layout={{ position: 'absolute', left: 70, width: 114, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionNameTxt ?? 'sulka'}
            </Region>
            <Region
                name="registered_txt"
                layout={{ position: 'absolute', left: 70, width: 114, top: 169, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionRegisteredTxt ?? '0'}
            </Region>
            <Region
                name="cfh_count_txt"
                layout={{ position: 'absolute', left: 70, width: 70, top: 13, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionCfhCountTxt ?? '34'}
            </Region>
            <Region
                name="abusive_cfh_count_txt"
                layout={{ position: 'absolute', left: 70, width: 70, top: 26, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionAbusiveCfhCountTxt ?? '2'}
            </Region>
            <Region
                name="caution_count_txt"
                layout={{ position: 'absolute', left: 70, width: 70, top: 39, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionCautionCountTxt ?? '8'}
            </Region>
            <Region
                name="view_caution_count_txt"
                layout={{ position: 'absolute', left: 150, width: 30, top: 39, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionViewCautionCountTxt ?? 'view'}
            </Region>
            <Region
                name="ban_count_txt"
                layout={{ position: 'absolute', left: 70, width: 70, top: 52, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionBanCountTxt ?? '3'}
            </Region>
            <Region
                name="view_ban_count_txt"
                layout={{ position: 'absolute', left: 150, width: 30, top: 52, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                backgroundColor="#a2d6ea"
            >
                {captionViewBanCountTxt ?? 'view'}
            </Region>
            <Region
                name="last_sanction_time_txt"
                layout={{ position: 'absolute', left: 76, width: 100, top: 65, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionLastSanctionTimeTxt ?? '2015-09-22 14:57'}
            </Region>
            <Region
                name="trading_lock_count_txt"
                layout={{ position: 'absolute', left: 70, width: 114, top: 78, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionTradingLockCountTxt ?? '3'}
            </Region>
            <Region
                name="view_trading_lock_count_txt"
                layout={{ position: 'absolute', left: 150, width: 30, top: 78, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                backgroundColor="#a2d6ea"
            >
                {captionViewTradingLockCountTxt ?? 'view'}
            </Region>
            <Region
                name="trading_lock_expiry_txt"
                layout={{ position: 'absolute', left: 70, width: 114, top: 91, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionTradingLockExpiryTxt ?? 'No active lock'}
            </Region>
            <Region
                name="last_login_txt"
                layout={{ position: 'absolute', left: 70, width: 114, top: 104, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionLastLoginTxt ?? '5 minutes ago'}
            </Region>
            <Region
                name="online_txt"
                layout={{ position: 'absolute', left: 70, width: 70, top: 117, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionOnlineTxt ?? 'Yes'}
            </Region>
            <Region
                name="last_purchase_txt"
                layout={{ position: 'absolute', left: 70, width: 114, top: 130, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionLastPurchaseTxt ?? 'Yes'}
            </Region>
            <Region
                name="id_bans_txt"
                layout={{ position: 'absolute', left: 70, width: 114, top: 156, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionIdBansTxt ?? 'Yes'}
            </Region>
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
                layout={{ position: 'absolute', left: 190, width: 80, top: 0, height: 122 }}
            >
                <Button
                    variant="0"
                    name="chatlog_but"
                    onPointerTap={onChatlogBut}
                    layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 21, minWidth: 80, maxWidth: 80 }}
                >
                    Room Chat
                </Button>
                <Button
                    variant="0"
                    name="message_but"
                    onPointerTap={onMessageBut}
                    layout={{ position: 'absolute', left: 0, width: 80, top: 22, height: 21, maxWidth: 80 }}
                >
                    Send Message
                </Button>
                <Button
                    variant="0"
                    name="roomvisits_but"
                    onPointerTap={onRoomvisitsBut}
                    layout={{ position: 'absolute', left: 0, width: 80, top: 44, height: 21, minWidth: 80, maxWidth: 80 }}
                >
                    Room Visits
                </Button>
                <Button
                    variant="0"
                    name="modaction_but"
                    onPointerTap={onModactionBut}
                    layout={{ position: 'absolute', left: 0, width: 80, top: 88, height: 21, minWidth: 80, maxWidth: 80 }}
                >
                    Mod Action
                </Button>
                <Button
                    variant="0"
                    name="habboinfotool_but"
                    onPointerTap={onHabboinfotoolBut}
                    layout={{ position: 'absolute', left: 0, width: 80, top: 66, height: 21, minWidth: 80, maxWidth: 80 }}
                >
                    Habbo Info
                </Button>
            </Region>
        </Region>
    );
};
