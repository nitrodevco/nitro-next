import { NavigatorContextProvider } from '#base/context';

import { NavigatorComponent } from './NavigatorComponent';

export const NavigatorWrapper = () => {
    return (
        <NavigatorContextProvider>
            <NavigatorComponent />
        </NavigatorContextProvider>
    );
}
