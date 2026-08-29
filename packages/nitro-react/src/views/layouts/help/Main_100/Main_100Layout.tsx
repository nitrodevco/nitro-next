import { BoxLayout, Frame } from '#base/theme';

import { Main_100LayoutBody, Main_100LayoutBodyProps } from './Main_100LayoutBody';
import { Main_100LayoutHeader, Main_100LayoutHeaderProps } from './Main_100LayoutHeader';

/** Generated from `100_main_xml` (layout "main", 1103x722) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Main_100LayoutProps {
    body?: Main_100LayoutBodyProps;
    header?: Main_100LayoutHeaderProps;
    layout?: BoxLayout;
    onClose?: () => void;
    recolorDark?: string;
}

export const Main_100Layout = ({ body, header, layout, onClose, recolorDark }: Main_100LayoutProps) => {
    return (
        <Frame
            variant="3"
            caption="Reward Track"
            tintColor={recolorDark ?? '#3576b9'}
            onClose={onClose}
            layout={{ width: 1103, height: 722, minWidth: 1103, minHeight: 722, ...layout }}
        >
            <Main_100LayoutHeader {...header} />
            <Main_100LayoutBody {...body} />
        </Frame>
    );
};
