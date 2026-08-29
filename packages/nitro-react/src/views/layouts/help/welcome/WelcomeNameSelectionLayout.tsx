import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `2885_welcome_name_selection_xml` (layout "newuser_change_name", 303x193) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WelcomeNameSelectionLayoutProps {
    captionInfoText?: string;
    captionStaticInfoText?: string;
    layout?: BoxLayout;
    onCancelSelectionButton?: () => void;
    onCheckNameButton?: () => void;
    onSelectNameButton?: () => void;
    onSuggestions?: () => void;
    suggestions?: ReactNode;
}

export const WelcomeNameSelectionLayout = ({ captionInfoText, captionStaticInfoText, layout, onCancelSelectionButton, onCheckNameButton, onSelectNameButton, onSuggestions, suggestions }: WelcomeNameSelectionLayoutProps) => {
    const t = useTranslation();
    const [ inputValue, setInputValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 303, height: 193, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Region
                    name="static_info_text"
                    layout={{ position: 'absolute', left: 10, right: 9, top: 9, height: 29, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStaticInfoText ?? t('tutorial.name_change.info.select')}
                        textStyle="text-style-il-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 284 }}
                    />
                </Region>
                <Border
                    variant="105"
                    name="input_border"
                    layout={{ position: 'absolute', left: 10, width: 167, top: 45, height: 25 }}
                >
                    <TextInput
                        value={inputValue}
                        onChange={setInputValue}
                        maxLength={15}
                        layout={{ position: 'absolute', left: 8, right: 5, top: 5, bottom: 3 }}
                    />
                </Border>
                <Button
                    variant="3"
                    name="check_name_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onCheckNameButton}
                    layout={{ position: 'absolute', right: 10, width: 108, top: 41, height: 32, maxWidth: 108 }}
                >
                    {t('tutorial.name_change.check')}
                </Button>
                <Region
                    name="info_text"
                    layout={{ position: 'absolute', left: 10, width: 280, top: 76, height: 4, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfoText ?? ''}
                        textStyle="text-style-il-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 280 }}
                    />
                </Region>
                <Region
                    name="suggestions"
                    onPointerTap={onSuggestions}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 10, width: 280, top: 116, height: 31 }}
                >
                    {suggestions}
                </Region>
                <Button
                    variant="3"
                    name="select_name_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onSelectNameButton}
                    layout={{ position: 'absolute', left: 10, width: 166, bottom: 8, height: 33 }}
                >
                    {t('tutorial.name_change.pick')}
                </Button>
                <Button
                    variant="3"
                    name="cancel_selection_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onCancelSelectionButton}
                    layout={{ position: 'absolute', right: 10, width: 99, bottom: 8, height: 33 }}
                >
                    {t('generic.cancel')}
                </Button>
            </Region>
        </Region>
    );
};
