import { useTranslation } from '#base/context';
import { BoxLayout, Region, TabButton, TabContext } from '#base/theme';

import { DimmerUiLayoutTabContent, DimmerUiLayoutTabContentProps } from './DimmerUiLayoutTabContent';

/** Named region `tabbedview` of DimmerUiLayout - configured through the parent's `tabbedview` prop. */
export interface DimmerUiLayoutTabbedviewProps {
    layout?: BoxLayout;
    onTab1?: () => void;
    onTab2?: () => void;
    onTab3?: () => void;
    onTabbedview?: () => void;
    selectedTabContext?: string;
    tabContent?: DimmerUiLayoutTabContentProps;
}

export const DimmerUiLayoutTabbedview = ({ layout, onTab1, onTab2, onTab3, onTabbedview, selectedTabContext, tabContent }: DimmerUiLayoutTabbedviewProps) => {
    const t = useTranslation();

    return (
        <Region
            name="tabbedview"
            onPointerTap={onTabbedview}
            cursor="pointer"
            layout={{ position: 'absolute', left: 2, right: -3, top: -1, height: 166, justifyContent: 'center', ...layout }}
        >
            <TabContext
                variant="0"
                name="tab_context"
                layout={{ position: 'absolute', left: 2, right: 6, top: 1, bottom: 2 }}
            >
                <TabButton
                    variant="0"
                    name="tab_1"
                    selected={selectedTabContext === 'tab_1'}
                    onPointerTap={onTab1}
                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 21, maxWidth: 100 }}
                >
                    {t('widget.dimmer.tab.1')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="tab_2"
                    selected={selectedTabContext === 'tab_2'}
                    onPointerTap={onTab2}
                    layout={{ position: 'absolute', left: 60, width: 63, top: 0, height: 21, maxWidth: 100 }}
                >
                    {t('widget.dimmer.tab.2')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="tab_3"
                    selected={selectedTabContext === 'tab_3'}
                    onPointerTap={onTab3}
                    layout={{ position: 'absolute', left: 123, width: 63, top: 0, height: 21, maxWidth: 100 }}
                >
                    {t('widget.dimmer.tab.3')}
                </TabButton>
            </TabContext>
            <DimmerUiLayoutTabContent {...tabContent} />
        </Region>
    );
};
