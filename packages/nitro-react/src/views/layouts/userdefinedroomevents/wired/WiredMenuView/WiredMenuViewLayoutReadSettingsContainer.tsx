import { useTranslation } from '#base/context';
import { BoxLayout, CheckBox, Region, ThemeText } from '#base/theme';

/** Named region `read_settings_container` of WiredMenuViewLayout - configured through the parent's `readSettingsContainer` prop. */
export interface WiredMenuViewLayoutReadSettingsContainerProps {
    layout?: BoxLayout;
    onRead0Checkbox?: () => void;
    onRead1Checkbox?: () => void;
    onRead2Checkbox?: () => void;
    onRead3Checkbox?: () => void;
}

export const WiredMenuViewLayoutReadSettingsContainer = ({ layout, onRead0Checkbox, onRead1Checkbox, onRead2Checkbox, onRead3Checkbox }: WiredMenuViewLayoutReadSettingsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="read_settings_container"
            layout={{ position: 'absolute', left: 10, width: 233, top: 8, height: 102, ...layout }}
        >
            <ThemeText
                text={t('wiredmenu.settings.room_settings.read_rights')}
                layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 20 }}
            />
            <Region
                name="option_box"
                layout={{ position: 'absolute', left: 0, width: 214, top: 20, height: 20 }}
            >
                <CheckBox
                    variant="3"
                    name="read_0_checkbox"
                    onPointerTap={onRead0Checkbox}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
                />
                <ThemeText
                    text={t('wiredmenu.settings.permission_level.0')}
                    layout={{ position: 'absolute', left: 20, width: 210, top: 0, height: 19 }}
                />
            </Region>
            <Region
                name="option_box"
                layout={{ position: 'absolute', left: 0, width: 214, top: 39, height: 20 }}
            >
                <CheckBox
                    variant="3"
                    name="read_1_checkbox"
                    onPointerTap={onRead1Checkbox}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
                />
                <ThemeText
                    text={t('wiredmenu.settings.permission_level.1')}
                    layout={{ position: 'absolute', left: 20, width: 210, top: 0, height: 19 }}
                />
            </Region>
            <Region
                name="option_box"
                layout={{ position: 'absolute', left: 0, width: 214, top: 58, height: 20 }}
            >
                <CheckBox
                    variant="3"
                    name="read_2_checkbox"
                    onPointerTap={onRead2Checkbox}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
                />
                <ThemeText
                    text={t('wiredmenu.settings.permission_level.2')}
                    layout={{ position: 'absolute', left: 20, width: 210, top: 0, height: 19 }}
                />
            </Region>
            <Region
                name="option_box"
                layout={{ position: 'absolute', left: 0, width: 214, top: 77, height: 20 }}
            >
                <CheckBox
                    variant="3"
                    name="read_3_checkbox"
                    onPointerTap={onRead3Checkbox}
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
