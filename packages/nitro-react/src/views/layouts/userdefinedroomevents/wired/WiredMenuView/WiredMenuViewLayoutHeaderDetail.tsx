import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `header_detail` of WiredMenuViewLayout - configured through the parent's `headerDetail` prop. */
export interface WiredMenuViewLayoutHeaderDetailProps {
    layout?: BoxLayout;
}

export const WiredMenuViewLayoutHeaderDetail = ({ layout }: WiredMenuViewLayoutHeaderDetailProps) => {
    return (
        <Region
            name="header_detail"
            layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 50, ...layout }}
        >
            <ThemeImage
                src={layoutImage('wired_box_lines.png')}
                layout={{ position: 'absolute', left: 8, width: 64, top: 20, height: 51 }}
            />
            <ThemeImage
                src={layoutImage('wired_box_lines.png')}
                layout={{ position: 'absolute', left: 78, width: 64, top: -20, height: 51 }}
            />
            <ThemeImage
                src={layoutImage('wired_box_lines.png')}
                layout={{ position: 'absolute', left: 148, width: 64, top: 20, height: 51 }}
            />
            <ThemeImage
                src={layoutImage('wired_box_lines.png')}
                layout={{ position: 'absolute', left: 218, width: 64, top: -20, height: 51 }}
            />
            <ThemeImage
                src={layoutImage('wired_box_lines.png')}
                layout={{ position: 'absolute', left: 288, width: 64, top: 20, height: 51 }}
            />
            <ThemeImage
                src={layoutImage('wired_box_lines.png')}
                layout={{ position: 'absolute', left: 358, width: 64, top: -20, height: 51 }}
            />
            <ThemeImage
                src={layoutImage('wired_box_lines.png')}
                layout={{ position: 'absolute', left: 428, width: 64, top: 20, height: 51 }}
            />
        </Region>
    );
};
