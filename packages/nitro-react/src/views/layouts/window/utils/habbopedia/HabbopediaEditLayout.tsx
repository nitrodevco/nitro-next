import { useState } from 'react';

import { Border, BoxLayout, Button, Frame, Region, TextInput } from '#base/theme';

/** Generated from `3194_habbopedia_edit_xml` (layout "habbopedia_edit", 385x355) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabbopediaEditLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onRevert?: () => void;
    onSave?: () => void;
}

export const HabbopediaEditLayout = ({ layout, onClose, onRevert, onSave }: HabbopediaEditLayoutProps) => {
    const [ dataValue, setDataValue ] = useState('');

    return (
        <Frame
            variant="100"
            params={98305}
            caption="Habbopedia Editor"
            onClose={onClose}
            layout={{ width: 385, height: 355, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="105"
                    params={2193}
                    layout={{ position: 'absolute', left: 8, right: 9, top: 7, bottom: 72 }}
                >
                    <TextInput
                        value={dataValue}
                        onChange={setDataValue}
                        multiline
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    />
                </Border>
                <Button
                    variant="101"
                    name="revert"
                    params={132113}
                    tintColor="#bbbbbb"
                    onPointerTap={onRevert}
                    layout={{ position: 'absolute', left: -3, width: 83, bottom: 30, height: 46 }}
                >
                    Revert
                </Button>
                <Button
                    variant="101"
                    name="save"
                    params={394321}
                    tintColor="#bbbbbb"
                    onPointerTap={onSave}
                    layout={{ position: 'absolute', right: -2, width: 73, bottom: 30, height: 46 }}
                >
                    Save
                </Button>
            </Region>
        </Frame>
    );
};
