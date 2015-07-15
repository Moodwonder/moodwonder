# moodwonder
MoodWonder


##Instructions

    npm install
    npm start to run locally

Bundling with webpack

    npm run build runs webpack will run configurations within webpack.config.js.
    npm run watch runs webpack --watch to watch and recompile for changes.

<<<<<<< HEAD
Setting up your Database

MongoDB

    Run queries given in the file 'engagementAreas' before starting the application.
    
=======
>>>>>>> 788dc873782d89edae554fb7b294008d8e77f170

Configuration 

    Create a file secrets.js inside server/config and put the following lines,
    module.exports = {
        db: 'mongodb://localhost/moodwonder',
        sessionSecret: 'Your Session Secret goes here',
        portnumber: PORT_NUMBER 
    };
    Replace PORT_NUMBER with your port number
