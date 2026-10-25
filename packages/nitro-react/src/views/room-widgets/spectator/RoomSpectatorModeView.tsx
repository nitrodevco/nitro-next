import { Box, LayoutImage, TemplateBindings, TemplateWindow } from '#base/theme';

/**
 * The spectator's frame - `RoomDesktop.getSpectatorModeVisualization` over
 * `habbo-room-ui-com/spectator_mode_xml`: its eight `spec_*` pieces, stretched by the layout to the
 * room view's size (`createRoomView` sets the container to the view's width and height).
 */
const TEMPLATE = 'habbo-room-ui-com/spectator_mode_xml';

/** `getSpectatorModeVisualization`'s `setBitmap` calls: each named bitmap and the asset it is given. */
const PIECES = [ 'top_left', 'top_middle', 'top_right', 'middle_left', 'middle_right', 'bottom_left', 'bottom_middle', 'bottom_right' ] as const;

const BINDINGS: TemplateBindings = Object.fromEntries(PIECES.map(piece => [ piece, { asset: LayoutImage(`habbo-room-ui-com/spec_${piece}.png`) } ]));

export const RoomSpectatorModeView = ({ width, height }: { width: number; height: number }) => (
    <Box layout={{ position: 'absolute', left: 0, top: 0, width, height }}>
        <TemplateWindow
            id={TEMPLATE}
            width={width}
            height={height}
            bindings={BINDINGS}
        />
    </Box>
);
