import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1077_poll_question_xml` (layout "poll_question", 382x561) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PollQuestionLayoutProps {
    footerContainer?: PollQuestionLayoutFooterContainerProps;
    headerRegion?: PollQuestionLayoutHeaderRegionProps;
    layout?: BoxLayout;
    onClose?: () => void;
    pollContentWrapper?: PollQuestionLayoutPollContentWrapperProps;
}

export const PollQuestionLayout = ({ footerContainer, headerRegion, layout, onClose, pollContentWrapper }: PollQuestionLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="poll_question_frame"
            name="poll_question_frame"
            params={32769}
            caption={t('poll_question_title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 382, height: 561, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <PollQuestionLayoutHeaderRegion {...headerRegion} />
                <Region
                    params={8538128}
                    layout={{ position: 'absolute', left: 0, width: 370, top: 70, bottom: 67 }}
                >
                    <PollQuestionLayoutPollContentWrapper {...pollContentWrapper} />
                </Region>
                <PollQuestionLayoutFooterContainer {...footerContainer} />
            </Region>
        </Frame>
    );
};

/** Named region `header_region` of PollQuestionLayout - configured through the parent's `headerRegion` prop. */
export interface PollQuestionLayoutHeaderRegionProps {
    captionPollQuestionHeadline?: string;
    layout?: BoxLayout;
    onHeaderRegion?: () => void;
    srcPollPromptImage?: string;
}

export const PollQuestionLayoutHeaderRegion = ({ captionPollQuestionHeadline, layout, onHeaderRegion, srcPollPromptImage }: PollQuestionLayoutHeaderRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header_region"
            params={1}
            backgroundColor="#0e3f52"
            onPointerTap={onHeaderRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: -5, width: 380, top: 8, height: 60, ...layout }}
        >
            <Region
                name="poll_question_headline"
                params={144}
                layout={{ position: 'absolute', left: 80, right: 10, top: 15, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPollQuestionHeadline ?? t('poll_question_headline')}
                    textStyle="text-style-u-headline-big"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <ThemeImage
                name="poll_prompt_image"
                params={16}
                src={srcPollPromptImage ?? layoutImage('poll_poll_prompt_question.png')}
                layout={{ position: 'absolute', left: 10, width: 40, top: 7, height: 40 }}
            />
        </Region>
    );
};

/** Named region `poll_question_answer_container` of PollQuestionLayout - configured through the parent's `pollQuestionAnswerContainer` prop. */
export interface PollQuestionLayoutPollQuestionAnswerContainerProps {
    layout?: BoxLayout;
}

export const PollQuestionLayoutPollQuestionAnswerContainer = ({ layout }: PollQuestionLayoutPollQuestionAnswerContainerProps) => {
    return (
        <Region
            name="poll_question_answer_container"
            params={8538128}
            layout={{ width: 363, height: 384, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `poll_content_wrapper` of PollQuestionLayout - configured through the parent's `pollContentWrapper` prop. */
export interface PollQuestionLayoutPollContentWrapperProps {
    captionPollQuestionText?: string;
    layout?: BoxLayout;
    pollQuestionAnswerContainer?: PollQuestionLayoutPollQuestionAnswerContainerProps;
}

export const PollQuestionLayoutPollContentWrapper = ({ captionPollQuestionText, layout, pollQuestionAnswerContainer }: PollQuestionLayoutPollContentWrapperProps) => {
    return (
        <Region
            name="poll_content_wrapper"
            params={8538257}
            layout={{ position: 'absolute', left: 5, right: 0, top: 0, bottom: 0, flexDirection: 'column', ...layout }}
        >
            <ScrollArea
                orientation="vertical"
                layout={{ width: 365, height: 414, flexShrink: 0 }}
            >
                <Region
                    params={16400}
                    layout={{ flexDirection: 'column', width: '100%' }}
                >
                    <Region
                        name="poll_question_text"
                        params={8601616}
                        layout={{ width: 360, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPollQuestionText ?? ''}
                            textStyle="text-style-u-regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 360 }}
                        />
                    </Region>
                    <Region
                        params={12714000}
                        layout={{ width: 1, height: 10, flexShrink: 0 }}
                    />
                    <PollQuestionLayoutPollQuestionAnswerContainer {...pollQuestionAnswerContainer} />
                </Region>
            </ScrollArea>
            <Region
                params={16}
                layout={{ width: 1, height: 10, flexShrink: 0 }}
            />
        </Region>
    );
};

/** Named region `footer_container` of PollQuestionLayout - configured through the parent's `footerContainer` prop. */
export interface PollQuestionLayoutFooterContainerProps {
    captionPollQuestionCancel?: string;
    captionPollQuestionNumber?: string;
    layout?: BoxLayout;
    onPollQuestionButtonOk?: () => void;
}

export const PollQuestionLayoutFooterContainer = ({ captionPollQuestionCancel, captionPollQuestionNumber, layout, onPollQuestionButtonOk }: PollQuestionLayoutFooterContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="footer_container"
            params={10224656}
            layout={{ position: 'absolute', marginLeft: 5.5, marginRight: -5.5, width: 383, bottom: 30, height: 45, ...layout }}
        >
            <Region
                name="poll_question_number"
                params={144}
                layout={{ position: 'absolute', left: 0, right: 254, top: 10, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPollQuestionNumber ?? t('poll_question_number')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#333333' }}
                />
            </Region>
            <Region
                name="poll_question_cancel"
                params={393233}
                layout={{ position: 'absolute', right: 119, width: 74, top: 10, height: 17, minWidth: 74, maxWidth: 74, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPollQuestionCancel ?? t('cancel')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#333333' }}
                />
            </Region>
            <ButtonThick
                variant="5"
                name="poll_question_button_ok"
                params={131089}
                tintColor="#00aa00"
                onPointerTap={onPollQuestionButtonOk}
                layout={{ position: 'absolute', left: 270, width: 80, top: 0, height: 40, minWidth: 80, maxWidth: 80 }}
            >
                {t('ok')}
            </ButtonThick>
        </Region>
    );
};
