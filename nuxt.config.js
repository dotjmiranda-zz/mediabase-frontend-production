module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "Mediabase",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "final year project frontend"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
      /* {
        rel: "stylesheet",
        href:
          "https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css"
      } */
    ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },
  components: true,
  /*
   ** Plugins
   */
  plugins: [
    { src: "~/plugins/time.js" },
    { src: "~/plugins/images.js" },
    { src: "~/plugins/axios.js" }
  ],
  /*
   ** Modules
   */
  buildModules: ["@nuxt/components"],
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "bootstrap-vue/nuxt",
    "@nuxtjs/toast",
    "@nuxtjs/pwa"
  ],
  /*
   ** Axios Config
   */
  axios: {
    /* host: "localhost",
    port: 3000,
    prefix: "/api" */
    proxy: true
  },
  /*
   ** Axios Proxy Config
   */
  proxy: {
    "/api": "http://localhost:3000/",
    "/API": "https://imdb-api.com/en/"
  },
  /*
   ** Axios Authentication Config
   */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "api/users/sign_in",
            method: "post"
          },
          logout: {
            url: "api/users/sign_out",
            method: "delete"
          },
          user: { url: "api/users/current" }
        }
      }
    }
  },
  /*
   ** BootstrapVue
   */
  bootstrapVue: {
    icons: true
  },
  /*
   ** Toasts
   */
  toast: {
    position: "top-center",
    duration: 3000
  },
  /*
   ** PWA
   */
  pwa: {
    meta: {
      name: "Mediabase"
    },
    manifest: {
      name: "Mediabase",
      short_name: "Mediabase"
    }
  }
};
