import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

/** Named region `statistics_container` of WiredMenuViewLayout - configured through the parent's `statisticsContainer` prop. */
export interface WiredMenuViewLayoutStatisticsContainerProps {
    captionStatisticsFloorfurniHtml?: string;
    captionStatisticsHeavyHtml?: string;
    captionStatisticsPermVarsFurniHtml?: string;
    captionStatisticsPermVarsGlobalHtml?: string;
    captionStatisticsPermVarsUserHtml?: string;
    captionStatisticsUsageHtml?: string;
    captionStatisticsWallfurniHtml?: string;
    captionTitle?: string;
    layout?: BoxLayout;
}

export const WiredMenuViewLayoutStatisticsContainer = ({ captionStatisticsFloorfurniHtml, captionStatisticsHeavyHtml, captionStatisticsPermVarsFurniHtml, captionStatisticsPermVarsGlobalHtml, captionStatisticsPermVarsUserHtml, captionStatisticsUsageHtml, captionStatisticsWallfurniHtml, captionTitle, layout }: WiredMenuViewLayoutStatisticsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="statistics_container"
            layout={{ position: 'absolute', left: 14, width: 215, top: 18, height: 123, ...layout }}
        >
            <ThemeText
                text={captionTitle ?? t('wiredmenu.monitor.statistics')}
                name="title"
                layout={{ position: 'absolute', left: 0, width: 106, top: 0, height: 19 }}
            />
            <Border
                variant="3"
                name="statistics_contents"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 0, width: 204, top: 20, height: 99 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 5, width: 197, top: 5, height: 89 }}
                >
                    <Region layout={{ flexDirection: 'column', gap: 2, width: '100%' }}>
                        <ThemeText
                            text={captionStatisticsUsageHtml ?? 'Wired usage:'}
                            name="statistics_usage_html"
                            layout={{ width: 68, height: 16, flexShrink: 0, overflow: 'hidden' }}
                        />
                        <ThemeText
                            text={captionStatisticsHeavyHtml ?? 'Is heavy:'}
                            name="statistics_heavy_html"
                            layout={{ width: 48, height: 16, flexShrink: 0, overflow: 'hidden' }}
                        />
                        <ThemeText
                            text={captionStatisticsFloorfurniHtml ?? 'Floor furni:'}
                            name="statistics_floorfurni_html"
                            layout={{ width: 60, height: 16, flexShrink: 0, overflow: 'hidden' }}
                        />
                        <ThemeText
                            text={captionStatisticsWallfurniHtml ?? 'Wall furni:'}
                            name="statistics_wallfurni_html"
                            layout={{ width: 57, height: 16, flexShrink: 0, overflow: 'hidden' }}
                        />
                        <ThemeText
                            text={captionStatisticsPermVarsFurniHtml ?? 'Permanent furni vars:'}
                            name="statistics_perm_vars_furni_html"
                            layout={{ width: 114, height: 16, flexShrink: 0, overflow: 'hidden' }}
                        />
                        <ThemeText
                            text={captionStatisticsPermVarsUserHtml ?? 'Permanent user vars:'}
                            name="statistics_perm_vars_user_html"
                            layout={{ width: 113, height: 16, flexShrink: 0, overflow: 'hidden' }}
                        />
                        <ThemeText
                            text={captionStatisticsPermVarsGlobalHtml ?? 'Permanent global vars:'}
                            name="statistics_perm_vars_global_html"
                            layout={{ width: 122, height: 16, flexShrink: 0, overflow: 'hidden' }}
                        />
                    </Region>
                </ScrollArea>
            </Border>
        </Region>
    );
};
