import copy from 'rollup-plugin-copy';

export default {
  input: 'client/scripts/index.js',
  watch: {
    include: 'client/**',
    clearScreen: false,
  },
  output: { file: 'dist/scripts/index.min.js', format: 'iife', sourcemap: 'inline' },
  plugins: [
    copy({
      targets: [{ src: 'client/index.html', dest: 'dist/' }],
    }),
  ],
};
