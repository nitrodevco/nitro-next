import { useState } from 'react';

import { Border, BoxLayout, TextInput } from '#base/theme';

/** Row template `error_info_border` of ErrorPopupLayout - pass real rows through its `items…` slot. */
export interface ErrorPopupLayoutErrorInfoBorderItemProps {
    layout?: BoxLayout;
    visibleErrorInfoContents?: boolean;
}

export const ErrorPopupLayoutErrorInfoBorderItem = ({ layout, visibleErrorInfoContents }: ErrorPopupLayoutErrorInfoBorderItemProps) => {
    const [ errorInfoContentsValue, setErrorInfoContentsValue ] = useState('');

    return (
        <Border
            variant="105"
            name="error_info_border"
            layout={{ width: 265, height: 136, flexShrink: 0, ...layout }}
        >
            {(visibleErrorInfoContents ?? true) && (
                <TextInput
                    value={errorInfoContentsValue}
                    onChange={setErrorInfoContentsValue}
                    multiline
                    layout={{ position: 'absolute', left: 5, right: 5, top: 5, bottom: 5 }}
                />
            )}
        </Border>
    );
};
