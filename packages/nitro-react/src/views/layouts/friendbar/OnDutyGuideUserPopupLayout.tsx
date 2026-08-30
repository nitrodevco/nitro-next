import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `2_on_duty_guide_user_popup_xml` (layout "Achievement competition hall of fame", 100x59) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface OnDutyGuideUserPopupLayoutProps {
    captionRankDescTxt?: string;
    captionUserNameTxt?: string;
    layout?: BoxLayout;
}

export const OnDutyGuideUserPopupLayout = ({ captionRankDescTxt, captionUserNameTxt, layout }: OnDutyGuideUserPopupLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 100, height: 59, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Border
                    variant="0"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 10 }}
                >
                    <ThemeImage
                        src="${image.library.url}reception/reception_helper_icon.png"
                        layout={{ position: 'absolute', left: 15, width: 13, top: 12, height: 23 }}
                    />
                    <ThemeText
                        text={captionRankDescTxt ?? t('landing.view.helperonduty')}
                        textOptions={{ fill: '#666666' }}
                        name="rank_desc_txt"
                        layout={{ position: 'absolute', left: 37, width: 108, top: 24, height: 14 }}
                    />
                    <ThemeText
                        text={captionUserNameTxt ?? 'Ibuxal'}
                        textStyle="text-style-il-heading-3"
                        name="user_name_txt"
                        layout={{ position: 'absolute', left: 37, width: 35, top: 10, height: 16 }}
                    />
                </Border>
                <ThemeImage
                    src="${image.library.url}reception/sakara.png"
                    layout={{ position: 'absolute', left: 46, width: 9, bottom: 5, height: 6 }}
                />
            </Region>
        </Region>
    );
};
