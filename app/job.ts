export const Sizes = ['free', 'small', 'big', 'giant'];
export const Frequencies = ['daily', 'hourly', 'every 10 minutes'];

declare var _;

export class Job {

  constructor(
    public id: number,
    public cmd: string,
    public size: string,
    public frequency: string,
    public nextDue: Date,
    public lastRun: Date
  ) {

  }

  clone() {
    return new Job(this.id, this.cmd, this.size,
        this.frequency, this.nextDue, this.lastRun);
  }
}
