import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `2_on_duty_guide_user_popup_xml` (layout "Achievement competition hall of fame", 100x59) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface OnDutyGuideUserPopupLayoutProps {
    layout?: BoxLayout;
}

export const OnDutyGuideUserPopupLayout = ({ layout }: OnDutyGuideUserPopupLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 100, height: 59, ...layout }}>
            <Region
                params={16400}
                layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 59 }}
            >
                <Border
                    variant="0"
                    params={18576}
                    layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 49 }}
                >
                    <ThemeImage
                        params={16}
                        src="${image.library.url}reception/reception_helper_icon.png"
                        layout={{ position: 'absolute', left: 15, width: 13, top: 12, height: 23 }}
                    />
                    <Region
                        name="rank_desc_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 37, width: 108, top: 24, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('landing.view.helperonduty')}
                            textOptions={{ fill: '#666666' }}
                        />
                    </Region>
                    <Region
                        name="user_name_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 37, width: 35, top: 10, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Ibuxal"
                            textStyle="text-style-il-heading-3"
                        />
                    </Region>
                </Border>
                <ThemeImage
                    params={1040}
                    src="${image.library.url}reception/sakara.png"
                    layout={{ position: 'absolute', left: 46, width: 9, top: 48, height: 6 }}
                />
            </Region>
        </Region>
    );
};
