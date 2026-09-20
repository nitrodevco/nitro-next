/**
 * `wired_setup.uibuilder.styles.VolterYellowWiredStyle` with its template
 * `wired_style_volter_yellow_xml` - see `createVolterLightStyle` for what the light volters
 * share. Its frame is the one that takes the yellow frame skin (Flash `style` 2).
 */
import { createVolterLightStyle } from './VolterLightWiredStyle';
import { WiredStyle } from './WiredStyle';

export const VOLTER_YELLOW_WIRED_STYLE: WiredStyle = createVolterLightStyle({
    name: 'volter_yellow',
    frameColor: '#fac200',
    backgroundColor: '#faea7c',
    advancedBackgroundColor: '#f4d25f',
    frameVariant: '2',
});
