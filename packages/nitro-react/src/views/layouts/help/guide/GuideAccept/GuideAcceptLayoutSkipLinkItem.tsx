import { useTranslation } from '#base/context';
import { BoxLayout, Region } from '#base/theme';

/** Row template `skip_link` of GuideAcceptLayout - pass real rows through its `items…` slot. */
export interface GuideAcceptLayoutSkipLinkItemProps {
    captionSkipLink?: string;
    layout?: BoxLayout;
    onSkipLink?: () => void;
}

export const GuideAcceptLayoutSkipLinkItem = ({ captionSkipLink, layout, onSkipLink }: GuideAcceptLayoutSkipLinkItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="skip_link"
            layout={{ width: 212, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            onPointerTap={onSkipLink}
            cursor="pointer"
        >
            {captionSkipLink ?? t('guide.help.request.guide.accept.skip.link')}
        </Region>
    );
};
