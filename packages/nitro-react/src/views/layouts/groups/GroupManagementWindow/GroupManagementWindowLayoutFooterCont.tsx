import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `footer_cont` of GroupManagementWindowLayout - configured through the parent's `footerCont` prop. */
export interface GroupManagementWindowLayoutFooterContProps {
    captionBuyTxt?: string;
    captionCancelLink?: string;
    captionPreviousStepLink?: string;
    layout?: BoxLayout;
    onBuyButton?: () => void;
    onCancelLinkRegion?: () => void;
    onNextStepButton?: () => void;
    onPreviousStepLinkRegion?: () => void;
    srcBuyCreditIcon?: string;
    visibleFooterCont?: boolean;
}

export const GroupManagementWindowLayoutFooterCont = ({ captionBuyTxt, captionCancelLink, captionPreviousStepLink, layout, onBuyButton, onCancelLinkRegion, onNextStepButton, onPreviousStepLinkRegion, srcBuyCreditIcon, visibleFooterCont }: GroupManagementWindowLayoutFooterContProps) => {
    const t = useTranslation();

    return (
        (visibleFooterCont ?? false) && (
            <Region
                name="footer_cont"
                layout={{ position: 'absolute', left: 0, right: 2, bottom: 45, height: 42, ...layout }}
            >
                <Region
                    name="cancel_link_region"
                    onPointerTap={onCancelLinkRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 11, width: 120, top: 20, height: 18 }}
                >
                    <Region
                        name="cancel_link"
                        layout={{ position: 'absolute', left: 0, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionCancelLink ?? t('cancel')}
                    </Region>
                </Region>
                <Region
                    name="previous_step_link_region"
                    onPointerTap={onPreviousStepLinkRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 11, width: 120, top: 20, height: 18 }}
                >
                    <Region
                        name="previous_step_link"
                        layout={{ position: 'absolute', left: 0, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionPreviousStepLink ?? t('group.create.previousstep')}
                    </Region>
                </Region>
                <Border
                    variant="0"
                    name="buy_border"
                    tintColor="#ffc300"
                    layout={{ position: 'absolute', left: 126, width: 248, top: 0, height: 39 }}
                >
                    <ThemeImage
                        name="buy_credit_icon"
                        src={srcBuyCreditIcon ?? '${image.library.url}guilds/gcreate_icon_credit.png'}
                        layout={{ position: 'absolute', left: 9, width: 21, top: 11, height: 20 }}
                    />
                    <Region
                        name="buy_txt"
                        layout={{ position: 'absolute', left: 37, width: 131, top: 3, height: 34, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionBuyTxt ?? t('group.create.confirm.buyinfo')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 131 }}
                        />
                    </Region>
                    <ButtonThick
                        variant="3"
                        name="buy_button"
                        onPointerTap={onBuyButton}
                        layout={{ position: 'absolute', right: 4, width: 72, top: 5, height: 29, minWidth: 72, maxWidth: 72 }}
                    >
                        {t('group.create.confirm.buy')}
                    </ButtonThick>
                </Border>
                <ButtonThick
                    variant="3"
                    name="next_step_button"
                    onPointerTap={onNextStepButton}
                    layout={{ position: 'absolute', left: 256, width: 120, top: 13, height: 29, minWidth: 120, maxWidth: 120 }}
                >
                    {t('group.create.nextstep')}
                </ButtonThick>
            </Region>
        )
    );
};
