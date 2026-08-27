import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `3110_avatar_editor_name_change_xml` (layout "newuser_change_name", 350x270) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarEditorNameChangeLayoutProps {
    captionHcOnlyText?: string;
    captionInfoText?: string;
    captionStaticInfoText?: string;
    layout?: BoxLayout;
    onCancelSelectionButton?: () => void;
    onCheckNameButton?: () => void;
    onClose?: () => void;
    onSelectNameButton?: () => void;
    onSuggestions?: () => void;
    srcHcIconImage?: string;
    srcPenImage?: string;
}

export const AvatarEditorNameChangeLayout = ({ captionHcOnlyText, captionInfoText, captionStaticInfoText, layout, onCancelSelectionButton, onCheckNameButton, onClose, onSelectNameButton, onSuggestions, srcHcIconImage, srcPenImage }: AvatarEditorNameChangeLayoutProps) => {
    const t = useTranslation();
    const [ inputValue, setInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            id="avatar_name_change_frame"
            name="avatar_name_change_frame"
            params={1}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 350, height: 270, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 345, top: 0, height: 225 }}
                >
                    <Region
                        name="static_info_text"
                        params={786640}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -142.5, width: 284, top: 9, height: 29, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionStaticInfoText ?? t('tutorial.name_change.title.main')}
                            textStyle="text-style-u-headline-big"
                            textOptions={{ fill: '#007b96', wordWrap: true, wordWrapWidth: 284 }}
                        />
                    </Region>
                    <Border
                        variant="105"
                        name="input_border"
                        params={16}
                        layout={{ position: 'absolute', left: 20, width: 300, top: 40, height: 25 }}
                    >
                        <TextInput
                            value={inputValue}
                            onChange={setInputValue}
                            maxLength={15}
                            layout={{ position: 'absolute', left: 7, width: 270, top: 4, height: 17 }}
                        />
                        <ThemeImage
                            name="pen_image"
                            params={16}
                            src={srcPenImage ?? layoutImage('common_small_pen.png')}
                            layout={{ position: 'absolute', left: 278, width: 20, top: 2, height: 20 }}
                        />
                    </Border>
                    <Button
                        variant="0"
                        name="check_name_button"
                        params={131089}
                        tintColor="#bbbbbb"
                        onPointerTap={onCheckNameButton}
                        layout={{ position: 'absolute', left: 15, width: 108, top: 190, height: 25, maxWidth: 108 }}
                    >
                        {t('tutorial.name_change.check')}
                    </Button>
                    <Region
                        name="info_text"
                        params={16}
                        layout={{ position: 'absolute', left: 30, width: 280, top: 155, height: 4, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionInfoText ?? ''}
                            textStyle="text-style-il-regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 280 }}
                        />
                    </Region>
                    <Region
                        name="suggestions"
                        params={131089}
                        onPointerTap={onSuggestions}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 10, width: 280, top: 150, height: 31 }}
                    />
                    <Button
                        variant="2"
                        name="select_name_button"
                        params={131089}
                        tintColor="#bbbbbb"
                        onPointerTap={onSelectNameButton}
                        layout={{ position: 'absolute', left: 165, width: 149, top: 190, height: 25 }}
                    >
                        {t('tutorial.name_change.pick')}
                    </Button>
                    <Button
                        variant="101"
                        name="cancel_selection_button"
                        params={393233}
                        tintColor="#bbbbbb"
                        onPointerTap={onCancelSelectionButton}
                        layout={{ position: 'absolute', right: -2774, width: 119, top: 1, height: 43 }}
                    >
                        {t('generic.cancel')}
                    </Button>
                    <Border
                        variant="3"
                        name="hc_background_information"
                        params={16}
                        tintColor="#c2c0b6"
                        layout={{ position: 'absolute', left: 10, width: 320, top: 70, height: 75 }}
                    >
                        <ThemeImage
                            name="hc_icon_image"
                            params={16}
                            src={srcHcIconImage ?? layoutImage('talent_vip_reward.png')}
                            layout={{ position: 'absolute', left: 5, width: 60, top: 8, height: 60 }}
                        />
                        <Region
                            name="hc_only_text"
                            params={16}
                            layout={{ position: 'absolute', left: 80, width: 230, top: 8, height: 60, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionHcOnlyText ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non cursus lorem. Donec risus erat, lacinia id commodo ac, consectetur eget tellus. '}
                                textOptions={{ wordWrap: true, wordWrapWidth: 230 }}
                            />
                        </Region>
                    </Border>
                </Region>
            </Region>
        </Frame>
    );
};
