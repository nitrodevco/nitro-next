import { useNavigatorHandler } from '#base/handlers';
import { useNavigatorVisibility } from '#base/hooks';
import { NavigatorViewPixi } from '#base/views-pixi/navigator/NavigatorViewPixi';

export const NavigatorComponent = () => {
    const { isNavigatorVisible } = useNavigatorVisibility();

    // handler lives inside the provider so it can write to the navigator store
    useNavigatorHandler();

    if (!isNavigatorVisible) return null;

    return <NavigatorViewPixi />;
};
