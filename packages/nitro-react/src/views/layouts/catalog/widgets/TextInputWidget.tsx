import { BoxLayout, Region, ThemeText } from '#base/theme';

/**
 * Catalog widget `textInputWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (TextInputWidgetLayout); each passes its own placement through `layout`.
 */
/** Named region `textInputWidget` of TextInputWidget - configured through the parent's `textInputWidget` prop. */
export interface TextInputWidgetProps {
    captionInputText?: string;
    layout?: BoxLayout;
}

export const TextInputWidget = ({ captionInputText, layout }: TextInputWidgetProps) => {
    return (
        <Region
            name="textInputWidget"
            params={16}
            layout={{ position: 'absolute', ...layout }}
        >
            <Region
                name="input_text"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 229, top: 0, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionInputText ?? 'lorem ipsum'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 229 }}
                />
            </Region>
        </Region>
    );
};
