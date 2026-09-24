// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { CategoriesWithVisitorCountDataParser, ICategoriesWithVisitorCountData } from '../Data/CategoriesWithVisitorCountDataParser';

export type CategoriesWithVisitorCountMessageType = {
    data: ICategoriesWithVisitorCountData;
};

export class CategoriesWithVisitorCountMessage implements IIncomingPacket<CategoriesWithVisitorCountMessageType> {
    public parse(wrapper: IMessageDataWrapper): CategoriesWithVisitorCountMessageType {
        return { data: CategoriesWithVisitorCountDataParser(wrapper) };
    }
}
