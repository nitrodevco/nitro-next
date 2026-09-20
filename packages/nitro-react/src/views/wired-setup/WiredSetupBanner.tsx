/**
 * The banner behind the title and the header of the illumina frame - the `wired_banner`
 * container of `illumina_light_frame_wired` (the skin the style's frame, style 102, uses), which
 * `FramePreset.fixHeight` sizes through its `wired_header_bg` tag to the header's height plus
 * the frame's top margin and one `sectionSpacing`.
 *
 * Inside it, as the skin lays them out: `illumina_wired_bg_left` at the top left at 10%, a black
 * wash at 10% over the whole banner, and `illumina_wired_bg_right` held to the right edge, 19px
 * above the banner's top, at 12%. The banner clips what falls outside it.
 */
import { Box, LayoutImage, Region, ThemeImage } from '#base/theme';

/** Both banner bitmaps are 240x160. */
const BANNER_BITMAP_WIDTH = 240;

export interface WiredSetupBannerProps {
    width: number;
    height: number;
}

export const WiredSetupBanner = ({ width, height }: WiredSetupBannerProps) => (
    <Box layout={{ position: 'absolute', left: 1, top: 1, width, height, overflow: 'hidden' }}>
        <ThemeImage
            src={LayoutImage('window-manager/illumina_wired_bg_left.png')}
            alpha={0.1}
            layout={{ position: 'absolute', left: 0, top: 0 }}
        />
        <Region
            backgroundColor="#000000"
            alpha={0.1}
            layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}
        />
        <ThemeImage
            src={LayoutImage('shared/illumina_wired_bg_right.png')}
            alpha={0.12}
            layout={{ position: 'absolute', left: width - BANNER_BITMAP_WIDTH, top: -19 }}
        />
    </Box>
);
