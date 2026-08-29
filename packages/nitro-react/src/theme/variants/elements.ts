import { IlluminaLightScrollableItemlistVerticalLayout } from '#base/views/layouts/windowmanager/IlluminaLightScrollableItemlistVerticalLayout';
import { Scaler3Layout } from '#base/views/layouts/windowmanager/Scaler3Layout';
import { ScalerLayout } from '#base/views/layouts/windowmanager/ScalerLayout';
import { ScrollableItemgridVerticalLayout } from '#base/views/layouts/windowmanager/scrollable/ScrollableItemgridVerticalLayout';
import { ScrollableItemgridVerticalUbuntuLayout } from '#base/views/layouts/windowmanager/scrollable/ScrollableItemgridVerticalUbuntuLayout';
import { ScrollableItemlistVerticalLayout } from '#base/views/layouts/windowmanager/scrollable/ScrollableItemlistVerticalLayout';
import { ScrollableItemlistVerticalUbuntuLayout } from '#base/views/layouts/windowmanager/scrollable/ScrollableItemlistVerticalUbuntuLayout';
import { Bubble7Layout } from '#base/views/layouts/windowmanager/templates/Bubble7Layout';
import { BubbleLayout } from '#base/views/layouts/windowmanager/templates/BubbleLayout';
import { ButtonBlackLayout } from '#base/views/layouts/windowmanager/templates/ButtonBlackLayout';
import { ButtonLayout } from '#base/views/layouts/windowmanager/templates/ButtonLayout';
import { ButtonShinyBlackLayout } from '#base/views/layouts/windowmanager/templates/ButtonShinyBlackLayout';
import { ButtonShinyLayout } from '#base/views/layouts/windowmanager/templates/ButtonShinyLayout';
import { ButtonShinyThickBlackLayout } from '#base/views/layouts/windowmanager/templates/ButtonShinyThickBlackLayout';
import { ButtonShinyThickLayout } from '#base/views/layouts/windowmanager/templates/ButtonShinyThickLayout';
import { ButtonThickBlackLayout } from '#base/views/layouts/windowmanager/templates/ButtonThickBlackLayout';
import { ButtonThickLayout } from '#base/views/layouts/windowmanager/templates/ButtonThickLayout';
import { DroplistLayout } from '#base/views/layouts/windowmanager/templates/DroplistLayout';
import { Dropmenu3Layout } from '#base/views/layouts/windowmanager/templates/Dropmenu3Layout';
import { DropmenuBlackLayout } from '#base/views/layouts/windowmanager/templates/DropmenuBlackLayout';
import { DropmenuItem3Layout } from '#base/views/layouts/windowmanager/templates/DropmenuItem3Layout';
import { DropmenuItemBlackLayout } from '#base/views/layouts/windowmanager/templates/DropmenuItemBlackLayout';
import { DropmenuItemLayout } from '#base/views/layouts/windowmanager/templates/DropmenuItemLayout';
import { DropmenuLayout } from '#base/views/layouts/windowmanager/templates/DropmenuLayout';
import { Frame3Layout } from '#base/views/layouts/windowmanager/templates/Frame3Layout';
import { Frame7Layout } from '#base/views/layouts/windowmanager/templates/Frame7Layout';
import { FrameLayout } from '#base/views/layouts/windowmanager/templates/FrameLayout';
import { FrameLeaderboardLayout } from '#base/views/layouts/windowmanager/templates/FrameLeaderboardLayout';
import { Header3Layout } from '#base/views/layouts/windowmanager/templates/Header3Layout';
import { Header7Layout } from '#base/views/layouts/windowmanager/templates/Header7Layout';
import { HeaderBlackLayout } from '#base/views/layouts/windowmanager/templates/HeaderBlackLayout';
import { HeaderLayout } from '#base/views/layouts/windowmanager/templates/HeaderLayout';
import { HeaderLeaderboardLayout } from '#base/views/layouts/windowmanager/templates/HeaderLeaderboardLayout';
import { IlluminaDarkButtonLayout } from '#base/views/layouts/windowmanager/templates/IlluminaDarkButtonLayout';
import { IlluminaDarkFrameLayout } from '#base/views/layouts/windowmanager/templates/IlluminaDarkFrameLayout';
import { IlluminaDarkHeaderLayout } from '#base/views/layouts/windowmanager/templates/IlluminaDarkHeaderLayout';
import { IlluminaDarkScrollbarHorizontalLayout } from '#base/views/layouts/windowmanager/templates/IlluminaDarkScrollbarHorizontalLayout';
import { IlluminaDarkScrollbarVerticalLayout } from '#base/views/layouts/windowmanager/templates/IlluminaDarkScrollbarVerticalLayout';
import { IlluminaLightButtonLayout } from '#base/views/layouts/windowmanager/templates/IlluminaLightButtonLayout';
import { IlluminaLightButtonPlainLayout } from '#base/views/layouts/windowmanager/templates/IlluminaLightButtonPlainLayout';
import { IlluminaLightCheckboxBasicLayout } from '#base/views/layouts/windowmanager/templates/IlluminaLightCheckboxBasicLayout';
import { IlluminaLightDropmenuItemLayout } from '#base/views/layouts/windowmanager/templates/IlluminaLightDropmenuItemLayout';
import { IlluminaLightDropmenuLayout } from '#base/views/layouts/windowmanager/templates/IlluminaLightDropmenuLayout';
import { IlluminaLightFrameLayout } from '#base/views/layouts/windowmanager/templates/IlluminaLightFrameLayout';
import { IlluminaLightFrameModalLayout } from '#base/views/layouts/windowmanager/templates/IlluminaLightFrameModalLayout';
import { IlluminaLightFrameWiredLayout } from '#base/views/layouts/windowmanager/templates/IlluminaLightFrameWiredLayout';
import { IlluminaLightRadioButtonLayout } from '#base/views/layouts/windowmanager/templates/IlluminaLightRadioButtonLayout';
import { IlluminaLightScrollbarHorizontalLayout } from '#base/views/layouts/windowmanager/templates/IlluminaLightScrollbarHorizontalLayout';
import { IlluminaLightScrollbarVerticalLayout } from '#base/views/layouts/windowmanager/templates/IlluminaLightScrollbarVerticalLayout';
import { IlluminaLightSwitchLayout } from '#base/views/layouts/windowmanager/templates/IlluminaLightSwitchLayout';
import { IlluminaPurpleButtonLayout } from '#base/views/layouts/windowmanager/templates/IlluminaPurpleButtonLayout';
import { IlluminaPurpleButtonPlainLayout } from '#base/views/layouts/windowmanager/templates/IlluminaPurpleButtonPlainLayout';
import { IlluminaPurpleFrameLayout } from '#base/views/layouts/windowmanager/templates/IlluminaPurpleFrameLayout';
import { ScrollbarHorizontalLayout } from '#base/views/layouts/windowmanager/templates/ScrollbarHorizontalLayout';
import { ScrollbarVerticalLayout } from '#base/views/layouts/windowmanager/templates/ScrollbarVerticalLayout';
import { TabButton3Layout } from '#base/views/layouts/windowmanager/templates/TabButton3Layout';
import { TabButtonBlackLayout } from '#base/views/layouts/windowmanager/templates/TabButtonBlackLayout';
import { TabButtonLayout } from '#base/views/layouts/windowmanager/templates/TabButtonLayout';
import { TabContext3Layout } from '#base/views/layouts/windowmanager/templates/TabContext3Layout';
import { TabContextLayout } from '#base/views/layouts/windowmanager/templates/TabContextLayout';
import { TooltipLayout } from '#base/views/layouts/windowmanager/templates/TooltipLayout';

import { ElementView } from '../utils/ThemeVariant';

/** Generated from `2190_habbo_element_description_xml` by scripts/generate-layout-views.ts - do not edit by hand. */

/** What the client's element description says about one Flash element type + style. */
export interface ElementVariant {
    /** The window layout (skin template) that draws it - rendered as the theme component's view. */
    view: ElementView;
    /** The element's default colour. */
    tintColor?: string;
    /** The design intent the style was authored for (`default`, `black`, `bubble`, `modal`, ...). */
    intent?: string;
    /** The skin (art sheet definition) the client rendered it with. */
    skin?: string;
}

/** Every element type + style the client described with a window layout - the base each component's variant table is built on (see ./defineVariants.ts). */
export const ELEMENT_VARIANTS: Record<string, Record<string, ElementVariant>> = {
    bubble: {
        0: { view: BubbleLayout, intent: 'default', skin: 'habbo_skin_bubble' },
        7: { view: Bubble7Layout, intent: 'default', skin: 'habbo_skin_bubble_7' },
    },
    button: {
        0: { view: ButtonLayout, intent: 'default', skin: 'habbo_skin_button_default' },
        1: { view: ButtonBlackLayout, intent: 'black', skin: 'habbo_skin_button_default_black' },
        2: { view: ButtonLayout, intent: 'white', skin: 'habbo_skin_button_default_white' },
        3: { view: ButtonShinyLayout, intent: 'default', skin: 'habbo_skin_button_shiny_default' },
        4: { view: ButtonShinyBlackLayout, intent: 'black', skin: 'habbo_skin_button_shiny_black' },
        5: { view: ButtonShinyBlackLayout, intent: 'white', skin: 'habbo_skin_button_shiny_default' },
        6: { view: ButtonShinyBlackLayout, tintColor: '#00aa00', intent: 'green', skin: 'habbo_skin_button_shiny_default' },
        100: { view: IlluminaLightButtonLayout, intent: 'landing view', skin: 'illumina_light_skin_button' },
        101: { view: IlluminaLightButtonLayout, tintColor: '#bbbbbb', intent: 'window', skin: 'illumina_light_skin_button' },
        102: { view: IlluminaLightButtonPlainLayout, intent: 'plain', skin: 'illumina_light_skin_button_plain' },
        103: { view: IlluminaLightButtonPlainLayout, intent: 'unetched', skin: 'illumina_light_skin_button_unetched' },
        104: { view: IlluminaPurpleButtonLayout, intent: 'purple window', skin: 'illumina_purple_skin_button' },
        105: { view: IlluminaPurpleButtonPlainLayout, intent: 'purple plain', skin: 'illumina_purple_skin_button_plain' },
        106: { view: IlluminaLightButtonPlainLayout, intent: 'dark recolorable', skin: 'illumina_light_skin_button_dark_recolorable' },
        200: { view: IlluminaDarkButtonLayout, intent: 'default', skin: 'illumina_dark_skin_button' },
    },
    button_group_center: {
        0: { view: ButtonLayout, intent: 'default', skin: 'habbo_skin_button_group_center' },
        1: { view: ButtonBlackLayout, intent: 'black', skin: 'habbo_skin_button_group_center_black' },
        2: { view: ButtonLayout, intent: 'white', skin: 'habbo_skin_button_group_center_white' },
        100: { view: IlluminaLightButtonPlainLayout, intent: 'default', skin: 'habbo_skin_button_group_center' },
    },
    button_group_left: {
        0: { view: ButtonLayout, intent: 'default', skin: 'habbo_skin_button_group_left' },
        1: { view: ButtonBlackLayout, intent: 'black', skin: 'habbo_skin_button_group_left_black' },
        2: { view: ButtonLayout, intent: 'white', skin: 'habbo_skin_button_group_left_white' },
        100: { view: IlluminaLightButtonPlainLayout, intent: 'default', skin: 'habbo_skin_button_group_left' },
    },
    button_group_right: {
        0: { view: ButtonLayout, intent: 'default', skin: 'habbo_skin_button_group_right' },
        1: { view: ButtonBlackLayout, intent: 'black', skin: 'habbo_skin_button_group_right_black' },
        2: { view: ButtonLayout, intent: 'white', skin: 'habbo_skin_button_group_right_white' },
        100: { view: IlluminaLightButtonPlainLayout, intent: 'default', skin: 'habbo_skin_button_group_right' },
    },
    button_thick: {
        0: { view: ButtonThickLayout, intent: 'default', skin: 'habbo_skin_button_thick' },
        1: { view: ButtonThickBlackLayout, intent: 'black', skin: 'habbo_skin_button_thick_black' },
        2: { view: ButtonThickLayout, intent: 'white', skin: 'habbo_skin_button_thick_white' },
        3: { view: ButtonShinyThickLayout, intent: 'default', skin: 'habbo_skin_button_shiny_thick' },
        4: { view: ButtonShinyThickBlackLayout, intent: 'black', skin: 'habbo_skin_button_shiny_thick_black' },
        5: { view: ButtonShinyThickBlackLayout, intent: 'white', skin: 'habbo_skin_button_shiny_thick' },
        6: { view: ButtonShinyThickBlackLayout, tintColor: '#00aa00', intent: 'green', skin: 'habbo_skin_button_shiny_thick' },
    },
    checkbox: {
        100: { view: IlluminaLightSwitchLayout, intent: 'switch', skin: 'illumina_light_skin_switch' },
        101: { view: IlluminaLightCheckboxBasicLayout, intent: 'basic', skin: 'illumina_light_skin_checkbox_basic' },
    },
    container_button: {
        7: { view: ButtonShinyLayout, intent: 'default thin', skin: 'habbo_skin_button_shiny_default' },
    },
    droplist: {
        0: { view: DroplistLayout, intent: 'default', skin: 'habbo_skin_droplist' },
        1: { view: DroplistLayout, intent: 'white', skin: 'habbo_skin_droplist_thick' },
    },
    dropmenu: {
        0: { view: DropmenuLayout, intent: 'default', skin: 'habbo_skin_dropmenu' },
        1: { view: DropmenuBlackLayout, intent: 'black', skin: 'habbo_skin_dropmenu_black' },
        3: { view: Dropmenu3Layout, intent: 'default', skin: 'habbo_skin_dropmenu_3' },
        100: { view: IlluminaLightDropmenuLayout, intent: 'default', skin: 'illumina_light_skin_dropmenu' },
    },
    dropmenu_item: {
        0: { view: DropmenuItemLayout, intent: 'default', skin: 'habbo_skin_dropmenu' },
        1: { view: DropmenuItemBlackLayout, intent: 'black', skin: 'habbo_skin_dropmenu_black' },
        3: { view: DropmenuItem3Layout, intent: 'default', skin: 'habbo_skin_dropmenu_3' },
        100: { view: IlluminaLightDropmenuItemLayout, intent: 'default', skin: 'illumina_light_skin_dropmenu' },
    },
    frame: {
        0: { view: FrameLayout, tintColor: '#418db0', intent: 'blue', skin: 'habbo_skin_frame' },
        1: { view: FrameLayout, tintColor: '#4c4c4c', intent: 'black', skin: 'habbo_skin_frame' },
        2: { view: FrameLayout, tintColor: '#fac200', intent: 'yellow', skin: 'habbo_skin_frame' },
        3: { view: Frame3Layout, tintColor: '#418db0', intent: 'default', skin: 'habbo_skin_frame_3' },
        4: { view: Frame3Layout, tintColor: '#67a3bf', intent: 'light', skin: 'habbo_skin_frame_3' },
        7: { view: Frame7Layout, tintColor: '#ffffff', intent: 'bubble', skin: 'habbo_skin_frame_7' },
        100: { view: IlluminaLightFrameLayout, intent: 'default', skin: 'illumina_light_skin_frame' },
        101: { view: IlluminaLightFrameModalLayout, intent: 'modal' },
        102: { view: IlluminaLightFrameWiredLayout, intent: 'wired', skin: 'illumina_light_skin_frame' },
        103: { view: IlluminaPurpleFrameLayout, intent: 'purple', skin: 'illumina_purple_skin_frame' },
        200: { view: IlluminaDarkFrameLayout, intent: 'default', skin: 'illumina_dark_skin_frame' },
        10000: { view: FrameLeaderboardLayout, tintColor: '#ffffff', intent: 'leaderboard total badges', skin: 'habbo_skin_frame_leaderboard_all' },
        10001: { view: FrameLeaderboardLayout, tintColor: '#ffffff', intent: 'leaderboard achievement level', skin: 'habbo_skin_frame_leaderboard_ach' },
        10002: { view: FrameLeaderboardLayout, tintColor: '#ffffff', intent: 'leaderboard rare badges', skin: 'habbo_skin_frame_leaderboard_rarity_1' },
        10003: { view: FrameLeaderboardLayout, tintColor: '#ffffff', intent: 'leaderboard very rare badges', skin: 'habbo_skin_frame_leaderboard_rarity_2' },
        10004: { view: FrameLeaderboardLayout, tintColor: '#ffffff', intent: 'leaderboard mythical badges', skin: 'habbo_skin_frame_leaderboard_rarity_3' },
        10005: { view: FrameLeaderboardLayout, tintColor: '#ffffff', intent: 'leaderboard legendary badges', skin: 'habbo_skin_frame_leaderboard_rarity_4' },
        10006: { view: FrameLeaderboardLayout, tintColor: '#ffffff', intent: 'leaderboard unique badges', skin: 'habbo_skin_frame_leaderboard_rarity_5' },
        10007: { view: FrameLeaderboardLayout, tintColor: '#ffffff', intent: 'leaderboard uncommon badges', skin: 'habbo_skin_frame_leaderboard_rarity_uncommon' },
    },
    header: {
        0: { view: HeaderLayout, tintColor: '#418db0', intent: 'blue', skin: 'habbo_skin_header' },
        1: { view: HeaderBlackLayout, tintColor: '#4c4c4c', intent: 'black', skin: 'habbo_skin_header' },
        2: { view: HeaderLayout, tintColor: '#fac200', intent: 'yellow', skin: 'habbo_skin_header' },
        3: { view: Header3Layout, tintColor: '#ffffff', intent: 'default', skin: 'habbo_skin_header_3' },
        4: { view: Header3Layout, tintColor: '#ffffff', intent: 'light', skin: 'habbo_skin_header_3' },
        7: { view: Header7Layout, tintColor: '#ffffff', intent: 'bubble', skin: 'habbo_skin_header_7' },
        200: { view: IlluminaDarkHeaderLayout, intent: 'default', skin: 'illumina_dark_skin_header' },
        10000: { view: HeaderLeaderboardLayout, tintColor: '#ffffff', intent: 'leaderboard total badges', skin: 'habbo_skin_header_leaderboard' },
        10001: { view: HeaderLeaderboardLayout, tintColor: '#ffffff', intent: 'leaderboard achievement level', skin: 'habbo_skin_header_leaderboard' },
        10002: { view: HeaderLeaderboardLayout, tintColor: '#ffffff', intent: 'leaderboard rare badges', skin: 'habbo_skin_header_leaderboard' },
        10003: { view: HeaderLeaderboardLayout, tintColor: '#ffffff', intent: 'leaderboard very rare badges', skin: 'habbo_skin_header_leaderboard' },
        10004: { view: HeaderLeaderboardLayout, tintColor: '#ffffff', intent: 'leaderboard mythical badges', skin: 'habbo_skin_header_leaderboard' },
        10005: { view: HeaderLeaderboardLayout, tintColor: '#ffffff', intent: 'leaderboard legendary badges', skin: 'habbo_skin_header_leaderboard' },
        10006: { view: HeaderLeaderboardLayout, tintColor: '#ffffff', intent: 'leaderboard unique badges', skin: 'habbo_skin_header_leaderboard' },
        10007: { view: HeaderLeaderboardLayout, tintColor: '#ffffff', intent: 'leaderboard uncommon badges', skin: 'habbo_skin_header_leaderboard' },
    },
    radiobutton: {
        100: { view: IlluminaLightRadioButtonLayout, intent: 'default', skin: 'illumina_light_skin_radio_button' },
    },
    scaler: {
        0: { view: ScalerLayout, intent: 'default', skin: 'habbo_skin_scaler' },
        1: { view: ScalerLayout, intent: 'black', skin: 'habbo_skin_scaler' },
        2: { view: ScalerLayout, intent: 'white', skin: 'habbo_skin_scaler' },
        3: { view: Scaler3Layout, intent: 'default', skin: 'habbo_skin_scaler_3' },
        4: { view: Scaler3Layout, intent: 'light', skin: 'habbo_skin_scaler_3' },
    },
    scrollable_itemgrid_vertical: {
        0: { view: ScrollableItemgridVerticalLayout, intent: 'default' },
        3: { view: ScrollableItemgridVerticalUbuntuLayout, intent: 'default' },
    },
    scrollable_itemlist_vertical: {
        0: { view: ScrollableItemlistVerticalLayout, intent: 'default' },
        3: { view: ScrollableItemlistVerticalUbuntuLayout, intent: 'default' },
        100: { view: IlluminaLightScrollableItemlistVerticalLayout, intent: 'default' },
    },
    scrollbar_horizontal: {
        0: { view: ScrollbarHorizontalLayout, intent: 'default', skin: 'habbo_skin_scrollbar' },
        1: { view: ScrollbarHorizontalLayout, intent: 'black', skin: 'habbo_skin_scrollbar_black' },
        3: { view: ScrollbarHorizontalLayout, intent: 'default', skin: 'habbo_skin_scrollbar_3' },
        100: { view: IlluminaLightScrollbarHorizontalLayout, intent: 'default', skin: 'illumina_light_skin_scrollbar' },
        200: { view: IlluminaDarkScrollbarHorizontalLayout, intent: 'default', skin: 'illumina_dark_skin_scrollbar' },
    },
    scrollbar_vertical: {
        0: { view: ScrollbarVerticalLayout, intent: 'default', skin: 'habbo_skin_scrollbar' },
        1: { view: ScrollbarVerticalLayout, intent: 'black', skin: 'habbo_skin_scrollbar_black' },
        3: { view: ScrollbarVerticalLayout, intent: 'default', skin: 'habbo_skin_scrollbar_3' },
        100: { view: IlluminaLightScrollbarVerticalLayout, intent: 'default', skin: 'illumina_light_skin_scrollbar' },
        200: { view: IlluminaDarkScrollbarVerticalLayout, intent: 'default', skin: 'illumina_dark_skin_scrollbar' },
    },
    tab_button: {
        0: { view: TabButtonLayout, intent: 'default', skin: 'habbo_skin_button_tab' },
        1: { view: TabButtonBlackLayout, intent: 'black', skin: 'habbo_skin_button_tab_black' },
        2: { view: TabButtonLayout, intent: 'white', skin: 'habbo_skin_button_tab_white' },
        3: { view: TabButton3Layout, intent: 'default', skin: 'habbo_skin_button_tab_3' },
    },
    tab_context: {
        0: { view: TabContextLayout, intent: 'default', skin: 'habbo_skin_tab_context' },
        3: { view: TabContext3Layout, intent: 'default', skin: 'habbo_skin_tab_context' },
    },
    tooltip: {
        0: { view: TooltipLayout, intent: 'default', skin: 'habbo_skin_tooltip' },
    },
};
