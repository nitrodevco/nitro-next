import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `135_Campaign_xml` (layout "QuestCampaign", 103x114) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CampaignLayoutProps {
    campaignContainer?: CampaignLayoutCampaignContainerProps;
    layout?: BoxLayout;
}

export const CampaignLayout = ({ campaignContainer, layout }: CampaignLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 103, height: 114, ...layout }}>
            <CampaignLayoutCampaignContainer {...campaignContainer} />
        </Region>
    );
};

/** Named region `bg` of CampaignLayout - configured through the parent's `bg` prop. */
export interface CampaignLayoutBgProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const CampaignLayoutBg = ({ layout, tags }: CampaignLayoutBgProps) => {
    return (
        <Region
            name="bg"
            tags={tags}
            backgroundColor="#646464"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        />
    );
};

/** Named region `bg_top` of CampaignLayout - configured through the parent's `bgTop` prop. */
export interface CampaignLayoutBgTopProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const CampaignLayoutBgTop = ({ layout, tags }: CampaignLayoutBgTopProps) => {
    return (
        <Region
            name="bg_top"
            tags={tags}
            backgroundColor="#bbbbbb"
            layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2, ...layout }}
        />
    );
};

/** Named region `bg_bottom` of CampaignLayout - configured through the parent's `bgBottom` prop. */
export interface CampaignLayoutBgBottomProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const CampaignLayoutBgBottom = ({ layout, tags }: CampaignLayoutBgBottomProps) => {
    return (
        <Region
            name="bg_bottom"
            tags={tags}
            backgroundColor="#ababab"
            layout={{ position: 'absolute', left: 2, right: 2, bottom: 2, height: 54, ...layout }}
        />
    );
};

/** Named region `campaign_container` of CampaignLayout - configured through the parent's `campaignContainer` prop. */
export interface CampaignLayoutCampaignContainerProps {
    bg?: CampaignLayoutBgProps;
    bgBottom?: CampaignLayoutBgBottomProps;
    bgTop?: CampaignLayoutBgTopProps;
    captionCampaignHeaderTxt?: string;
    captionCompletionTxt?: string;
    layout?: BoxLayout;
    srcCampaignPicBitmap?: string;
    srcCompletionBgBlueBitmap?: string;
    srcCompletionBgGreenBitmap?: string;
    srcCompletionBgRedBitmap?: string;
    tags?: string[];
}

export const CampaignLayoutCampaignContainer = ({ bg, bgBottom, bgTop, captionCampaignHeaderTxt, captionCompletionTxt, layout, srcCampaignPicBitmap, srcCompletionBgBlueBitmap, srcCompletionBgGreenBitmap, srcCompletionBgRedBitmap, tags }: CampaignLayoutCampaignContainerProps) => {
    return (
        <Region
            name="campaign_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 103, top: 0, height: 114, justifyContent: 'center', ...layout }}
        >
            <CampaignLayoutBg {...bg} />
            <CampaignLayoutBgTop {...bgTop} />
            <CampaignLayoutBgBottom {...bgBottom} />
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
