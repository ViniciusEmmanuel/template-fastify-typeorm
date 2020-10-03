import {
  createConnection,
  getConnectionOptions,
  ConnectionOptions,
  Connection,
} from 'typeorm';

export default new (class ConnectionDB {
  private instances: Connection[] = [];

  private readonly logging = process.env.NODE_ENV === 'development';

  public async start() {
    const defaultOptions = await getConnectionOptions();

    const connection = await createConnection({
      ...defaultOptions,
      logging: this.logging,
    });

    this.instances.push(connection);
  }

  public async close() {
    const closeConnections = this.instances.map(connection =>
      connection.close(),
    );

    await Promise.all(closeConnections);
  }

  public async setConnection(name: string, options: ConnectionOptions) {
    if (this.getConnection(name)) return;

    const connection = await createConnection({
      name,
      ...options,
      logging: this.logging,
    });

    this.instances.push(connection);
  }

  public getConnection(name: string) {
    return this.instances.find(connection => connection.name === name);
  }
})();
