import { useConfigValue } from '#base/context/system';
import { Box, TemplateWindow } from '#base/theme';

/**
 * A development aid for the window templates: `ui.templates.preview` names a template
 * (`<library>/<asset>`), which is drawn as its XML stands - no code behind it - at the top left of
 * the desktop, so its layout, lists and scrolling can be checked against the client's. Nothing is
 * drawn while the key is unset.
 */
export const TemplatePreviewView = () => {
    const id = useConfigValue<string>('ui.templates.preview');

    if (!id) return null;

    return (
        <Box layout={{ position: 'absolute', left: 40, top: 40 }}>
            <TemplateWindow id={id} />
        </Box>
    );
};
