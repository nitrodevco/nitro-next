import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Icon, Region, TextInput, ThemeText } from '#base/theme';

import { SearchTreeDropdownLayoutExpandedViewWrapper, SearchTreeDropdownLayoutExpandedViewWrapperProps } from './SearchTreeDropdownLayoutExpandedViewWrapper';

/** Named region `search_tree_dropdown` of SearchTreeDropdownLayout - configured through the parent's `searchTreeDropdown` prop. */
export interface SearchTreeDropdownLayoutSearchTreeDropdownProps {
    captionInputPlaceholderText?: string;
    expandedViewWrapper?: SearchTreeDropdownLayoutExpandedViewWrapperProps;
    layout?: BoxLayout;
    onInputFieldRegion?: () => void;
}

export const SearchTreeDropdownLayoutSearchTreeDropdown = ({ captionInputPlaceholderText, expandedViewWrapper, layout, onInputFieldRegion }: SearchTreeDropdownLayoutSearchTreeDropdownProps) => {
    const t = useTranslation();
    const [ inputFieldValue, setInputFieldValue ] = useState('');

    return (
        <Region
            name="search_tree_dropdown"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Border
                variant="12"
                name="collapsed_view"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Icon
                    variant="7"
                    name="down_icon"
                    tintColor="#777777"
                    layout={{ position: 'absolute', right: 8, width: 10, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 5 }}
                />
            </Border>
            <SearchTreeDropdownLayoutExpandedViewWrapper {...expandedViewWrapper} />
            <Region
                name="search_wrapper_collapsed"
                layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 20 }}
            >
                <Region
                    name="input_field_region"
                    onPointerTap={onInputFieldRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    <Region
                        name="input_placeholder_text"
                        layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionInputPlaceholderText ?? t('wiredfurni.variable_picker.search')}
                            textStyle="text-style-regular"
                            textOptions={{ fill: '#808080', wordWrap: true }}
                        />
                    </Region>
                    <TextInput
                        value={inputFieldValue}
                        onChange={setInputFieldValue}
                        maxLength={60}
                        layout={{ position: 'absolute', left: 7, right: 0, top: 3, bottom: 0, overflow: 'hidden' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
