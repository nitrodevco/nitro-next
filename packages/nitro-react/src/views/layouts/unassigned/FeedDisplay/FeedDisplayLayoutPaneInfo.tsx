import { Border, BoxLayout, Region } from '#base/theme';

import { FeedDisplayLayoutWelcomeList, FeedDisplayLayoutWelcomeListProps } from './FeedDisplayLayoutWelcomeList';

/** Named region `pane_info` of FeedDisplayLayout - configured through the parent's `paneInfo` prop. */
export interface FeedDisplayLayoutPaneInfoProps {
    layout?: BoxLayout;
    visiblePaneInfo?: boolean;
    welcomeList?: FeedDisplayLayoutWelcomeListProps;
}

export const FeedDisplayLayoutPaneInfo = ({ layout, visiblePaneInfo, welcomeList }: FeedDisplayLayoutPaneInfoProps) => {
    return (
        (visiblePaneInfo ?? false) && (
            <Region
                name="pane_info"
                layout={{ position: 'absolute', left: 40, right: 0, top: 25, bottom: 10, ...layout }}
            >
                <Border
                    variant="0"
                    name="page_welcome_texts"
                    layout={{ position: 'absolute', left: 5, right: 0, top: 0, bottom: 5 }}
                >
                    <FeedDisplayLayoutWelcomeList {...welcomeList} />
                </Border>
            </Region>
        )
    );
};
