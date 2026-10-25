/** The logic side of a Variable FX config: only what decides when a status is visible. */
export class VariableFxLogicConfig {
    constructor(
        public configId: number,
        public isUserFx: boolean,
        public showMode: number,
        public showTriggerMask: number,
        public showOnMouseHover: boolean,
        public showDuration: number,
        public updateId: number = 0,
    ) {}
}
