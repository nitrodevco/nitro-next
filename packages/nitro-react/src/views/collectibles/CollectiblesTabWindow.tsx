/**
 * One tab's container of the hub's layout (`collectible_view.xml`), drawn on its own where the
 * layout places it in the window: `refresh` shows the selected tab's container, which its tab's code
 * (`CollectionsTab`, `ShopTab`, ...) fills by finding its windows inside it.
 */
import { Box, findTemplateChild, TemplateBindings, TemplateWindow, TemplateWindowProps, useTemplate } from '#base/theme';

import { COLLECTIBLES_TEMPLATE } from './collectiblesTemplate';

export interface CollectiblesTabWindowProps {
    /** The tab's container: `collectionsContainer`, `shopContainer`, ... */
    container: string;
    bindings: TemplateBindings;
    arrange?: TemplateWindowProps['arrange'];
}

export const CollectiblesTabWindow = ({ container, bindings, arrange }: CollectiblesTabWindowProps) => {
    const template = useTemplate(COLLECTIBLES_TEMPLATE);
    const element = template && findTemplateChild(template.elements, container);

    if (!element) return null;

    return (
        <Box layout={{ position: 'absolute', left: element.x, top: element.y }}>
            <TemplateWindow
                id={COLLECTIBLES_TEMPLATE}
                part={container}
                bindings={{ '': { visible: true }, ...bindings }}
                arrange={arrange}
            />
        </Box>
    );
};
