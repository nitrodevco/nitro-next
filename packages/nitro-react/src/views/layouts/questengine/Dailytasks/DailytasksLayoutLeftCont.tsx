import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `left_cont` of DailytasksLayout - configured through the parent's `leftCont` prop. */
export interface DailytasksLayoutLeftContProps {
    captionTaskDescTxt?: string;
    captionTaskTitleTxt?: string;
    layout?: BoxLayout;
    onInfoHoverRegion?: () => void;
    srcTaskBitmap?: string;
    srcTaskStaticBitmap?: string;
    tintTaskBitmap?: string;
    visibleTaskBitmap?: boolean;
}

export const DailytasksLayoutLeftCont = ({ captionTaskDescTxt, captionTaskTitleTxt, layout, onInfoHoverRegion, srcTaskBitmap, srcTaskStaticBitmap, tintTaskBitmap, visibleTaskBitmap }: DailytasksLayoutLeftContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="left_cont"
            layout={{ position: 'absolute', left: 6, width: 274, top: 6, height: 113, ...layout }}
        >
            <Border
                variant="4"
                name="task_name_cont"
                tintColor="#4bb245"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 28 }}
            >
                <Region
                    name="task_title_txt"
                    layout={{ position: 'absolute', left: 20, width: 79, top: 5, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTaskTitleTxt ?? 'Quest name'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="info_hover_region"
                    onPointerTap={onInfoHoverRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 254, width: 14, top: 4, height: 22 }}
                >
                    <Region layout={{ position: 'absolute', left: 1, width: 12, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text="?"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
            </Border>
            {(visibleTaskBitmap ?? false) && (
                <ThemeImage
                    name="task_bitmap"
                    src={srcTaskBitmap}
                    tint={tintTaskBitmap}
                    layout={{ position: 'absolute', left: 0, width: 76, top: 28, height: 76, minWidth: 76, maxWidth: 76, minHeight: 76, maxHeight: 76 }}
                />
            )}
            <ThemeImage
                name="task_static_bitmap"
                src={srcTaskStaticBitmap}
                layout={{ position: 'absolute', left: 0, width: 76, top: 28, height: 76, minWidth: 76, maxWidth: 76, minHeight: 76, maxHeight: 76 }}
            />
            <Region
                name="task_desc_txt"
                layout={{ position: 'absolute', left: 76, width: 198, top: 36, height: 55, minWidth: 198, maxWidth: 198, minHeight: 55, maxHeight: 55, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTaskDescTxt ?? 'Search around hotel and locate this very valuable dino egg jhg jhg jhg jh gjhg jhg jhg jhg jh gjhg jhg jhg jhg jhg jhgjhgjh gjhg jh gjhg jh gjhg jhg jhg jhg jhg jhg'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 198 }}
                />
            </Region>
            <Region
                name="completion_cont"
                layout={{ position: 'absolute', left: 76, width: 198, top: 83, height: 29 }}
            >
                <ThemeImage
                    src={layoutImage('common_icon_task_completed_s.png')}
                    layout={{ position: 'absolute', left: 178, width: 20, top: 3, height: 22 }}
                />
                <Region layout={{ position: 'absolute', right: 23, width: 143, top: 6, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('dailytasks.task.complete')}
                        textOptions={{ fill: '#24850b' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
