import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PollAnswerCheckboxInputLayoutPollAnswerEntityItem } from './PollAnswerCheckboxInputLayoutPollAnswerEntityItem';

/** Generated from `922_poll_answer_checkbox_input_xml` (layout "poll_answer_checkbox_input", 372x125) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PollAnswerCheckboxInputLayoutProps {
    itemsPollAnswerItemlist?: ReactNode;
    layout?: BoxLayout;
    onPollAnswerContent?: () => void;
}

export const PollAnswerCheckboxInputLayout = ({ itemsPollAnswerItemlist, layout, onPollAnswerContent }: PollAnswerCheckboxInputLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 372, height: 125, ...layout }}>
            <Region
                name="poll_answer_content"
                onPointerTap={onPollAnswerContent}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="poll_answer_itemlist"
                    layout={{ position: 'absolute', left: 0, right: 7, top: 0, bottom: 0, flexDirection: 'column' }}
                >
                    {itemsPollAnswerItemlist ?? (
                        <PollAnswerCheckboxInputLayoutPollAnswerEntityItem />
                    )}
                </Region>
            </Region>
        </Region>
    );
};
