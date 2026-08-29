import { useState } from 'react';

import { Border, BoxLayout, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `table_element` of TableViewLayout - pass real rows through its `items…` slot. */
export interface TableViewLayoutTableElementItemProps {
    captionElementLink?: string;
    captionElementText?: string;
    layout?: BoxLayout;
    onExtraButton?: () => void;
    onLinkContainer?: () => void;
    onTableElement?: () => void;
    srcExtraButtonBitmap?: string;
    visibleElementInput?: boolean;
    visibleElementText?: boolean;
    visibleExtraButton?: boolean;
    visibleExtraButtonBitmap?: boolean;
    visibleHighlightBorder?: boolean;
    visibleLinkContainer?: boolean;
}

export const TableViewLayoutTableElementItem = ({ captionElementLink, captionElementText, layout, onExtraButton, onLinkContainer, onTableElement, srcExtraButtonBitmap, visibleElementInput, visibleElementText, visibleExtraButton, visibleExtraButtonBitmap, visibleHighlightBorder, visibleLinkContainer }: TableViewLayoutTableElementItemProps) => {
    const [ elementInputValue, setElementInputValue ] = useState('');

    return (
        <Region
            name="table_element"
            onPointerTap={onTableElement}
            cursor="pointer"
            layout={{ width: 101, height: 20, flexShrink: 0, minHeight: 20, maxHeight: 20, justifyContent: 'center', ...layout }}
        >
            {(visibleHighlightBorder ?? false) && (
                <Border
                    variant="2"
                    name="highlight_border"
                    tintColor="#4fbce3"
                    blend={0.4}
                    layout={{ position: 'absolute', left: 2, right: 2, top: 1, height: 17, minHeight: 17 }}
                />
            )}
            {(visibleElementText ?? true) && (
                <Region
                    name="element_text"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 17, minHeight: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionElementText ?? 'elem1'}
                </Region>
            )}
            {(visibleElementInput ?? false) && (
                <TextInput
                    value={elementInputValue}
                    onChange={setElementInputValue}
                    layout={{ position: 'absolute', left: 5, right: 5, top: 1, height: 18, minHeight: 18 }}
                />
            )}
            {(visibleLinkContainer ?? false) && (
                <Region
                    name="link_container"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 4, top: 1, height: 17, minHeight: 17, maxHeight: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    onPointerTap={onLinkContainer}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionElementLink ?? ''}
                        textOptions={{ fill: '#0000ee' }}
                    />
                </Region>
            )}
            {(visibleExtraButton ?? true) && (
                <Region
                    name="extra_button"
                    onPointerTap={onExtraButton}
                    cursor="pointer"
                    layout={{ position: 'absolute', right: 3, width: 20, top: 0, height: 20 }}
                >
                    {(visibleExtraButtonBitmap ?? true) && (
                        <ThemeImage
                            name="extra_button_bitmap"
                            src={srcExtraButtonBitmap ?? layoutImage('icons_info_grey.png')}
                            layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                        />
                    )}
                </Region>
            )}
        </Region>
    );
};
