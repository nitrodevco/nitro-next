/**
 * The messenger's message field - the window manager's `IlluminaInputWidget`, drawn from its
 * `illumina_input` template at the messenger's `input_widget` width (232, single line, so the
 * widget's 28 high): a style 105 border, the `input`, the grey `empty_message` while it is empty,
 * and the `submit` button (`widgets.chatinput.say`, the widget's default caption, which the
 * messenger does not replace). The button follows the right edge (its `params`) and fits its
 * caption, and the input fills what is left of it (`refresh`: the button's x less the input's
 * margin on both sides). Enter or the button submits; the handler clears it (`MainView.onInput`
 * sets `message = ""`).
 *
 * Only the messenger's use of the widget is carried: `multiline`, a custom `buttonCaption` and the
 * `properties` API are not set by any messenger layout or code, so they are not props here.
 */
import { useState } from 'react';

import { TemplateWindow, TemplateWindows } from '#base/theme';

const TEMPLATE = 'habbo-window-manager-com/illumina_input_xml';
/** `IlluminaInputWidget.SINGLE_LINE_HEIGHT`. */
const SINGLE_LINE_HEIGHT = 28;

/** `refresh`: the input runs from its margin to the button, with the same margin before it. */
const arrange = ({ find }: TemplateWindows) => {
    const input = find('input');
    const submit = find('submit');

    if (!input || !submit) return;

    input.setWidth(submit.x - (input.x * 2));
};

export interface MessengerInputProps {
    width: number;
    /** `illumina_input:empty_message`, as the layout gives it (a `${key}`, read with `parameters`). */
    emptyMessage: string;
    /** The parameters the messenger registers for its texts (`messenger.window.input.default`'s `friend_name`). */
    parameters: Readonly<Record<string, Record<string, string>>>;
    maxChars: number;
    onSubmit: (message: string) => void;
}

export const MessengerInput = ({ width, emptyMessage, parameters, maxChars, onSubmit }: MessengerInputProps) => {
    const [ message, setMessage ] = useState('');
    const submit = () => {
        onSubmit(message);
        setMessage('');
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            width={width}
            height={SINGLE_LINE_HEIGHT}
            parameters={parameters}
            arrange={arrange}
            bindings={{
                submit: { caption: '${widgets.chatinput.say}', onPointerTap: submit },
                empty_message: { caption: emptyMessage, visible: !message.length },
                input: { caption: message, maxChars, onChange: setMessage, onEnter: submit },
            }}
        />
    );
};
