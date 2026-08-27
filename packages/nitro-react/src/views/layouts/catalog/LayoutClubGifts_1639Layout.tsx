import { BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `1639_layout_club_gifts_xml` (layout "ctlg_presents", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutClubGifts_1639LayoutProps {
    captionInfoText?: string;
    captionPastClubDays?: string;
    captionPastVipDays?: string;
    layout?: BoxLayout;
}

export const LayoutClubGifts_1639Layout = ({ captionInfoText, captionPastClubDays, captionPastVipDays, layout }: LayoutClubGifts_1639LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_presents"
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Region
                    name="clubGiftWidget"
                    tags={[ 'EMBEDDED' ]}
                    params={2064}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, width: 360, top: 35, height: 409 }}
                    >
                        <Region
                            name="gift_list"
                            params={2064}
                            layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
                        />
                    </ScrollArea>
                    <Region
                        name="info_text"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 35, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionInfoText ?? 'lorem ipsum'}
                            textStyle="text-style-u-italic"
                            textOptions={{ wordWrap: true, wordWrapWidth: 360 }}
                        />
                    </Region>
                    <Region
                        name="past_club_days"
                        params={1040}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 445, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionPastClubDays ?? 'lorem ipsum'}
                            textStyle="text-style-u-small"
                            textOptions={{ wordWrap: true, wordWrapWidth: 360, align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="past_vip_days"
                        params={1040}
                        visible={false}
                        layout={{ position: 'absolute', left: 30, width: 310, top: 445, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}
                    >
                        <ThemeText
                            text={captionPastVipDays ?? 'lorem ipsum'}
                            textStyle="text-style-u-small"
                            textOptions={{ wordWrap: true, wordWrapWidth: 310, align: 'right' }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
