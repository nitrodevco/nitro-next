import { Border, BoxLayout, Button, CheckBox, Frame, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `3198_profiler_dialog_xml` (layout "habbo_profiler_dialog_2", 470x182) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ProfilerDialogLayoutProps {
    captionFooter?: string;
    captionHeader?: string;
    layout?: BoxLayout;
    onButtonGc?: () => void;
    onClose?: () => void;
    onFooterEnableToggle?: () => void;
}

export const ProfilerDialogLayout = ({ captionFooter, captionHeader, layout, onButtonGc, onClose, onFooterEnableToggle }: ProfilerDialogLayoutProps) => {
    return (
        <Frame
            variant="100"
            params={98305}
            caption="Profiler"
            onClose={onClose}
            layout={{ width: 470, height: 182, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="0"
                    params={2192}
                    layout={{ position: 'absolute', left: 0, width: 458, top: 0, height: 145 }}
                >
                    <Region
                        name="header"
                        tags={[ 'header' ]}
                        params={144}
                        layout={{ position: 'absolute', left: 26, width: 330, top: 2, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionHeader ?? '...'} />
                    </Region>
                    <Region
                        params={2193}
                        layout={{ position: 'absolute', left: 4, width: 450, top: 20, height: 130 }}
                    >
                        <ScrollArea
                            orientation="vertical"
                            layout={{ position: 'absolute', left: 0, width: 430, top: 0, height: 95 }}
                        >
                            <Region
                                name="list"
                                params={2193}
                                layout={{ flexDirection: 'column', width: '100%' }}
                            />
                        </ScrollArea>
                        {/* <scrollbar_vertical> for list - rendered by that list's ScrollArea */}
                        <Region
                            name="footer"
                            tags={[ 'footer' ]}
                            params={1168}
                            layout={{ position: 'absolute', left: 20, width: 48, top: 95, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionFooter ?? 'Info text'} />
                        </Region>
                        <CheckBox
                            variant="101"
                            name="footer_enable_toggle"
                            params={1041}
                            onPointerTap={onFooterEnableToggle}
                            layout={{ position: 'absolute', left: 0, width: 20, top: 98, height: 21 }}
                        >
                            Profiler
                        </CheckBox>
                    </Region>
                    <Button
                        variant="101"
                        name="button_gc"
                        tooltip="Forces garbage collection mark/sweep"
                        params={132177}
                        tintColor="#bbbbbb"
                        onPointerTap={onButtonGc}
                        layout={{ position: 'absolute', left: 391, width: 65, top: 109, height: 43 }}
                    >
                        GC
                    </Button>
                </Border>
            </Region>
        </Frame>
    );
};
