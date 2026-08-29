import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `cancel_link` of ReportWindowLayout - pass real rows through its `items…` slot. */
export interface ReportWindowLayoutCancelLinkItemProps {
    captionCancelLink?: string;
    layout?: BoxLayout;
    onCancelLink?: () => void;
}

export const ReportWindowLayoutCancelLinkItem = ({ captionCancelLink, layout, onCancelLink }: ReportWindowLayoutCancelLinkItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="cancel_link"
            layout={{ width: 270, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
            onPointerTap={onCancelLink}
            cursor="pointer"
        >
            <ThemeText
                text={captionCancelLink ?? t('guide.help.request.user.create.cancel.link')}
                textOptions={{ wordWrap: true, wordWrapWidth: 270, align: 'center' }}
            />
        </Region>
    );
};
