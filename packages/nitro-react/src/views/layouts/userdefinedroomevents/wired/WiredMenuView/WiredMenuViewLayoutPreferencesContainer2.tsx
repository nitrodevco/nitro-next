import { useTranslation } from '#base/context';
import { BoxLayout, CheckBox, Region, ThemeText } from '#base/theme';

/** Named region `preferences_container` of WiredMenuViewLayout - configured through the parent's `preferencesContainer` prop. */
export interface WiredMenuViewLayoutPreferencesContainer2Props {
    layout?: BoxLayout;
    onPreferenceAllNotificationsCheckbox?: () => void;
    onPreferenceInspectButtonCheckbox?: () => void;
    onPreferencePlaytestCheckbox?: () => void;
    onPreferenceToolbarCheckbox?: () => void;
}

export const WiredMenuViewLayoutPreferencesContainer2 = ({ layout, onPreferenceAllNotificationsCheckbox, onPreferenceInspectButtonCheckbox, onPreferencePlaytestCheckbox, onPreferenceToolbarCheckbox }: WiredMenuViewLayoutPreferencesContainer2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="preferences_container"
            layout={{ position: 'absolute', left: 10, right: 4, top: 8, bottom: 2, ...layout }}
        >
            <ThemeText
                text={t('wiredmenu.settings.preferences.general')}
                layout={{ position: 'absolute', left: 0, width: 205, top: 0, height: 20 }}
            />
            <Region
                name="option_container"
                layout={{ position: 'absolute', left: 0, width: 450, top: 20, height: 20 }}
            >
                <CheckBox
                    variant="3"
                    name="preference_toolbar_checkbox"
                    onPointerTap={onPreferenceToolbarCheckbox}
                    layout={{ position: 'absolute', left: 0, width: 19, top: 1, height: 18 }}
                />
                <ThemeText
                    text={t('wiredmenu.settings.preferences.toolbar')}
                    layout={{ position: 'absolute', left: 20, width: 390, top: 0, height: 17 }}
                />
            </Region>
            <Region
                name="option_container"
                layout={{ position: 'absolute', left: 0, width: 450, top: 39, height: 20 }}
            >
                <CheckBox
                    variant="3"
                    name="preference_inspect_button_checkbox"
                    onPointerTap={onPreferenceInspectButtonCheckbox}
                    layout={{ position: 'absolute', left: 0, width: 19, top: 1, height: 18 }}
                />
                <ThemeText
                    text={t('wiredmenu.settings.preferences.inspect_button')}
                    layout={{ position: 'absolute', left: 20, width: 390, top: 0, height: 17 }}
                />
            </Region>
            <Region
                name="option_container"
                layout={{ position: 'absolute', left: 0, width: 450, top: 58, height: 20 }}
            >
                <CheckBox
                    variant="3"
                    name="preference_playtest_checkbox"
                    onPointerTap={onPreferencePlaytestCheckbox}
                    layout={{ position: 'absolute', left: 0, width: 19, top: 1, height: 18 }}
                />
                <ThemeText
                    text={t('wiredmenu.settings.preferences.playtest')}
                    layout={{ position: 'absolute', left: 20, width: 430, top: 0, height: 17 }}
                />
            </Region>
            <Region
                name="option_container"
                layout={{ position: 'absolute', left: 0, width: 450, top: 77, height: 20 }}
            >
                <CheckBox
                    variant="3"
                    name="preference_all_notifications_checkbox"
                    onPointerTap={onPreferenceAllNotificationsCheckbox}
                    layout={{ position: 'absolute', left: 0, width: 19, top: 1, height: 18 }}
                />
                <ThemeText
                    text={t('wiredmenu.settings.preferences.show_all_errors')}
                    layout={{ position: 'absolute', left: 20, width: 430, top: 0, height: 17 }}
                />
            </Region>
        </Region>
    );
};
