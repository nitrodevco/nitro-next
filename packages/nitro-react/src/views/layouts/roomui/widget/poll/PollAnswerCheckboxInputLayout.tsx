import { ReactNode } from 'react';

import { BoxLayout, CheckBox, Region, ThemeText } from '#base/theme';

/** Generated from `922_poll_answer_checkbox_input_xml` (layout "poll_answer_checkbox_input", 372x125) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PollAnswerCheckboxInputLayoutProps {
    layout?: BoxLayout;
    pollAnswerContent?: PollAnswerCheckboxInputLayoutPollAnswerContentProps;
}

export const PollAnswerCheckboxInputLayout = ({ layout, pollAnswerContent }: PollAnswerCheckboxInputLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 372, height: 125, ...layout }}>
            <PollAnswerCheckboxInputLayoutPollAnswerContent {...pollAnswerContent} />
        </Region>
    );
};

/** Row template `poll_answer_entity` of PollAnswerCheckboxInputLayout - pass real rows through its `items…` slot. */
export interface PollAnswerCheckboxInputLayoutPollAnswerEntityItemProps {
    captionPollAnswerEntityText?: string;
    layout?: BoxLayout;
    onPollAnswerCheckbox?: () => void;
    onPollAnswerEntity?: () => void;
}

export const PollAnswerCheckboxInputLayoutPollAnswerEntityItem = ({ captionPollAnswerEntityText, layout, onPollAnswerCheckbox, onPollAnswerEntity }: PollAnswerCheckboxInputLayoutPollAnswerEntityItemProps) => {
    return (
        <Region
            name="poll_answer_entity"
            onPointerTap={onPollAnswerEntity}
            cursor="pointer"
            layout={{ width: 365, height: 32, flexShrink: 0, ...layout }}
        >
            <CheckBox
                variant="0"
                name="poll_answer_checkbox"
                onPointerTap={onPollAnswerCheckbox}
                layout={{ position: 'absolute', left: 7, width: 20, top: 5, height: 16 }}
            />
            <Region
                name="poll_answer_entity_text"
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

/** Named region `poll_answer_itemlist` of PollAnswerCheckboxInputLayout - configured through the parent's `pollAnswerItemlist` prop. */
export interface PollAnswerCheckboxInputLayoutPollAnswerItemlistProps {
    itemsPollAnswerItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const PollAnswerCheckboxInputLayoutPollAnswerItemlist = ({ itemsPollAnswerItemlist, layout }: PollAnswerCheckboxInputLayoutPollAnswerItemlistProps) => {
    return (
        <Region
            name="poll_answer_itemlist"
            layout={{ position: 'absolute', left: 0, right: 7, top: 0, minHeight: 125, flexDirection: 'column', ...layout }}
        >
            {itemsPollAnswerItemlist ?? (
                <PollAnswerCheckboxInputLayoutPollAnswerEntityItem />
            )}
        </Region>
    );
};

/** Named region `poll_answer_content` of PollAnswerCheckboxInputLayout - configured through the parent's `pollAnswerContent` prop. */
export interface PollAnswerCheckboxInputLayoutPollAnswerContentProps {
    layout?: BoxLayout;
    onPollAnswerContent?: () => void;
    pollAnswerItemlist?: PollAnswerCheckboxInputLayoutPollAnswerItemlistProps;
}

export const PollAnswerCheckboxInputLayoutPollAnswerContent = ({ layout, onPollAnswerContent, pollAnswerItemlist }: PollAnswerCheckboxInputLayoutPollAnswerContentProps) => {
    return (
        <Region
            name="poll_answer_content"
            onPointerTap={onPollAnswerContent}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 125, ...layout }}
        >
            <PollAnswerCheckboxInputLayoutPollAnswerItemlist {...pollAnswerItemlist} />
        </Region>
    );
};
