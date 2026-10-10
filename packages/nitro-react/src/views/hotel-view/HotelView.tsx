/**
 * `WidgetContainerLayout`: the reception, `landing_view_default_dynamic_layout` (pinned in
 * tools/references/hotel-view.json) at the size of the desktop (`resizeDynamicLayout`), its
 * children following by their own relative scale. The toolbar supplies navigation.
 *
 * - `setBackgroundGraphics`: each background bitmap shown or hidden, and its art, as the background
 *   schedule's timing code picked them (`hotelViewBackgrounds`); before the first code, the layout's
 *   own (`background_hotel_top`'s, the others empty).
 * - `moving_objects_container` holds the moving background objects (`HotelViewMovingObjects`).
 * - `DynamicLayoutManager` builds `dynamic_widget_grid` in `placeholder_dynamic_widget_slots`'
 *   place (`addChildAt` at its index, then `removeChild`): the widget slots (`HotelViewWidgetGrid`).
 * - `WidgetContainer.refresh` puts each fixed widget's window where its `widget_placeholder_<type>`
 *   was and removes the placeholder: `AvatarImageWidget`'s `avatar_image` (moving with the bottom
 *   edge, as its own params say), and the bottom slot's widget (`setupBottomSlotWidgetName`). The
 *   bottom slot takes `landing.view.dynamic.slot.6.widget` when that names a widget the port draws
 *   there (`BOTTOM_SLOT_LANDING_VIEW_WIDGETS`); its windows have no relative scale, so it stays where
 *   the placeholder was in the 822-high layout whatever the desktop's height. Any other bottom slot
 *   type leaves the slot empty.
 * - `hideWarningIfPresent`: the layout editor's `warning` is hidden.
 *
 * Only the default layout is drawn: a hotel naming another in `landing.view.layoutxml` (the custom
 * receptions `resizeCustomLayout` centres) still gets this one.
 */
import { useMemo } from 'react';

import { AvatarImage } from '#base/components/AvatarImage';
import { BOTTOM_SLOT_LANDING_VIEW_WIDGETS, HOTEL_VIEW_BOTTOM_SLOT, hotelViewCommonSettings, hotelViewSlotWidget, useConfigData, useSystemStore } from '#base/context/system';
import { useOwnUserFigure, useOwnUserGender } from '#base/context/user';
import { useViewportSize } from '#base/hooks';
import { findTemplateChild, Template, TemplateBinding, TemplateElement, TemplateItem, TemplateWindow, useTemplateLibrary } from '#base/theme';

import { HotelViewMovingObjects } from './HotelViewMovingObjects';
import { HotelViewSlotWidget } from './HotelViewSlotWidget';
import { HOTEL_VIEW_LIBRARY, hotelViewTemplate, hotelViewTemplateId } from './hotelViewTemplate';
import { useHotelViewWidgetGrid } from './HotelViewWidgetGrid';

const GRID_PLACEHOLDER = 'placeholder_dynamic_widget_slots';
const AVATAR_PLACEHOLDER = 'widget_placeholder_avatarimage';
const BOTTOM_SLOT_PLACEHOLDER = 'widget_placeholder_bottom_slot';

/**
 * The bottom slot's widget window, where the placeholder was: a plain window with no relative
 * scale, as each bottom slot widget's own root is, holding the widget the port draws there.
 */
const bottomSlotHolder = (placeholder: TemplateElement): TemplateElement => ({
    tag: 'container',
    name: BOTTOM_SLOT_PLACEHOLDER,
    x: placeholder.x,
    y: placeholder.y,
    width: placeholder.width,
    height: placeholder.height,
    params: { parentGraphics: true },
    vars: {},
    children: [],
});

export const HotelView = () => {
    const { width, height } = useViewportSize();
    const config = useConfigData();
    const templates = useTemplateLibrary(HOTEL_VIEW_LIBRARY);
    const backgrounds = useSystemStore(x => x.hotelViewBackgrounds);
    const figure = useOwnUserFigure();
    const gender = useOwnUserGender();
    const bottomWidget = hotelViewSlotWidget(config, HOTEL_VIEW_BOTTOM_SLOT);
    const landing = hotelViewTemplate(templates, 'landing_view_default_dynamic_layout');
    const avatarImage = hotelViewTemplate(templates, 'avatar_image');
    const grid = useHotelViewWidgetGrid(templates);
    const content = landing && findTemplateChild(landing.elements, 'content_background');
    const bottomPlaceholder = content && findTemplateChild(content.children, BOTTOM_SLOT_PLACEHOLDER);
    const bottomHolder = useMemo(() => bottomPlaceholder && bottomSlotHolder(bottomPlaceholder), [ bottomPlaceholder ]);

    if (!landing || !content || !avatarImage || !grid) return null;

    const background = (name: string): TemplateBinding | undefined => {
        const state = backgrounds[name];

        return state && { visible: state.visible, ...(state.uri ? { asset: state.uri } : {}) };
    };

    /** `WidgetContainer.refresh`: the widget's window at the placeholder's place, the placeholder gone. */
    const placed = (placeholder: TemplateElement, from: Template | TemplateElement, binding: TemplateBinding): TemplateItem => ({
        key: placeholder.name ?? '',
        from,
        bindings: { '': binding },
        arrange: ({ root }) => {
            root()?.setX(placeholder.x);
            root()?.setY(placeholder.y);
        },
    });

    /** `setupBottomSlotWidgetName`: the bottom slot's widget in the placeholder's place, else the placeholder hidden. */
    const bottomSlot = (placeholder: TemplateElement): TemplateItem => {
        if (!bottomHolder || !BOTTOM_SLOT_LANDING_VIEW_WIDGETS.has(bottomWidget)) return { key: BOTTOM_SLOT_PLACEHOLDER, from: placeholder, bindings: { '': { visible: false } } };

        const widget = (
            <HotelViewSlotWidget
                type={bottomWidget}
                slot={HOTEL_VIEW_BOTTOM_SLOT}
                code={null}
                settings={hotelViewCommonSettings(config)}
            />
        );

        return { key: BOTTOM_SLOT_PLACEHOLDER, from: bottomHolder, bindings: { '': { children: widget } } };
    };

    const items = content.children.map((child, index): TemplateItem => {
        switch (child.name) {
            case GRID_PLACEHOLDER:
                return grid.item;
            case AVATAR_PLACEHOLDER:
                return placed(child, avatarImage, {
                    children: figure && (
                        <AvatarImage
                            figure={figure}
                            gender={gender}
                            direction={2}
                            scale={1}
                        />
                    ),
                });
            case BOTTOM_SLOT_PLACEHOLDER:
                return bottomSlot(child);
            case 'warning':
                return { key: 'warning', from: child, bindings: { '': { visible: false } } };
            case 'moving_objects_container':
                return {
                    key: 'moving_objects_container',
                    from: child,
                    bindings: {
                        '': {
                            children: (
                                <HotelViewMovingObjects
                                    width={width}
                                    height={height}
                                />
                            ),
                        },
                    },
                };
            default: {
                const binding = child.name ? background(child.name) : undefined;

                return { key: child.name ?? String(index), from: child, ...(binding ? { bindings: { '': binding } } : {}) };
            }
        }
    });

    return (
        <TemplateWindow
            id={hotelViewTemplateId('landing_view_default_dynamic_layout')}
            width={width}
            height={height}
            bindings={{ content_background: { items } }}
            arrange={grid.arrange}
        />
    );
};
