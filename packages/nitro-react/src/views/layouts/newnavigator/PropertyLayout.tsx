import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `137_property_xml` (layout "property", 155x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PropertyLayoutProps {
    layout?: BoxLayout;
    roomProperty?: PropertyLayoutRoomPropertyProps;
}

export const PropertyLayout = ({ layout, roomProperty }: PropertyLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 155, height: 20, ...layout }}>
            <PropertyLayoutRoomProperty {...roomProperty} />
        </Region>
    );
};

/** Named region `room_property` of PropertyLayout - configured through the parent's `roomProperty` prop. */
export interface PropertyLayoutRoomPropertyProps {
    captionPropertyName?: string;
    captionPropertyValue?: string;
    layout?: BoxLayout;
}

export const PropertyLayoutRoomProperty = ({ captionPropertyName, captionPropertyValue, layout }: PropertyLayoutRoomPropertyProps) => {
    return (
        <Region
            name="room_property"
            layout={{ position: 'absolute', left: 0, width: 155, top: 0, height: 20, ...layout }}
        >
            <Region
                name="property_name"
                layout={{ position: 'absolute', left: 0, width: 70, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPropertyName ?? 'Name PH'}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Region
                name="property_value"
                layout={{ position: 'absolute', left: 70, width: 43, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPropertyValue ?? 'Value PH'}
                    textStyle="text-style-u-regular"
                />
            </Region>
        </Region>
    );
};
