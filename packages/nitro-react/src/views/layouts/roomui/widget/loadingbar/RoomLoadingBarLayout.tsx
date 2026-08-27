import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `972_room_loading_bar_xml` (layout "room_interstitial", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomLoadingBarLayoutProps {
    captionLoadingText?: string;
    layout?: BoxLayout;
    onRegion?: () => void;
}

export const RoomLoadingBarLayout = ({ captionLoadingText, layout, onRegion }: RoomLoadingBarLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, width: 240, top: 0, height: 146, justifyContent: 'center' }}
            >
                <Region
                    name="image"
                    params={2209}
                    layout={{ position: 'absolute', left: 10, right: 10, top: 10, bottom: 45 }}
                />
                <Region
                    name="region"
                    tooltip={t('ads.interstitial.tooltip')}
                    params={2193}
                    onPointerTap={onRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 10, right: 10, top: 10, bottom: 45 }}
                />
                <Region
                    name="loading_text"
                    params={1232}
                    layout={{ position: 'absolute', width: 220, bottom: 20, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionLoadingText ?? t('room.loading')}
                        textOptions={{ fill: '#000000', align: 'center' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
