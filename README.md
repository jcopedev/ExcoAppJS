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
<br>
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
  
  # Documentation:<br>
**index.html:**<br> 
This is where a user goes when they visit the root domain. There is an input text area so they can test the way the site works. Once they have visited once, they will be redirected to the limited timeline, unless they are a user, then they will be directed to the user profile.<br>
**app:js**<br>
The javascript file for index.html. This has the javascrip for allowing users to make a post as well as the session data.
**limitedtimeline.html**(might be changed to visitortimeline.html)<br>
A user can read the timeline here, but they can't make anymore posts or delete posts. If they try to delete, they will be encouraged to sign up using a modal with a link to the authentication page.<br>
**limitedtimeline.js**<br>
This is almost a duplicate of fulltimeline.js, with the added wrinkle that delete is disabled (see above) it might be possible to merge these two timeline files into a single file that is smart enough to tell when a person is logged in or not logged in<br>
**authenticate.html**<br>
Here the user is able to sign up or sign into his account. A feature that I thought would be interesting to add would be to change the formatting slightly if we know the person is a non-user, but it might be too much work.<br>
**authenticate.js**<br>
Handles the authentication. Mostly provided by firebase. It redirects a user to their usertimeline.html after they have authenticated.<br>
**usertimeline.html**<br>
This is the main timeline of the site. A user can read the posts, delete the posts, and also has a input box so they can post to the timeline at any time. The input box follows them as they scroll. It has infinite scroll and it gets slightly red as you get further to the bottom. All posts that have not been deleted will show up here, they are organized from oldest at the top, newest at the bottom.<br>
**fulltimeline.js** (might be turned into usertimeline.js)<br>
All the javascript to create the timeline. Including loading posts, deleting and adjusting posts, and the input post tool<br>
**userprofile.html**<br>
This is rest of the user profile, other than the timeline. Things found here include the user profile pic--editor, bio, a place for the user's analytics, a place to send feedback<br>
**userprofile.js**<br>
The javascript that handles the user profile functionality. Allows user to update and read bio, picture, and displays analytics for user.<br>
**upcoming files**<br>
hall of fame, analytics, advertiserprofile, etc.<br>
