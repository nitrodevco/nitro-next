import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1233_collect_minimized_xml` (layout "collect_minimized", 192x29) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CollectMinimizedLayoutProps {
    layout?: BoxLayout;
    onCollectMinimized?: () => void;
    srcClubIcon?: string;
}

export const CollectMinimizedLayout = ({ layout, onCollectMinimized, srcClubIcon }: CollectMinimizedLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 192, height: 29, ...layout }}>
            <Region
                name="collect_minimized"
                onPointerTap={onCollectMinimized}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 29 }}
            >
                <Border
                    variant="6"
                    tintColor="#686661"
                    blend={1}
                    layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 29 }}
                />
                {/* `border` is hidden and has no name to show it by */}
                <Border
                    variant="6"
                    tintColor="#96bdcb"
                    blend={1}
                    layout={{ position: 'absolute', left: 163, width: 29, top: 0, height: 29 }}
                >
                    <ThemeImage
                        name="club_icon"
                        src={srcClubIcon ?? '${image.library.url}returnusergifting/phone_smaller.png'}
                        layout={{ position: 'absolute', left: 0, width: 29, top: 0, height: 29 }}
                    />
                </Border>
                <Region layout={{ position: 'absolute', left: 10, width: 154, top: 6, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('phone.number.collect.title')}
                        textStyle="text-style-il-regular-white"
                    />
                </Region>
            </Region>
        </Region>
    );
};
