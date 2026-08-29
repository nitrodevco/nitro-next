import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, Shape, ThemeText } from '#base/theme';

/** Row template `tab_button_template` of Main_100Layout - pass real rows through its `items…` slot. */
export interface Main_100LayoutTabButtonTemplateItemProps {
    captionButtonText?: string;
    layout?: BoxLayout;
    onSelectedView?: () => void;
    onTabButtonTemplate?: () => void;
    recolorDark?: string;
    visibleButtonText?: boolean;
    visibleNotselectedShape?: boolean;
    visibleSelectedView?: boolean;
}

export const Main_100LayoutTabButtonTemplateItem = ({ captionButtonText, layout, onSelectedView, onTabButtonTemplate, recolorDark, visibleButtonText, visibleNotselectedShape, visibleSelectedView }: Main_100LayoutTabButtonTemplateItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="tab_button_template"
            onPointerTap={onTabButtonTemplate}
            cursor="pointer"
            layout={{ width: 88, height: 29, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            {(visibleSelectedView ?? true) && (
                <Button
                    variant="3"
                    name="selected_view"
                    tintColor={recolorDark ?? '#3576b9'}
                    onPointerTap={onSelectedView}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 29 }}
                />
            )}
            {(visibleNotselectedShape ?? false) && (
                <Shape
                    name="notselected_shape"
                    shape="round_rectangle"
                    color="#dddcdc"
                    strokeColor="#b7b7b7"
                    strokeThickness={2}
                    radius={4}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 29 }}
                />
            )}
            {(visibleButtonText ?? true) && (
                <Region
                    name="button_text"
                    layout={{ position: 'absolute', width: 78, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionButtonText ?? t('reward_track.tasks.tab.all_tasks')}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            )}
        </Region>
    );
};
