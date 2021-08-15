export class Project {
    constructor(
      public id: number,
      public name: string,
      public des: string,
      public startDate: Date,
      public endDate: Date,
      public status: string,
      public creater: string
    ) {
    }
  }