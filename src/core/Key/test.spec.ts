import Key from "./Key";

describe("Key class", function () {
  it("should create a fresh key", function () {
    const key = Key.generateFreshKey();
    expect(key).toBeTruthy();
  });
  it("should create a key from given public key string", function () {
    const public_key_string = Key.generateFreshKey().getPublicKey();
    const key = Key.generateKeyByPublicKey(public_key_string);
    expect(key.getPublicKey()).toEqual(public_key_string);
  });
  it("should create a key from given private key string", function () {
    const original_key = Key.generateFreshKey();
    const private_key_string = original_key.getPrivateKey();
    const public_key_string = original_key.getPublicKey();
    const key = Key.generateKeyByPrivateKey(private_key_string);
    expect(key.getPrivateKey()).toEqual(private_key_string);
    expect(key.getPublicKey()).toEqual(public_key_string);
  });
  it("should crypting and decrypting by single key work", function () {
    const key = Key.generateFreshKey();

    const plain = Buffer.from("storm is comming. take shelter!");

    expect(key.decryptPublic(key.encryptPrivate(plain))).toEqual(plain);
  });
  it("should decrypting by given public key work", function () {
    const key = Key.generateFreshKey();
    const pKey = Key.generateKeyByPublicKey(key.getPublicKey());

    const plain = Buffer.from("storm is comming. take shelter!");

    expect(key.decryptPrivate(pKey.encryptPublic(plain))).toEqual(plain);
    expect(pKey.decryptPublic(key.encryptPrivate(plain))).toEqual(plain);
  });
  it("should decrypting by given private key work", function () {
    const key = Key.generateFreshKey();
    const pKey = Key.generateKeyByPrivateKey(key.getPrivateKey());

    const plain = Buffer.from("storm is comming. take shelter!");

    expect(key.decryptPublic(pKey.encryptPrivate(plain))).toEqual(plain);
    expect(pKey.decryptPrivate(key.encryptPublic(plain))).toEqual(plain);
  });
});
