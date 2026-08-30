import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `no_results_container` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutNoResultsContainerItemProps {
    layout?: BoxLayout;
}

export const NavigatorFrame2LayoutNoResultsContainerItem = ({ layout }: NavigatorFrame2LayoutNoResultsContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="no_results_container"
            layout={{ width: 388, height: 53, flexShrink: 0, ...layout }}
        >
            <ThemeText
                text={t('navigator.search.returned.no.results')}
                textStyle="text-style-u-headline-medium"
                layout={{ position: 'absolute', right: 51, width: 286, alignSelf: 'center', marginTop: -16, marginBottom: 16, height: 21 }}
            />
        </Region>
    );
};
