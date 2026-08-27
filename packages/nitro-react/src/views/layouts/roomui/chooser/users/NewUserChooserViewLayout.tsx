import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Dropmenu, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `892_new_user_chooser_view_xml` (layout "new_furni_view", 290x357) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewUserChooserViewLayoutProps {
    captionAmountIndicator?: string;
    captionSearchPlaceholder?: string;
    layout?: BoxLayout;
    onClearButton?: () => void;
    onClose?: () => void;
    onTypeDropdown?: () => void;
    visibleClearButton?: boolean;
}

export const NewUserChooserViewLayout = ({ captionAmountIndicator, captionSearchPlaceholder, layout, onClearButton, onClose, onTypeDropdown, visibleClearButton }: NewUserChooserViewLayoutProps) => {
    const t = useTranslation();
    const [ textInputValue, setTextInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            params={98305}
            caption={t('widget.chooser.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 290, height: 357, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="105"
                    params={144}
                    layout={{ position: 'absolute', left: 6, right: 130, top: 18, height: 26 }}
                >
                    <Region
                        name="search_placeholder"
                        params={16}
                        layout={{ position: 'absolute', left: 6, width: 40, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionSearchPlaceholder ?? t('new_chooser.search')}
                            textOptions={{ fill: '#666666' }}
                        />
                    </Region>
                    <TextInput
                        value={textInputValue}
                        onChange={setTextInputValue}
                        textColor="#666666"
                        layout={{ position: 'absolute', left: 6, right: 23, top: 4, bottom: 4 }}
                    />
                    <Region
                        name="clear_button"
                        params={81}
                        visible={visibleClearButton ?? false}
                        onPointerTap={onClearButton}
                        cursor="pointer"
                        layout={{ position: 'absolute', right: 2, width: 20, top: 3, height: 20 }}
                    >
                        <ThemeImage
                            params={16}
                            src={layoutImage('icons_close.png')}
                            layout={{ position: 'absolute', left: 4, width: 11, top: 4, height: 12 }}
                        />
                    </Region>
                </Border>
                <Dropmenu
                    variant="3"
                    name="type_dropdown"
                    params={81}
                    onPointerTap={onTypeDropdown}
                    layout={{ position: 'absolute', right: 18, width: 100, top: 18, height: 25 }}
                >
                    {t('new_user_chooser.usertype.all')}
                </Dropmenu>
                <Region
                    name="table_container"
                    params={2192}
                    layout={{ position: 'absolute', left: 6, right: 18, top: 53, bottom: 61 }}
                />
                <Region
                    name="amount_indicator"
                    params={1040}
                    layout={{ position: 'absolute', left: 6, width: 212, bottom: 37, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionAmountIndicator ?? t('new_user_chooser.amount_indicator')} />
                </Region>
            </Region>
        </Frame>
    );
};
