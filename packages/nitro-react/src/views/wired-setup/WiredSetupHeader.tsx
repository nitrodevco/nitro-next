/**
 * The dialog's header - `main_layout/HeaderPreset` with its two faces, picked the way
 * `PresetManager.createHeaderPreset` does:
 *
 * - `IlluminaHeaderPreset`: the furni's name split on its first colon, the part before it in
 *   upper case at 11px, the rest in the style's header size and `0x494949`, 2px apart;
 * - `VolterHeaderPreset` (every `isVolter` style): the holder's type icon and the whole name.
 *
 * Flash has no header for ubuntu (`createHeaderPreset` throws); ubuntu is not offered as a setup
 * style (`STYLE_OPTIONS`), and would get the illumina face here.
 *
 * Under the name the header may carry one textual button (`buttonMode`) and, beside it, the
 * element's source type selector (`§_-J2U§.getHeaderSourceTypeSelectorParam`). The header's
 * padding is `headerMargin` all round, except under a visible button, where it is
 * `headerBottomMarginWithLink`.
 */
import { WiredHolderKey, WiredStyle } from '#base/wired';

import { WiredAlignCenter } from './kit/WiredAlignCenter';
import { WiredSimpleList } from './kit/WiredSimpleList';
import { WiredSourceTypeSelector } from './kit/WiredSourceTypeSelector';
import { WiredSpacing } from './kit/WiredSpacing';
import { WiredStaticBitmap } from './kit/WiredStaticBitmap';
import { WiredText } from './kit/WiredText';
import { WiredTextualButton } from './kit/WiredTextualButton';

/** `IlluminaHeaderPreset` `_name2Preset`'s `textColor` (4802889). */
const ILLUMINA_NAME_COLOR = '#494949';
/** `IlluminaHeaderPreset` `_name1Preset`'s `fontSize`. */
const ILLUMINA_TYPE_FONT_SIZE = 11;

export interface WiredSetupHeaderSourceTypeSelector {
    options: number[];
    selected: number;
    onSelect: (sourceType: number) => void;
}

export interface WiredSetupHeaderProps {
    style: WiredStyle;
    /** `getElementName(stuffTypeId)` - the furni's localized name, or `NAME: <type id>`. */
    name: string;
    holder: WiredHolderKey;
    /** The textual button's caption, already localized; absent for `BUTTON_MODE_NONE`. */
    buttonText?: string;
    buttonVisible: boolean;
    onButton: () => void;
    sourceTypeSelector?: WiredSetupHeaderSourceTypeSelector;
}

/** `IlluminaHeaderPreset.getNameParts` - AS3 `split(":", 2)` keeps the first two pieces only. */
const getNameParts = (name: string): [ string, string ] => {
    const parts = name.split(':').slice(0, 2);

    while (parts.length < 2) parts.push('');

    return [ parts[0].toUpperCase(), parts[1].replace(/^ +/, '') ];
};

export const WiredSetupHeader = ({ style, name, holder, buttonText, buttonVisible, onButton, sourceTypeSelector }: WiredSetupHeaderProps) => {
    const showButton = (buttonText !== undefined) && buttonVisible;

    let nameElement;

    if (style.isVolter) {
        nameElement = (
            <WiredSimpleList vertical={false}>
                <WiredStaticBitmap asset={`wired/wired_type_icons_icon_${holder}`} />
                <WiredText
                    text={name}
                    bold
                    wrap={false}
                    fontSize={style.headerNameFontSize}
                />
            </WiredSimpleList>
        );
    } else {
        const [ typeName, elementName ] = getNameParts(name);

        nameElement = (
            <WiredSimpleList
                spacing={-2}
                layout={{ marginLeft: 3 }}
            >
                <WiredSpacing
                    vertical
                    size={3}
                />
                <WiredText
                    text={typeName}
                    bold
                    fontSize={ILLUMINA_TYPE_FONT_SIZE}
                />
                <WiredText
                    text={elementName}
                    bold
                    fontSize={style.headerNameFontSize}
                    color={ILLUMINA_NAME_COLOR}
                />
            </WiredSimpleList>
        );
    }

    return (
        <WiredSimpleList layout={{
            paddingLeft: style.headerMargin,
            paddingRight: style.headerMargin,
            paddingTop: style.headerMargin,
            paddingBottom: showButton ? style.headerBottomMarginWithLink : style.headerMargin,
        }}
        >
            {sourceTypeSelector
                ? (
                        <WiredSimpleList
                            vertical={false}
                            centerVertically
                        >
                            {nameElement}
                            <WiredSourceTypeSelector
                                options={sourceTypeSelector.options}
                                selected={sourceTypeSelector.selected}
                                onSelect={sourceTypeSelector.onSelect}
                            />
                        </WiredSimpleList>
                    )
                : nameElement}
            {showButton && (
                <WiredAlignCenter>
                    <WiredTextualButton
                        text={buttonText}
                        onPress={onButton}
                    />
                </WiredAlignCenter>
            )}
        </WiredSimpleList>
    );
};
