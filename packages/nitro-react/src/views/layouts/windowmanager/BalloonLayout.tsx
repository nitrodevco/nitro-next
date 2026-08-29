import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1913_balloon_xml` (layout "badge_image", 30x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BalloonLayoutProps {
    layout?: BoxLayout;
    srcBitmap?: string;
}

export const BalloonLayout = ({ layout, srcBitmap }: BalloonLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 30, height: 30, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}>
                <Border
                    variant="107"
                    name="border"
                    tags={[ '_COLORIZE' ]}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                />
                <ThemeImage
                    name="bitmap"
                    tags={[ '_COLORIZE' ]}
                    src={srcBitmap}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                />
            </Region>
        </Region>
    );
};
