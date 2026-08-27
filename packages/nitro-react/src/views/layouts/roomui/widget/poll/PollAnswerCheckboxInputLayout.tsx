import { ReactNode } from 'react';

import { BoxLayout, CheckBox, Region, ThemeText } from '#base/theme';

/** Generated from `922_poll_answer_checkbox_input_xml` (layout "poll_answer_checkbox_input", 372x125) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PollAnswerCheckboxInputLayoutProps {
    itemsPollAnswerItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const PollAnswerCheckboxInputLayout = ({ itemsPollAnswerItemlist, layout }: PollAnswerCheckboxInputLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 372, height: 125, ...layout }}>
            <Region
                name="poll_answer_content"
                params={131217}
                layout={{ position: 'absolute', left: 0, width: 372, top: 0, height: 125 }}
            >
                <Region
                    name="poll_answer_itemlist"
                    params={131217}
                    layout={{ position: 'absolute', left: 0, width: 365, top: 0, height: 125, flexDirection: 'column' }}
                >
                    {itemsPollAnswerItemlist ?? (
                        <PollAnswerCheckboxInputLayoutPollAnswerEntityItem />
                    )}
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `poll_answer_entity` of PollAnswerCheckboxInputLayout - pass real rows through its `items…` slot. */
export interface PollAnswerCheckboxInputLayoutPollAnswerEntityItemProps {
    captionPollAnswerEntityText?: string;
    layout?: BoxLayout;
    onPollAnswerCheckbox?: () => void;
}

export const PollAnswerCheckboxInputLayoutPollAnswerEntityItem = ({ captionPollAnswerEntityText, layout, onPollAnswerCheckbox }: PollAnswerCheckboxInputLayoutPollAnswerEntityItemProps) => {
    return (
        <Region
            name="poll_answer_entity"
            params={131217}
            layout={{ width: 365, height: 32, flexShrink: 0, ...layout }}
        >
            <CheckBox
                variant="0"
                name="poll_answer_checkbox"
                tags={[ 'POLL_SELECTABLE_ITEM' ]}
                params={17}
                onPointerTap={onPollAnswerCheckbox}
                layout={{ position: 'absolute', left: 7, width: 20, top: 5, height: 16 }}
            />
            <Region
                name="poll_answer_entity_text"
                params={16}
                layout={{ position: 'absolute', left: 24, width: 341, top: 2, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPollAnswerEntityText ?? 'yksi%20kaksi%20kolme%20nelj%E4%20viisi%20kuu%20usi%20seit%20sem%E4n%20kahde%20ksan%20yhde%20ks%E4n%20yksi%20toi'}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 341 }}
                />
            </Region>
        </Region>
    );
};
