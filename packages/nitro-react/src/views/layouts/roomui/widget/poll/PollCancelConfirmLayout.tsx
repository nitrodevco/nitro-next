import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `860_poll_cancel_confirm_xml` (layout "poll_cancel_confim", 221x153) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PollCancelConfirmLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onPollCancelConfirmButtonCancel?: () => void;
    onPollCancelConfirmButtonOk?: () => void;
}

export const PollCancelConfirmLayout = ({ layout, onClose, onPollCancelConfirmButtonCancel, onPollCancelConfirmButtonOk }: PollCancelConfirmLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="poll_confirm_cancel_frame"
            name="poll_confirm_cancel_frame"
            params={32769}
            caption={t('poll_cancel_confirm_title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 221, height: 153, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={144}
                    layout={{ position: 'absolute', left: 5, right: 18, top: 13, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={t('poll_cancel_confirm_short')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Region
                    params={2192}
                    layout={{ position: 'absolute', left: 5, right: 17, top: 32, bottom: 108, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={t('poll_cancel_confirm_long')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 199, align: 'center' }}
                    />
                </Region>
                <Region
                    params={1232}
                    layout={{ position: 'absolute', left: '50%', marginLeft: -106.5, width: 201, bottom: 37, height: 22 }}
                >
                    <Button
                        variant="0"
                        name="poll_cancel_confirm_button_cancel"
                        params={393233}
                        onPointerTap={onPollCancelConfirmButtonCancel}
                        layout={{ position: 'absolute', right: 102, width: 51, top: 0, height: 22 }}
                    >
                        {t('cancel')}
                    </Button>
                    <ButtonThick
                        variant="0"
                        name="poll_cancel_confirm_button_ok"
                        params={131089}
                        onPointerTap={onPollCancelConfirmButtonOk}
                        layout={{ position: 'absolute', left: 121, width: 33, top: 0, height: 22 }}
                    >
                        {t('ok')}
                    </ButtonThick>
                </Region>
            </Region>
        </Frame>
    );
};
