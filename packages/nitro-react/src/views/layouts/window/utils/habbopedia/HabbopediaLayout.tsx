import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, ThemeText } from '#base/theme';

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
            params={98305}
            caption={t('habbopedia.title')}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 420, height: 400, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="3"
                    params={2192}
                    layout={{ position: 'absolute', left: 4, right: 26, top: 7, bottom: 55 }}
                />
                <Region
                    name="content"
                    params={2177}
                    layout={{ position: 'absolute', left: 7, right: 29, top: 7, bottom: 55, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionContent ?? 'Here is some mighty text describing certain Hotel feature. Let\'s see what happens when it goes over the limit.'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 384 }}
                    />
                </Region>
                {/* <scrollbar_vertical> for content - rendered by that list's ScrollArea */}
            </Region>
        </Frame>
    );
};
