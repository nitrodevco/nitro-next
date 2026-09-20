/**
 * `wired_setup.uibuilder.styles.VolterBlueWiredStyle` with its template
 * `wired_style_volter_blue_xml` - see `createVolterLightStyle` for what the light volters share.
 */
import { createVolterLightStyle } from './VolterLightWiredStyle';
import { WiredStyle } from './WiredStyle';

export const VOLTER_BLUE_WIRED_STYLE: WiredStyle = createVolterLightStyle({
    name: 'volter_blue',
    frameColor: '#7da9b5',
    backgroundColor: '#c7d0d4',
    advancedBackgroundColor: '#b1b9bd',
    frameVariant: '0',
});
