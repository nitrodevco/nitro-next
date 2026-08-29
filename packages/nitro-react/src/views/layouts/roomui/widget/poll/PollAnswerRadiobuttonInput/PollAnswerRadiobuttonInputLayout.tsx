import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PollAnswerRadiobuttonInputLayoutPollAnswerEntityItem } from './PollAnswerRadiobuttonInputLayoutPollAnswerEntityItem';

/** Generated from `1006_poll_answer_radiobutton_input_xml` (layout "poll_answer_radiobutton_input", 365x125) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PollAnswerRadiobuttonInputLayoutProps {
    itemsPollAnswerItemlist?: ReactNode;
    layout?: BoxLayout;
    onPollAnswerContent?: () => void;
}

export const PollAnswerRadiobuttonInputLayout = ({ itemsPollAnswerItemlist, layout, onPollAnswerContent }: PollAnswerRadiobuttonInputLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 365, height: 125, ...layout }}>
            <Region
                name="poll_answer_content"
                onPointerTap={onPollAnswerContent}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 125 }}
            >
                <Region
                    name="poll_answer_selector"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 125 }}
                >
                    <Region
                        name="poll_answer_itemlist"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, minHeight: 125, flexDirection: 'column' }}
                    >
                        {itemsPollAnswerItemlist ?? (
                            <PollAnswerRadiobuttonInputLayoutPollAnswerEntityItem />
                        )}
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
