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
            params={98305}
            caption={t('widget.chooser.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 203, height: 168, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={2192}
                    layout={{ position: 'absolute', left: 9, width: 173, top: 13, height: 120 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, width: 172, top: 0, height: 120 }}
                    >
                        <Region
                            name="item_list"
                            params={2192}
                            layout={{ flexDirection: 'column', width: '100%' }}
                        />
                    </ScrollArea>
                </Region>
            </Region>
        </Frame>
    );
};
