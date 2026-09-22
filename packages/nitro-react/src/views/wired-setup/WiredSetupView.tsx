/**
 * The wired setup dialog - the frame `UserDefinedRoomEventsCtrl.createWindow` builds with a
 * `WiredUIBuilder`, in the order it adds the parts:
 *
 * 1. `createHeader` - the furni's name (`getElementName`), the header button the element's class
 *    asks for (snapshot / view in menu / logs / api docs) and its source type selector;
 * 2. `createInputs` - the element's own view (`buildInputs`), when it has one;
 * 3. `createSelectorOptions` - a selector's "filter" and "invert" checkboxes;
 * 4. `createFurniPicks` - the "pick furni" caption with its `[count/limit]`, while room clicks
 *    pick furni and the instructions are not hidden;
 * 5. `createDelaySection` - an action's delay slider, 0 to 20 pulses;
 * 6. `createAdvancedSections` - the quantifier and the input sources, in advanced mode;
 * 7. `createFooter` - "ready" and "cancel".
 *
 * Flash's builder hands the frame one flat array: the header, every preset the element's
 * `buildInputs` added, the parts 3 to 6, the footer. `FramePreset.createListView` follows every
 * one but the footer with a `sectionSpacing` spacer (the one after the advanced settings takes
 * their background, `blendSpacer`), in a list with no spacing of its own; it makes the frame
 * `widthModifier` times the style's frame template wide and its height whatever the list needs,
 * and puts the quick menu behind the frame's menu button. An element with `allowScrolling`
 * scrolls everything after the header's spacer up to the footer between a sticky header and
 * footer, the whole list at most `screenResolutionY / 1.8` high (`WiredUIBuilder.build`).
 *
 * `InnerBorderFramePreset` (the light volter styles) sets everything between the header and the
 * footer on the style's inner border (padded 9, 8, 9, 8, the style's background behind it), the
 * three `genericHorizontalSpacing` apart; there the first element hides its splitter and has no
 * spacer after it, while every later one is followed by one, the last included. The footer's
 * splitter is hidden, the scroll parameters are dropped and there is no quick menu.
 *
 * The elements between the header and the footer are a `WiredFrameList`, and every one of them
 * places itself: each top-level section of an element's view (`WiredSection` and everything
 * built on it, `WiredSplitter`, `WiredAlignCenter`) and each of the parts 3 to 6 is a
 * `WiredFrameListItem`, which registers the box it renders into, learns from the list whether it
 * is the first, and draws its own spacer (and, for a section, its own splitter) by that. An
 * element view keeps returning its sections as one fragment; a section it hides
 * (`WiredUIPreset.visible = false`) takes `visible` rather than leaving the tree, since Flash keeps
 * its index and its spacer.
 *
 * The dialog opens centered the first time and where it was left after that (`savePosition` /
 * `restorePositionAndActivate`); it is mounted per edit, so a paste or a reset starts it afresh.
 */
import { Container } from 'pixi.js';
import { ReactNode, useState } from 'react';

import { applyWiredSnapshot, clearWiredStuffPicks, closeWiredSetup, copyWiredToClipboard, eraseWiredFromExistence, isWiredStuffSelectionMode, openClientLink, openWiredApiDocs, pasteWiredFromClipboard, resetWiredToDefault, saveWired, saveWiredWithoutClosing, setWiredMergedSourceType, stepWiredInputSource, viewWiredLogs, viewWiredVariableInMenu } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useSystemStore, useTranslation } from '#base/context/system';
import { useWiredHasWritePermission, useWiredMenuEnabled, useWiredSetupActions, useWiredStore, wiredClipboardKey, WiredSetupSession } from '#base/context/wired';
import { useWiredActiveStyle, useWiredElementContext } from '#base/hooks';
import { Border, Box, Frame, ScrollArea, useLayoutSize } from '#base/theme';
import { ActionTypeCodes, hasWiredAdvancedSettings, hidesPickFurniInstructions, SLIDER_CONVERTER_PULSES } from '#base/wired';

import { WiredCheckboxGroup } from './kit/WiredCheckboxGroup';
import { WiredFrameList } from './kit/WiredFrameList';
import { WiredFrameListItem } from './kit/WiredFrameListItem';
import { WiredSection } from './kit/WiredSection';
import { WiredSliderSection } from './kit/WiredSliderSection';
import { WiredSpacer } from './kit/WiredSpacer';
import { WiredStyleProvider } from './kit/WiredStyleContext';
import { WiredText } from './kit/WiredText';
import { WiredSetupAdvancedSettings } from './WiredSetupAdvancedSettings';
import { WiredSetupBanner } from './WiredSetupBanner';
import { WiredSetupFooter } from './WiredSetupFooter';
import { WiredSetupHeader, WiredSetupHeaderSourceTypeSelector } from './WiredSetupHeader';
import { WiredSetupQuickMenu, WiredSetupQuickMenuItem } from './WiredSetupQuickMenu';

/** `createDelaySection`: `createSliderSection("wiredfurni.params.delay", "seconds", CONVERTER_PULSES, 0, 20, 1, false)`. */
const DELAY_MAX_PULSES = 20;

/** `InnerBorderFramePreset`'s padding around the inner border's content. */
const INNER_BORDER_PADDING = { left: 9, top: 8, right: 9, bottom: 8 };

/** `WiredUIBuilder.build` - a scrolling dialog is at most this share of the screen's height. */
const SCROLL_SCREEN_SHARE = 1.8;

/**
 * Where the skin's menu button (`header_button_menu`) has its bottom left corner, from the frame's
 * top left: `MenuPreset.requestOpen` opens the menu there (the button's global position plus its
 * height). `illumina_light_frame_wired` places the 20x20 button at (8, 9); the habbo frame
 * (`habbo_window_layout_frame`) its 15px header at (6, 6), with the button at (1, 0) in it.
 */
const MENU_ANCHORS: Record<string, { x: number; y: number }> = {
    102: { x: 8, y: 29 },
    0: { x: 7, y: 21 },
    2: { x: 7, y: 21 },
};

/** `getElementName` - the furni's localized name, `NAME: <type id>` when the furnidata does not know it. */
const useWiredElementName = (stuffTypeId: number): string => {
    const localizedName = useSystemStore(x => x.floorItems[stuffTypeId]?.localizedName);

    return localizedName ?? `NAME: ${stuffTypeId}`;
};

export interface WiredSetupViewProps {
    setup: WiredSetupSession;
}

export const WiredSetupView = ({ setup }: WiredSetupViewProps) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const ctx = useWiredElementContext();
    const menuEnabled = useWiredMenuEnabled();
    const hasWritePermission = useWiredHasWritePermission();
    const { triggerable, entry: { definition, View }, form, stuffIds1, stuffIds2, activeFurniPicks, advancedExpanded, copyIntoMode } = setup;
    const style = useWiredActiveStyle(triggerable.stuffTypeId);
    const name = useWiredElementName(triggerable.stuffTypeId);
    const hasClipboardEntry = useWiredStore(x => !!x.clipboard[wiredClipboardKey(definition.holder, definition.code)]);
    const savedPosition = useWiredStore(x => x.setupPosition);
    const { patchSetup, patchSetupTriggerable, setSetupForm, setSetupPosition } = useWiredSetupActions();
    // `restorePositionAndActivate` reads the position once, when the edit starts.
    const [ initialPosition ] = useState(savedPosition);
    const [ menuOpen, setMenuOpen ] = useState(false);
    const [ contentNode, setContentNode ] = useState<Container | null>(null);
    const [ headerNode, setHeaderNode ] = useState<Container | null>(null);
    const [ middleNode, setMiddleNode ] = useState<Container | null>(null);
    const [ footerNode, setFooterNode ] = useState<Container | null>(null);
    const contentSize = useLayoutSize(contentNode);
    const headerSize = useLayoutSize(headerNode);
    const middleSize = useLayoutSize(middleNode);
    const footerSize = useLayoutSize(footerNode);
    const [ screenHeight ] = useState(() => window.innerHeight);

    const frame = style.templates.frame;
    const menuAnchor = MENU_ANCHORS[frame.variant] ?? MENU_ANCHORS[0];
    const widthModifier = (typeof definition.widthModifier === 'function') ? definition.widthModifier(form) : (definition.widthModifier ?? 1);
    const width = Math.round(frame.width * widthModifier);
    const contentWidth = width - frame.marginLeft - frame.marginRight;
    const edit = { triggerable, definition, form, stuffIds1, stuffIds2 };

    // `createHeader`'s button mode, the later classes winning; `onEditStartUpdateCommonUI` shows "view in menu" only for a named variable.
    let buttonText: string | undefined;
    let buttonVisible = true;
    let onButton = () => {};

    if (definition.hasStateSnapshot) {
        buttonText = t('wiredfurni.applysnapshot', 'wiredfurni.applysnapshot');
        onButton = () => applyWiredSnapshot(send);
    }

    if (menuEnabled && definition.initialVariableName) {
        buttonText = t('wiredfurni.view_in_menu', 'wiredfurni.view_in_menu');
        buttonVisible = definition.initialVariableName(form).length > 0;
        onButton = () => viewWiredVariableInMenu(send);
    }

    if (definition.headerButton === 'logs') {
        buttonText = t('wiredfurni.params.write_to_logs.view', 'wiredfurni.params.write_to_logs.view');
        buttonVisible = true;
        onButton = () => viewWiredLogs(send);
    }

    if (definition.headerButton === 'apiDocs') {
        buttonText = t('wiredfurni.params.web_api.link', 'wiredfurni.params.web_api.link');
        buttonVisible = true;
        onButton = openWiredApiDocs;
    }

    const headerSelector = definition.headerSourceTypeSelector;
    const headerSourceTypeSelector: WiredSetupHeaderSourceTypeSelector | undefined = headerSelector && {
        options: headerSelector.options(triggerable, ctx),
        selected: headerSelector.get(form),
        onSelect: sourceType => setSetupForm(current => headerSelector.set(current, sourceType)),
    };

    const header = (
        <Box
            ref={setHeaderNode}
            layout={{ flexDirection: 'column', alignItems: 'stretch', flexShrink: 0 }}
        >
            <WiredSetupHeader
                style={style}
                name={name}
                holder={definition.holder}
                buttonText={buttonText}
                buttonVisible={buttonVisible}
                onButton={onButton}
                sourceTypeSelector={headerSourceTypeSelector}
            />
        </Box>
    );

    const advancedShown = (definition.advancedAlwaysVisible ?? false) || advancedExpanded;

    // The elements between the header and the footer, each a `WiredFrameListItem` placing itself in the frame's list.
    const elements = (
        <>
            {View && (
                <View
                    form={form}
                    setForm={update => setSetupForm(update)}
                    triggerable={triggerable}
                    ctx={ctx}
                />
            )}
            {(triggerable.holder === 'selector') && (
                <WiredSection title="${wiredfurni.params.selector_options_selector}">
                    <WiredCheckboxGroup
                        options={[
                            { label: '${wiredfurni.params.selector_option.0}', selected: triggerable.isFilter },
                            { label: '${wiredfurni.params.selector_option.1}', selected: triggerable.isInvert },
                        ]}
                        onToggle={(id, selected) => patchSetupTriggerable((id === 0) ? { isFilter: selected } : { isInvert: selected })}
                    />
                </WiredSection>
            )}
            {isWiredStuffSelectionMode(setup) && !hidesPickFurniInstructions(edit) && (
                <WiredSection title={t('wiredfurni.pickfurnis.caption', 'wiredfurni.pickfurnis.caption', { count: String(stuffIds1.length), limit: String(triggerable.furniLimit) })}>
                    <WiredText
                        text="${wiredfurni.pickfurnis.desc}"
                        color={style.softTextColor}
                    />
                </WiredSection>
            )}
            {(triggerable.holder === 'action') && (definition.allowDelaying ?? true) && (
                <WiredSliderSection
                    titleKey="wiredfurni.params.delay"
                    unitKey="seconds"
                    converter={SLIDER_CONVERTER_PULSES}
                    min={0}
                    max={DELAY_MAX_PULSES}
                    step={1}
                    value={triggerable.delayInPulses}
                    onChange={delayInPulses => patchSetupTriggerable({ delayInPulses })}
                    showInput={false}
                />
            )}
            {hasWiredAdvancedSettings(triggerable) && (
                // `AdvancedSettingsWrapperPreset.blendingBackgroundColor`: the advanced background while it is shown.
                <WiredFrameListItem blendColor={advancedShown ? style.advancedBackgroundColor : style.backgroundColor}>
                    {() => (
                        <WiredSetupAdvancedSettings
                            style={style}
                            edit={edit}
                            ctx={ctx}
                            expanded={advancedExpanded}
                            activeFurniPicks={activeFurniPicks}
                            onToggleExpanded={() => patchSetup({ advancedExpanded: !advancedExpanded })}
                            onSelectQuantifier={quantifierCode => patchSetupTriggerable({ quantifierCode })}
                            onStepInputSource={stepWiredInputSource}
                            onSelectMergedSourceType={setWiredMergedSourceType}
                            onSelectFurniPicks={picks => patchSetup({ activeFurniPicks: picks })}
                        />
                    )}
                </WiredFrameListItem>
            )}
        </>
    );

    const footer = (
        <Box
            ref={setFooterNode}
            layout={{ flexDirection: 'column', alignItems: 'stretch', flexShrink: 0 }}
        >
            <WiredSetupFooter
                style={style}
                saveDisabled={!hasWritePermission}
                splitterVisible={!style.useInnerBorder}
                onSave={() => saveWired(send)}
                onCancel={closeWiredSetup}
            />
        </Box>
    );

    const noPicks = (stuffIds1.length + stuffIds2.length) === 0;

    // `FramePreset.createMenuPreset`, disabled as `updateButtonDisabledStates` has it.
    const menuItems: (WiredSetupQuickMenuItem | null)[] = [
        { name: '${wiredfurni.params.menu.copy}', onClick: copyWiredToClipboard, tooltip: '${wiredfurni.params.menu.copy_paste.tooltip}', disabled: !hasWritePermission },
        { name: '${wiredfurni.params.menu.paste}', onClick: () => pasteWiredFromClipboard(send), tooltip: '${wiredfurni.params.menu.copy_paste.tooltip}', disabled: !hasWritePermission || !hasClipboardEntry },
        { name: '${wiredfurni.params.menu.paste_into}', onClick: () => patchSetup({ copyIntoMode: !copyIntoMode }), tooltip: '${wiredfurni.params.menu.paste_into.tooltip}', checked: copyIntoMode, disabled: !hasWritePermission },
        null,
        { name: '${wiredfurni.params.menu.clear_picks}', onClick: clearWiredStuffPicks, disabled: !hasWritePermission || noPicks },
        { name: '${wiredfurni.params.menu.reset}', onClick: () => resetWiredToDefault(send), disabled: !hasWritePermission },
        null,
        { name: '${wiredfurni.params.menu.open_menu}', onClick: () => openClientLink(send, 'wiredmenu/open') },
        null,
        { name: '${wiredfurni.params.menu.save}', onClick: () => saveWiredWithoutClosing(send), tooltip: '${wiredfurni.params.menu.save.tooltip}', disabled: !hasWritePermission },
        { name: '${wiredfurni.params.menu.close}', onClick: closeWiredSetup },
    ];

    if ((definition.holder === 'action') && (definition.code === ActionTypeCodes.RESET)) menuItems.push(null, { name: 'Erase from existence', onClick: () => eraseWiredFromExistence(send) });

    // `FramePreset.createListView` with `ListScrollParams`: the scroll list gets what the screen share leaves after the header and the footer, each with its spacer.
    const maxMiddleHeight = Math.max(0, Math.floor(screenHeight / SCROLL_SCREEN_SHARE) - (Math.ceil(headerSize.height) + style.sectionSpacing) - (Math.ceil(footerSize.height) + style.sectionSpacing));
    // `InnerBorderFramePreset` hands `FramePreset` no `ListScrollParams`, so an inner border dialog never scrolls.
    const scrolls = !style.useInnerBorder && (definition.allowScrolling ?? false) && (middleSize.height > maxMiddleHeight);

    let middleNodes: ReactNode = (
        <Box
            ref={setMiddleNode}
            layout={{ flexDirection: 'column', alignItems: 'stretch', flexShrink: 0 }}
        >
            {/* `FramePreset`: the header's spacer - inside the scroll list when it scrolls, where `createListView` unshifts it. */}
            {!style.useInnerBorder && <WiredSpacer height={style.sectionSpacing} />}
            <WiredFrameList
                innerBorder={style.useInnerBorder}
                spacing={style.sectionSpacing}
            >
                {elements}
            </WiredFrameList>
        </Box>
    );

    if (scrolls) middleNodes = <ScrollArea layout={{ height: maxMiddleHeight, flexShrink: 0 }}>{middleNodes}</ScrollArea>;

    let body: ReactNode;

    if (style.useInnerBorder) {
        // `InnerBorderFramePreset`: the header, the elements on the inner border, then the footer, in a list with the default spacing.
        body = (
            <Box layout={{ flexDirection: 'column', alignItems: 'stretch', gap: style.genericHorizontalSpacing }}>
                {header}
                <Border
                    variant={style.templates.innerBorder?.variant}
                    tintColor={style.templates.innerBorder?.color ?? undefined}
                    layout={{ flexDirection: 'column', alignItems: 'stretch', paddingLeft: INNER_BORDER_PADDING.left, paddingTop: INNER_BORDER_PADDING.top, paddingRight: INNER_BORDER_PADDING.right, paddingBottom: INNER_BORDER_PADDING.bottom }}
                >
                    <Box layout={{ flexDirection: 'column', alignItems: 'stretch' }}>
                        <Border
                            backgroundColor={style.backgroundColor}
                            layout={{ flexDirection: 'column', alignItems: 'stretch' }}
                        >
                            {middleNodes}
                        </Border>
                    </Box>
                </Border>
                {footer}
            </Box>
        );
    } else {
        // `FramePreset`: the header, its spacer and the elements (each followed by its own spacer), then the footer.
        body = (
            <Box layout={{ flexDirection: 'column', alignItems: 'stretch' }}>
                {header}
                {middleNodes}
                {footer}
            </Box>
        );
    }

    // `FramePreset.fixHeight`: the list's height plus the template's top and bottom margins.
    const height = Math.ceil(contentSize.height) + frame.marginTop + frame.marginBottom;
    const hasMenu = !style.useInnerBorder;

    return (
        <WiredStyleProvider style={style}>
            <Frame
                id="wired-setup"
                variant={frame.variant}
                caption={t('wiredfurni.title', 'wiredfurni.title')}
                tintColor={style.frameColor}
                dropShadow={frame.dropShadow}
                resizeDirection="none"
                rememberPosition={false}
                centered={!initialPosition}
                defaultPosition={initialPosition}
                onPositionChange={setSetupPosition}
                onClose={closeWiredSetup}
                onMenu={hasMenu ? () => setMenuOpen(true) : undefined}
                backdrop={(frame.variant === '102') && (
                    <WiredSetupBanner
                        width={width - 2}
                        height={Math.ceil(headerSize.height) + frame.marginTop + style.sectionSpacing}
                    />
                )}
                // The template's `margin_*` vars move `_CONTENT` (`FrameController.marginsCallback`).
                margins={[ frame.marginLeft, frame.marginTop, frame.marginRight, frame.marginBottom ]}
                layout={{ position: 'absolute', width, height, minWidth: width, minHeight: height }}
            >
                <Box
                    ref={setContentNode}
                    layout={{ flexDirection: 'column', alignItems: 'stretch', width: contentWidth, flexShrink: 0 }}
                >
                    {body}
                </Box>
                {menuOpen && (
                    <Box layout={{ position: 'absolute', left: menuAnchor.x - frame.marginLeft, top: menuAnchor.y - frame.marginTop }}>
                        <WiredSetupQuickMenu
                            style={style}
                            items={menuItems}
                            onClose={() => setMenuOpen(false)}
                        />
                    </Box>
                )}
            </Frame>
        </WiredStyleProvider>
    );
};
