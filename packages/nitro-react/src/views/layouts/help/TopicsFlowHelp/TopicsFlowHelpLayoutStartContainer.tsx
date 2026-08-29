import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `start_container` of TopicsFlowHelpLayout - configured through the parent's `startContainer` prop. */
export interface TopicsFlowHelpLayoutStartContainerProps {
    captionFaqLink?: string;
    captionReportsStatus?: string;
    captionSanctionInfoLink?: string;
    layout?: BoxLayout;
    onButtonAccount?: () => void;
    onButtonHabboHelp?: () => void;
    onButtonUserReport?: () => void;
    onFaqLink?: () => void;
    onReportsStatus?: () => void;
    onSanctionInfoLink?: () => void;
    srcReportsStatusBitmap?: string;
    visibleButtonHabboHelp?: boolean;
    visibleStartContainer?: boolean;
}

export const TopicsFlowHelpLayoutStartContainer = ({ captionFaqLink, captionReportsStatus, captionSanctionInfoLink, layout, onButtonAccount, onButtonHabboHelp, onButtonUserReport, onFaqLink, onReportsStatus, onSanctionInfoLink, srcReportsStatusBitmap, visibleButtonHabboHelp, visibleStartContainer }: TopicsFlowHelpLayoutStartContainerProps) => {
    const t = useTranslation();

    return (
        (visibleStartContainer ?? false) && (
            <Region
                name="start_container"
                layout={{ position: 'absolute', left: 0, width: 446, top: 0, height: 480, ...layout }}
            >
                <ThemeImage
                    src={layoutImage('help_help_duck.png')}
                    layout={{ position: 'absolute', left: 32, width: 124, top: 59, height: 126 }}
                />
                <Region layout={{ position: 'absolute', left: 32, width: 382, top: 22, height: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('help.main.frame.title')}
                        textStyle="text-style-u-headline-big"
                    />
                </Region>
                <Region layout={{ position: 'absolute', left: 170, width: 250, top: 61, height: 117, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('help.main.frame.description')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                    />
                </Region>
                <Region layout={{ position: 'absolute', left: 32, width: 380, top: 230, height: 150, flexDirection: 'column', gap: 5 }}>
                    {(visibleButtonHabboHelp ?? false) && (
                        <ContainerButton
                            variant="6"
                            name="button_habbo_help"
                            tintColor="#00aa00"
                            onPointerTap={onButtonHabboHelp}
                            layout={{ width: 380, height: 40, flexShrink: 0 }}
                        >
                            {/* `text` is hidden and has no name to show it by */}
                        </ContainerButton>
                    )}
                    <ContainerButton
                        variant="6"
                        name="button_user_report"
                        tintColor="#00aa00"
                        onPointerTap={onButtonUserReport}
                        layout={{ width: 380, height: 40, flexShrink: 0 }}
                    >
                        <ThemeText
                            text={t('help.main.bully.subtitle')}
                            textStyle="text-style-u-headline-medium"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </ContainerButton>
                    <ContainerButton
                        variant="6"
                        name="button_account"
                        tintColor="#00aa00"
                        onPointerTap={onButtonAccount}
                        layout={{ width: 380, height: 40, flexShrink: 0 }}
                    >
                        <ThemeText
                            text={t('help.main.self.tips.title')}
                            textStyle="text-style-u-headline-medium"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </ContainerButton>
                </Region>
                <ThemeImage
                    src={layoutImage('icons_link_icon.png')}
                    layout={{ position: 'absolute', left: 32, width: 18, top: 378, height: 19 }}
                />
                <Region
                    name="faq_link"
                    layout={{ position: 'absolute', left: 54, width: 354, top: 377, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    onPointerTap={onFaqLink}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionFaqLink ?? t('help.main.faq.link.text')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <ThemeImage
                    src={layoutImage('icons_link_icon.png')}
                    layout={{ position: 'absolute', left: 32, width: 18, top: 406, height: 19 }}
                />
                <Region
                    name="sanction_info_link"
                    layout={{ position: 'absolute', left: 54, width: 354, top: 404, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    onPointerTap={onSanctionInfoLink}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionSanctionInfoLink ?? t('help.main.my.sanction.status')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <ThemeImage
                    name="reports_status_bitmap"
                    src={srcReportsStatusBitmap ?? layoutImage('icons_link_icon.png')}
                    layout={{ position: 'absolute', left: 32, width: 18, top: 434, height: 19 }}
                />
                <Region
                    name="reports_status"
                    layout={{ position: 'absolute', left: 54, width: 354, top: 432, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    onPointerTap={onReportsStatus}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionReportsStatus ?? t('help.main.my.reports.status')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            </Region>
        )
    );
};
