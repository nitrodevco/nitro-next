import { useTranslation } from '#base/context';
import { BoxLayout, Frame, ThemeImage } from '#base/theme';

import { ViprequiredLayoutList, ViprequiredLayoutListProps } from './ViprequiredLayoutList';

/** Generated from `991_viprequired_xml` (layout "viprequired", 310x149) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ViprequiredLayoutProps {
    layout?: BoxLayout;
    list?: ViprequiredLayoutListProps;
    onClose?: () => void;
    srcIllustration?: string;
}

export const ViprequiredLayout = ({ layout, list, onClose, srcIllustration }: ViprequiredLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="frame"
            name="frame"
            caption={t('viprequired.header')}
            onClose={onClose}
            layout={{ width: 310, height: 149, ...layout }}
        >
            <ThemeImage
                name="illustration"
                src={srcIllustration}
                layout={{ position: 'absolute', left: 10, width: 1, top: 0, height: 1 }}
            />
            <ViprequiredLayoutList {...list} />
        </Frame>
    );
};
