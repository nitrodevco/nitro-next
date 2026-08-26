import { Border, BoxLayout, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `919_placeholder_xml` (layout "packagecard", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PlaceholderLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
}

export const PlaceholderLayout = ({ layout, onClose }: PlaceholderLayoutProps) => {
    return (
        <Frame
            variant="0"
            id="ph_frame"
            name="ph_frame"
            params={32784}
            caption="This feature is not yet available!"
            onClose={onClose}
            layout={{ width: 250, height: 150, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="0"
                    name="ph_border"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 238, top: 0, height: 118 }}
                >
                    <Region
                        name="ph_msg"
                        params={16}
                        layout={{ position: 'absolute', left: 82, width: 134, top: 17, height: 44, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Coming soon!"
                            textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 134 }}
                        />
                    </Region>
                </Border>
            </Region>
        </Frame>
    );
};
