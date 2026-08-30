import { useTranslation } from '#base/context';
import { Border, BoxLayout, Dropmenu, Region, ThemeText } from '#base/theme';

import { WiredMenuViewLayoutPreferencesContainer2, WiredMenuViewLayoutPreferencesContainer2Props } from './WiredMenuViewLayoutPreferencesContainer2';

/** Named region `preferences_container` of WiredMenuViewLayout - configured through the parent's `preferencesContainer` prop. */
export interface WiredMenuViewLayoutPreferencesContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onWiredStylePicker?: () => void;
    preferencesContainer?: WiredMenuViewLayoutPreferencesContainer2Props;
}

export const WiredMenuViewLayoutPreferencesContainer = ({ captionTitle, layout, onWiredStylePicker, preferencesContainer }: WiredMenuViewLayoutPreferencesContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="preferences_container"
            layout={{ position: 'absolute', left: 14, width: 472, top: 237, height: 131, ...layout }}
        >
            <ThemeText
                text={captionTitle ?? t('wiredmenu.settings.preferences')}
                name="title"
                layout={{ position: 'absolute', left: 0, width: 208, top: 0, height: 19 }}
            />
            <Border
                variant="3"
                name="preferences_border"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 0, right: 245, top: 20, bottom: 0 }}
            >
                <WiredMenuViewLayoutPreferencesContainer2 {...preferencesContainer} />
            </Border>
            <Border
                variant="3"
                name="wired_style_border"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 245, right: 0, top: 20, height: 64 }}
            >
                <Region
                    name="wored_style_container"
                    layout={{ position: 'absolute', left: 10, width: 212, top: 8, height: 50 }}
                >
                    <ThemeText
                        text={t('wiredmenu.settings.preferences.wired_style')}
                        layout={{ position: 'absolute', left: 0, width: 205, top: 0, height: 20 }}
                    />
                    <Dropmenu
                        variant="3"
                        name="wired_style_picker"
                        onPointerTap={onWiredStylePicker}
                        layout={{ position: 'absolute', left: 0, width: 206, top: 21, height: 25 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
