import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `campaign_container` of CampaignLayout - configured through the parent's `campaignContainer` prop. */
export interface CampaignLayoutCampaignContainerProps {
    bg?: ReactNode;
    bgBottom?: ReactNode;
    bgTop?: ReactNode;
    captionCampaignHeaderTxt?: string;
    captionCompletionTxt?: string;
    layout?: BoxLayout;
    srcCampaignPicBitmap?: string;
    srcCompletionBgBlueBitmap?: string;
    srcCompletionBgGreenBitmap?: string;
    srcCompletionBgRedBitmap?: string;
}

export const CampaignLayoutCampaignContainer = ({ bg, bgBottom, bgTop, captionCampaignHeaderTxt, captionCompletionTxt, layout, srcCampaignPicBitmap, srcCompletionBgBlueBitmap, srcCompletionBgGreenBitmap, srcCompletionBgRedBitmap }: CampaignLayoutCampaignContainerProps) => {
    return (
        <Region
            name="campaign_container"
            layout={{ position: 'absolute', left: 0, width: 103, top: 0, height: 114, justifyContent: 'center', ...layout }}
        >
            <Region
                name="bg"
                backgroundColor="#646464"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                {bg}
            </Region>
            <Region
                name="bg_top"
                backgroundColor="#bbbbbb"
                layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
            >
                {bgTop}
            </Region>
            <Region
                name="bg_bottom"
                backgroundColor="#ababab"
                layout={{ position: 'absolute', left: 2, right: 2, bottom: 2, height: 54 }}
            >
                {bgBottom}
            </Region>
            <Region
                name="campaign_header_txt"
                layout={{ position: 'absolute', width: 95, top: 12, height: 17, maxWidth: 95, maxHeight: 29, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionCampaignHeaderTxt ?? 'Decoration'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 95, align: 'center' }}
                />
            </Region>
            <ThemeImage
                name="campaign_pic_bitmap"
                src={srcCampaignPicBitmap}
                layout={{ position: 'absolute', left: 11, width: 84, alignSelf: 'center', height: 72 }}
            />
            <ThemeImage
                name="completion_bg_red_bitmap"
                src={srcCompletionBgRedBitmap ?? '${image.library.questing.url}quest_counterbkg_disabled.png'}
                layout={{ position: 'absolute', width: 49, bottom: 10, height: 20 }}
            />
            <ThemeImage
                name="completion_bg_blue_bitmap"
                src={srcCompletionBgBlueBitmap ?? '${image.library.questing.url}quest_counterbkg_active.png'}
                layout={{ position: 'absolute', width: 49, bottom: 10, height: 20 }}
            />
            <ThemeImage
                name="completion_bg_green_bitmap"
                src={srcCompletionBgGreenBitmap ?? '${image.library.questing.url}quest_counterbkg_completed.png'}
                layout={{ position: 'absolute', width: 49, bottom: 10, height: 20 }}
            />
            <Region
                name="completion_txt"
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 30, top: 84, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCompletionTxt ?? '1/10'}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};
