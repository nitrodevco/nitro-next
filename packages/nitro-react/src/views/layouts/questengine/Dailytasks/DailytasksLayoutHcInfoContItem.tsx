import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Region, ThemeText } from '#base/theme';

/** Row template `hc_info_cont` of DailytasksLayout - pass real rows through its `items…` slot. */
export interface DailytasksLayoutHcInfoContItemProps {
    captionHcInfoText?: string;
    layout?: BoxLayout;
    onGetHcBtn?: () => void;
    visibleGetHcBtn?: boolean;
    visibleHcInfoText?: boolean;
}

export const DailytasksLayoutHcInfoContItem = ({ captionHcInfoText, layout, onGetHcBtn, visibleGetHcBtn, visibleHcInfoText }: DailytasksLayoutHcInfoContItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="hc_info_cont"
            layout={{ width: 428, height: 35, flexShrink: 0, ...layout }}
        >
            {(visibleHcInfoText ?? true) && (
                <ThemeText
                    text={captionHcInfoText ?? 'You get double duckets as you are an HC member!'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 289, align: 'center' }}
                    name="hc_info_text"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 12, width: 289, alignSelf: 'center', marginTop: -2, marginBottom: 2, height: 17 }}
                />
            )}
            {(visibleGetHcBtn ?? true) && (
                <ButtonThick
                    variant="5"
                    name="get_hc_btn"
                    tintColor="#01a101"
                    onPointerTap={onGetHcBtn}
                    layout={{ position: 'absolute', right: 16, width: 107, top: 0, height: 30 }}
                >
                    {t('generic.get_hc')}
                </ButtonThick>
            )}
        </Region>
    );
};
