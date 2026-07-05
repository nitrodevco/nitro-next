import { AvatarImage } from './AvatarImage';

export class PlaceHolderAvatarImage extends AvatarImage {
    public override isPlaceholder(): boolean {
        return true;
    }
}
