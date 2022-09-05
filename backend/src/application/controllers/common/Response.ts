export class Response<T> {
  data: T;

  constructor() {}

  async run(fun: () => Promise<T>) {
    this.data = await fun();
    return this;
  }
}
