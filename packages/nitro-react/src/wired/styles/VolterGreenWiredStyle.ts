/**
 * `wired_setup.uibuilder.styles.VolterGreenWiredStyle` with its template
 * `wired_style_volter_green_xml` - see `createVolterLightStyle` for what the light volters share.
 */
import { createVolterLightStyle } from './VolterLightWiredStyle';
import { WiredStyle } from './WiredStyle';

export const VOLTER_GREEN_WIRED_STYLE: WiredStyle = createVolterLightStyle({
    name: 'volter_green',
    frameColor: '#78b090',
    backgroundColor: '#bfd6c9',
    advancedBackgroundColor: '#acc7b7',
    frameVariant: '0',
});
