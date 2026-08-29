import { useState } from 'react';

import { Border, BoxLayout, TextInput } from '#base/theme';

/** Row template `motto_container` of BotViewLayout - pass real rows through its `items…` slot. */
export interface BotViewLayoutMottoContainerItemProps {
    layout?: BoxLayout;
    visibleMottoText?: boolean;
}

export const BotViewLayoutMottoContainerItem = ({ layout, visibleMottoText }: BotViewLayoutMottoContainerItemProps) => {
    const [ mottoTextValue, setMottoTextValue ] = useState('');

    return (
        <Border
            variant="0"
            name="motto_container"
            tintColor="#666666"
            layout={{ width: 170, height: 57, flexShrink: 0, ...layout }}
        >
            {(visibleMottoText ?? true) && (
                <TextInput
                    value={mottoTextValue}
                    onChange={setMottoTextValue}
                    maxLength={38}
                    textColor="#ffffff"
                    layout={{ position: 'absolute', left: 5, width: 160, top: 2, height: 53 }}
                />
            )}
        </Border>
    );
};
