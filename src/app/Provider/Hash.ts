import argon2 from 'argon2';
export class Hash {
  private readonly options: argon2.Options & { raw: false } = {
    raw: false,
    saltLength: 8,
  };

  constructor(private Provider = argon2) {}

  public async compare(str: string, hash: string) {
    return this.Provider.verify(hash, str, this.options);
  }

  public async hash(str: string) {
    return this.Provider.hash(str, this.options);
  }
}
