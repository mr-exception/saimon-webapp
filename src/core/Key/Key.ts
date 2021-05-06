import NodeRSA from "node-rsa";
export default class Key {
  constructor(private key: NodeRSA) {}

  // encryption using private key

  public encryptPrivate(data: Buffer | string): string {
    if (typeof data === "string")
      return this.key.encryptPrivate(Buffer.from(data), "base64");
    else return this.key.encryptPrivate(data, "base64");
  }
  public decryptPrivate(data: string): Buffer {
    return this.key.decrypt(data, "buffer");
  }

  // encryption using public key

  public encryptPublic(data: Buffer | string): string {
    if (typeof data === "string")
      return this.key.encrypt(Buffer.from(data), "base64");
    else return this.key.encrypt(data, "base64");
  }
  public decryptPublic(data: string): Buffer {
    return this.key.decryptPublic(data, "buffer");
  }

  // export key functions

  public getPublicKey(): string {
    return this.key.exportKey("pkcs8-public");
  }
  public getPrivateKey(): string {
    return this.key.exportKey("pkcs8-private");
  }

  // key generation methods

  public static generateFreshKey(): Key {
    const nodeKey = new NodeRSA({ b: 512 });
    return new Key(nodeKey);
  }
  public static generateKeyByPublicKey(public_key: string): Key {
    const nodeKey = new NodeRSA({ b: 512 });
    nodeKey.importKey(public_key, "pkcs8-public");
    return new Key(nodeKey);
  }
  public static generateKeyByPrivateKey(private_key: string): Key {
    const nodeKey = new NodeRSA({ b: 512 });
    nodeKey.importKey(private_key, "pkcs8-private");
    return new Key(nodeKey);
  }
  public static generateFullKey(public_key: string, private_key: string): Key {
    const nodeKey = new NodeRSA({ b: 512 });
    nodeKey.importKey(private_key, "pkcs8-private");
    nodeKey.importKey(public_key, "pkcs8-public");
    return new Key(nodeKey);
  }
  public static isPublicKey(key: string): boolean {
    return /^-----BEGIN PUBLIC KEY-----.+-----END PUBLIC KEY-----/.test(key);
  }
}
