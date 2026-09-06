import { AvatarFigurePartType } from '#api/avatar/enum';

/** A tab the editor can edit: any figure part type, plus the editor-only pets/bots tabs. */
export type AvatarEditorSetType = AvatarFigurePartType | 'pt' | 'mc';
