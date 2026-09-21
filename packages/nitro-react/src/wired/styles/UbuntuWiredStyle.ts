/**
 * `wired_setup.uibuilder.styles.UbuntuWiredStyle` with its template `wired_style_ubuntu_xml` -
 * the style of the wired trading windows (chests, contracts), and the only one whose template
 * has `border`, `container_button`, `ruler_view_vertical`, `requirement_rule` and
 * `product_icon_previewer`.
 *
 * The template's texts name no `text_style`: they render in the ubuntu skin's default,
 * `u_regular` (the 17px field height is that font's line), and the bold one in `u_bold`. The
 * class leaves `verticalSplitterColor` at 0; it is given the template's ruler colour. Its
 * source type selector is the volters' flat one.
 */
import { WiredStyle } from './WiredStyle';

export const UBUNTU_WIRED_STYLE: WiredStyle = {
    name: 'ubuntu',
    isVolter: false,
    useInnerBorder: false,

    radioButtonSpacing: 3,
    checkboxSpacing: 3,
    checkboxYOffset: -1,
    radioButtonYOffset: -1,
    namedTextYOffset: 2,
    namedInputOffset: 0,
    namedDropdownOffset: 0,
    genericHorizontalSpacing: 5,
    genericVerticalSpacing: 5,
    sectionSpacing: 7,
    sectionLeftRightMargin: 7,
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
    containerButtonPaddingTop: 5,
    containerButtonPaddingLeft: 10,
    paddedSectionTop: 10,
    paddedSectionLeft: 5,

    frameColor: '#418db0',
    backgroundColor: '#e9e9e1',
    advancedBackgroundColor: '#d9d9d1',
    invalidInputBackgroundColor: '#ffc6c9',
    verticalSplitterColor: '#b5b5b5',
    surroundingBorderStyleId: 0,
    yellowTextColor: '#84872a',
    softTextColor: '#333333',
    redTextColor: '#f53235',

    templates: {
        ruler: { height: 1, lines: [ { color: '#b5b5b5', alpha: 1 } ] },
        rulerVertical: { color: '#b5b5b5' },
        text: { textStyle: 'u_regular', bold: false, color: null, height: 17 },
        textBold: { textStyle: 'u_bold', bold: false, color: null, height: 17 },
        html: { textStyle: 'u_regular', bold: false, color: null, height: 17 },
        input: {
            width: 178, height: 24, borderVariant: '4',
            fieldLeft: 5, fieldTop: 3, fieldRight: 5, fieldBottom: 3,
            textStyle: 'u_regular', textColor: '#000000', backgroundColor: '#ffffff',
            fieldBorderColor: null, hasCharLimitWarn: false, hasWarningDisplay: false,
        },
        dropdown: { variant: '3', width: 149, height: 24 },
        checkbox: { variant: '3', width: 17, height: 15 },
        radioButton: { variant: '3', width: 15, height: 15 },
        expandCollapse: { width: 16, height: 12, offsetY: 2, arrowY: 1, arrowTint: '#999999', upAsset: 'wired_volter_uparrow', downAsset: 'wired_volter_downarrow' },
        iconButton: {
            variant: '3', size: 22, iconTint: '#7f7f7f', iconSize: 12,
            icons: { left: { icon: 2, x: 6, y: 6 }, right: { icon: 3, x: 6, y: 6 }, up: { icon: 1, x: 7, y: 5 }, down: { icon: 0, x: 7, y: 6 } },
        },
        button: { variant: '3', width: 43, height: 24, textStyle: 'button_shiny_regular' },
        assetButton: { variant: '3', size: 25, assetInset: 5, assetSize: 15 },
        miniButton: { kind: 'pressed', variant: '3', size: 19, iconX: 3, iconY: 2, iconWidth: 13, iconHeight: 15 },
        sourceTypeSelector: {
            kind: 'flat', height: 17, optionWidth: 13,
            borderColor: '#000000', backgroundColor: '#181818',
            assetPrefix: 'wired_icon_source_', iconTint: null,
        },
        slider: {
            width: 148, height: 18, baseAsset: 'wired_styles_volter_slider_bg', baseHeight: 19, baseTint: '#999999',
            buttonAsset: 'wired_styles_illumina_slider_obj', buttonWidth: 12, buttonHeight: 17, movementAreaY: 1,
        },
        frame: {
            variant: '3', width: 240, color: '#418db0',
            marginLeft: 1, marginTop: 33, marginRight: 1, marginBottom: 8,
            dropShadow: { distance: 4, angle: 45, alpha: 0.34901960784313724, blur: 4 },
        },
        quickMenu: {
            width: 145, outerBorderVariant: '11', outerBorderColor: '#f2f2f2', innerBorderVariant: '11', innerBorderColor: '#d6d6d6',
            itemHeight: 20, itemHoverColor: '#b2b2b2',
            checkbox: { variant: '3', width: 17, height: 17, x: 8, y: 3 },
            text: { textStyle: 'il_regular', bold: false, color: null, height: 16, x: 28, y: 3 },
            spacerHeight: 3, spacerLineColor: '#aaaaaa', spacerLineInset: 6,
        },
        innerBorder: null,
        border: { variant: '3', color: '#dadada' },
        containerButton: { variant: '7' },
    },
};
