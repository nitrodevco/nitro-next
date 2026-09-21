/**
 * `wired_setup.uibuilder.styles.VolterWiredStyle` with its template `wired_style_volter_xml` -
 * the dark classic style, the second of `UserDefinedRoomEventsCtrl.STYLE_OPTIONS`.
 *
 * The dropdown names Flash style 200, which the client's element description does not define
 * either: both fall back to the default drop menu skin. The template has no `border`,
 * `container_button` or `ruler_view_vertical` (Flash builds those under ubuntu only); they get
 * the black classic skins.
 */
import { WiredStyle } from './WiredStyle';

export const VOLTER_WIRED_STYLE: WiredStyle = {
    name: 'volter',
    isVolter: true,
    useInnerBorder: false,

    radioButtonSpacing: 6,
    checkboxSpacing: 2,
    checkboxYOffset: 0,
    radioButtonYOffset: 0,
    namedTextYOffset: 0,
    namedInputOffset: 0,
    namedDropdownOffset: 0,
    genericHorizontalSpacing: 5,
    genericVerticalSpacing: 5,
    sectionSpacing: 4,
    sectionLeftRightMargin: 5,
    headerMargin: 5,
    headerBottomMarginWithLink: 1,
    headerNameFontSize: 9,
    minimumOptionHeight: 20,
    minimumOptionSpacing: 4,
    optionExtraUnderSpacing: 3,
    optionExtraUnderLeftMargin: 25,
    LRContainerMargin: 9,
    LRContainerSpacing: 6,
    LRContainerTopBottomPadding: 4,
    inputSourceListMinHeight: 23,
    buttonRowSpacing: 12,
    menuRightOffset: 12,
    containerButtonPaddingTop: 0,
    containerButtonPaddingLeft: 0,
    paddedSectionTop: 0,
    paddedSectionLeft: 0,

    frameColor: '#3d3d3d',
    backgroundColor: '#3d3d3d',
    advancedBackgroundColor: '#303030',
    invalidInputBackgroundColor: '#ffc6c9',
    verticalSplitterColor: '#232323',
    surroundingBorderStyleId: 0,
    yellowTextColor: '#ffffaa',
    softTextColor: '#cfcfcf',
    redTextColor: '#eda1a2',

    templates: {
        ruler: { height: 1, lines: [ { color: '#232323', alpha: 1 } ] },
        rulerVertical: { color: '#232323' },
        text: { textStyle: 'regular', bold: false, color: '#ffffff', height: 13 },
        textBold: { textStyle: 'bold', bold: false, color: '#ffffff', height: 13 },
        html: { textStyle: 'regular', bold: false, color: '#ffffff', height: 13 },
        input: {
            width: 112, height: 15, borderVariant: null,
            fieldLeft: 0, fieldTop: 0, fieldRight: 0, fieldBottom: 0,
            textStyle: 'regular', textColor: '#ffffff', backgroundColor: null,
            fieldBorderColor: '#ffffff', hasCharLimitWarn: false, hasWarningDisplay: false,
        },
        dropdown: { variant: '200', width: 149, height: 22 },
        checkbox: { variant: '1', width: 17, height: 17 },
        radioButton: { variant: '1', width: 14, height: 16 },
        expandCollapse: { width: 16, height: 10, offsetY: 0, arrowY: 0, arrowTint: null, upAsset: 'wired_volter_uparrow', downAsset: 'wired_volter_downarrow' },
        iconButton: {
            variant: '1', size: 20, iconTint: '#777777', iconSize: 12,
            icons: { left: { icon: 2, x: 5, y: 5 }, right: { icon: 3, x: 5, y: 5 }, up: { icon: 1, x: 6, y: 5 }, down: { icon: 0, x: 6, y: 6 } },
        },
        button: { variant: '1', width: 41, height: 22, textStyle: 'button_regular' },
        assetButton: { variant: '1', size: 25, assetInset: 5, assetSize: 15, dynamicStyle: 'button' },
        miniButton: { kind: 'flat', width: 17, height: 17, borderColor: '#000000', fillColor: '#333333', iconWidth: 13, iconHeight: 15 },
        sourceTypeSelector: {
            kind: 'flat', height: 17, optionWidth: 13,
            borderColor: '#000000', backgroundColor: '#181818',
            assetPrefix: 'wired_icon_source_', iconTint: null,
        },
        slider: {
            width: 148, height: 17, baseAsset: 'wired_styles_volter_slider_bg', baseHeight: 17, baseTint: null,
            buttonAsset: 'wired_styles_volter_slider_obj', buttonWidth: 12, buttonHeight: 15, movementAreaY: 1,
        },
        frame: {
            variant: '0', width: 240, color: '#3e3e3e',
            marginLeft: 6, marginTop: 25, marginRight: 6, marginBottom: 7,
            dropShadow: { distance: 4, angle: 45, alpha: 0.34901960784313724, blur: 4 },
        },
        quickMenu: {
            width: 145, outerBorderVariant: '11', outerBorderColor: '#5a5a5a', innerBorderVariant: '11', innerBorderColor: '#424242',
            itemHeight: 20, itemHoverColor: '#626262',
            checkbox: { variant: '1', width: 16, height: 16, x: 6, y: 3 },
            text: { textStyle: 'regular', bold: false, color: '#ffffff', height: 13, x: 28, y: 3 },
            spacerHeight: 3, spacerLineColor: '#666666', spacerLineInset: 6,
        },
        innerBorder: null,
        border: { variant: '1', color: null },
        containerButton: { variant: '1' },
    },
};
