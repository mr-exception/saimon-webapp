import Storage from "storage/Storage";

export default abstract class Entity<T> {
  constructor(private _storage: Storage, private _table_name: string) {}
  public id?: number;
  public isEqual(entity: Entity<T>): boolean {
    // if one of hosts is not stored in storage
    if (this.id === undefined || entity.id === undefined) return false;
    return entity.id === this.id;
  }
  abstract getFormattedObject(): T;
  /**
   * stores current entity in storage and sets/resets the id
   */
  public async store(): Promise<boolean> {
    this.id = await this._storage
      .getTable(this._table_name)
      .put(this.getFormattedObject());
    return true;
  }
  /**
   * updates the current entity is storage
   */
  public async update(): Promise<boolean> {
    if (!this.id) return false;
    await this._storage
      .getTable(this._table_name)
      .update(this.id, this.getFormattedObject());
    return true;
  }
  /**
   * deletes the current entity in storage
   */
  public async delete(): Promise<boolean> {
    if (!this.id) return false;
    await this._storage.getTable(this._table_name).delete(this.id);
    return true;
  }
  /**
   * checks if it's stored on storage or not
   */
  public isStored(): boolean {
    return this.id !== undefined;
  }
}
