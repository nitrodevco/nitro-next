/**
 * The rows of the room settings' user lists as the clones `UserListCtrl.refresh` adds to them: one
 * `ros_flat_controller` per user with rights, one `ros_friend` per friend who could be given them
 * (`getRowView`), and one `ros_banned_user` per banned user (`BanListCtrl.getRowView`).
 *
 * `refreshEntry` colours each row by its index (`getBgColor`: odd rows white, even rows
 * `0xffe9e9e1`); `onBgMouseOver` turns the hovered one `0xffb6d9ff` and shows its `arrow_icon` - where
 * a click moves the user - and `onBgMouseOut` takes both back. `BanListCtrl` marks the row it picked
 * out `0xff9ab8d9`. The owner's eye in `user_info_region` swaps `icon_eye_off` for `icon_eye_over`
 * while hovered and opens the user's profile on a click (`setUserInfoState`, `onUserInfoMouseClick`).
 *
 * Kept from the earlier port: the arrow shows only while its row is hovered (Flash's layout shows it
 * on every row until the pointer has left that row once), and a picked banned row keeps its colour
 * while hovered.
 */
import { Template, TemplateBindings, TemplateItem } from '#base/theme';

export const FLAT_CONTROLLER_TEMPLATE = 'habbo-navigator-com/ros_flat_controller_xml';
export const FRIEND_TEMPLATE = 'habbo-navigator-com/ros_friend_xml';
export const BANNED_USER_TEMPLATE = 'habbo-navigator-com/ros_banned_user_xml';

/** `UserListCtrl.getBgColor` (`4294967295`, `4293519841`, `4290173439`) and `BanListCtrl`'s picked `4288329945`. */
const ROW_COLOR_ODD = 0xffffffff;
const ROW_COLOR_EVEN = 0xffe9e9e1;
const ROW_COLOR_HOVER = 0xffb6d9ff;
const ROW_COLOR_PICKED = 0xff9ab8d9;

export interface UserRowArgs {
    userId: number;
    name: string;
    index: number;
    /** Under the pointer (`bg_region`'s `WME_OVER`). */
    hovered: boolean;
    /** Its eye under the pointer (`user_info_region`'s `WME_OVER`). */
    eyeHovered: boolean;
    /** The banned row `BanListCtrl` picked out. */
    picked?: boolean;
    /** Whether the row's layout has an `arrow_icon` (the two rights lists' rows; not a banned row). */
    hasArrow: boolean;
    onPress: () => void;
    onHover: (hovered: boolean) => void;
    onEyeHover: (hovered: boolean) => void;
    onEye: () => void;
}

const rowColor = ({ index, hovered, picked }: UserRowArgs) => (picked ? ROW_COLOR_PICKED : (hovered ? ROW_COLOR_HOVER : (((index % 2) !== 0) ? ROW_COLOR_ODD : ROW_COLOR_EVEN)));

export const userRowItem = (template: Template, args: UserRowArgs): TemplateItem => {
    const { userId, name, hovered, eyeHovered, hasArrow, onPress, onHover, onEyeHover, onEye } = args;
    const bindings: TemplateBindings = {
        '': { color: rowColor(args) },
        bg_region: { onPointerTap: onPress, onPointerOver: () => onHover(true), onPointerOut: () => onHover(false) },
        user_info_region: { onPointerTap: onEye, onPointerOver: () => onEyeHover(true), onPointerOut: () => onEyeHover(false) },
        icon_eye_off: { visible: !eyeHovered },
        icon_eye_over: { visible: eyeHovered },
        user_name_txt: { caption: name },
    };

    if (hasArrow) bindings.arrow_icon = { visible: hovered };

    return { key: String(userId), from: template, bindings };
};
