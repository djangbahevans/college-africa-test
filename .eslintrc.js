module.exports = {
  root: true,
  extends: ["universe/native", "universe/shared/typescript-analysis"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        // '@typescript-eslint/no-unsafe-assignment': 'off',
        // '@typescript-eslint/no-unsafe-call': 'off',
        // '@typescript-eslint/no-unsafe-member-access': 'off'
      },
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
};
