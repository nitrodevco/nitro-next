import { useState } from 'react';

import { Border, BoxLayout, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `1100_furni_view_branding_element_xml` (layout "furni_view_branding_element", 180x65) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FurniViewBrandingElementLayoutProps {
    captionElementName?: string;
    layout?: BoxLayout;
}

export const FurniViewBrandingElementLayout = ({ captionElementName, layout }: FurniViewBrandingElementLayoutProps) => {
    const [ elementValueValue, setElementValueValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 180, height: 65, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Border
                    variant="1"
                    name="element_border"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    <Region
                        name="element_name"
                        layout={{ position: 'absolute', left: 0, right: 20, top: 0, height: 12, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionElementName ?? 'element name'}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 160 }}
                        />
                    </Region>
                    <TextInput
                        value={elementValueValue}
                        onChange={setElementValueValue}
                        textColor="#ffffff"
                        layout={{ position: 'absolute', left: 0, width: 160, top: 13, height: 40 }}
                    />
                </Border>
            </Region>
        </Region>
    );
};
