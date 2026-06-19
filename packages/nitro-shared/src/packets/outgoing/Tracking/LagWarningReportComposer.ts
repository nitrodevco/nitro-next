import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type LagWarningReportComposerType = {
  warningCount: number;
};

export class LagWarningReportComposer implements IOutgoingPacket<LagWarningReportComposerType>
{
  public constructor(private params: LagWarningReportComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.warningCount,
    ];
  }
}
