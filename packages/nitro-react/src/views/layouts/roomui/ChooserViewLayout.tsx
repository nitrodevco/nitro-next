import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region, ScrollArea } from '#base/theme';

/** Generated from `1091_chooser_view_xml` (layout "chooser_view", 203x168) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChooserViewLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
}

export const ChooserViewLayout = ({ layout, onClose }: ChooserViewLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('widget.chooser.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 203, height: 168, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 9, right: 21, top: 13, bottom: 35 }}>
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 0, right: 1, top: 0, bottom: 0 }}
                >
                    <Region
                        name="item_list"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    />
                </ScrollArea>
            </Region>
        </Frame>
    );
};
