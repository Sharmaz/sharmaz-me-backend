import { mergeConfig, defineConfig } from 'vitest/config';
import base from './vitest.config.base.mjs';

export default mergeConfig(base, defineConfig({
  test: {
    include: ['tests/unit/**/*.unit.test.js'],
    coverage: {
      reportsDirectory: './coverage/unit',
      include: [
        'src/db/**', 'src/libs/**', 'src/middlewares/**',
        'src/routes/**', 'src/services/**', 'src/utils/**',
      ],
    },
  },
}));
