import { IMessageDataWrapper, ParseStrings } from '@nitrodevco/nitro-api';

import { ITextPlaceholders } from './ITextPlaceholders';

/** `TextPlaceholders`: an int-counted list of placeholder names, then one of capturer names. */
export const TextPlaceholdersParser = (wrapper: IMessageDataWrapper): ITextPlaceholders => {
    const placeholderNames = ParseStrings(wrapper);
    const capturerNames = ParseStrings(wrapper);

    return { placeholderNames, capturerNames };
};
