import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { WiredStyleIlluminaLayoutLeftButtonTemplateItem } from './WiredStyleIlluminaLayoutLeftButtonTemplateItem';
import { WiredStyleIlluminaLayoutMiddleButtonTemplateItem } from './WiredStyleIlluminaLayoutMiddleButtonTemplateItem';
import { WiredStyleIlluminaLayoutRightButtonTemplateItem } from './WiredStyleIlluminaLayoutRightButtonTemplateItem';
import { WiredStyleIlluminaLayoutSplitterTemplateItem } from './WiredStyleIlluminaLayoutSplitterTemplateItem';
import { WiredStyleIlluminaLayoutSplitterTemplateItem2 } from './WiredStyleIlluminaLayoutSplitterTemplateItem2';

/** Named region `sourcetype_selector_view` of WiredStyleIlluminaLayout - configured through the parent's `sourcetypeSelectorView` prop. */
export interface WiredStyleIlluminaLayoutSourcetypeSelectorViewProps {
    itemsSourcetypeSelectorView?: ReactNode;
    layout?: BoxLayout;
    visibleSourcetypeSelectorView?: boolean;
}

export const WiredStyleIlluminaLayoutSourcetypeSelectorView = ({ itemsSourcetypeSelectorView, layout, visibleSourcetypeSelectorView }: WiredStyleIlluminaLayoutSourcetypeSelectorViewProps) => {
    return (
        (visibleSourcetypeSelectorView ?? false) && (
            <Region
                name="sourcetype_selector_view"
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 19, flexDirection: 'row', ...layout }}
            >
                {itemsSourcetypeSelectorView ?? (
                    <>
                        <WiredStyleIlluminaLayoutLeftButtonTemplateItem />
                        <WiredStyleIlluminaLayoutSplitterTemplateItem />
                        <WiredStyleIlluminaLayoutMiddleButtonTemplateItem />
                        <WiredStyleIlluminaLayoutSplitterTemplateItem2 />
                        <WiredStyleIlluminaLayoutRightButtonTemplateItem />
                    </>
                )}
            </Region>
        )
    );
};
