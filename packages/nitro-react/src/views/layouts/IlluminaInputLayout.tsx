import { useState } from 'react';

import { Border, BoxLayout, Button, Region, TextInput } from '#base/theme';

/** Generated from `2130_illumina_input_xml` (layout "illumina_input", 244x28) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaInputLayoutProps {
    layout?: BoxLayout;
    onSubmit?: () => void;
}

export const IlluminaInputLayout = ({ layout, onSubmit }: IlluminaInputLayoutProps) => {
    const [ inputValue, setInputValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 244, height: 28, ...layout }}>
            <Border
                variant="105"
                params={144}
                layout={{ position: 'absolute', left: 0, width: 244, top: 0, height: 28 }}
            >
                <Button
                    variant="101"
                    name="submit"
                    params={394321}
                    tintColor="#bbbbbb"
                    onPointerTap={onSubmit}
                    layout={{ position: 'absolute', left: 165, width: 86, top: -7, height: 42, maxHeight: 42 }}
                />
                <Region
                    name="empty_message"
                    params={16}
                    layout={{ position: 'absolute', left: 6, width: 66, top: 5, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                />
                <TextInput
                    value={inputValue}
                    onChange={setInputValue}
                    layout={{ position: 'absolute', left: 5, width: 235, top: 5, height: 17 }}
                />
            </Border>
        </Region>
    );
};
