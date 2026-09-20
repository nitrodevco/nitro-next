/**
 * `wired_setup.uibuilder.presets.SectionPreset` with `params.SectionParam` - the block every
 * wired dialog is built from: the style's splitter across the full width, then, inset by
 * `sectionLeftRightMargin` on both sides, a header row and the content, `sectionSpacing` apart.
 * `sections.AbstractSectionPreset` (a preset that is a section around its own content) is this
 * component used by another; `sections.BorderSection` is `bordered`.
 *
 * The header: the title (bold) on the left, followed by `headerOptionLeft` when there is one;
 * on the right, in this order, `headerOptions` (`SectionParam.miscHeaderOptions`), the source
 * type selector and the collapse button, `genericHorizontalSpacing` apart. Without a left option
 * the title wraps across what the right side leaves, minus `genericHorizontalSpacing`; with one
 * it is a single line and the option takes the rest (or its static width). The header is as high
 * as its taller side; the right side is top aligned.
 *
 * `collapsible` is `SectionParam.expandMode` other than `EXPAND_MODE_NONE` (`§_-33§`), and
 * `defaultCollapsed` picks `COLLAPSED` (`§_-I5§`) over `EXPANDED` (`§_-t1§`, `SectionParam.§_-MG§`).
 * The folded state is the section's own, as in Flash, where the button adds and removes the
 * content window; it starts from `defaultCollapsed` each time the section mounts.
 */
import { ReactNode, useState } from 'react';

import { Box } from '#base/theme';

import { useWiredFillLayout } from './useWiredFillLayout';
import { WiredCollapseExpandButton } from './WiredCollapseExpandButton';
import { WiredDisabled } from './WiredDisabled';
import { WiredFlow } from './WiredFlow';
import { WiredPaddedContainer } from './WiredPaddedContainer';
import { WiredSourceTypeSelector } from './WiredSourceTypeSelector';
import { WiredSplitter } from './WiredSplitter';
import { useWiredStyle } from './WiredStyleContext';
import { WiredText } from './WiredText';

/** `SectionParam.sourceTypeSelectorParam` - see `WiredSourceTypeSelector`. */
export interface WiredSectionSourceTypeSelector {
    options: readonly number[];
    selected: number;
    onSelect: (sourceType: number) => void;
}

export interface WiredSectionProps {
    /** The section title - a literal or `${localization.key}`. */
    title: string;
    children?: ReactNode;
    /** Shows the collapse / expand button. */
    collapsible?: boolean;
    /** With `collapsible`: starts folded (`SectionParam.COLLAPSED`). */
    defaultCollapsed?: boolean;
    /** `WiredUIPreset.disabled` for the whole section. */
    disabled?: boolean;
    /** `SectionParam.sourceTypeSelectorParam`. */
    sourceTypeSelector?: WiredSectionSourceTypeSelector;
    /** `SectionParam.addHeaderOption` - kit components placed at the header's right, before the selector. */
    headerOptions?: ReactNode;
    /** `SectionParam.headerOptionLeft` - a kit component right after the title (the slider section's number input). */
    headerOptionLeft?: ReactNode;
    /** `SectionParam.titleYOffset` - lowers the title; only positive values apply. */
    titleYOffset?: number;
    /** `BorderSection`: the content inset by `paddedSectionLeft` / `paddedSectionTop` inside the style's `border`. */
    bordered?: boolean;
    /** `splitterVisible`. Default `true`. */
    splitterVisible?: boolean;
}

export const WiredSection = ({ title, children, collapsible = false, defaultCollapsed = false, disabled = false, sourceTypeSelector, headerOptions, headerOptionLeft, titleYOffset = 0, bordered = false, splitterVisible = true }: WiredSectionProps) => {
    const style = useWiredStyle();
    const fillLayout = useWiredFillLayout();
    const [ expanded, setExpanded ] = useState(!(collapsible && defaultCollapsed));
    const hasLeftOption = (headerOptionLeft !== undefined) && (headerOptionLeft !== null) && (headerOptionLeft !== false);
    const hasMiscOptions = (headerOptions !== undefined) && (headerOptions !== null) && (headerOptions !== false);
    const hasRightOptions = hasMiscOptions || !!sourceTypeSelector || collapsible;
    const gap = style.genericHorizontalSpacing;
    const showsContent = !collapsible || expanded;

    const content = bordered
        ? (
                <WiredPaddedContainer
                    left={style.paddedSectionLeft}
                    top={style.paddedSectionTop}
                    right={style.paddedSectionLeft}
                    bottom={style.paddedSectionTop}
                    bordered
                    plainBorder
                >
                    {children}
                </WiredPaddedContainer>
            )
        : children;

    return (
        <WiredDisabled disabled={disabled}>
            <Box layout={{ flexDirection: 'column', gap: style.sectionSpacing, flexShrink: 0, ...fillLayout }}>
                {splitterVisible && (
                    <WiredFlow direction="column">
                        <WiredSplitter />
                    </WiredFlow>
                )}
                <Box layout={{ flexDirection: 'column', gap: style.sectionSpacing, alignSelf: 'stretch', paddingLeft: style.sectionLeftRightMargin, paddingRight: style.sectionLeftRightMargin }}>
                    <Box layout={{ flexDirection: 'row', alignItems: 'flex-start', alignSelf: 'stretch' }}>
                        <Box layout={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            gap,
                            flexGrow: 1,
                            flexShrink: 1,
                            flexBasis: 0,
                            minWidth: 0,
                            marginRight: (!hasLeftOption || hasRightOptions) ? gap : 0,
                        }}
                        >
                            <WiredFlow direction="row">
                                <WiredText
                                    text={title}
                                    bold
                                    mode={hasLeftOption ? 'stretch' : 'multiline'}
                                    layout={(titleYOffset > 0) ? { marginTop: titleYOffset } : undefined}
                                />
                            </WiredFlow>
                            {hasLeftOption && (
                                <WiredFlow direction="row">
                                    {headerOptionLeft}
                                </WiredFlow>
                            )}
                        </Box>
                        {hasRightOptions && (
                            <Box layout={{ flexDirection: 'row', alignItems: 'flex-start', gap, flexShrink: 0 }}>
                                <WiredFlow direction="row">
                                    {headerOptions}
                                    {sourceTypeSelector && (
                                        <WiredSourceTypeSelector
                                            options={sourceTypeSelector.options}
                                            selected={sourceTypeSelector.selected}
                                            onSelect={sourceTypeSelector.onSelect}
                                        />
                                    )}
                                    {collapsible && (
                                        <WiredCollapseExpandButton
                                            expanded={expanded}
                                            onToggle={setExpanded}
                                        />
                                    )}
                                </WiredFlow>
                            </Box>
                        )}
                    </Box>
                    {showsContent && (
                        <Box layout={{ flexDirection: 'column', alignSelf: 'stretch' }}>
                            <WiredFlow direction="column">
                                {content}
                            </WiredFlow>
                        </Box>
                    )}
                </Box>
            </Box>
        </WiredDisabled>
    );
};
