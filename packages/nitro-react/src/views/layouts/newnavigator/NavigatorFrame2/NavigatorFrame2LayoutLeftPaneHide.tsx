import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `left_pane_hide` of NavigatorFrame2Layout - configured through the parent's `leftPaneHide` prop. */
export interface NavigatorFrame2LayoutLeftPaneHideProps {
    layout?: BoxLayout;
    onLeftPaneHide?: () => void;
    visibleLeftShowContainer?: boolean;
}

export const NavigatorFrame2LayoutLeftPaneHide = ({ layout, onLeftPaneHide, visibleLeftShowContainer }: NavigatorFrame2LayoutLeftPaneHideProps) => {
    const t = useTranslation();

    return (
        <Region
            name="left_pane_hide"
            onPointerTap={onLeftPaneHide}
            cursor="pointer"
            layout={{ position: 'absolute', left: -6, width: 149, top: 0, height: 21, ...layout }}
        >
            <Border
                variant="2"
                tintColor="#fba800"
                layout={{ position: 'absolute', left: 6, width: 141, top: 0, height: 27 }}
            >
                <Region
                    name="left_hide_container"
                    layout={{ position: 'absolute', left: 0, width: 136, top: 0, height: 18 }}
                >
                    <ThemeImage
                        src={layoutImage('newnavigator_button_quicklink_add.png')}
                        layout={{ position: 'absolute', left: 3, width: 18, top: 3, height: 18 }}
                    />
                    <ThemeText
                        text={t('navigator.quick.links.title')}
                        textStyle="text-style-id-heading-2"
                        layout={{ position: 'absolute', left: 20, width: 149, top: 2, height: 17 }}
                    />
                </Region>
                {(visibleLeftShowContainer ?? false) && (
                    <Region
                        name="left_show_container"
                        layout={{ position: 'absolute', left: 0, width: 136, top: 0, height: 18 }}
                    >
                        <ThemeImage
                            src={layoutImage('newnavigator_button_quicklink_add.png')}
                            layout={{ position: 'absolute', left: 3, width: 12, top: 3, height: 12 }}
                        />
                        <ThemeText
                            text={t('navigator.quick.links.title')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff' }}
                            layout={{ position: 'absolute', left: 20, width: 136, top: 1, height: 16 }}
                        />
                    </Region>
                )}
            </Border>
        </Region>
    );
};
