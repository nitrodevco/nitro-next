import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, ThemeText } from '#base/theme';

/** Generated from `3192_habbopedia_xml` (layout "habbopedia", 420x400) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabbopediaLayoutProps {
    captionContent?: string;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const HabbopediaLayout = ({ captionContent, layout, onClose }: HabbopediaLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('habbopedia.title')}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 420, height: 400, minWidth: 300, minHeight: 300, ...layout }}
        >
            <Border
                variant="3"
                layout={{ position: 'absolute', left: 4, right: 14, top: 7, bottom: 14 }}
            />
            <ThemeText
                text={captionContent ?? 'Here is some mighty text describing certain Hotel feature. Let\'s see what happens when it goes over the limit.'}
                textOptions={{ wordWrap: true, wordWrapWidth: 384 }}
                name="content"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 7, right: 17, top: 7, bottom: 14 }}
            />
            {/* <scrollbar_vertical> for content - rendered by that list's ScrollArea */}
        </Frame>
    );
};
