import { BoxLayout, Region } from '#base/theme';

import { GrsMainWindowLayoutCustomContent, GrsMainWindowLayoutCustomContentProps } from './GrsMainWindowLayoutCustomContent';
import { GrsMainWindowLayoutCustomFooter, GrsMainWindowLayoutCustomFooterProps } from './GrsMainWindowLayoutCustomFooter';
import { GrsMainWindowLayoutListContent, GrsMainWindowLayoutListContentProps } from './GrsMainWindowLayoutListContent';

/** Named region `tab_content` of GrsMainWindowLayout - configured through the parent's `tabContent` prop. */
export interface GrsMainWindowLayoutTabContentProps {
    customContent?: GrsMainWindowLayoutCustomContentProps;
    customFooter?: GrsMainWindowLayoutCustomFooterProps;
    layout?: BoxLayout;
    listContent?: GrsMainWindowLayoutListContentProps;
    onTabContent?: () => void;
}

export const GrsMainWindowLayoutTabContent = ({ customContent, customFooter, layout, listContent, onTabContent }: GrsMainWindowLayoutTabContentProps) => {
    return (
        <Region
            name="tab_content"
            onPointerTap={onTabContent}
            cursor="pointer"
            layout={{ position: 'absolute', left: 10, width: 313, top: 60, bottom: -286, ...layout }}
        >
            <GrsMainWindowLayoutListContent {...listContent} />
            <GrsMainWindowLayoutCustomContent {...customContent} />
            <GrsMainWindowLayoutCustomFooter {...customFooter} />
        </Region>
    );
};
