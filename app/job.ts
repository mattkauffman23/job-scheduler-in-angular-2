export class Job {

  constructor(
    public id: number,
    public cmd: string,
    public size: Size,
    public frequency: Frequency,
    public nextDue: Date,
    public lastRun: Date
  ) {

  }

  static Sizes = Size;
  static Frequencies = Frequency;

}

enum Size { Free, Small, Medium, Big, Giant };
enum Frequency { Daily, Hourly, TenMinutes };
