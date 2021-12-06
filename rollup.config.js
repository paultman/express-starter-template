import copy from 'rollup-plugin-copy';

export default {
  input: 'client/scripts/tasks.js',
  watch: {
    include: 'client/**',
    clearScreen: false,
  },
  output: { file: 'dist/scripts/tasks.min.js', format: 'iife', sourcemap: 'inline' },
  plugins: [
    copy({
      targets: [{ src: 'client/*.html', dest: 'dist/' }],
    }),
  ],
};
