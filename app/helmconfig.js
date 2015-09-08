const config = {
  link: [
    // Add to homescreen for Chrome on Android
    { "rel": "icon", "sizes": "192x192", "href": "" },
    { "rel": "stylesheet", "href": "/assets/styles/custom.css" },
    { "rel": "stylesheet", "href": "/assets/styles/bootstrap.min.css" }
  ],
  meta: [
    { "charset": "utf-8" },
    // Setting IE=edge tells Internet Explorer to use the latest engine to render the page and execute Javascript
    { "http-equiv": "X-UA-Compatible", "content": "IE=edge" },
    //  Meta descriptions are commonly used on search engine result pages to display preview snippets for a given page.
    { "name": "description", "content": "A Moodwonder App" },
    // Mobile Safari introduced this tag to let web developers control the viewport's size and scale 
    // The width property controls the size of the viewport, the initial-scale property controls 
    // the zoom level when the page is first loaded
    { "name": "viewport", "content": "width=device-width, initial-scale=1" },
    // Add to homescreen for Chrome on Android
    { "name": "mobile-web-app-capable", "content": "yes" },
    // Add to homescreen for Safari on IOS 
    { "name": "apple-mobile-web-app-capable", "content": "yes" },
    { "name": "apple-mobile-web-app-status-bar-style", "content": "black" },
    { "name": "apple-mobile-web-app-title", "content": "Moodwonder" },
  ]
};

export default config;
