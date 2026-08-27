import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1503_main_window_xml` (layout "main_window", 275x105) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MainWindow_1503LayoutProps {
    captionCaptionText?: string;
    captionCaptionText2?: string;
    captionCaptionText3?: string;
    captionInfoText?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onOpenEditCtgsBut?: () => void;
    srcArrowDownBlack?: string;
    srcArrowDownBlack2?: string;
    srcArrowDownBlack3?: string;
    srcArrowDownWhite?: string;
    srcArrowDownWhite2?: string;
    srcArrowDownWhite3?: string;
    srcArrowRightBlack?: string;
    srcArrowRightBlack2?: string;
    srcArrowRightBlack3?: string;
    srcArrowRightWhite?: string;
    srcArrowRightWhite2?: string;
    srcArrowRightWhite3?: string;
    srcHdrFriendRequests?: string;
    srcHdrFriends?: string;
    srcHdrHilite?: string;
    srcHdrHilite2?: string;
    srcHdrHilite3?: string;
    srcHdrSearch?: string;
    srcOpenEditCtgs?: string;
}

export const MainWindow_1503Layout = ({ captionCaptionText, captionCaptionText2, captionCaptionText3, captionInfoText, layout, onClose, onOpenEditCtgsBut, srcArrowDownBlack, srcArrowDownBlack2, srcArrowDownBlack3, srcArrowDownWhite, srcArrowDownWhite2, srcArrowDownWhite3, srcArrowRightBlack, srcArrowRightBlack2, srcArrowRightBlack3, srcArrowRightWhite, srcArrowRightWhite2, srcArrowRightWhite3, srcHdrFriendRequests, srcHdrFriends, srcHdrHilite, srcHdrHilite2, srcHdrHilite3, srcHdrSearch, srcOpenEditCtgs }: MainWindow_1503LayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="friendlist_window"
            name="friendlist_window"
            params={98305}
            caption={t('friendlist.friends')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 275, height: 105, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="main_content"
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 1, width: 275, top: 0, height: 56 }}
                >
                    <Region
                        name="bg"
                        params={17}
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 10 }}
                    />
                    <Region
                        name="flt_1"
                        params={17}
                        layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17 }}
                    >
                        <Region
                            name="header"
                            params={1}
                            layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17 }}
                        >
                            <ThemeImage
                                name="hdr_hilite"
                                params={17}
                                src={srcHdrHilite}
                                layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17 }}
                            />
                            <ThemeImage
                                name="hdr_friends"
                                params={17}
                                src={srcHdrFriends}
                                layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17 }}
                            />
                            <Region
                                name="caption_text"
                                layout={{ position: 'absolute', left: 4, width: 219, top: 2, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionCaptionText ?? `${t('friendlist.friends')} (0)`}
                                    textOptions={{ fill: '#626262' }}
                                />
                            </Region>
                            <ThemeImage
                                name="arrow_down_black"
                                params={16}
                                src={srcArrowDownBlack}
                                layout={{ position: 'absolute', left: 71, width: 10, top: 6, height: 10 }}
                            />
                            <ThemeImage
                                name="arrow_right_black"
                                params={16}
                                src={srcArrowRightBlack}
                                layout={{ position: 'absolute', left: 71, width: 10, top: 4, height: 10 }}
                            />
                            <ThemeImage
                                name="arrow_down_white"
                                params={16}
                                src={srcArrowDownWhite}
                                layout={{ position: 'absolute', left: 71, width: 10, top: 6, height: 10 }}
                            />
                            <ThemeImage
                                name="arrow_right_white"
                                params={16}
                                src={srcArrowRightWhite}
                                layout={{ position: 'absolute', left: 71, width: 10, top: 4, height: 10 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="flt_2"
                        params={17}
                        layout={{ position: 'absolute', left: 0, width: 273, top: 15, height: 17 }}
                    >
                        <Region
                            name="header"
                            params={1}
                            layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17 }}
                        >
                            <ThemeImage
                                name="hdr_hilite"
                                params={17}
                                src={srcHdrHilite2}
                                layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17 }}
                            />
                            <ThemeImage
                                name="hdr_friend_requests"
                                params={17}
                                src={srcHdrFriendRequests}
                                layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17 }}
                            />
                            <Region
                                name="caption_text"
                                layout={{ position: 'absolute', left: 4, width: 190, top: 2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionCaptionText2 ?? `${t('friendlist.tab.friendrequests')} (1)`}
                                    textOptions={{ fill: '#f6f6f6' }}
                                />
                            </Region>
                            <ThemeImage
                                name="arrow_down_black"
                                params={16}
                                src={srcArrowDownBlack2}
                                layout={{ position: 'absolute', left: 71, width: 10, top: 6, height: 10 }}
                            />
                            <ThemeImage
                                name="arrow_right_black"
                                params={16}
                                src={srcArrowRightBlack2}
                                layout={{ position: 'absolute', left: 71, width: 10, top: 4, height: 10 }}
                            />
                            <ThemeImage
                                name="arrow_down_white"
                                params={16}
                                src={srcArrowDownWhite2}
                                layout={{ position: 'absolute', left: 71, width: 10, top: 6, height: 10 }}
                            />
                            <ThemeImage
                                name="arrow_right_white"
                                params={16}
                                src={srcArrowRightWhite2}
                                layout={{ position: 'absolute', left: 71, width: 10, top: 4, height: 10 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="flt_3"
                        params={17}
                        layout={{ position: 'absolute', left: 0, width: 273, top: 30, height: 17 }}
                    >
                        <Region
                            name="header"
                            params={1}
                            layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17 }}
                        >
                            <ThemeImage
                                name="hdr_hilite"
                                params={17}
                                src={srcHdrHilite3}
                                layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17 }}
                            />
                            <ThemeImage
                                name="hdr_search"
                                params={17}
                                src={srcHdrSearch}
                                layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17 }}
                            />
                            <Region
                                name="caption_text"
                                layout={{ position: 'absolute', left: 4, width: 190, top: 2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionCaptionText3 ?? `${t('generic.search')} (5)`}
                                    textOptions={{ fill: '#efefef' }}
                                />
                            </Region>
                            <ThemeImage
                                name="arrow_down_black"
                                params={16}
                                src={srcArrowDownBlack3}
                                layout={{ position: 'absolute', left: 71, width: 10, top: 6, height: 10 }}
                            />
                            <ThemeImage
                                name="arrow_right_black"
                                params={16}
                                src={srcArrowRightBlack3}
                                layout={{ position: 'absolute', left: 71, width: 10, top: 4, height: 10 }}
                            />
                            <ThemeImage
                                name="arrow_down_white"
                                params={16}
                                src={srcArrowDownWhite3}
                                layout={{ position: 'absolute', left: 71, width: 10, top: 6, height: 10 }}
                            />
                            <ThemeImage
                                name="arrow_right_white"
                                params={16}
                                src={srcArrowRightWhite3}
                                layout={{ position: 'absolute', left: 71, width: 10, top: 4, height: 10 }}
                            />
                        </Region>
                    </Region>
                </Region>
                <Region
                    name="footer"
                    params={16}
                    layout={{ position: 'absolute', left: 5, width: 210, top: 44, height: 30 }}
                >
                    <ContainerButton
                        variant="0"
                        name="open_edit_ctgs_but"
                        params={17}
                        onPointerTap={onOpenEditCtgsBut}
                        layout={{ position: 'absolute', left: 0, width: 90, top: 7, height: 20 }}
                    >
                        {t('friendlist.friends')}
                        <ThemeImage
                            name="open_edit_ctgs"
                            params={17}
                            src={srcOpenEditCtgs}
                            layout={{ position: 'absolute', left: 5, width: 10, top: 5, height: 10 }}
                        />
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 20, width: 100, top: 3, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={t('friendlist.settings')} />
                        </Region>
                    </ContainerButton>
                    <Region
                        name="info_text"
                        params={145}
                        layout={{ position: 'absolute', left: 100, width: 110, top: 11, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionInfoText ?? 'PH Info'}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
