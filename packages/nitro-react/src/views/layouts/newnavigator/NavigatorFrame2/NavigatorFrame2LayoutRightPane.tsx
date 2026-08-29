import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { NavigatorFrame2LayoutBlockResults, NavigatorFrame2LayoutBlockResultsProps } from './NavigatorFrame2LayoutBlockResults';
import { NavigatorFrame2LayoutSearchTools, NavigatorFrame2LayoutSearchToolsProps } from './NavigatorFrame2LayoutSearchTools';

/** Named region `right_pane` of NavigatorFrame2Layout - configured through the parent's `rightPane` prop. */
export interface NavigatorFrame2LayoutRightPaneProps {
    blockResults?: NavigatorFrame2LayoutBlockResultsProps;
    layout?: BoxLayout;
    onCreateRoom?: () => void;
    onPromoteRoom?: () => void;
    onRandomRoom?: () => void;
    searchTools?: NavigatorFrame2LayoutSearchToolsProps;
    searchWaitingForResultsMask?: ReactNode;
    visiblePromoteRoomBorder?: boolean;
    visibleSearchWaitingForResultsMask?: boolean;
}

export const NavigatorFrame2LayoutRightPane = ({ blockResults, layout, onCreateRoom, onPromoteRoom, onRandomRoom, searchTools, searchWaitingForResultsMask, visiblePromoteRoomBorder, visibleSearchWaitingForResultsMask }: NavigatorFrame2LayoutRightPaneProps) => {
    const t = useTranslation();

    return (
        <Region
            name="right_pane"
            layout={{ position: 'absolute', left: 159, right: -3, top: 25, bottom: 14, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="4"
                name="create_room_border"
                layout={{ position: 'absolute', left: 0, width: 189, bottom: 0, height: 60 }}
            >
                <Region
                    name="create_room"
                    tooltip={t('navigator.tooltip.create.room')}
                    onPointerTap={onCreateRoom}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
                >
                    <ThemeImage
                        src={layoutImage('newnavigator_create_room.png')}
                        layout={{ position: 'absolute', left: 0, width: 186, top: 0, height: 59 }}
                    />
                    <Region layout={{ position: 'absolute', left: 60, width: 125, top: 22, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <ThemeText
                            text={t('navigator.create.room')}
                            textStyle="text-style-id-heading-2"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                </Region>
            </Border>
            <Border
                variant="5"
                name="random_room_border"
                layout={{ position: 'absolute', left: 205, width: 189, bottom: 0, height: 60 }}
            >
                <Region
                    name="random_room"
                    tooltip={t('navigator.tooltip.random.room')}
                    onPointerTap={onRandomRoom}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
                >
                    <ThemeImage
                        src={layoutImage('newnavigator_random_room.png')}
                        layout={{ position: 'absolute', left: 0, width: 186, top: 0, height: 59 }}
                    />
                    <Region layout={{ position: 'absolute', left: 60, width: 125, top: 22, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <ThemeText
                            text={t('navigator.random.room')}
                            textStyle="text-style-id-heading-2"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                </Region>
            </Border>
            {(visiblePromoteRoomBorder ?? false) && (
                <Border
                    variant="5"
                    name="promote_room_border"
                    layout={{ position: 'absolute', left: 205, width: 189, bottom: 0, height: 60 }}
                >
                    <Region
                        name="promote_room"
                        tooltip={t('navigator.tooltip.promote.room')}
                        onPointerTap={onPromoteRoom}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
                    >
                        <ThemeImage
                            src={layoutImage('newnavigator_promote_room.png')}
                            layout={{ position: 'absolute', left: 0, width: 186, top: 0, height: 59 }}
                        />
                        <Region layout={{ position: 'absolute', left: 60, width: 125, top: 22, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <ThemeText
                                text={t('navigator.promote.room')}
                                textStyle="text-style-id-heading-2"
                                textOptions={{ align: 'center' }}
                            />
                        </Region>
                    </Region>
                </Border>
            )}
            <NavigatorFrame2LayoutSearchTools {...searchTools} />
            <NavigatorFrame2LayoutBlockResults {...blockResults} />
            {(visibleSearchWaitingForResultsMask ?? false) && (
                <Region
                    name="search_waiting_for_results_mask"
                    backgroundColor="#eceae0"
                    layout={{ position: 'absolute', left: 0, right: 18, top: 42, bottom: 77 }}
                >
                    {searchWaitingForResultsMask}
                </Region>
            )}
        </Region>
    );
};
