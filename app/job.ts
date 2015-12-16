export const Sizes = ['free', 'small', 'big', 'giant'];
export const Frequencies = ['daily', 'hourly', 'every 10 minutes'];

export class Job {

  constructor(
    public id: number,
    public cmd:string = 'rake do_something',
    public size: string = Sizes[0],
    public frequency: string = Frequencies[0],
    public nextDue: Date = new Date(),
    public lastRun: Date = new Date(0)
  ) {

  }

  clone():Job {
    return new Job(
      this.id,
      this.cmd,
      this.size,
      this.frequency,
      this.nextDue,
      this.lastRun);
  }
}
