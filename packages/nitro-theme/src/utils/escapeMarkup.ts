/**
 * Plain text made safe to put in a text field's html markup: `&`, `<` and `>` as their entities,
 * so the text shows as typed rather than being read as tags or entities. (A chat bubble escapes
 * only `<` and `>`, as `HabboFreeFlowChat.fixHtml` does - that is `escapeChatMarkup`, not this.)
 */
export const escapeMarkup = (text: string): string => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
