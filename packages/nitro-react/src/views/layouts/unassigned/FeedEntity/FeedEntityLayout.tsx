import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

import { FeedEntityLayoutActionButtonItem } from './FeedEntityLayoutActionButtonItem';
import { FeedEntityLayoutDecorationItem } from './FeedEntityLayoutDecorationItem';
import { FeedEntityLayoutMessageItem } from './FeedEntityLayoutMessageItem';
import { FeedEntityLayoutTimeItem } from './FeedEntityLayoutTimeItem';
import { FeedEntityLayoutTitleItem } from './FeedEntityLayoutTitleItem';

/** Generated from `2983_feed_entity_xml` (layout "feed_entity", 229x172) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FeedEntityLayoutProps {
    itemsContentList?: ReactNode;
    layout?: BoxLayout;
    srcIcon?: string;
    tintIcon?: string;
}

export const FeedEntityLayout = ({ itemsContentList, layout, srcIcon, tintIcon }: FeedEntityLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 229, height: 172, ...layout }}>
            <Border
                variant="3"
                name="item"
                tintColor="#f9f9f9"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 172 }}
            >
                <ThemeImage
                    name="icon"
                    src={srcIcon}
                    tint={tintIcon}
                    layout={{ position: 'absolute', left: 4, width: 50, top: 5, height: 60 }}
                />
                <Region
                    name="content_list"
                    layout={{ position: 'absolute', left: 50, right: 1, top: 4, bottom: 6, flexDirection: 'column', gap: 3 }}
                >
                    {itemsContentList ?? (
                        <>
                            <FeedEntityLayoutTitleItem />
                            <FeedEntityLayoutTimeItem />
                            <FeedEntityLayoutMessageItem />
                            <FeedEntityLayoutDecorationItem />
                            <FeedEntityLayoutActionButtonItem />
                        </>
                    )}
                </Region>
            </Border>
        </Region>
    );
};
