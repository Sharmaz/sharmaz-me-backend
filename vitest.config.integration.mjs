import { mergeConfig, defineConfig } from 'vitest/config';
import base from './vitest.config.base.mjs';

export default mergeConfig(base, defineConfig({
  test: {
    include: ['tests/integration/**/*.integration.test.js'],
    fileParallelism: false,
    coverage: {
      reportsDirectory: './coverage/integration',
      include: [
        'src/db/**', 'src/libs/**', 'src/middlewares/**',
        'src/routes/**', 'src/services/**', 'src/utils/**',
      ],
    },
  },
}));
