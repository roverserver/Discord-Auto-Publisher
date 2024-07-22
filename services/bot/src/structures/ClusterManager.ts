import { ClusterManager, type ClusterManagerOptions } from 'discord-hybrid-sharding';
import { getFilePaths } from '#utils/fileUtils';
import { logger } from '#utils/logger';

class AutoPublisher extends ClusterManager {
  constructor(options: ClusterManagerOptions) {
    const clientFilePath = getFilePaths('AutoPublisher.js')[0];
    super(clientFilePath, options);
  }

  public start() {
    this._registerEvents();
    this.spawn({ timeout: -1 }) //
      .then(() => {
        logger.info('Clustering complete!');
      });
  }

  private async _registerEvents() {
    this.on('debug', (value) => logger.debug(value));
  }
}

process.on('unhandledRejection', ({ stack }: Error) => logger.error(stack));

export default AutoPublisher;
