/**
 * `wired_setup.uibuilder.styles.IlluminaWiredStyle` with its template `wired_style_illumina_xml`
 * - the light default style (`UserDefinedRoomEventsCtrl.STYLE_DEFAULT`).
 *
 * Ported from the 2026 revision of the template (`WIN63-202609091217`), which added `border`
 * (style 105 tinted `0xdadada`) and the input's `warning_display`. The template still has no
 * `container_button` or `ruler_view_vertical`; Flash only builds those under the ubuntu style
 * (the trading windows), so they are given illumina's own skins: the plain illumina button and
 * the ruler's dark line.
 */
import { WiredStyle } from './WiredStyle';

export const ILLUMINA_WIRED_STYLE: WiredStyle = {
    name: 'illumina',
    isVolter: false,
    useInnerBorder: false,

    radioButtonSpacing: 3,
    checkboxSpacing: 3,
    checkboxYOffset: 2,
    radioButtonYOffset: 0,
    namedTextYOffset: 0,
    namedInputOffset: 2,
    namedDropdownOffset: 2,
    genericHorizontalSpacing: 5,
    genericVerticalSpacing: 5,
    sectionSpacing: 5,
    sectionLeftRightMargin: 5,
    headerMargin: 5,
    headerBottomMarginWithLink: 1,
    headerNameFontSize: 12,
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

    frameColor: '#e2e2e2',
    backgroundColor: '#e2e2e2',
    advancedBackgroundColor: '#cccccc',
    invalidInputBackgroundColor: '#ffc6c9',
    verticalSplitterColor: '#aaaaaa',
    surroundingBorderStyleId: 102,
    yellowTextColor: '#727514',
    softTextColor: '#444444',
    redTextColor: '#ed3033',

    templates: {
        ruler: { height: 2, lines: [ { color: '#aaaaaa', alpha: 1 }, { color: '#ffffff', alpha: 0xAF / 0xFF } ] },
        rulerVertical: { color: '#aaaaaa' },
        text: { textStyle: 'il_regular', bold: false, color: null, height: 16 },
        textBold: { textStyle: 'il_regular', bold: true, color: null, height: 16 },
        html: { textStyle: 'il_regular', bold: false, color: null, height: 16 },
        input: {
            width: 178, height: 21, borderVariant: '105',
            fieldLeft: 4, fieldTop: 2, fieldRight: 4, fieldBottom: 3,
            textStyle: 'il_regular', textColor: '#4a4a4a', backgroundColor: '#ffffff',
            fieldBorderColor: null, hasCharLimitWarn: true, hasWarningDisplay: true,
        },
        dropdown: { variant: '100', width: 149, height: 22 },
        checkbox: { variant: '101', width: 19, height: 21 },
        radioButton: { variant: '100', width: 12, height: 16 },
        expandCollapse: { width: 16, height: 12, offsetY: 2, arrowY: 1, arrowTint: '#999999', upAsset: 'wired_volter_uparrow', downAsset: 'wired_volter_downarrow' },
        iconButton: {
            variant: '102', size: 20, iconTint: '#7f7f7f', iconSize: 12,
            icons: { left: { icon: 2, x: 5, y: 5 }, right: { icon: 3, x: 5, y: 5 }, up: { icon: 1, x: 6, y: 5 }, down: { icon: 0, x: 6, y: 6 } },
        },
        button: { variant: '102', width: 49, height: 22, textStyle: 'il_button' },
        assetButton: { variant: '102', size: 25, assetInset: 5, assetSize: 15, dynamicStyle: 'button' },
        miniButton: { kind: 'pressed', variant: '102', size: 19, iconX: 3, iconY: 2, iconWidth: 13, iconHeight: 15 },
        sourceTypeSelector: {
            kind: 'segmented', height: 19,
            leftVariant: '104', middleVariant: '106', rightVariant: '105',
            leftWidth: 17, middleWidth: 14, rightWidth: 17,
            leftIconX: 6, middleIconX: 3, rightIconX: 4,
            splitterColor: '#919191', splitterShadowColor: '#f2f2f2',
            assetPrefix: 'wired_styles_illumina_icon_source_',
            dynamicStyle: 'button',
        },
        slider: {
            width: 148, height: 18, baseAsset: 'wired_styles_volter_slider_bg', baseHeight: 19, baseTint: '#999999',
            buttonAsset: 'wired_styles_illumina_slider_obj', buttonWidth: 12, buttonHeight: 17, movementAreaY: 1,
        },
        frame: {
            variant: '102', width: 240, color: '#3e3e3e',
            marginLeft: 6, marginTop: 25, marginRight: 6, marginBottom: 7,
            dropShadow: { distance: 4, angle: 0, alpha: 0.34901960784313724, blur: 20 },
        },
        quickMenu: {
            width: 145, outerBorderVariant: '11', outerBorderColor: '#f2f2f2', innerBorderVariant: '11', innerBorderColor: '#d6d6d6',
            itemHeight: 20, itemHoverColor: '#b2b2b2',
            checkbox: { variant: '101', width: 19, height: 21, x: 6, y: 1 },
            text: { textStyle: 'il_regular', bold: false, color: null, height: 16, x: 28, y: 3 },
            spacerHeight: 3, spacerLineColor: '#aaaaaa', spacerLineInset: 6,
        },
        innerBorder: null,
        border: { variant: '105', color: '#dadada' },
        containerButton: { variant: '102' },
    },
};
