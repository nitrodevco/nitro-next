import { useTranslation } from '#base/context';
import { BoxLayout, CheckBox, Region, ThemeText } from '#base/theme';

/** Named region `modify_settings_container` of WiredMenuViewLayout - configured through the parent's `modifySettingsContainer` prop. */
export interface WiredMenuViewLayoutModifySettingsContainerProps {
    layout?: BoxLayout;
    onModify1Checkbox?: () => void;
    onModify2Checkbox?: () => void;
    onModify3Checkbox?: () => void;
}

export const WiredMenuViewLayoutModifySettingsContainer = ({ layout, onModify1Checkbox, onModify2Checkbox, onModify3Checkbox }: WiredMenuViewLayoutModifySettingsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="modify_settings_container"
            layout={{ position: 'absolute', left: 10, width: 212, top: 8, height: 102, ...layout }}
        >
            <ThemeText
                text={t('wiredmenu.settings.room_settings.modify_rights')}
                layout={{ position: 'absolute', left: 0, width: 205, top: 0, height: 20 }}
            />
            <Region
                name="option_box"
                layout={{ position: 'absolute', left: 0, width: 214, top: 20, height: 20 }}
            >
                <CheckBox
                    variant="3"
                    name="modify_1_checkbox"
                    onPointerTap={onModify1Checkbox}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
                />
                <ThemeText
                    text={t('wiredmenu.settings.permission_level.1')}
                    layout={{ position: 'absolute', left: 20, width: 210, top: 0, height: 19 }}
                />
            </Region>
            <Region
                name="option_box"
                layout={{ position: 'absolute', left: 0, width: 214, top: 39, height: 20 }}
            >
                <CheckBox
                    variant="3"
                    name="modify_2_checkbox"
                    onPointerTap={onModify2Checkbox}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
                />
                <ThemeText
                    text={t('wiredmenu.settings.permission_level.2')}
                    layout={{ position: 'absolute', left: 20, width: 210, top: 0, height: 19 }}
                />
            </Region>
            <Region
                name="option_box"
                layout={{ position: 'absolute', left: 0, width: 214, top: 58, height: 20 }}
            >
                <CheckBox
                    variant="3"
                    name="modify_3_checkbox"
                    onPointerTap={onModify3Checkbox}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
                />
                <ThemeText
                    text={t('wiredmenu.settings.permission_level.3')}
                    layout={{ position: 'absolute', left: 20, width: 210, top: 0, height: 19 }}
                />
            </Region>
        </Region>
    );
};
