import { useState } from 'react';

import { Border, BoxLayout, Button, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `2130_illumina_input_xml` (layout "illumina_input", 244x28) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaInputLayoutProps {
    captionEmptyMessage?: string;
    layout?: BoxLayout;
    onSubmit?: () => void;
}

export const IlluminaInputLayout = ({ captionEmptyMessage, layout, onSubmit }: IlluminaInputLayoutProps) => {
    const [ inputValue, setInputValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 244, height: 28, ...layout }}>
            <Border
                variant="105"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Button
                    variant="101"
                    name="submit"
                    tintColor="#bbbbbb"
                    onPointerTap={onSubmit}
                    layout={{ position: 'absolute', right: -7, width: 86, bottom: -7, height: 42, maxHeight: 42 }}
                />
                <ThemeText
                    text={captionEmptyMessage ?? ''}
                    textOptions={{ fill: '#888888' }}
                    name="empty_message"
                    layout={{ position: 'absolute', left: 6, width: 66, top: 5, height: 16 }}
                />
                <TextInput
                    value={inputValue}
                    onChange={setInputValue}
                    layout={{ position: 'absolute', left: 5, right: 4, top: 5, bottom: 6 }}
                />
            </Border>
        </Region>
    );
};
