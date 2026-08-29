import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1549_spinnerWidget_xml` (layout "spinnerWidget", 182x25) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SpinnerWidgetLayoutProps {
    captionTextHeader?: string;
    captionTextValue?: string;
    layout?: BoxLayout;
    onButtonLess?: () => void;
    onButtonMore?: () => void;
}

export const SpinnerWidgetLayout = ({ captionTextHeader, captionTextValue, layout, onButtonLess, onButtonMore }: SpinnerWidgetLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 182, height: 25, ...layout }}>
            <Border
                variant="103"
                name="border_spinner_widget"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="text_header"
                    layout={{ position: 'absolute', left: 7, width: 226, top: 5, bottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTextHeader ?? t('catalog.bundlewidget.spinner.select.amount')}
                        textStyle="text-style-u-small"
                    />
                </Region>
                <ContainerButton
                    variant="3"
                    name="button_less"
                    onPointerTap={onButtonLess}
                    layout={{ position: 'absolute', left: 139, width: 14, bottom: -2, height: 14 }}
                >
                    <Icon
                        variant="7"
                        name="icon_less"
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 2, width: 13, top: 4, height: 12 }}
                    />
                </ContainerButton>
                <ContainerButton
                    variant="3"
                    name="button_more"
                    onPointerTap={onButtonMore}
                    layout={{ position: 'absolute', left: 139, width: 14, top: -1, bottom: 11 }}
                >
                    <Icon
                        variant="6"
                        name="icon_more"
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 2, width: 11, top: 4, height: 11 }}
                    />
                </ContainerButton>
                <Region
                    name="text_value"
                    layout={{ position: 'absolute', right: 4, width: 24, top: 5, bottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionTextValue ?? '1'}
                        textStyle="text-style-u-small"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
