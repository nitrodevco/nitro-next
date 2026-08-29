import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `33_next_ltd_available_xml` (layout "next_ltd_available", 541x60) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NextLtdAvailableLayoutProps {
    buttonContainer?: NextLtdAvailableLayoutButtonContainerProps;
    captionHeader?: string;
    layout?: BoxLayout;
    onGet?: () => void;
    visibleGet?: boolean;
}

export const NextLtdAvailableLayout = ({ buttonContainer, captionHeader, layout, onGet, visibleGet }: NextLtdAvailableLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 541, height: 60, ...layout }}>
            <Border
                variant="100"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 541, top: 0, height: 60 }}
            >
                <ThemeImage
                    params={16}
                    src="${image.library.url}reception/new_limited_released.png"
                    layout={{ position: 'absolute', left: 7, width: 44, top: 8, height: 38 }}
                />
                <WidgetSlot
                    widgetType="countdown"
                    name="countdown"
                    params={147472}
                    layout={{ position: 'absolute', left: 427, width: 99, top: 11, height: 37 }}
                />
                <Region
                    name="header"
                    tags={[ 'COLORABLE' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 73, width: 151, top: 5, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionHeader ?? t('landing.view.next.ltd.header')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Region
                    visible={visibleGet ?? false}
                    layout={{ position: 'absolute', left: 367, right: 1, top: -1, height: 46, minWidth: 125, maxWidth: 200 }}
                >
                    <Button
                        variant="100"
                        name="get"
                        params={393361}
                        onPointerTap={onGet}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        {t('landing.view.next.ltd.get')}
                    </Button>
                </Region>
                <NextLtdAvailableLayoutButtonContainer {...buttonContainer} />
            </Border>
        </Region>
    );
};

/** Named region `button_container` of NextLtdAvailableLayout - configured through the parent's `buttonContainer` prop. */
export interface NextLtdAvailableLayoutButtonContainerProps {
    layout?: BoxLayout;
    onCatalogueButton?: () => void;
}

export const NextLtdAvailableLayoutButtonContainer = ({ layout, onCatalogueButton }: NextLtdAvailableLayoutButtonContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_container"
            params={147472}
            layout={{ position: 'absolute', left: 60, width: 230, top: 20, height: 38, ...layout }}
        >
            <Button
                variant="100"
                name="catalogue_button"
                params={131089}
                onPointerTap={onCatalogueButton}
                layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 43 }}
            >
                {t('landing.view.next.ltd.opencatalogue')}
            </Button>
        </Region>
    );
};
