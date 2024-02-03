<h1>Travel Journal API</h1>

<h2>API Description</h2>

<p>This app allows you to document journals about your own trips as a user. The API uses the functions of Node.JS, Express, and MongoDB. Users are able to create journals and look at past journals made.</p>

<h2>Installing the API</h2>
<ol>
  <li>Make a directory in your computer using the command line</li>
  <liInitialize an empty git repository with git init and clone my repository onto your machine using SSH</li>
  <li>Create a .env file in the directory</li>
  <li>Install the given packages onto your computer with command - npm i</li>
  <li>Enter code . in the command line to open your code software of choice</li>
  <li>Within your .env file add your unique MongoDB connection string (MONGO_URI).</li>
    <li>Add a PORT variable to your .env file. For example, "PORT=3000"</li>
    <li>Create a hash by visiting SHA256. Then put JWT.SECRET= **yourhash** into your .env file</li>
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
    </li>
  </ol>

  <h2>Running Tests via Jest & Supertest</h2>
  <ol>
    <li>Run the server by inputting - npm run dev</li>
    <li>Run the tests by inputting - npm run test
      <br>
      This should return 9 test passing and 0 fails.
    </li>
  </ol>

  <h2>User & Journal Routes</h2>
  <br>
  <h3>User Routes<h3>
  <ol>
    <li>POST router.post('/', userController.createUser)</li>
    <li>POST router.post('/login', userController.loginUser)</li>
    <li>PUT router.put('/:id', userController.updateUser)</li>
    <li>DELETE router.delete('/:id', userController.auth, userController.deleteUser)</li>
  </ol>
  <h3>Journal Routes</h3>
  <ol>
    <li>GET router.get('/', journalController.indexJournal)</li>
    <li>DELETE router.delete('/:id', journalController.deleteJournal)</li>
    <li>PUT router.put('/:id', journalController.updateJournal)</li>
    <li>POST router.post('/', journalController.createJournal)</li>
    <li>GET router.get('/:id', journalController.getJournal)</li>
  </ol>
