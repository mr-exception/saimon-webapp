import Key from "../Key/Key";

export default class Message {
  public parts: Buffer[] = [];
  public ciphers: string[] = [];
  constructor(data: Buffer, max_length = 1000) {
    this.generate(data, max_length);
  }
  private generate(data: Buffer, max_length = 1000): void {
    const size = data.length;
    const packats_count = Math.ceil(size / max_length);
    for (let i = 0; i < packats_count; i++) {
      const offset = i * max_length;
      this.parts.push(data.slice(offset, max_length + offset));
    }
  }
  public async encryptPublic(key: Key): Promise<void> {
    this.ciphers = await Promise.all(
      this.parts.map((part) => {
        return new Promise<string>((resolve) => {
          resolve(key.encryptPublic(part));
        });
      })
    );
  }
  public async encryptPrivate(key: Key): Promise<void> {
    this.ciphers = await Promise.all(
      this.parts.map((part) => {
        return new Promise<string>((resolve) => {
          resolve(key.encryptPrivate(part));
          console.log("done!");
        });
      })
    );
  }
  public async decryptPublic(key: Key): Promise<void> {
    this.parts = await Promise.all(
      this.ciphers.map((cipher) => {
        return new Promise<Buffer>((resolve) => {
          resolve(key.decryptPublic(cipher));
        });
      })
    );
  }
  public async decryptPrivate(key: Key): Promise<void> {
    this.parts = await Promise.all(
      this.ciphers.map((cipher) => {
        return new Promise<Buffer>((resolve) => {
          resolve(key.decryptPrivate(cipher));
        });
      })
    );
  }
}
