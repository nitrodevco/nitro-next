import { BoxLayout, RadioButton, Region, ThemeText } from '#base/theme';

/** Generated from `1006_poll_answer_radiobutton_input_xml` (layout "poll_answer_radiobutton_input", 365x125) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PollAnswerRadiobuttonInputLayoutProps {
    layout?: BoxLayout;
    onPollAnswerEntityRadiobutton?: () => void;
}

export const PollAnswerRadiobuttonInputLayout = ({ layout, onPollAnswerEntityRadiobutton }: PollAnswerRadiobuttonInputLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 365, height: 125, ...layout }}>
            <Region
                name="poll_answer_content"
                params={131217}
                layout={{ position: 'absolute', left: 0, width: 365, top: 0, height: 125 }}
            >
                <Region
                    name="poll_answer_selector"
                    params={131217}
                    layout={{ position: 'absolute', left: 0, width: 365, top: 0, height: 125 }}
                >
                    <Region
                        name="poll_answer_itemlist"
                        params={131217}
                        layout={{ position: 'absolute', left: 0, width: 365, top: 0, height: 125, flexDirection: 'column' }}
                    >
                        <Region
                            name="poll_answer_entity"
                            params={131216}
                            layout={{ width: 365, height: 32, flexShrink: 0 }}
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
                                    text="yksi%20kaksi%20kolme%20nelj%E4%20viisi%20kuu%20usi%20seit%20sem%E4n%20kahde%20ksan%20yhde%20ks%E4n%20yksi%20toi"
                                    textStyle="text-style-u-regular"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 341 }}
                                />
                            </Region>
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
