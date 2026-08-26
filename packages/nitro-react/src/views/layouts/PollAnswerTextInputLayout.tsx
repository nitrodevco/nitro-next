import { useState } from 'react';

import { Border, BoxLayout, Region, TextInput, ThemeImage } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `871_poll_answer_text_input_xml` (layout "poll_answer_text_input", 300x90) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PollAnswerTextInputLayoutProps {
    layout?: BoxLayout;
}

export const PollAnswerTextInputLayout = ({ layout }: PollAnswerTextInputLayoutProps) => {
    const [ pollAnswerInputValue, setPollAnswerInputValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 300, height: 90, ...layout }}>
            <Border
                variant="0"
                name="poll_answer_border"
                params={16}
                layout={{ position: 'absolute', left: 10, width: 300, top: 12, height: 90 }}
            >
                <TextInput
                    value={pollAnswerInputValue}
                    onChange={setPollAnswerInputValue}
                    maxLength={512}
                    multiline
                    layout={{ position: 'absolute', left: 8, width: 282, top: 3, height: 84 }}
                />
                <ThemeImage
                    name="write_deco"
                    params={16}
                    src={layoutImage('common_small_pen.png')}
                    layout={{ position: 'absolute', left: 270, width: 17, top: 10, height: 18 }}
                />
            </Border>
        </Region>
    );
};
