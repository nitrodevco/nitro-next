import { ReactNode } from 'react';

import { BoxLayout, RadioButton, Region, ThemeText } from '#base/theme';

/** Generated from `1006_poll_answer_radiobutton_input_xml` (layout "poll_answer_radiobutton_input", 365x125) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PollAnswerRadiobuttonInputLayoutProps {
    layout?: BoxLayout;
    pollAnswerContent?: PollAnswerRadiobuttonInputLayoutPollAnswerContentProps;
}

export const PollAnswerRadiobuttonInputLayout = ({ layout, pollAnswerContent }: PollAnswerRadiobuttonInputLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 365, height: 125, ...layout }}>
            <PollAnswerRadiobuttonInputLayoutPollAnswerContent {...pollAnswerContent} />
        </Region>
    );
};

/** Row template `poll_answer_entity` of PollAnswerRadiobuttonInputLayout - pass real rows through its `items…` slot. */
export interface PollAnswerRadiobuttonInputLayoutPollAnswerEntityItemProps {
    captionPollAnswerEntityText?: string;
    layout?: BoxLayout;
    onPollAnswerEntityRadiobutton?: () => void;
}

export const PollAnswerRadiobuttonInputLayoutPollAnswerEntityItem = ({ captionPollAnswerEntityText, layout, onPollAnswerEntityRadiobutton }: PollAnswerRadiobuttonInputLayoutPollAnswerEntityItemProps) => {
    return (
        <Region
            name="poll_answer_entity"
            params={131216}
            layout={{ width: 365, height: 32, flexShrink: 0, ...layout }}
        >
            <RadioButton
                variant="0"
                name="poll_answer_entity_radiobutton"
                tags={[ 'POLL_SELECTABLE_ITEM' ]}
                params={17}
                onPointerTap={onPollAnswerEntityRadiobutton}
                layout={{ position: 'absolute', left: 0, width: 19, top: 4, height: 16 }}
            />
            <Region
                name="poll_answer_entity_text"
                params={16}
                layout={{ position: 'absolute', left: 18, width: 341, top: 2, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
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

/** Named region `poll_answer_itemlist` of PollAnswerRadiobuttonInputLayout - configured through the parent's `pollAnswerItemlist` prop. */
export interface PollAnswerRadiobuttonInputLayoutPollAnswerItemlistProps {
    itemsPollAnswerItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const PollAnswerRadiobuttonInputLayoutPollAnswerItemlist = ({ itemsPollAnswerItemlist, layout }: PollAnswerRadiobuttonInputLayoutPollAnswerItemlistProps) => {
    return (
        <Region
            name="poll_answer_itemlist"
            params={131217}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, minHeight: 125, flexDirection: 'column', ...layout }}
        >
            {itemsPollAnswerItemlist ?? (
                <PollAnswerRadiobuttonInputLayoutPollAnswerEntityItem />
            )}
        </Region>
    );
};

/** Named region `poll_answer_selector` of PollAnswerRadiobuttonInputLayout - configured through the parent's `pollAnswerSelector` prop. */
export interface PollAnswerRadiobuttonInputLayoutPollAnswerSelectorProps {
    layout?: BoxLayout;
    pollAnswerItemlist?: PollAnswerRadiobuttonInputLayoutPollAnswerItemlistProps;
}

export const PollAnswerRadiobuttonInputLayoutPollAnswerSelector = ({ layout, pollAnswerItemlist }: PollAnswerRadiobuttonInputLayoutPollAnswerSelectorProps) => {
    return (
        <Region
            name="poll_answer_selector"
            params={131217}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 125, ...layout }}
        >
            <PollAnswerRadiobuttonInputLayoutPollAnswerItemlist {...pollAnswerItemlist} />
        </Region>
    );
};

/** Named region `poll_answer_content` of PollAnswerRadiobuttonInputLayout - configured through the parent's `pollAnswerContent` prop. */
export interface PollAnswerRadiobuttonInputLayoutPollAnswerContentProps {
    layout?: BoxLayout;
    onPollAnswerContent?: () => void;
    pollAnswerSelector?: PollAnswerRadiobuttonInputLayoutPollAnswerSelectorProps;
}

export const PollAnswerRadiobuttonInputLayoutPollAnswerContent = ({ layout, onPollAnswerContent, pollAnswerSelector }: PollAnswerRadiobuttonInputLayoutPollAnswerContentProps) => {
    return (
        <Region
            name="poll_answer_content"
            params={131217}
            onPointerTap={onPollAnswerContent}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 125, ...layout }}
        >
            <PollAnswerRadiobuttonInputLayoutPollAnswerSelector {...pollAnswerSelector} />
        </Region>
    );
};
