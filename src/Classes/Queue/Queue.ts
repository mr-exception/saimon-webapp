export default class Queue<T> {
  private items: T[] = [];
  public push(value: T) {
    this.items.push(value);
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
}
