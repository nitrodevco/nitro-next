import { useState } from 'react';

import { BoxLayout, Button, Dropmenu, Frame, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `1121_modact_summary_xml` (layout "start_panel", 383x295) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ModactSummaryLayoutProps {
    captionDefaultSanctionLabel?: string;
    captionMessageInfo?: string;
    layout?: BoxLayout;
    onCfhTopics?: () => void;
    onClose?: () => void;
    onCustomSanctionButton?: () => void;
    onDefaultSanctionButton?: () => void;
    onSanctionType?: () => void;
}

export const ModactSummaryLayout = ({ captionDefaultSanctionLabel, captionMessageInfo, layout, onCfhTopics, onClose, onCustomSanctionButton, onDefaultSanctionButton, onSanctionType }: ModactSummaryLayoutProps) => {
    const [ messageInputValue, setMessageInputValue ] = useState('');

    return (
        <Frame
            variant="0"
            caption="Mod action on:"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 383, height: 295, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Dropmenu
                    variant="100"
                    name="cfh_topics"
                    onPointerTap={onCfhTopics}
                    layout={{ position: 'absolute', left: 20, width: 320, top: 15, height: 20 }}
                >
                    CFH topic:
                </Dropmenu>
                <Dropmenu
                    variant="100"
                    name="sanction_type"
                    onPointerTap={onSanctionType}
                    layout={{ position: 'absolute', left: 20, width: 320, top: 45, height: 20 }}
                >
                    Sanction type:
                </Dropmenu>
                <Region
                    name="message_info"
                    layout={{ position: 'absolute', left: 20, width: 320, top: 80, height: 20, maxWidth: 320, maxHeight: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMessageInfo ?? 'Optional message to user, overrides default text:'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <TextInput
                    value={messageInputValue}
                    onChange={setMessageInputValue}
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 20, width: 320, bottom: 145, height: 45 }}
                />
                <Button
                    variant="0"
                    name="default_sanction_button"
                    onPointerTap={onDefaultSanctionButton}
                    layout={{ position: 'absolute', left: 20, width: 100, top: 165, height: 21, minWidth: 100, maxWidth: 100 }}
                >
                    Default sanction
                </Button>
                <Region
                    name="default_sanction_label"
                    layout={{ position: 'absolute', left: 125, width: 240, top: 167, height: 20, maxWidth: 240, maxHeight: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDefaultSanctionLabel ?? '(not available)'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Button
                    variant="0"
                    name="custom_sanction_button"
                    onPointerTap={onCustomSanctionButton}
                    layout={{ position: 'absolute', left: 20, width: 100, top: 205, height: 21, minWidth: 100, maxWidth: 100 }}
                >
                    Custom sanction
                </Button>
            </Region>
        </Frame>
    );
};
