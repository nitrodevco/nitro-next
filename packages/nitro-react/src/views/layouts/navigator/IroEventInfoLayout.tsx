import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3052_iro_event_info_xml` (layout "Event info", 195x135) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IroEventInfoLayoutProps {
    captionCreateLink?: string;
    captionDescTxt?: string;
    captionGetEvent?: string;
    captionHeaderTxt?: string;
    captionInProgressTxt?: string;
    captionModifyLink?: string;
    captionModifyLink2?: string;
    layout?: BoxLayout;
    onBgRegion?: () => void;
    onExtendEventRegion?: () => void;
    onModifyLinkRegion?: () => void;
    srcEventBgContracted?: string;
    srcEventBgOwner?: string;
    srcEventBgVisitor?: string;
    srcEventIcon?: string;
}

export const IroEventInfoLayout = ({ captionCreateLink, captionDescTxt, captionGetEvent, captionHeaderTxt, captionInProgressTxt, captionModifyLink, captionModifyLink2, layout, onBgRegion, onExtendEventRegion, onModifyLinkRegion, srcEventBgContracted, srcEventBgOwner, srcEventBgVisitor, srcEventIcon }: IroEventInfoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 195, height: 135, ...layout }}>
            <Region
                name="event_info_window"
                params={80}
                layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 135 }}
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
                <Region
                    name="bg_region"
                    params={2193}
                    onPointerTap={onBgRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 135 }}
                />
                <Region
                    name="content_cont"
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 135 }}
                >
                    <Region
                        name="header_txt"
                        params={786448}
                        layout={{ position: 'absolute', left: 61, width: 67, top: 2, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionHeaderTxt ?? 'Caption PH'}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="get_event"
                        params={4194320}
                        layout={{ position: 'absolute', left: 31, width: 126, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionGetEvent ?? t('roomad.get.event')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="desc_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 175, top: 27, height: 90, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionDescTxt ?? 'Search around hotel and locate this very valuable dino egg jhg jhg jhg jh gjhg jhg jhg jhg jh gjhg jhg jhg jhg jhg jhgjhgjh gjhg jh gjhg jh gjhg jhg jhg jhg jhg jhg'}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 175 }}
                        />
                    </Region>
                    <Region
                        name="in_progress_txt"
                        params={786448}
                        layout={{ position: 'absolute', left: 17, width: 156, top: 107, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionInProgressTxt ?? t('navigator.eventinprogress')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="create_link"
                        params={4194320}
                        layout={{ position: 'absolute', left: 31, width: 126, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCreateLink ?? t('navigator.createevent')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="modify_link_region"
                        params={17}
                        onPointerTap={onModifyLinkRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 88, top: 110, height: 18 }}
                    >
                        <Region
                            name="modify_link"
                            params={786448}
                            layout={{ position: 'absolute', left: 5, width: 88, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionModifyLink ?? t('navigator.roominfo.editevent')}
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="extend_event_region"
                        params={17}
                        onPointerTap={onExtendEventRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 88, width: 88, top: 110, height: 18 }}
                    >
                        <Region
                            name="modify_link"
                            params={786448}
                            layout={{ position: 'absolute', left: 0, width: 88, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                        >
                            <ThemeText
                                text={captionModifyLink2 ?? t('roomad.extend.event')}
                                textOptions={{ fill: '#ffffff', align: 'right' }}
                            />
                        </Region>
                    </Region>
                    <ThemeImage
                        name="event_icon"
                        params={16}
                        src={srcEventIcon ?? '${image.library.url}Events/event_icon.png'}
                        layout={{ position: 'absolute', left: 5, width: 16, top: 2, height: 19 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
