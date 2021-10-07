module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontSize: {
      "m-time-f-s":"var(--m-time-f-s)",
      "m-greetings-f-s":"var(--m-greetings-f-s)",
      "m-button-f-s":"var(--m-button-f-s)",
      "m-quote-f-s":"var(--m-quote-f-s)",
      "m-key-f-s":"var(--m-key-f-s)",
      "m-value-f-s":"var(--m-value-f-s)",
      "m-abbr-f-s":"var(--m-abbr-f-s)",
      "t-time-f-s":"var(--t-time-f-s)",
      "t-greetings-f-s":"var(--t-greetings-f-s)",
      "t-button-f-s":"var(--t-button-f-s)",
      "t-quote-f-s":"var(--t-quote-f-s)",
      "t-key-f-s":"var(--t-key-f-s)",
      "t-value-f-s":"var(--t-value-f-s)",
      "t-abbr-f-s":"var(--t-abbr-f-s)",
      "d-time-f-s":"var(--d-time-f-s)",
      "d-greetings-f-s":"var(d-greetings-f-s)",
      "d-button-f-s":"var(d-button-f-s)",
      "d-quote-f-s":"var(d-quote-f-s)",
      "d-key-f-s":"var(d-key-f-s)",
      "d-value-f-s":"var(d-value-f-s)",
      "d-abbr-f-s":"var(--d-abbr-f-s)",
    },
    extend: {
      backgroundImage: {
        "m-light-main":"url('./assets/mobile/bg-image-daytime.jpg')",
        "m-dark-main":"url('./assets/mobile/bg-image-nighttime.jpg')",
        "t-light-main":"url('./assets/tablet/bg-image-daytime.jpg')",
        "t-dark-main":"url('./assets/tablet/bg-image-nighttime.jpg')",
        "d-light-main":"url('./assets/desktop/bg-image-daytime.jpg')",
        "d-dark-main":"url('./assets/desktop/bg-image-nighttime.jpg')",
        "icon-moon": "url('./assets/desktop/icon-moon.svg')",
        "icon-sun": "url('./assets/desktop/icon-sun.svg')"
      }
    },
  },
  variants: {
    extend: {
      backgroundImage: ["dark"]
    },
  },
  plugins: [],
}
