const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: {
        runtimeErrors: (error) => {
          const ignoreErrors = [
            "ResizeObserver loop limit exceeded",
            "ResizeObserver loop completed with undelivered notifications.",
          ];
          if (ignoreErrors.includes(error.message)) {
            return false;
          }
          return true;
        },
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/variables.scss";
          @import "@/styles/mixins.scss";
        `,
      },
    },
  },
});
