import { BoxLayout, ContainerButton, Icon, Region, ThemeImage } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `trophyWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutTrophies_1695Layout); each passes its own placement through `layout`.
 */
/** Named region `trophyWidget` of TrophyWidget - configured through the parent's `trophyWidget` prop. */
export interface TrophyWidgetProps extends CatalogWidgetFlags {
    layout?: BoxLayout;
    onCtlgNextmodelButton?: () => void;
    onCtlgPrevmodelButton?: () => void;
    srcCtlgTeaserimg1?: string;
}

export const TrophyWidget = ({ layout, onCtlgNextmodelButton, onCtlgPrevmodelButton, srcCtlgTeaserimg1 }: TrophyWidgetProps) => {
    return (
        <Region
            name="trophyWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                src={srcCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 127 }}
            />
            <ContainerButton
                variant="3"
                name="ctlg_prevmodel_button"
                onPointerTap={onCtlgPrevmodelButton}
                layout={{ position: 'absolute', right: 200, width: 30, top: 96, height: 30, maxWidth: 100 }}
            >
                <Icon
                    variant="2"
                    name="icon"
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 9, width: 13, top: 8, height: 13 }}
                />
            </ContainerButton>
            <ContainerButton
                variant="3"
                name="ctlg_nextmodel_button"
                onPointerTap={onCtlgNextmodelButton}
                layout={{ position: 'absolute', right: 140, width: 30, top: 96, height: 30, maxWidth: 100 }}
            >
                <Icon
                    variant="3"
                    name="icon"
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 9, width: 13, top: 8, height: 13 }}
                />
            </ContainerButton>
        </Region>
    );
};
