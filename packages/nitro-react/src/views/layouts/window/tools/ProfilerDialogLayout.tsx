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
            caption="Profiler"
            onClose={onClose}
            layout={{ width: 470, height: 182, ...layout }}
        >
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, right: 12, top: 0, bottom: 37 }}
            >
                <Region
                    name="header"
                    layout={{ position: 'absolute', left: 26, right: 102, top: 2, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionHeader ?? '...'} />
                </Region>
                <Region layout={{ position: 'absolute', left: 4, right: 4, top: 20, bottom: -5 }}>
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, right: 20, top: 0, bottom: 35 }}
                    >
                        <Region
                            name="list"
                            layout={{ flexDirection: 'column', width: '100%' }}
                        />
                    </ScrollArea>
                    {/* <scrollbar_vertical> for list - rendered by that list's ScrollArea */}
                    <Region
                        name="footer"
                        layout={{ position: 'absolute', left: 20, right: 382, bottom: 19, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionFooter ?? 'Info text'} />
                    </Region>
                    <CheckBox
                        variant="101"
                        name="footer_enable_toggle"
                        onPointerTap={onFooterEnableToggle}
                        layout={{ position: 'absolute', left: 0, width: 20, bottom: 11, height: 21 }}
                    >
                        Profiler
                    </CheckBox>
                </Region>
                <Button
                    variant="101"
                    name="button_gc"
                    tooltip="Forces garbage collection mark/sweep"
                    tintColor="#bbbbbb"
                    onPointerTap={onButtonGc}
                    layout={{ position: 'absolute', right: 2, width: 65, bottom: -7, height: 43 }}
                >
                    GC
                </Button>
            </Border>
        </Frame>
    );
};
