import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `3116_StripClubItemsInfo_xml` (layout "strip_club_items_dialog", 278x154) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface StripClubItemsInfoLayoutProps {
    captionStripDescription?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onStripButtonClubInfo?: () => void;
    onStripButtonOk?: () => void;
}

export const StripClubItemsInfoLayout = ({ captionStripDescription, layout, onClose, onStripButtonClubInfo, onStripButtonOk }: StripClubItemsInfoLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="_frame"
            name="_frame"
            caption={t('avatareditor.invalidclubitems.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 278, height: 154, minWidth: 278, minHeight: 154, ...layout }}
        >
            <Region
                name="_border"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: -9, justifyContent: 'center' }}
            >
                <Region
                    name="_strip_description"
                    layout={{ position: 'absolute', left: 27, width: 210, top: 10, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStripDescription ?? t('avatareditor.invalidclubitems.description')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 210 }}
                    />
                </Region>
                <ButtonThick
                    variant="3"
                    name="strip_button_club_info"
                    onPointerTap={onStripButtonClubInfo}
                    layout={{ position: 'absolute', left: 110, width: 244, bottom: 7, height: 22, minWidth: 50 }}
                >
                    {t('avatareditor.invalidclubitems.moreinfo')}
                </ButtonThick>
                <Button
                    variant="3"
                    name="strip_button_ok"
                    onPointerTap={onStripButtonOk}
                    layout={{ position: 'absolute', marginLeft: -76, marginRight: 76, width: 78, bottom: 7, height: 22, minWidth: 50 }}
                >
                    {t('generic.ok')}
                </Button>
            </Region>
        </Frame>
    );
};
