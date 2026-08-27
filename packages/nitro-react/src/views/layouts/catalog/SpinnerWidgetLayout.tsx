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
                params={16400}
                layout={{ position: 'absolute', left: 0, width: 182, top: 0, height: 25 }}
            >
                <Region
                    name="text_header"
                    params={16}
                    layout={{ position: 'absolute', left: 7, width: 226, top: 5, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTextHeader ?? t('catalog.bundlewidget.spinner.select.amount')}
                        textStyle="text-style-u-small"
                    />
                </Region>
                <ContainerButton
                    variant="3"
                    name="button_less"
                    params={1}
                    onPointerTap={onButtonLess}
                    layout={{ position: 'absolute', left: 139, width: 14, top: 13, height: 14 }}
                >
                    <Icon
                        variant="7"
                        name="icon_less"
                        params={16}
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 2, width: 13, top: 4, height: 12 }}
                    />
                </ContainerButton>
                <ContainerButton
                    variant="3"
                    name="button_more"
                    params={1}
                    onPointerTap={onButtonMore}
                    layout={{ position: 'absolute', left: 139, width: 14, top: -1, height: 15 }}
                >
                    <Icon
                        variant="6"
                        name="icon_more"
                        params={16}
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 2, width: 11, top: 4, height: 11 }}
                    />
                </ContainerButton>
                <Region
                    name="text_value"
                    params={16}
                    layout={{ position: 'absolute', left: 154, width: 24, top: 5, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
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
