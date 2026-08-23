import { useOwnUserInfo, useTranslation } from '#base/context';
import { Box, ColorLayer, Frame, TabButton, TabContext, Text } from '#base/theme-pixi';

/**
 * Pixi port of theme/AvatarEditorView.tsx. DOM's own source is itself a stub (a static
 * "test" TabButton, no tab content, no editor UI) - ported at the same stub fidelity rather
 * than inventing the missing editor. `sex` is destructured in DOM but never used; dropped
 * here rather than copied as dead code.
 */
export const AvatarEditorViewPixi = () => {
    const { name } = useOwnUserInfo();
    const t = useTranslation();

    return (
        <Frame
            id="avatar-editor"
            resizeDirection="y"
            variant="3"
            layout={{ position: 'absolute', top: 20, left: 20, width: 490, height: 484 }}
            caption={t('avatareditor.title')}
        >
            <Box layout={{ position: 'relative', width: '100%', height: 110, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <ColorLayer color="#0e3f52" />
                <Text
                    text={name}
                    textStyle="text-style-headline-big"
                    textOptions={{ fill: '#ffffff', fontSize: 28 }}
                />
            </Box>
            <TabContext>
                <TabButton>test</TabButton>
            </TabContext>
        </Frame>
    );
};
