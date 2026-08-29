import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

import { MainWindow_1503LayoutMainContent, MainWindow_1503LayoutMainContentProps } from './MainWindow_1503LayoutMainContent';

/** Generated from `1503_main_window_xml` (layout "main_window", 275x105) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MainWindow_1503LayoutProps {
    captionInfoText?: string;
    layout?: BoxLayout;
    mainContent?: MainWindow_1503LayoutMainContentProps;
    onClose?: () => void;
    onOpenEditCtgsBut?: () => void;
    srcOpenEditCtgs?: string;
    tintOpenEditCtgs?: string;
}

export const MainWindow_1503Layout = ({ captionInfoText, layout, mainContent, onClose, onOpenEditCtgsBut, srcOpenEditCtgs, tintOpenEditCtgs }: MainWindow_1503LayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="friendlist_window"
            name="friendlist_window"
            caption={t('friendlist.friends')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 275, height: 105, ...layout }}
        >
            <MainWindow_1503LayoutMainContent {...mainContent} />
            <Region
                name="footer"
                layout={{ position: 'absolute', left: 5, width: 210, top: 44, height: 30 }}
            >
                <ContainerButton
                    variant="0"
                    name="open_edit_ctgs_but"
                    onPointerTap={onOpenEditCtgsBut}
                    layout={{ position: 'absolute', left: 0, width: 90, top: 7, height: 20 }}
                >
                    <ThemeImage
                        name="open_edit_ctgs"
                        src={srcOpenEditCtgs}
                        tint={tintOpenEditCtgs}
                        layout={{ position: 'absolute', left: 5, width: 10, top: 5, height: 10 }}
                    />
                    <Region layout={{ position: 'absolute', left: 20, width: 100, top: 3, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        {t('friendlist.settings')}
                    </Region>
                </ContainerButton>
                <Region
                    name="info_text"
                    layout={{ position: 'absolute', left: 100, right: 0, top: 11, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfoText ?? 'PH Info'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};
