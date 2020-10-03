import Pino from 'pino';

export default new (class Logger {
  private logger: Pino.Logger;

  private readonly enable =
    process.env.NODE_ENV?.toUpperCase() === 'DEVELOPMENT';

  constructor() {
    this.logger = Pino({
      enabled: this.enable,
      prettyPrint: true,
    });
  }

  public info(object: object, message: string, ...args: any[]) {
    this.logger.info(object, message, args);
  }

  public error(object: object, message: string, ...args: any[]) {
    this.logger.error(object, message, args);
  }

  public fatal(object: object, message: string, ...args: any[]) {
    this.logger.fatal(object, message, args);
  }

  public warn(object: object, message: string, ...args: any[]) {
    this.logger.warn(object, message, args);
  }
})();
