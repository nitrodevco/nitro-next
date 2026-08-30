import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `101_CampaignCompleted_xml` (layout "Quest", 362x114) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CampaignCompletedLayoutProps {
    captionCompletedTxt?: string;
    layout?: BoxLayout;
    srcCompletedPicBitmap?: string;
}

export const CampaignCompletedLayout = ({ captionCompletedTxt, layout, srcCompletedPicBitmap }: CampaignCompletedLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 362, height: 114, ...layout }}>
            <Border
                variant="0"
                name="campaign_completed_container"
                tintColor="#c9c9c9"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeText
                    text={captionCompletedTxt ?? t('quests.list.completed')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 230 }}
                    name="completed_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 40, right: 92, top: 41, height: 33 }}
                />
                <ThemeImage
                    name="completed_pic_bitmap"
                    src={srcCompletedPicBitmap ?? '${image.library.questing.url}category_completed.png'}
                    layout={{ position: 'absolute', left: 278, width: 53, top: 25, height: 57 }}
                />
            </Border>
        </Region>
    );
};
