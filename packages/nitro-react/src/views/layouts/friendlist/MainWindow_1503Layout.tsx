import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1503_main_window_xml` (layout "main_window", 275x105) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MainWindow_1503LayoutProps {
    captionInfoText?: string;
    layout?: BoxLayout;
    mainContent?: MainWindow_1503LayoutMainContentProps;
    onClose?: () => void;
    onOpenEditCtgsBut?: () => void;
    srcOpenEditCtgs?: string;
}

export const MainWindow_1503Layout = ({ captionInfoText, layout, mainContent, onClose, onOpenEditCtgsBut, srcOpenEditCtgs }: MainWindow_1503LayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="friendlist_window"
            name="friendlist_window"
            caption={t('friendlist.friends')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 275, height: 105, ...layout }}
        >
            <MainWindow_1503LayoutMainContent {...mainContent} />
            <Region
                name="footer"
                layout={{ position: 'absolute', left: 5, width: 210, top: 44, height: 30 }}
            >
                <ContainerButton
                    variant="0"
                    name="open_edit_ctgs_but"
                    onPointerTap={onOpenEditCtgsBut}
                    layout={{ position: 'absolute', left: 0, width: 90, top: 7, height: 20 }}
                >
                    <ThemeImage
                        name="open_edit_ctgs"
                        src={srcOpenEditCtgs}
                        layout={{ position: 'absolute', left: 5, width: 10, top: 5, height: 10 }}
                    />
                    <Region layout={{ position: 'absolute', left: 20, width: 100, top: 3, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText text={t('friendlist.settings')} />
                    </Region>
                </ContainerButton>
                <Region
                    name="info_text"
                    layout={{ position: 'absolute', left: 100, right: 0, top: 11, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfoText ?? 'PH Info'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};

/** Named region `header` of MainWindow_1503Layout - configured through the parent's `header` prop. */
export interface MainWindow_1503LayoutHeaderProps {
    captionCaptionText?: string;
    layout?: BoxLayout;
    onHeader?: () => void;
    srcArrowDownBlack?: string;
    srcArrowDownWhite?: string;
    srcArrowRightBlack?: string;
    srcArrowRightWhite?: string;
    srcHdrFriends?: string;
    srcHdrHilite?: string;
}

export const MainWindow_1503LayoutHeader = ({ captionCaptionText, layout, onHeader, srcArrowDownBlack, srcArrowDownWhite, srcArrowRightBlack, srcArrowRightWhite, srcHdrFriends, srcHdrHilite }: MainWindow_1503LayoutHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header"
            onPointerTap={onHeader}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17, ...layout }}
        >
            <ThemeImage
                name="hdr_hilite"
                src={srcHdrHilite}
                layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17 }}
            />
            <ThemeImage
                name="hdr_friends"
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
                src={srcArrowDownBlack}
                layout={{ position: 'absolute', left: 71, width: 10, top: 6, height: 10 }}
            />
            <ThemeImage
                name="arrow_right_black"
                src={srcArrowRightBlack}
                layout={{ position: 'absolute', left: 71, width: 10, top: 4, height: 10 }}
            />
            <ThemeImage
                name="arrow_down_white"
                src={srcArrowDownWhite}
                layout={{ position: 'absolute', left: 71, width: 10, top: 6, height: 10 }}
            />
            <ThemeImage
                name="arrow_right_white"
                src={srcArrowRightWhite}
                layout={{ position: 'absolute', left: 71, width: 10, top: 4, height: 10 }}
            />
        </Region>
    );
};

/** Named region `flt_1` of MainWindow_1503Layout - configured through the parent's `flt1` prop. */
export interface MainWindow_1503LayoutFlt1Props {
    header?: MainWindow_1503LayoutHeaderProps;
    layout?: BoxLayout;
    onFlt1?: () => void;
}

export const MainWindow_1503LayoutFlt1 = ({ header, layout, onFlt1 }: MainWindow_1503LayoutFlt1Props) => {
    return (
        <Region
            name="flt_1"
            onPointerTap={onFlt1}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17, ...layout }}
        >
            <MainWindow_1503LayoutHeader {...header} />
        </Region>
    );
};

/** Named region `header` of MainWindow_1503Layout - configured through the parent's `header` prop. */
export interface MainWindow_1503LayoutHeader2Props {
    captionCaptionText?: string;
    layout?: BoxLayout;
    onHeader?: () => void;
    srcArrowDownBlack?: string;
    srcArrowDownWhite?: string;
    srcArrowRightBlack?: string;
    srcArrowRightWhite?: string;
    srcHdrFriendRequests?: string;
    srcHdrHilite?: string;
}

export const MainWindow_1503LayoutHeader2 = ({ captionCaptionText, layout, onHeader, srcArrowDownBlack, srcArrowDownWhite, srcArrowRightBlack, srcArrowRightWhite, srcHdrFriendRequests, srcHdrHilite }: MainWindow_1503LayoutHeader2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="header"
            onPointerTap={onHeader}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17, ...layout }}
        >
            <ThemeImage
                name="hdr_hilite"
                src={srcHdrHilite}
                layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17 }}
            />
            <ThemeImage
                name="hdr_friend_requests"
                src={srcHdrFriendRequests}
                layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17 }}
            />
            <Region
                name="caption_text"
                layout={{ position: 'absolute', left: 4, width: 190, top: 2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCaptionText ?? `${t('friendlist.tab.friendrequests')} (1)`}
                    textOptions={{ fill: '#f6f6f6' }}
                />
            </Region>
            <ThemeImage
                name="arrow_down_black"
                src={srcArrowDownBlack}
                layout={{ position: 'absolute', left: 71, width: 10, top: 6, height: 10 }}
            />
            <ThemeImage
                name="arrow_right_black"
                src={srcArrowRightBlack}
                layout={{ position: 'absolute', left: 71, width: 10, top: 4, height: 10 }}
            />
            <ThemeImage
                name="arrow_down_white"
                src={srcArrowDownWhite}
                layout={{ position: 'absolute', left: 71, width: 10, top: 6, height: 10 }}
            />
            <ThemeImage
                name="arrow_right_white"
                src={srcArrowRightWhite}
                layout={{ position: 'absolute', left: 71, width: 10, top: 4, height: 10 }}
            />
        </Region>
    );
};

/** Named region `flt_2` of MainWindow_1503Layout - configured through the parent's `flt2` prop. */
export interface MainWindow_1503LayoutFlt2Props {
    header?: MainWindow_1503LayoutHeader2Props;
    layout?: BoxLayout;
    onFlt2?: () => void;
}

export const MainWindow_1503LayoutFlt2 = ({ header, layout, onFlt2 }: MainWindow_1503LayoutFlt2Props) => {
    return (
        <Region
            name="flt_2"
            onPointerTap={onFlt2}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 273, top: 15, height: 17, ...layout }}
        >
            <MainWindow_1503LayoutHeader2 {...header} />
        </Region>
    );
};

/** Named region `header` of MainWindow_1503Layout - configured through the parent's `header` prop. */
export interface MainWindow_1503LayoutHeader3Props {
    captionCaptionText?: string;
    layout?: BoxLayout;
    onHeader?: () => void;
    srcArrowDownBlack?: string;
    srcArrowDownWhite?: string;
    srcArrowRightBlack?: string;
    srcArrowRightWhite?: string;
    srcHdrHilite?: string;
    srcHdrSearch?: string;
}

export const MainWindow_1503LayoutHeader3 = ({ captionCaptionText, layout, onHeader, srcArrowDownBlack, srcArrowDownWhite, srcArrowRightBlack, srcArrowRightWhite, srcHdrHilite, srcHdrSearch }: MainWindow_1503LayoutHeader3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="header"
            onPointerTap={onHeader}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17, ...layout }}
        >
            <ThemeImage
                name="hdr_hilite"
                src={srcHdrHilite}
                layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17 }}
            />
            <ThemeImage
                name="hdr_search"
                src={srcHdrSearch}
                layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 17 }}
            />
            <Region
                name="caption_text"
                layout={{ position: 'absolute', left: 4, width: 190, top: 2, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCaptionText ?? `${t('generic.search')} (5)`}
                    textOptions={{ fill: '#efefef' }}
                />
            </Region>
            <ThemeImage
                name="arrow_down_black"
                src={srcArrowDownBlack}
                layout={{ position: 'absolute', left: 71, width: 10, top: 6, height: 10 }}
            />
            <ThemeImage
                name="arrow_right_black"
                src={srcArrowRightBlack}
                layout={{ position: 'absolute', left: 71, width: 10, top: 4, height: 10 }}
            />
            <ThemeImage
                name="arrow_down_white"
                src={srcArrowDownWhite}
                layout={{ position: 'absolute', left: 71, width: 10, top: 6, height: 10 }}
            />
            <ThemeImage
                name="arrow_right_white"
                src={srcArrowRightWhite}
                layout={{ position: 'absolute', left: 71, width: 10, top: 4, height: 10 }}
            />
        </Region>
    );
};

/** Named region `flt_3` of MainWindow_1503Layout - configured through the parent's `flt3` prop. */
export interface MainWindow_1503LayoutFlt3Props {
    header?: MainWindow_1503LayoutHeader3Props;
    layout?: BoxLayout;
    onFlt3?: () => void;
}

export const MainWindow_1503LayoutFlt3 = ({ header, layout, onFlt3 }: MainWindow_1503LayoutFlt3Props) => {
    return (
        <Region
            name="flt_3"
            onPointerTap={onFlt3}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 273, top: 30, height: 17, ...layout }}
        >
            <MainWindow_1503LayoutHeader3 {...header} />
        </Region>
    );
};

/** Named region `main_content` of MainWindow_1503Layout - configured through the parent's `mainContent` prop. */
export interface MainWindow_1503LayoutMainContentProps {
    flt1?: MainWindow_1503LayoutFlt1Props;
    flt2?: MainWindow_1503LayoutFlt2Props;
    flt3?: MainWindow_1503LayoutFlt3Props;
    layout?: BoxLayout;
}

export const MainWindow_1503LayoutMainContent = ({ flt1, flt2, flt3, layout }: MainWindow_1503LayoutMainContentProps) => {
    return (
        <Region
            name="main_content"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 1, width: 275, top: 0, height: 56, ...layout }}
        >
            <Region
                name="bg"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 10 }}
            />
            <MainWindow_1503LayoutFlt1 {...flt1} />
            <MainWindow_1503LayoutFlt2 {...flt2} />
            <MainWindow_1503LayoutFlt3 {...flt3} />
        </Region>
    );
};
