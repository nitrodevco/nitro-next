import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `137_property_xml` (layout "property", 155x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PropertyLayoutProps {
    captionPropertyName?: string;
    captionPropertyValue?: string;
    layout?: BoxLayout;
}

export const PropertyLayout = ({ captionPropertyName, captionPropertyValue, layout }: PropertyLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 155, height: 20, ...layout }}>
            <Region
                name="room_property"
                tags={[ 'TEMPLATE' ]}
                params={16}
                layout={{ position: 'absolute', left: 0, width: 155, top: 0, height: 20 }}
            >
                <Region
                    name="property_name"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 70, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPropertyName ?? 'Name PH'}
                        textStyle="text-style-u-regular"
                    />
                </Region>
                <Region
                    name="property_value"
                    params={16}
                    layout={{ position: 'absolute', left: 70, width: 43, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPropertyValue ?? 'Value PH'}
                        textStyle="text-style-u-regular"
                    />
                </Region>
            </Region>
        </Region>
    );
};
