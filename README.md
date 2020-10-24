# ExcoappJS

## Instructions/README

Open CMD prompt<br>
Navigate to your xampp htdocs folder (Mine is C:\xampp\htdocs, but yours might be different)<br>

git clone https://github.com/jcopedev/ExcoAppJS.git

~~Make sure to also transfer the appconfig.js into this folder, that I gave you on discord~~

Start Xampp (run as administrator) <br>
Start Apache--We don't need SQL ;-) <br>
Navigate to: localhost/excoappjs/excoapp<br>
The index.html should come automatically <br>
Try posting--don't say anything mean, because we'll actually be able to see it in the database <br>
Try deleting something in the limited timeline, it will prompt you to sign up --~~not implemented yet.~~<br>
Navigate to authentication<br>
sign up either with google or email password.<br> 
Use real credentials It should redirect you to your user profile with a "full timeline" <br>
That's all I have so far, and nothing is set in stone, but some features I'm very attached to.<br>

<br>
pages: <br>
http://localhost/excoappjs/excoapp <br>
http://localhost/excoappjs/excoapp/limitedtimeline.html <br>
http://localhost/excoappjs/excoapp/authenticate.html<br>

<span>
GitHub Commands:
1. Adding project to the Github Instructions:

  Resource: https://www.softwarelab.it/2018/10/12/adding-an-existing-project-to-github-using-the-command-line/

  1. Open GitBash
  2. Type 'cd ' and then drag the project folder for which you want to save versions of. This will bring the gitbash to that directory
  3. Type 'git init'
  4. Type 'git add .'
  5. Type 'git commit -m "message"'
  6. Type 'git remote add origin "remote repository URL"'
  7. Type 'git push -u origin master'
</span>

<span>
2. Commiting the project to the existing repo

  1. Open the folder where the project resides and open Git Bash
  2. Type 'git Status' to see the changes
  3. Type 'git add .' to stage the changes
  4. Type 'git commit -m "message"' to commt
  5. Type 'git push origin master' to push the changes
  </span>
