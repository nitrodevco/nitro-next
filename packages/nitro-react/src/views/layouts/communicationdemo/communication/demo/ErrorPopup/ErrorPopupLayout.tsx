import { BoxLayout, Frame } from '#base/theme';

import { ErrorPopupLayoutContentList, ErrorPopupLayoutContentListProps } from './ErrorPopupLayoutContentList';

/** Generated from `2879_error_popup_xml` (layout "error_popup", 300x328) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ErrorPopupLayoutProps {
    contentList?: ErrorPopupLayoutContentListProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const ErrorPopupLayout = ({ contentList, layout, onClose }: ErrorPopupLayoutProps) => {
    return (
        <Frame
            variant="3"
            caption="Title"
            tintColor="#d43d59"
            onClose={onClose}
            resizeDirection="y"
            layout={{ width: 300, height: 328, minWidth: 300, maxWidth: 300, minHeight: 328, ...layout }}
        >
            <ErrorPopupLayoutContentList {...contentList} />
        </Frame>
    );
};
