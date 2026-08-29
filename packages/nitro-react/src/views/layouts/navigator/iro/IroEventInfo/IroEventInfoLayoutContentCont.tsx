import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `content_cont` of IroEventInfoLayout - configured through the parent's `contentCont` prop. */
export interface IroEventInfoLayoutContentContProps {
    captionCreateLink?: string;
    captionDescTxt?: string;
    captionExtendEventRegionModifyLink?: string;
    captionGetEvent?: string;
    captionHeaderTxt?: string;
    captionInProgressTxt?: string;
    captionModifyLink?: string;
    layout?: BoxLayout;
    onExtendEventRegion?: () => void;
    onModifyLinkRegion?: () => void;
    srcEventIcon?: string;
}

export const IroEventInfoLayoutContentCont = ({ captionCreateLink, captionDescTxt, captionExtendEventRegionModifyLink, captionGetEvent, captionHeaderTxt, captionInProgressTxt, captionModifyLink, layout, onExtendEventRegion, onModifyLinkRegion, srcEventIcon }: IroEventInfoLayoutContentContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="content_cont"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                name="header_txt"
                layout={{ position: 'absolute', marginLeft: -3, marginRight: 3, width: 67, top: 2, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHeaderTxt ?? 'Caption PH'}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="get_event"
                layout={{ position: 'absolute', left: 31, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionGetEvent ?? t('roomad.get.event')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="desc_txt"
                layout={{ position: 'absolute', left: 10, width: 175, top: 27, height: 90, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDescTxt ?? 'Search around hotel and locate this very valuable dino egg jhg jhg jhg jh gjhg jhg jhg jhg jh gjhg jhg jhg jhg jhg jhgjhgjh gjhg jh gjhg jh gjhg jhg jhg jhg jhg jhg'}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 175 }}
                />
            </Region>
            <Region
                name="in_progress_txt"
                layout={{ position: 'absolute', marginLeft: -2.5, marginRight: 2.5, width: 156, top: 107, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionInProgressTxt ?? t('navigator.eventinprogress')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="create_link"
                layout={{ position: 'absolute', left: 31, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCreateLink ?? t('navigator.createevent')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="modify_link_region"
                onPointerTap={onModifyLinkRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 88, top: 110, height: 18, justifyContent: 'center' }}
            >
                <Region
                    name="modify_link"
                    layout={{ position: 'absolute', marginLeft: 5, marginRight: -5, width: 88, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionModifyLink ?? t('navigator.roominfo.editevent')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region
                name="extend_event_region"
                onPointerTap={onExtendEventRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 88, width: 88, top: 110, height: 18, justifyContent: 'center' }}
            >
                <Region
                    name="modify_link"
                    layout={{ position: 'absolute', width: 88, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionExtendEventRegionModifyLink ?? t('roomad.extend.event')}
                        textOptions={{ fill: '#ffffff', align: 'right' }}
                    />
                </Region>
            </Region>
            <ThemeImage
                name="event_icon"
                src={srcEventIcon ?? '${image.library.url}Events/event_icon.png'}
                layout={{ position: 'absolute', left: 5, width: 16, top: 2, height: 19 }}
            />
        </Region>
    );
};
