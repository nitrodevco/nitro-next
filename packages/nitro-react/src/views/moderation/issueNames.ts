import { translate } from '#base/context/system';

/** Flash's `moderation/IssueCategoryNames`: the names the issue browser and handler show. */
/** `IssueCategoryNames.getSourceName`. */
export const issueSourceName = (categoryId: number) => {
    switch (categoryId) {
        case 1: case 2: return 'Normal';
        case 3: return 'Automatic';
        case 4: return 'Automatic IM';
        case 5: return 'Guide System';
        case 6: return 'IM';
        case 7: return 'Room';
        case 8: return 'Panic';
        case 9: return 'Guardian';
        case 10: return 'Automatic Helper';
        case 11: return 'Discussion';
        case 12: return 'Selfie';
        case 14: return 'Photo';
        case 15: return 'Ambassador';
        default: return 'Unknown';
    }
};

/**
 * `IssueCategoryNames.getCategoryName`: the topic's `help.cfh.topic.<id>` text when the hotel has one,
 * else Flash's fixed names.
 */
export const issueCategoryName = (topicId: number) => {
    const text = translate(`help.cfh.topic.${topicId}`);

    if (text.length) return text;

    const names: Record<number, string> = {
        0: 'Automatic', 101: 'Sex', 102: 'PII', 103: 'Scam', 104: 'Bullying', 105: 'Disruption', 106: 'Other',
        111: 'Sex', 112: 'Scam', 113: 'Disruption', 114: 'Other', 121: 'Sex', 122: 'PII', 123: 'Bullying', 124: 'Other',
        130: 'Hate', 131: 'Violence', 132: 'Sex', 133: 'Illegal', 134: 'PII', 135: 'Copyright', 136: 'Spam',
        1024: 'Guide', 1025: 'Bullying', 1026: 'Severe Alert',
    };

    return names[topicId] ?? 'Unknown';
};
