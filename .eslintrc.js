module.exports = {
  root: true,
  extends: ["universe/native", "universe/shared/typescript-analysis"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
      },
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
};
