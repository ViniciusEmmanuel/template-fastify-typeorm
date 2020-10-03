import Server from '@infra/Server/index';

(async (): Promise<void> => {
  const server = new Server();

  await server.init();

  server.start();
})();
