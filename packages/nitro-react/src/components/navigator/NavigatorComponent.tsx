import { useNavigatorHandler } from '#base/handlers';
import { useNavigatorVisibility } from '#base/hooks';
import { NavigatorView } from '#base/views-pixi/navigator/NavigatorView';

export const NavigatorComponent = () => {
    const { isNavigatorVisible } = useNavigatorVisibility();

    // handler lives inside the provider so it can write to the navigator store
    useNavigatorHandler();

    if (!isNavigatorVisible) return null;

    return <NavigatorView />;
};
