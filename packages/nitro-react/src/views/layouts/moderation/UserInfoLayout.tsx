import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';

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
                        <ThemeText text={captionLoadingTxt ?? 'Loading...'} />
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
                <ThemeText text="Name" />
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 13, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="CFHs" />
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 26, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="Abusive CFHs" />
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 39, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="Cautions" />
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 52, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="Bans" />
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 75, top: 65, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="Last sanction" />
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 78, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="Trade locks" />
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 91, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="Lock Expires" />
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 104, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="Last Login" />
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 117, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="Online" />
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 130, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="Purchase" />
            </Region>
            <Region
                name="email_address_txt"
                layout={{ position: 'absolute', left: 0, width: 184, top: 143, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionEmailAddressTxt ?? 'yes'} />
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 156, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="Banned Accs." />
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 70, top: 169, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="Registered" />
            </Region>
            <Region
                name="user_class_txt"
                layout={{ position: 'absolute', left: 0, width: 184, top: 182, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionUserClassTxt ?? '-'} />
            </Region>
            <Region
                name="name_txt"
                layout={{ position: 'absolute', left: 70, width: 114, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionNameTxt ?? 'sulka'} />
            </Region>
            <Region
                name="registered_txt"
                layout={{ position: 'absolute', left: 70, width: 114, top: 169, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionRegisteredTxt ?? '0'} />
            </Region>
            <Region
                name="cfh_count_txt"
                layout={{ position: 'absolute', left: 70, width: 70, top: 13, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionCfhCountTxt ?? '34'} />
            </Region>
            <Region
                name="abusive_cfh_count_txt"
                layout={{ position: 'absolute', left: 70, width: 70, top: 26, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionAbusiveCfhCountTxt ?? '2'} />
            </Region>
            <Region
                name="caution_count_txt"
                layout={{ position: 'absolute', left: 70, width: 70, top: 39, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionCautionCountTxt ?? '8'} />
            </Region>
            <Region
                name="view_caution_count_txt"
                layout={{ position: 'absolute', left: 150, width: 30, top: 39, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionViewCautionCountTxt ?? 'view'} />
            </Region>
            <Region
                name="ban_count_txt"
                layout={{ position: 'absolute', left: 70, width: 70, top: 52, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionBanCountTxt ?? '3'} />
            </Region>
            <Region
                name="view_ban_count_txt"
                layout={{ position: 'absolute', left: 150, width: 30, top: 52, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                backgroundColor="#a2d6ea"
            >
                <ThemeText text={captionViewBanCountTxt ?? 'view'} />
            </Region>
            <Region
                name="last_sanction_time_txt"
                layout={{ position: 'absolute', left: 76, width: 100, top: 65, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionLastSanctionTimeTxt ?? '2015-09-22 14:57'} />
            </Region>
            <Region
                name="trading_lock_count_txt"
                layout={{ position: 'absolute', left: 70, width: 114, top: 78, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTradingLockCountTxt ?? '3'} />
            </Region>
            <Region
                name="view_trading_lock_count_txt"
                layout={{ position: 'absolute', left: 150, width: 30, top: 78, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                backgroundColor="#a2d6ea"
            >
                <ThemeText text={captionViewTradingLockCountTxt ?? 'view'} />
            </Region>
            <Region
                name="trading_lock_expiry_txt"
                layout={{ position: 'absolute', left: 70, width: 114, top: 91, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTradingLockExpiryTxt ?? 'No active lock'} />
            </Region>
            <Region
                name="last_login_txt"
                layout={{ position: 'absolute', left: 70, width: 114, top: 104, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionLastLoginTxt ?? '5 minutes ago'} />
            </Region>
            <Region
                name="online_txt"
                layout={{ position: 'absolute', left: 70, width: 70, top: 117, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionOnlineTxt ?? 'Yes'} />
            </Region>
            <Region
                name="last_purchase_txt"
                layout={{ position: 'absolute', left: 70, width: 114, top: 130, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionLastPurchaseTxt ?? 'Yes'} />
            </Region>
            <Region
                name="id_bans_txt"
                layout={{ position: 'absolute', left: 70, width: 114, top: 156, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionIdBansTxt ?? 'Yes'} />
            </Region>
            <Region
                name="view_id_bans_txt"
                layout={{ position: 'absolute', left: 150, width: 30, top: 156, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                backgroundColor="#a2d6ea"
            >
                <ThemeText text={captionViewIdBansTxt ?? 'view'} />
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
