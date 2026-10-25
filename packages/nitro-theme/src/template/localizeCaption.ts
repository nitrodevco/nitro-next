/**
 * `TextController.set text`: a caption that starts with `${` is the text of the key up to the first
 * `}` (`slice(2, indexOf("}"))` - with no `}`, the last character is dropped, which is how a layout's
 * unclosed `${key ` still finds its key); any other caption shows as it is, a `${...}` inside it
 * included - a player's note or gift message is never read as a text key.
 */
export const localizeCaption = (caption: string | undefined, resolveText: (text: string) => string): string => {
    if (!caption?.startsWith('${')) return caption ?? '';

    return resolveText(`\${${caption.slice(2, caption.indexOf('}'))}}`);
};
