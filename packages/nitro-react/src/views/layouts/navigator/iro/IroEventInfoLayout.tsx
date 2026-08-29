import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3052_iro_event_info_xml` (layout "Event info", 195x135) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IroEventInfoLayoutProps {
    eventInfoWindow?: IroEventInfoLayoutEventInfoWindowProps;
    layout?: BoxLayout;
}

export const IroEventInfoLayout = ({ eventInfoWindow, layout }: IroEventInfoLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 195, height: 135, ...layout }}>
            <IroEventInfoLayoutEventInfoWindow {...eventInfoWindow} />
        </Region>
    );
};

/** Named region `bg_region` of IroEventInfoLayout - configured through the parent's `bgRegion` prop. */
export interface IroEventInfoLayoutBgRegionProps {
    layout?: BoxLayout;
    onBgRegion?: () => void;
}

export const IroEventInfoLayoutBgRegion = ({ layout, onBgRegion }: IroEventInfoLayoutBgRegionProps) => {
    return (
        <Region
            name="bg_region"
            onPointerTap={onBgRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        />
    );
};

/** Named region `modify_link_region` of IroEventInfoLayout - configured through the parent's `modifyLinkRegion` prop. */
export interface IroEventInfoLayoutModifyLinkRegionProps {
    captionModifyLink?: string;
    layout?: BoxLayout;
    onModifyLinkRegion?: () => void;
}

export const IroEventInfoLayoutModifyLinkRegion = ({ captionModifyLink, layout, onModifyLinkRegion }: IroEventInfoLayoutModifyLinkRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="modify_link_region"
            onPointerTap={onModifyLinkRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 88, top: 110, height: 18, justifyContent: 'center', ...layout }}
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
    );
};

/** Named region `extend_event_region` of IroEventInfoLayout - configured through the parent's `extendEventRegion` prop. */
export interface IroEventInfoLayoutExtendEventRegionProps {
    captionModifyLink?: string;
    layout?: BoxLayout;
    onExtendEventRegion?: () => void;
}

export const IroEventInfoLayoutExtendEventRegion = ({ captionModifyLink, layout, onExtendEventRegion }: IroEventInfoLayoutExtendEventRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="extend_event_region"
            onPointerTap={onExtendEventRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 88, width: 88, top: 110, height: 18, justifyContent: 'center', ...layout }}
        >
            <Region
                name="modify_link"
                layout={{ position: 'absolute', width: 88, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionModifyLink ?? t('roomad.extend.event')}
                    textOptions={{ fill: '#ffffff', align: 'right' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `content_cont` of IroEventInfoLayout - configured through the parent's `contentCont` prop. */
export interface IroEventInfoLayoutContentContProps {
    captionCreateLink?: string;
    captionDescTxt?: string;
    captionGetEvent?: string;
    captionHeaderTxt?: string;
    captionInProgressTxt?: string;
    extendEventRegion?: IroEventInfoLayoutExtendEventRegionProps;
    layout?: BoxLayout;
    modifyLinkRegion?: IroEventInfoLayoutModifyLinkRegionProps;
    srcEventIcon?: string;
}

export const IroEventInfoLayoutContentCont = ({ captionCreateLink, captionDescTxt, captionGetEvent, captionHeaderTxt, captionInProgressTxt, extendEventRegion, layout, modifyLinkRegion, srcEventIcon }: IroEventInfoLayoutContentContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="content_cont"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 135, justifyContent: 'center', ...layout }}
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
            <IroEventInfoLayoutModifyLinkRegion {...modifyLinkRegion} />
            <IroEventInfoLayoutExtendEventRegion {...extendEventRegion} />
            <ThemeImage
                name="event_icon"
                src={srcEventIcon ?? '${image.library.url}Events/event_icon.png'}
                layout={{ position: 'absolute', left: 5, width: 16, top: 2, height: 19 }}
            />
        </Region>
    );
};

/** Named region `event_info_window` of IroEventInfoLayout - configured through the parent's `eventInfoWindow` prop. */
export interface IroEventInfoLayoutEventInfoWindowProps {
    bgRegion?: IroEventInfoLayoutBgRegionProps;
    contentCont?: IroEventInfoLayoutContentContProps;
    layout?: BoxLayout;
    srcEventBgContracted?: string;
    srcEventBgOwner?: string;
    srcEventBgVisitor?: string;
}

export const IroEventInfoLayoutEventInfoWindow = ({ bgRegion, contentCont, layout, srcEventBgContracted, srcEventBgOwner, srcEventBgVisitor }: IroEventInfoLayoutEventInfoWindowProps) => {
    return (
        <Region
            name="event_info_window"
            layout={{ position: 'absolute', right: 0, width: 195, top: 0, height: 135, ...layout }}
        >
            <ThemeImage
                name="event_bg_visitor"
                src={srcEventBgVisitor ?? '${image.library.url}Events/event_bg_visitor.png'}
                layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 135 }}
            />
            <ThemeImage
                name="event_bg_owner"
                src={srcEventBgOwner ?? '${image.library.url}Events/event_bg_owner.png'}
                layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 135 }}
            />
            <ThemeImage
                name="event_bg_contracted"
                src={srcEventBgContracted ?? '${image.library.url}Events/event_bg_contracted.png'}
                layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 25 }}
            />
            <IroEventInfoLayoutBgRegion {...bgRegion} />
            <IroEventInfoLayoutContentCont {...contentCont} />
        </Region>
    );
};
