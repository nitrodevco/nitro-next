import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';

/** Generated from `1122_user_info_xml` (layout "user_info", 280x194) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UserInfoLayoutProps {
    layout?: BoxLayout;
    onChatlogBut?: () => void;
    onHabboinfotoolBut?: () => void;
    onMessageBut?: () => void;
    onModactionBut?: () => void;
    onRoomvisitsBut?: () => void;
}

export const UserInfoLayout = ({ layout, onChatlogBut, onHabboinfotoolBut, onMessageBut, onModactionBut, onRoomvisitsBut }: UserInfoLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 280, height: 194, ...layout }}>
            <Border
                variant="0"
                name="user_info"
                params={32769}
                layout={{ position: 'absolute', left: 0, width: 280, top: 0, height: 202 }}
            >
                <Region
                    name="loading_txt"
                    params={16}
                    visible={false}
                    layout={{ position: 'absolute', left: 120, width: 70, top: 45, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    backgroundColor="#ffffff"
                >
                    <ThemeText text="Loading..." />
                </Region>
                <Region
                    name="fields"
                    params={32769}
                    layout={{ position: 'absolute', left: 5, width: 270, top: 5, height: 194 }}
                >
                    <Region
                        name="shade1"
                        params={16}
                        backgroundColor="#a2d6ea"
                        layout={{ position: 'absolute', left: 0, width: 187, top: 0, height: 13 }}
                    />
                    <Region
                        name="shade2"
                        params={16}
                        backgroundColor="#a2d6ea"
                        layout={{ position: 'absolute', left: 0, width: 187, top: 26, height: 13 }}
                    />
                    <Region
                        name="shade2"
                        params={16}
                        backgroundColor="#a2d6ea"
                        layout={{ position: 'absolute', left: 0, width: 187, top: 52, height: 13 }}
                    />
                    <Region
                        name="shade2"
                        params={16}
                        backgroundColor="#a2d6ea"
                        layout={{ position: 'absolute', left: 0, width: 187, top: 78, height: 13 }}
                    />
                    <Region
                        name="shade2"
                        params={16}
                        backgroundColor="#a2d6ea"
                        layout={{ position: 'absolute', left: 0, width: 187, top: 104, height: 13 }}
                    />
                    <Region
                        name="shade2"
                        params={16}
                        backgroundColor="#a2d6ea"
                        layout={{ position: 'absolute', left: 0, width: 187, top: 130, height: 13 }}
                    />
                    <Region
                        name="shade2"
                        params={16}
                        backgroundColor="#a2d6ea"
                        layout={{ position: 'absolute', left: 0, width: 187, top: 156, height: 13 }}
                    />
                    <Region
                        name="shade2"
                        params={16}
                        backgroundColor="#a2d6ea"
                        layout={{ position: 'absolute', left: 0, width: 187, top: 182, height: 13 }}
                    />
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 70, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="Name" />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 70, top: 13, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="CFHs" />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 70, top: 26, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="Abusive CFHs" />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 70, top: 39, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="Cautions" />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 70, top: 52, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="Bans" />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 75, top: 65, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="Last sanction" />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 70, top: 78, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="Trade locks" />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 70, top: 91, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="Lock Expires" />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 70, top: 104, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="Last Login" />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 70, top: 117, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="Online" />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 70, top: 130, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="Purchase" />
                    </Region>
                    <Region
                        name="email_address_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 184, top: 143, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="yes" />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 70, top: 156, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="Banned Accs." />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 70, top: 169, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="Registered" />
                    </Region>
                    <Region
                        name="user_class_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 184, top: 182, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="-" />
                    </Region>
                    <Region
                        name="name_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 70, width: 114, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="sulka" />
                    </Region>
                    <Region
                        name="registered_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 70, width: 114, top: 169, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="0" />
                    </Region>
                    <Region
                        name="cfh_count_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 70, width: 70, top: 13, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="34" />
                    </Region>
                    <Region
                        name="abusive_cfh_count_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 70, width: 70, top: 26, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="2" />
                    </Region>
                    <Region
                        name="caution_count_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 70, width: 70, top: 39, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="8" />
                    </Region>
                    <Region
                        name="view_caution_count_txt"
                        params={17}
                        layout={{ position: 'absolute', left: 150, width: 30, top: 39, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="view" />
                    </Region>
                    <Region
                        name="ban_count_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 70, width: 70, top: 52, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="3" />
                    </Region>
                    <Region
                        name="view_ban_count_txt"
                        params={17}
                        layout={{ position: 'absolute', left: 150, width: 30, top: 52, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        backgroundColor="#a2d6ea"
                    >
                        <ThemeText text="view" />
                    </Region>
                    <Region
                        name="last_sanction_time_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 76, width: 100, top: 65, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="2015-09-22 14:57" />
                    </Region>
                    <Region
                        name="trading_lock_count_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 70, width: 114, top: 78, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="3" />
                    </Region>
                    <Region
                        name="view_trading_lock_count_txt"
                        params={17}
                        layout={{ position: 'absolute', left: 150, width: 30, top: 78, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        backgroundColor="#a2d6ea"
                    >
                        <ThemeText text="view" />
                    </Region>
                    <Region
                        name="trading_lock_expiry_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 70, width: 114, top: 91, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="No active lock" />
                    </Region>
                    <Region
                        name="last_login_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 70, width: 114, top: 104, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="5 minutes ago" />
                    </Region>
                    <Region
                        name="online_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 70, width: 70, top: 117, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="Yes" />
                    </Region>
                    <Region
                        name="last_purchase_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 70, width: 114, top: 130, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="Yes" />
                    </Region>
                    <Region
                        name="id_bans_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 70, width: 114, top: 156, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="Yes" />
                    </Region>
                    <Region
                        name="view_id_bans_txt"
                        params={17}
                        layout={{ position: 'absolute', left: 150, width: 30, top: 156, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        backgroundColor="#a2d6ea"
                    >
                        <ThemeText text="view" />
                    </Region>
                    <Region
                        name="buttons"
                        params={32769}
                        layout={{ position: 'absolute', left: 190, width: 80, top: 0, height: 122 }}
                    >
                        <Button
                            variant="0"
                            name="chatlog_but"
                            params={131089}
                            onPointerTap={onChatlogBut}
                            layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 21, minWidth: 80, maxWidth: 80 }}
                        >
                            Room Chat
                        </Button>
                        <Button
                            variant="0"
                            name="message_but"
                            params={131089}
                            onPointerTap={onMessageBut}
                            layout={{ position: 'absolute', left: 0, width: 80, top: 22, height: 21, maxWidth: 80 }}
                        >
                            Send Message
                        </Button>
                        <Button
                            variant="0"
                            name="roomvisits_but"
                            params={131089}
                            onPointerTap={onRoomvisitsBut}
                            layout={{ position: 'absolute', left: 0, width: 80, top: 44, height: 21, minWidth: 80, maxWidth: 80 }}
                        >
                            Room Visits
                        </Button>
                        <Button
                            variant="0"
                            name="modaction_but"
                            params={131089}
                            onPointerTap={onModactionBut}
                            layout={{ position: 'absolute', left: 0, width: 80, top: 88, height: 21, minWidth: 80, maxWidth: 80 }}
                        >
                            Mod Action
                        </Button>
                        <Button
                            variant="0"
                            name="habboinfotool_but"
                            params={131089}
                            onPointerTap={onHabboinfotoolBut}
                            layout={{ position: 'absolute', left: 0, width: 80, top: 66, height: 21, minWidth: 80, maxWidth: 80 }}
                        >
                            Habbo Info
                        </Button>
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};
