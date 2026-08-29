import { useState } from 'react';

import { Border, BoxLayout, TextInput, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `motto_container` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutMottoContainerItemProps {
    layout?: BoxLayout;
    srcChangemottoImage?: string;
    visibleChangemottoImage?: boolean;
    visibleMottoText?: boolean;
}

export const UserViewLayoutMottoContainerItem = ({ layout, srcChangemottoImage, visibleChangemottoImage, visibleMottoText }: UserViewLayoutMottoContainerItemProps) => {
    const [ mottoTextValue, setMottoTextValue ] = useState('');

    return (
        <Border
            variant="0"
            name="motto_container"
            tintColor="#666666"
            layout={{ width: 170, height: 57, flexShrink: 0, ...layout }}
        >
            {(visibleChangemottoImage ?? true) && (
                <ThemeImage
                    name="changemotto.image"
                    src={srcChangemottoImage ?? layoutImage('common_small_pen.png')}
                    layout={{ position: 'absolute', left: 3, width: 17, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 18 }}
                />
            )}
            {(visibleMottoText ?? true) && (
                <TextInput
                    value={mottoTextValue}
                    onChange={setMottoTextValue}
                    maxLength={38}
                    textColor="#ffffff"
                    layout={{ position: 'absolute', left: 20, width: 140, top: 2, height: 53 }}
                />
            )}
        </Border>
    );
};
