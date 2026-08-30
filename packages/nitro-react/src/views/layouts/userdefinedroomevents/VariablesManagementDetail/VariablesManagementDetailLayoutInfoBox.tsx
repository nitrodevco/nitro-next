import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, TextInput, ThemeText, WidgetSlot } from '#base/theme';

/** Named region `info_box` of VariablesManagementDetailLayout - configured through the parent's `infoBox` prop. */
export interface VariablesManagementDetailLayoutInfoBoxProps {
    avatarPreview?: ReactNode;
    avatarPreviewRegion?: ReactNode;
    captionTitle?: string;
    layout?: BoxLayout;
    onAvatarPreviewRegion?: () => void;
    petPreview?: ReactNode;
    visibleAvatarPreview?: boolean;
    visibleAvatarPreviewRegion?: boolean;
    visiblePetPreview?: boolean;
}

export const VariablesManagementDetailLayoutInfoBox = ({ avatarPreview, avatarPreviewRegion, captionTitle, layout, onAvatarPreviewRegion, petPreview, visibleAvatarPreview, visibleAvatarPreviewRegion, visiblePetPreview }: VariablesManagementDetailLayoutInfoBoxProps) => {
    const t = useTranslation();
    const [ infoBoxTextValue, setInfoBoxTextValue ] = useState('');

    return (
        <Region
            name="info_box"
            layout={{ position: 'absolute', left: 18, width: 303, top: 73, height: 114, ...layout }}
        >
            <ThemeText
                text={captionTitle ?? t('wiredmenu.variable_management_detail.holder_info')}
                name="title"
                layout={{ position: 'absolute', left: 0, width: 188, top: 0, height: 19 }}
            />
            <Border
                variant="2"
                name="preview"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 0, width: 94, top: 20, height: 94, justifyContent: 'center' }}
            >
                {(visibleAvatarPreviewRegion ?? false) && (
                    <Region
                        name="avatar_preview_region"
                        onPointerTap={onAvatarPreviewRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 10, width: 74, top: 10, height: 74 }}
                    >
                        {avatarPreviewRegion}
                    </Region>
                )}
                {(visibleAvatarPreview ?? false) && (
                    <WidgetSlot
                        widgetType="avatar_image"
                        name="avatar_preview"
                        options={{ 'avatar_image:only_head': 'true', 'avatar_image:cropped': 'true' }}
                        layout={{ position: 'absolute', marginLeft: -2.5, marginRight: 2.5, width: 33, alignSelf: 'center', height: 34 }}
                    >
                        {avatarPreview}
                    </WidgetSlot>
                )}
                {(visiblePetPreview ?? false) && (
                    <WidgetSlot
                        widgetType="pet_image"
                        name="pet_preview"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        {petPreview}
                    </WidgetSlot>
                )}
            </Border>
            <Border
                variant="10"
                layout={{ position: 'absolute', left: 109, width: 194, top: 20, height: 94 }}
            >
                <TextInput
                    value={infoBoxTextValue}
                    onChange={setInfoBoxTextValue}
                    multiline
                    layout={{ position: 'absolute', left: 6, width: 182, top: 6, bottom: 8 }}
                />
            </Border>
        </Region>
    );
};
