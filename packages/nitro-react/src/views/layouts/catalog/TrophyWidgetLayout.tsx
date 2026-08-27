import { BoxLayout, ContainerButton, Icon, Region, ThemeImage } from '#base/theme';

/** Generated from `1623_trophyWidget_xml` (layout "trophyWidget", 110x127) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TrophyWidgetLayoutProps {
    layout?: BoxLayout;
    onCtlgNextmodelButton?: () => void;
    onCtlgPrevmodelButton?: () => void;
    srcCtlgTeaserimg1?: string;
}

export const TrophyWidgetLayout = ({ layout, onCtlgNextmodelButton, onCtlgPrevmodelButton, srcCtlgTeaserimg1 }: TrophyWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 110, height: 127, ...layout }}>
            <Region
                name="trophyWidget"
                params={16}
                layout={{ position: 'absolute', left: 28, width: 110, top: 75, height: 127 }}
            >
                <ThemeImage
                    name="ctlg_teaserimg_1"
                    params={16}
                    src={srcCtlgTeaserimg1}
                    layout={{ position: 'absolute', left: 4, width: 102, top: 0, height: 127 }}
                />
                <ContainerButton
                    variant="3"
                    name="ctlg_prevmodel_button"
                    params={393361}
                    onPointerTap={onCtlgPrevmodelButton}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 56, height: 30, maxWidth: 100 }}
                >
                    <Icon
                        variant="2"
                        name="icon"
                        params={16}
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 9, width: 13, top: 8, height: 13 }}
                    />
                </ContainerButton>
                <ContainerButton
                    variant="3"
                    name="ctlg_nextmodel_button"
                    params={393361}
                    onPointerTap={onCtlgNextmodelButton}
                    layout={{ position: 'absolute', left: 80, width: 30, top: 56, height: 30, maxWidth: 100 }}
                >
                    <Icon
                        variant="3"
                        name="icon"
                        params={16}
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 9, width: 13, top: 8, height: 13 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};
