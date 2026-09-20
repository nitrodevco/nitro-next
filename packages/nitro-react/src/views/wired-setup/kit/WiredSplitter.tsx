/**
 * `wired_setup.uibuilder.presets.SplitterPreset` - the style's `ruler_view` across the width it
 * is given: illumina's etched two-pixel line, a single dark pixel elsewhere. Every section
 * starts with one.
 */
import { Box, Region } from '#base/theme';

import { useWiredDisabled, wiredDisabledAlpha } from './useWiredDisabled';
import { useWiredFillLayout } from './useWiredFillLayout';
import { useWiredStyle } from './WiredStyleContext';

export const WiredSplitter = () => {
    const { ruler } = useWiredStyle().templates;
    const fillLayout = useWiredFillLayout();
    const disabled = useWiredDisabled();

    return (
        <Box layout={{ flexDirection: 'column', height: ruler.height, flexShrink: 0, ...fillLayout }}>
            {ruler.lines.map((line, index) => (
                <Region
                    key={index}
                    backgroundColor={line.color}
                    alpha={wiredDisabledAlpha(disabled, line.alpha)}
                    layout={{ height: 1, alignSelf: 'stretch' }}
                />
            ))}
        </Box>
    );
};
