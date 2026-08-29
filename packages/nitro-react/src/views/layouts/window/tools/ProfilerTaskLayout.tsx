import { useState } from 'react';

import { Border, BoxLayout, CheckBox, Region, TextInput, ThemeImage } from '#base/theme';

/** Generated from `3197_profiler_task_xml` (layout "habbo_profiler_task", 430x38) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ProfilerTaskLayoutProps {
    layout?: BoxLayout;
    onCheck?: () => void;
    srcCanvas?: string;
}

export const ProfilerTaskLayout = ({ layout, onCheck, srcCanvas }: ProfilerTaskLayoutProps) => {
    const [ textValue, setTextValue ] = useState('');
    const [ captionValue, setCaptionValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 430, height: 38, ...layout }}>
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, width: 430, top: 0, height: 38 }}
            >
                <TextInput
                    value={textValue}
                    onChange={setTextValue}
                    layout={{ position: 'absolute', left: 22, right: 79, top: 2, height: 14, overflow: 'hidden' }}
                />
                <TextInput
                    value={captionValue}
                    onChange={setCaptionValue}
                    textColor="#555555"
                    layout={{ position: 'absolute', left: 22, width: 320, top: 20, height: 14, overflow: 'hidden' }}
                />
                <ThemeImage
                    name="canvas"
                    src={srcCanvas}
                    layout={{ position: 'absolute', right: 10, width: 66, top: 3, height: 33, overflow: 'hidden' }}
                />
                <CheckBox
                    variant="0"
                    name="check"
                    onPointerTap={onCheck}
                    layout={{ position: 'absolute', left: 5, width: 16, top: 5, height: 16 }}
                />
            </Border>
        </Region>
    );
};
