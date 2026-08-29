import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1261_miniview_xml` (layout "miniview", 192x29) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MiniviewLayoutProps {
    layout?: BoxLayout;
    returnusergifting?: MiniviewLayoutReturnusergiftingProps;
}

export const MiniviewLayout = ({ layout, returnusergifting }: MiniviewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 192, height: 29, ...layout }}>
            <MiniviewLayoutReturnusergifting {...returnusergifting} />
        </Region>
    );
};

/** Named region `returnusergifting` of MiniviewLayout - configured through the parent's `returnusergifting` prop. */
export interface MiniviewLayoutReturnusergiftingProps {
    layout?: BoxLayout;
}

export const MiniviewLayoutReturnusergifting = ({ layout }: MiniviewLayoutReturnusergiftingProps) => {
    const t = useTranslation();

    return (
        <Region
            name="returnusergifting"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 29, ...layout }}
        >
            <Border
                variant="6"
                tags={[ 'BGCOLOR' ]}
                params={16}
                tintColor="#686661"
                blend={0.8}
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 29 }}
            >
                <WidgetSlot
                    widgetType="countdown"
                    name="countdown"
                    params={147472}
                    options={{ 'countdown:running': 'true' }}
                    layout={{ position: 'absolute', left: 124, width: 99, top: 3, height: 37 }}
                />
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 154, top: 6, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('next.gift.in')}
                        textStyle="text-style-il-regular-white"
                    />
                </Region>
            </Border>
        </Region>
    );
};
