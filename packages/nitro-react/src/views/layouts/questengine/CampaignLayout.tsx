import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `135_Campaign_xml` (layout "QuestCampaign", 103x114) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CampaignLayoutProps {
    captionCampaignHeaderTxt?: string;
    captionCompletionTxt?: string;
    layout?: BoxLayout;
    srcCampaignPicBitmap?: string;
    srcCompletionBgBlueBitmap?: string;
    srcCompletionBgGreenBitmap?: string;
    srcCompletionBgRedBitmap?: string;
}

export const CampaignLayout = ({ captionCampaignHeaderTxt, captionCompletionTxt, layout, srcCampaignPicBitmap, srcCompletionBgBlueBitmap, srcCompletionBgGreenBitmap, srcCompletionBgRedBitmap }: CampaignLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 103, height: 114, ...layout }}>
            <Region
                name="campaign_container"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 103, top: 0, height: 114 }}
            >
                <Region
                    name="bg"
                    params={2192}
                    backgroundColor="#646464"
                    layout={{ position: 'absolute', left: 0, width: 103, top: 0, height: 114 }}
                />
                <Region
                    name="bg_top"
                    params={2192}
                    backgroundColor="#bbbbbb"
                    layout={{ position: 'absolute', left: 2, width: 99, top: 2, height: 110 }}
                />
                <Region
                    name="bg_bottom"
                    params={1168}
                    backgroundColor="#ababab"
                    layout={{ position: 'absolute', left: 2, width: 99, top: 58, height: 54 }}
                />
                <Region
                    name="campaign_header_txt"
                    params={786640}
                    layout={{ position: 'absolute', left: 4, width: 95, top: 12, height: 17, maxWidth: 95, maxHeight: 29, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionCampaignHeaderTxt ?? 'Decoration'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 95, align: 'center' }}
                    />
                </Region>
                <ThemeImage
                    name="campaign_pic_bitmap"
                    params={3088}
                    src={srcCampaignPicBitmap}
                    layout={{ position: 'absolute', left: 11, width: 84, top: 21, height: 72 }}
                />
                <ThemeImage
                    name="completion_bg_red_bitmap"
                    params={1232}
                    src={srcCompletionBgRedBitmap ?? '${image.library.questing.url}quest_counterbkg_disabled.png'}
                    layout={{ position: 'absolute', left: 27, width: 49, top: 84, height: 20 }}
                />
                <ThemeImage
                    name="completion_bg_blue_bitmap"
                    params={1232}
                    src={srcCompletionBgBlueBitmap ?? '${image.library.questing.url}quest_counterbkg_active.png'}
                    layout={{ position: 'absolute', left: 27, width: 49, top: 84, height: 20 }}
                />
                <ThemeImage
                    name="completion_bg_green_bitmap"
                    params={1232}
                    src={srcCompletionBgGreenBitmap ?? '${image.library.questing.url}quest_counterbkg_completed.png'}
                    layout={{ position: 'absolute', left: 27, width: 49, top: 84, height: 20 }}
                />
                <Region
                    name="completion_txt"
                    params={208}
                    layout={{ position: 'absolute', left: 36, width: 30, top: 84, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCompletionTxt ?? '1/10'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
