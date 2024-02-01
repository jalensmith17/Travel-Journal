<h1>Travel Journal API</h1>

<h2>API Description</h2>

<p>This app allows you to document journals about your own trips as a user. The API uses the functions of Node.JS, Express, and MongoDB. Users are able to create journals and look at past journals made.</p>

<h2>Installing the API</h2>
<ol>
  <li>Make a directory in your computer using the command line</li>
  <liInitialize an empty git repository with git init</li>
  <li>Create server.js, .env, and .gitignore files in your api</li>
  <li>Input npm init -y into the command line</li>
  <li>Install these packages with command - npm i express dotenv crypt jsonwebtoken mongoose</li>
  <li>Install developer packages with command - npm i -D nodemon jest supertest</li>
  <li>Enter code . in the command line to open your code software of choice</li>
  <li>Go into the package.json file —> add “dev”: “nodemon” & "test": "jest" to the scripts section.</li>
  <li>Within your .env file add your unique MongoDB connection string.</li>
    <li>Create a hash by visiting SHA256. Then put JWT.SECRET= **yourhash** into your .env file</li>
    <li>Create routes, controllers & models folders in your directory
</li>
    <li>Create JavaScript files in each of the folders for the user and journal entries</li>
    <li>Create app.js and server.js files in the directory
</li>
    <li>Open your browser and create a new repository on GitHub. Attach the empty repository to the newly created one on GitHub.
</li>
    <li>Go back to the terminal
</li>
    <li>Enter these commands in order
      <br>
      git add -A
      <br>
      git commit -m "first commit"
      <br>
      git remote add origin (your newly created repository link)
      <br>
      git branch -M main
      <br>
      git push -u origin main
  </ol>