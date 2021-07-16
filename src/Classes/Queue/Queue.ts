export default class Queue<T> {
  private items: T[] = [];
  public push(value: T) {
    this.items.push(value);
    this._next();
  }
  private async _next() {
    if (!this._started) {
      return;
    }
    if (this._working) {
      return;
    }
    if (this.isEmpty()) {
      return;
    }
    const value = this.pull();
    if (!value) {
      return;
    }
    try {
      this._working = true;
      await this._handle(value);
    } catch {}
    this._working = false;
    this._next();
  }
  public pull(): T | undefined {
    if (this.items.length === 0) {
      return undefined;
    } else {
      const value = this.items[0];
      this.items = this.items.slice(1);
      return value;
    }
  }
  public size(): number {
    return this.items.length;
  }
  public isEmpty(): boolean {
    return this.size() === 0;
  }

  private _started = false;
  private _working = false; // when a job in queue is running

  public start() {
    this._started = true;
    this._next();
  }
  public stop() {
    this._started = false;
  }

  public constructor(
    private _name: string,
    private _handle: (job: T) => Promise<boolean>
  ) {
    console.log(`[queue] started ${this._name}`);
  }
}
