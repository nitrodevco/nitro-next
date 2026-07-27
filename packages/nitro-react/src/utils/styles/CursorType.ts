export const CursorType = {
    auto: 'cursor-auto',
    default: 'cursor-default',
    pointer: 'cursor-pointer',
    text: 'cursor-text',
    move: 'cursor-move',
    grab: 'cursor-grab',
    grabbing: 'cursor-grabbing',
    wait: 'cursor-wait',
    help: 'cursor-help',
    notAllowed: 'cursor-not-allowed',
    none: 'cursor-none'
};

export type CursorType = keyof typeof CursorType;
