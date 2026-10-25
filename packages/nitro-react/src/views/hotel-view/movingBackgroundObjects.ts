/**
 * `MovingBackgroundObjects` and its `BackgroundObject`s: up to 20 bitmaps the reception moves about
 * behind its widgets, each from one hotel variable - `landing.view.bgobject.<n>`, or under the
 * background schedule's code `landing.view.<code>.bgobject.<n>` - as `<image>;<type>;<args...>`:
 *
 * - `line` (`LinearMovingBackgroundObject`): `startX;startY;speedX;speedY`, in pixels a millisecond;
 *   `y` counts from the bottom of the desktop. Back to the start once it has left the way it moves.
 * - `randomwalk` (`RandomWalkMovingBackgroundObject`): `startX;startY;speedX;speedY;jitterX;jitterY;interval`,
 *   in pixels a second; every `interval` ms a new random drift up to the jitter, eased into.
 * - `spiral` (`SpiralMovingBackgroundObject`): `startRadius;startAngle;radiusSpeed;angleSpeed;centerX;centerY`,
 *   circling a centre while the radius changes, turning faster and drawn larger as it closes in.
 * - `animated` (`StaticAnimatedBackgroundObject`): `frameCount;fps;x;y;triggerIds` - a frame strip
 *   (`<image>1.png` ...) that plays once, and again each time one of the listed objects starts its
 *   path over (`PathResetEvent`), holding its last frame between.
 *
 * Images are the image library's: under `reception/`, except a random walk's. An object is drawn as
 * `moving_object_floating`, a bitmap the size of its image (13x25 until that loads). This module is
 * the objects' arithmetic only; the reception draws and drives them.
 */

/** What a frame's update reads about where the objects are drawn. */
export interface MovingObjectStage {
    /** `moving_objects_container`'s size: the reception's, which follows the window. */
    width: number;
    height: number;
    /** `container.desktop.height`. */
    desktopHeight: number;
    random: () => number;
}

/** What an object asks its bitmap to be: its image, and the window's rect (`null` size: the image's own). */
export interface MovingObjectSprite {
    asset: string;
    x: number;
    y: number;
    width: number | null;
    height: number | null;
}

/** `moving_object_floating`'s size before its image has loaded. */
export const MOVING_OBJECT_DEFAULT_SIZE = { width: 13, height: 25 };

/** `MovingBackgroundObjects.MAX_OBJECTS`. */
export const MAX_MOVING_OBJECTS = 20;

/** AS3's `int(...)`: towards zero, and 0 for what is not a number. */
const int = (value: string | undefined) => Math.trunc(Number(value)) || 0;
const num = (value: string | undefined) => Number(value);

export abstract class MovingBackgroundObject {
    public readonly sprite: MovingObjectSprite;

    constructor(public readonly id: number, asset: string) {
        this.sprite = { asset, x: 0, y: 0, width: null, height: null };
    }

    /**
     * One frame, `dt` milliseconds on. `size` is the image's native size once it has loaded; `reset`
     * tells the other objects this one started its path over.
     */
    public abstract update(dt: number, stage: MovingObjectStage, size: { width: number; height: number } | undefined, reset: (id: number) => void): void;

    /** `PathResetEvent`: another object started over. */
    public onPathReset(_id: number): void {}

    /** The bitmap's drawn size: its image's, or the layout's until that loads, unless the object set one. */
    protected drawnSize(size: { width: number; height: number } | undefined) {
        const native = size ?? MOVING_OBJECT_DEFAULT_SIZE;

        return { width: this.sprite.width ?? native.width, height: this.sprite.height ?? native.height };
    }

    /** The movers' test: gone past the edge it is moving towards. */
    protected leftTheStage(speedX: number, speedY: number, stage: MovingObjectStage, size: { width: number; height: number } | undefined) {
        const { width, height } = this.drawnSize(size);
        const { x, y } = this.sprite;

        return ((speedX > 0) && (x > stage.width)) || ((speedX < 0) && ((x + width) < 0)) || ((speedY > 0) && (y > stage.height)) || ((speedY < 0) && ((y + height) < 0));
    }
}

export class LinearMovingBackgroundObject extends MovingBackgroundObject {
    private readonly startX: number;
    private readonly startY: number;
    private readonly speedX: number;
    private readonly speedY: number;
    private posX: number;
    private posY: number;

    constructor(id: number, fields: string[], imageLibrary: string) {
        super(id, `${imageLibrary}reception/${fields[0]}.png`);

        this.startX = int(fields[2]);
        this.startY = int(fields[3]);
        this.speedX = num(fields[4]);
        this.speedY = num(fields[5]);
        this.posX = this.startX;
        this.posY = this.startY;
    }

    public update(dt: number, stage: MovingObjectStage, size: { width: number; height: number } | undefined, reset: (id: number) => void): void {
        this.posX += dt * this.speedX;
        this.posY += dt * this.speedY;
        this.sprite.x = Math.trunc(this.posX);
        this.sprite.y = Math.trunc(this.posY + stage.desktopHeight);

        if (!this.leftTheStage(this.speedX, this.speedY, stage, size)) return;

        this.posX = this.startX;
        this.posY = this.startY;
        reset(this.id);
    }
}

/** `§_-Xz§.lerp(t, a, b)`. */
const lerp = (t: number, a: number, b: number) => (t * (b - a)) + a;

export class RandomWalkMovingBackgroundObject extends MovingBackgroundObject {
    private readonly startX: number;
    private readonly startY: number;
    private readonly speedX: number;
    private readonly speedY: number;
    private readonly jitterX: number;
    private readonly jitterY: number;
    private readonly interval: number;
    private posX: number;
    private posY: number;
    private total = 0;
    private lastChange = 0;
    private previousX = 0;
    private previousY = 0;
    private currentX = 0;
    private currentY = 0;

    constructor(id: number, fields: string[], imageLibrary: string) {
        super(id, `${imageLibrary}${fields[0]}.png`);

        this.startX = int(fields[2]);
        this.startY = int(fields[3]);
        this.speedX = num(fields[4]);
        this.speedY = num(fields[5]);
        this.jitterX = num(fields[6]);
        this.jitterY = num(fields[7]);
        this.interval = int(fields[8]);
        this.posX = this.startX;
        this.posY = this.startY;
    }

    public update(dt: number, stage: MovingObjectStage, size: { width: number; height: number } | undefined, reset: (id: number) => void): void {
        this.total += dt;

        if ((this.total - this.lastChange) > this.interval) {
            this.previousX = this.currentX;
            this.previousY = this.currentY;
            this.currentX = ((stage.random() * 2) - 1) * this.jitterX;
            this.currentY = ((stage.random() * 2) - 1) * this.jitterY;
            this.lastChange = this.total;
        }

        const t = (this.total - this.lastChange) / this.interval;

        this.posX += (dt / 1000) * (this.speedX + lerp(t, this.previousX, this.currentX));
        this.posY += (dt / 1000) * (this.speedY + lerp(t, this.previousY, this.currentY));
        this.sprite.x = Math.trunc(this.posX);
        this.sprite.y = Math.trunc(this.posY);

        if (!this.leftTheStage(this.speedX, this.speedY, stage, size)) return;

        this.posX = this.startX;
        this.posY = this.startY;
        reset(this.id);
    }
}

export class SpiralMovingBackgroundObject extends MovingBackgroundObject {
    private readonly startRadius: number;
    private readonly radiusSpeed: number;
    private readonly angleSpeed: number;
    private readonly centerX: number;
    private readonly centerY: number;
    private radius: number;
    private angle: number;

    constructor(id: number, fields: string[], imageLibrary: string) {
        super(id, `${imageLibrary}reception/${fields[0]}.png`);

        this.startRadius = int(fields[2]);
        this.angle = int(fields[3]);
        this.radiusSpeed = num(fields[4]);
        this.angleSpeed = num(fields[5]);
        this.centerX = num(fields[6]);
        this.centerY = num(fields[7]);
        this.radius = this.startRadius;
    }

    public update(dt: number, _stage: MovingObjectStage, size: { width: number; height: number } | undefined, reset: (id: number) => void): void {
        // Both are of the radius before the step: closer in, it turns faster and is drawn larger.
        const ratio = this.startRadius / this.radius;
        const scale = 1 + (ratio / 8);

        this.radius += dt * this.radiusSpeed;
        this.angle += dt * this.angleSpeed * ratio;

        if (size && (this.radius <= 0)) {
            this.radius = this.startRadius;
            this.sprite.width = size.width;
            this.sprite.height = size.height;
            reset(this.id);
        }

        if (this.radius > this.startRadius) {
            this.radius = 0;
            this.sprite.width = 0;
            this.sprite.height = 0;
            reset(this.id);
        }

        if (this.angle < 0) this.angle = Math.PI * 2;
        if (this.angle > (Math.PI * 2)) this.angle = 0;

        this.sprite.x = Math.trunc(this.centerX + (Math.sin(this.angle) * this.radius));
        this.sprite.y = Math.trunc(this.centerY + (Math.cos(this.angle) * this.radius));

        if (size) {
            this.sprite.width = Math.trunc(size.width / scale);
            this.sprite.height = Math.trunc(size.height / scale);
        }
    }
}

export class StaticAnimatedBackgroundObject extends MovingBackgroundObject {
    private readonly imageBase: string;
    private readonly frameCount: number;
    private readonly fps: number;
    private readonly triggers: string[];
    private time = 0;
    private lastReset = 0;

    constructor(id: number, fields: string[], imageLibrary: string) {
        const imageBase = `${imageLibrary}reception/${fields[0]}`;

        super(id, `${imageBase}1.png`);

        this.imageBase = imageBase;
        this.frameCount = int(fields[2]);
        this.fps = int(fields[3]);
        this.sprite.x = int(fields[4]);
        this.sprite.y = int(fields[5]);
        // `String(...).split(",")`: never empty, so the strip always plays from a reset.
        this.triggers = String(fields[6]).split(',');
    }

    public update(dt: number): void {
        // `int(1000 / fps)`: AS3 turns the `Infinity` of no frame rate into 0, which holds the last frame.
        const frameMs = (this.fps > 0) ? Math.trunc(1000 / this.fps) : 0;
        const elapsed = this.time - this.lastReset;
        const frame = (elapsed < (this.frameCount * frameMs)) ? Math.trunc(elapsed / frameMs) : (this.frameCount - 1);

        this.sprite.asset = `${this.imageBase}${frame + 1}.png`;
        this.time += dt;
    }

    public override onPathReset(id: number): void {
        if (this.triggers.includes(String(id))) this.lastReset = this.time;
    }
}

/** `§_-6T§` (`BackgroundObjectType`): the class each type names. */
const OBJECT_TYPES: Record<string, new (id: number, fields: string[], imageLibrary: string) => MovingBackgroundObject> = {
    line: LinearMovingBackgroundObject,
    spiral: SpiralMovingBackgroundObject,
    animated: StaticAnimatedBackgroundObject,
    randomwalk: RandomWalkMovingBackgroundObject,
};

/**
 * `MovingBackgroundObjects.initialize`: the objects the variables name, by their index. A value with
 * no type, or a type it does not know, makes nothing; gaps are fine.
 */
export const createMovingBackgroundObjects = (property: (key: string) => string, timingCode: string, imageLibrary: string): MovingBackgroundObject[] => {
    const objects: MovingBackgroundObject[] = [];

    for (let id = 1; id <= MAX_MOVING_OBJECTS; id++) {
        const value = property(timingCode ? `landing.view.${timingCode}.bgobject.${id}` : `landing.view.bgobject.${id}`);

        if (!value) continue;

        const fields = value.split(';');

        if (fields.length < 2) continue;

        const ObjectType = OBJECT_TYPES[fields[1]];

        if (ObjectType) objects.push(new ObjectType(id, fields, imageLibrary));
    }

    return objects;
};

/** `MovingBackgroundObjects.update`: every object in turn, each reset told to all of them. */
export const updateMovingBackgroundObjects = (objects: readonly MovingBackgroundObject[], dt: number, stage: MovingObjectStage, sizeOf: (object: MovingBackgroundObject) => { width: number; height: number } | undefined) => {
    const reset = (id: number) => {
        for (const object of objects) object.onPathReset(id);
    };

    for (const object of objects) object.update(dt, stage, sizeOf(object), reset);
};
