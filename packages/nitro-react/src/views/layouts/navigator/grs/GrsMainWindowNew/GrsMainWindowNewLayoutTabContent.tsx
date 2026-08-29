import { BoxLayout, Region } from '#base/theme';

import { GrsMainWindowNewLayoutCustomContent, GrsMainWindowNewLayoutCustomContentProps } from './GrsMainWindowNewLayoutCustomContent';
import { GrsMainWindowNewLayoutCustomFooter, GrsMainWindowNewLayoutCustomFooterProps } from './GrsMainWindowNewLayoutCustomFooter';
import { GrsMainWindowNewLayoutListContent, GrsMainWindowNewLayoutListContentProps } from './GrsMainWindowNewLayoutListContent';

/** Named region `tab_content` of GrsMainWindowNewLayout - configured through the parent's `tabContent` prop. */
export interface GrsMainWindowNewLayoutTabContentProps {
    customContent?: GrsMainWindowNewLayoutCustomContentProps;
    customFooter?: GrsMainWindowNewLayoutCustomFooterProps;
    layout?: BoxLayout;
    listContent?: GrsMainWindowNewLayoutListContentProps;
    onTabContent?: () => void;
}

export const GrsMainWindowNewLayoutTabContent = ({ customContent, customFooter, layout, listContent, onTabContent }: GrsMainWindowNewLayoutTabContentProps) => {
    return (
        <Region
            name="tab_content"
            onPointerTap={onTabContent}
            cursor="pointer"
            layout={{ position: 'absolute', left: 10, width: 388, top: 60, bottom: -286, ...layout }}
        >
            <GrsMainWindowNewLayoutListContent {...listContent} />
            <GrsMainWindowNewLayoutCustomContent {...customContent} />
            <GrsMainWindowNewLayoutCustomFooter {...customFooter} />
        </Region>
    );
};
