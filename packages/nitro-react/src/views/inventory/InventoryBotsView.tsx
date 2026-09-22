/**
 * The inventory's bots page - the `bots` region of `inventory_xml` (Flash `bots/BotsView`). The
 * port neither requests nor stores the bot inventory, and every element of the region is that
 * data: the `grid` (0,0 274x256) and the `preview_container` (280,0 190x261) with the bot's
 * name, image, description and `place_button`. So the page is the empty region; Flash shows the
 * loading or empty container over it until the list arrives (`BotsView.updateContainerVisibility`).
 */
import { Region } from '#base/theme';

export const InventoryBotsView = () => <Region layout={{ position: 'absolute', left: 0, top: 0, width: 468, bottom: 0 }} />;
