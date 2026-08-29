import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Dropmenu, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `951_new_furni_chooser_view_xml` (layout "new_chooser_view", 413x354) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewFurniChooserViewLayoutProps {
    captionAmountIndicator?: string;
    captionSearchPlaceholder?: string;
    clearButton?: NewFurniChooserViewLayoutClearButtonProps;
    layout?: BoxLayout;
    onClose?: () => void;
    onUsernameDropdown?: () => void;
    tableContainer?: NewFurniChooserViewLayoutTableContainerProps;
}

export const NewFurniChooserViewLayout = ({ captionAmountIndicator, captionSearchPlaceholder, clearButton, layout, onClose, onUsernameDropdown, tableContainer }: NewFurniChooserViewLayoutProps) => {
    const t = useTranslation();
    const [ textInputValue, setTextInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            caption={t('widget.chooser.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 413, height: 354, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="105"
                    layout={{ position: 'absolute', left: 6, width: 229, top: 18, height: 26 }}
                >
                    <Region
                        name="search_placeholder"
                        layout={{ position: 'absolute', left: 6, width: 116, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
                    <NewFurniChooserViewLayoutClearButton {...clearButton} />
                </Border>
                <Dropmenu
                    variant="3"
                    name="username_dropdown"
                    onPointerTap={onUsernameDropdown}
                    layout={{ position: 'absolute', left: 244, width: 152, top: 18, height: 25 }}
                />
                <NewFurniChooserViewLayoutTableContainer {...tableContainer} />
                <Region
                    name="amount_indicator"
                    layout={{ position: 'absolute', left: 6, width: 215, bottom: 37, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionAmountIndicator ?? t('new_furni_chooser.amount_indicator')} />
                </Region>
            </Region>
        </Frame>
    );
};

/** Named region `clear_button` of NewFurniChooserViewLayout - configured through the parent's `clearButton` prop. */
export interface NewFurniChooserViewLayoutClearButtonProps {
    layout?: BoxLayout;
    onClearButton?: () => void;
    visibleClearButton?: boolean;
}

export const NewFurniChooserViewLayoutClearButton = ({ layout, onClearButton, visibleClearButton }: NewFurniChooserViewLayoutClearButtonProps) => {
    return (
        <Region
            name="clear_button"
            visible={visibleClearButton ?? false}
            onPointerTap={onClearButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 206, width: 20, top: 3, height: 20, ...layout }}
        >
            <ThemeImage
                src={layoutImage('icons_close.png')}
                layout={{ position: 'absolute', left: 4, width: 11, top: 4, height: 12 }}
            />
        </Region>
    );
};

/** Named region `table_container` of NewFurniChooserViewLayout - configured through the parent's `tableContainer` prop. */
export interface NewFurniChooserViewLayoutTableContainerProps {
    layout?: BoxLayout;
}

export const NewFurniChooserViewLayoutTableContainer = ({ layout }: NewFurniChooserViewLayoutTableContainerProps) => {
    return (
        <Region
            name="table_container"
            layout={{ position: 'absolute', left: 6, width: 389, top: 53, bottom: 61, ...layout }}
        />
    );
};
