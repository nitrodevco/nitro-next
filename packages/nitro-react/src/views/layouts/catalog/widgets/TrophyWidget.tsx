import { BoxLayout, ContainerButton, Icon, Region, ThemeImage } from '#base/theme';

/**
 * Catalog widget `trophyWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutTrophies_1610Layout); each passes its own placement through `layout`.
 */
/** Named region `trophyWidget` of TrophyWidget - configured through the parent's `trophyWidget` prop. */
export interface TrophyWidgetProps {
    layout?: BoxLayout;
    onCtlgNextmodelButton?: () => void;
    onCtlgPrevmodelButton?: () => void;
    srcCtlgTeaserimg1?: string;
}

export const TrophyWidget = ({ layout, onCtlgNextmodelButton, onCtlgPrevmodelButton, srcCtlgTeaserimg1 }: TrophyWidgetProps) => {
    return (
        <Region
            name="trophyWidget"
            tags={[ 'EMBEDDED' ]}
            params={16}
            layout={{ position: 'absolute', ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                params={2192}
                src={srcCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <ContainerButton
                variant="3"
                name="ctlg_prevmodel_button"
                params={393233}
                onPointerTap={onCtlgPrevmodelButton}
                layout={{ position: 'absolute', right: 215, width: 30, top: 101, height: 30, maxWidth: 100 }}
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
                params={393233}
                onPointerTap={onCtlgNextmodelButton}
                layout={{ position: 'absolute', right: 120, width: 30, top: 101, height: 30, maxWidth: 100 }}
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
    );
};
