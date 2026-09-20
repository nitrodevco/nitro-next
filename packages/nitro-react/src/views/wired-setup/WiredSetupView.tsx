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
 * `FramePreset` stacks them `sectionSpacing` apart (the gap after the advanced settings takes
 * their background, `blendSpacer`), makes the frame `widthModifier` times the style's frame
 * template wide and its height whatever the parts need, and puts the quick menu behind the
 * frame's menu button. `InnerBorderFramePreset` (the light volter styles) instead sets
 * everything between the header and the footer on the style's inner border and has no quick
 * menu. An element with `allowScrolling` scrolls between a sticky header and footer once it is
 * taller than the screen allows (`WiredUIBuilder.build`: `screenResolutionY / 1.8`).
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
import { ActionTypeCodes, hasWiredAdvancedSettings, hidesPickFurniInstructions, SLIDER_CONVERTER_PULSES, WiredStyle } from '#base/wired';

import { WiredCheckboxGroup } from './kit/WiredCheckboxGroup';
import { WiredSection } from './kit/WiredSection';
import { WiredSimpleList } from './kit/WiredSimpleList';
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
 * What the theme's frame skins put above and below the content, and where their menu button's
 * bottom left corner is from the content's top left - Flash reads both off the skin.
 */
const FRAME_CHROME: Record<string, { top: number; bottom: number; menuLeft: number; menuTop: number }> = {
    // `illumina_light_frame_wired`: the title bar is 30 high, the menu button 20x20 at (8, 9).
    102: { top: 30, bottom: 7, menuLeft: 2, menuTop: -1 },
    // The habbo frame: 2px frame padding and the 15px header in its 6px margin; the menu button (13 high) at the header's top left.
    0: { top: 29, bottom: 7, menuLeft: 1, menuTop: -8 },
    2: { top: 29, bottom: 7, menuLeft: 1, menuTop: -8 },
};

/** A part of the dialog; `blendColor` is `blendingBackgroundColor`, which the gap after the part takes. */
interface WiredSetupPart {
    key: string;
    node: ReactNode;
    blendColor?: string;
}

/** `FramePreset.createListView` - the parts `sectionSpacing` apart. */
const renderParts = (style: WiredStyle, parts: WiredSetupPart[]) => parts.map((part, index) => (
    <Box
        key={part.key}
        layout={{ flexDirection: 'column', alignItems: 'stretch', flexShrink: 0 }}
    >
        {part.node}
        {(index < (parts.length - 1)) && (
            <WiredSpacer
                height={style.sectionSpacing}
                backgroundColor={part.blendColor}
            />
        )}
    </Box>
));

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
    const contentSize = useLayoutSize(contentNode);
    const headerSize = useLayoutSize(headerNode);
    const middleSize = useLayoutSize(middleNode);
    const [ screenHeight ] = useState(() => window.innerHeight);

    const frame = style.templates.frame;
    const chrome = FRAME_CHROME[frame.variant] ?? FRAME_CHROME[0];
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

    const header: WiredSetupPart = {
        key: 'header',
        node: (
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
        ),
    };

    const middle: WiredSetupPart[] = [];

    if (View) {
        middle.push({
            key: 'inputs',
            node: (
                <WiredSimpleList spacing={style.sectionSpacing}>
                    <View
                        form={form}
                        setForm={update => setSetupForm(update)}
                        triggerable={triggerable}
                        ctx={ctx}
                    />
                </WiredSimpleList>
            ),
        });
    }

    if (triggerable.holder === 'selector') {
        middle.push({
            key: 'selector-options',
            node: (
                <WiredSection title="${wiredfurni.params.selector_options_selector}">
                    <WiredCheckboxGroup
                        options={[
                            { label: '${wiredfurni.params.selector_option.0}', selected: triggerable.isFilter },
                            { label: '${wiredfurni.params.selector_option.1}', selected: triggerable.isInvert },
                        ]}
                        onToggle={(id, selected) => patchSetupTriggerable((id === 0) ? { isFilter: selected } : { isInvert: selected })}
                    />
                </WiredSection>
            ),
        });
    }

    if (isWiredStuffSelectionMode(setup) && !hidesPickFurniInstructions(edit)) {
        middle.push({
            key: 'furni-picks',
            node: (
                <WiredSection title={t('wiredfurni.pickfurnis.caption', 'wiredfurni.pickfurnis.caption', { count: String(stuffIds1.length), limit: String(triggerable.furniLimit) })}>
                    <WiredText
                        text="${wiredfurni.pickfurnis.desc}"
                        color={style.softTextColor}
                    />
                </WiredSection>
            ),
        });
    }

    if ((triggerable.holder === 'action') && (definition.allowDelaying ?? true)) {
        middle.push({
            key: 'delay',
            node: (
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
            ),
        });
    }

    if (hasWiredAdvancedSettings(triggerable)) {
        const expanded = (definition.advancedAlwaysVisible ?? false) || advancedExpanded;

        middle.push({
            key: 'advanced',
            blendColor: expanded ? style.advancedBackgroundColor : style.backgroundColor,
            node: (
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
            ),
        });
    }

    const footer: WiredSetupPart = {
        key: 'footer',
        node: (
            <WiredSetupFooter
                style={style}
                saveDisabled={!hasWritePermission}
                splitterVisible={!style.useInnerBorder}
                onSave={() => saveWired(send)}
                onCancel={closeWiredSetup}
            />
        ),
    };

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

    const maxMiddleHeight = Math.floor(screenHeight / SCROLL_SCREEN_SHARE);
    const scrolls = (definition.allowScrolling ?? false) && (middleSize.height > maxMiddleHeight);

    let middleNodes: ReactNode = (
        <Box
            ref={setMiddleNode}
            layout={{ flexDirection: 'column', alignItems: 'stretch', flexShrink: 0 }}
        >
            {renderParts(style, middle)}
        </Box>
    );

    if (scrolls) middleNodes = <ScrollArea layout={{ height: maxMiddleHeight, flexShrink: 0 }}>{middleNodes}</ScrollArea>;

    let body: ReactNode;

    if (style.useInnerBorder) {
        // `InnerBorderFramePreset`: the header, then the rest on the inner border, then the footer.
        body = (
            <Box layout={{ flexDirection: 'column', alignItems: 'stretch', gap: style.genericHorizontalSpacing }}>
                {header.node}
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
                {footer.node}
            </Box>
        );
    } else {
        body = (
            <Box layout={{ flexDirection: 'column', alignItems: 'stretch' }}>
                {renderParts(style, [ header, { key: 'middle', node: middleNodes, blendColor: middle[middle.length - 1]?.blendColor }, footer ].filter(part => (part.key !== 'middle') || (middle.length > 0)))}
            </Box>
        );
    }

    const height = Math.ceil(contentSize.height) + chrome.top + chrome.bottom;
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
                contentLayout={{ paddingLeft: frame.marginLeft, paddingRight: frame.marginRight, paddingTop: 0, paddingBottom: 0 }}
                layout={{ position: 'absolute', width, height, minWidth: width, minHeight: height }}
            >
                <Box
                    ref={setContentNode}
                    layout={{ flexDirection: 'column', alignItems: 'stretch', width: contentWidth, flexShrink: 0 }}
                >
                    {body}
                </Box>
                {menuOpen && (
                    <Box layout={{ position: 'absolute', left: chrome.menuLeft, top: chrome.menuTop }}>
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
