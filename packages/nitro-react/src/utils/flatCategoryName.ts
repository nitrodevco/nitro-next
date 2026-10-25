/**
 * `FlatCategory.visibleName`: a category with a global key is named by
 * `${navigator.flatcategory.global.<key>}`; one without it carries the name the server sent, which
 * is not a key and is shown as it stands.
 */
import { IFlatCategory } from '@nitrodevco/nitro-packets';

export const flatCategoryName = (category: IFlatCategory, t: (key: string) => string) => (category.globalCategoryKey
    ? t(`navigator.flatcategory.global.${category.globalCategoryKey}`)
    : category.nodeName);
