import jwt from 'jsonwebtoken';

interface ISignIn {
  payload: {};
  id: string;
}

interface IVerify {
  token: string;
}

interface IToken {
  iat: number;
  exp: number;
  sub: string;
}

export class AuthenticateToken {
  private hashEncode: string;

  constructor(private Provider = jwt) {
    if (!process.env.HASH) throw new Error('Hash não definida no arquivo .env');

    this.hashEncode = process.env.HASH;
  }

  public sing({ payload = {}, id }: ISignIn) {
    return this.Provider.sign(payload, this.hashEncode, {
      algorithm: 'HS256',
      subject: id,
      expiresIn: '3d',
    });
  }

  public verify({ token }: IVerify) {
    try {
      const { sub } = this.Provider.verify(token, this.hashEncode) as IToken;

      return { id: sub };
    } catch {
      throw new Error('Invalid token');
    }
  }
}
