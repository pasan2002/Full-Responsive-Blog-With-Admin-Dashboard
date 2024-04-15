
# Blog

This is a Blogging website I created to practice React, NodeJS, MongoDB and Express.


## Documentation
You can clone my github repo to your machine. If you want to publish it with your own information you have to add some files to it first.

1. First you have to  clone project into your machine and open it from your favourite code editor (I use vscode). Then in your terminal type this code. 


## Install nodemodules

Install all npm packages for client side

```bash
  cd itachiblog
  npm install
```

Install all npm packages for server side

```bash
  cd server
  npm install
```
    

2. Now create a new file and name it as .env. Then add your mongoDB url, JWT secret, JWT lifetime. cloudinary cloud name, cloudinary api key and cloudinary api secret.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI` = your mongodb url

`JWT_SECRET` = your jwt secret

`JWT_LIFETIME` = lifetime of your JWT token

`CLOUD_NAME` = name of your cloudinary cloud

`API_KEY` = api key of your cloudinary 

`API_SECRET` = api secret of your cloudinary


3. Now You have to add your own information to the relevant parts.
` Add your social media links to Footer file `

` Add your web3forms access key to Contact file`

` Replace all the axios links "http://localhost:3000" with your server url.`


## Screenshots
You can create a Admin acc and login after login you can create new posts, edit posts, delete posts.Also you can add new members, edit members and delete members.

![App Screenshot](https://res.cloudinary.com/dl9ectnzs/image/upload/v1713151855/Screenshot_2024-04-15_085930_pgq119.png)


![App Screenshot](https://res.cloudinary.com/dl9ectnzs/image/upload/v1713151852/Screenshot_2024-04-15_085659_zmvzyy.png)


![App Screenshot](https://res.cloudinary.com/dl9ectnzs/image/upload/v1713151855/Screenshot_2024-04-15_085930_pgq119.png)


![App Screenshot](https://res.cloudinary.com/dl9ectnzs/image/upload/v1713151851/Screenshot_2024-04-15_090008_ynf5hm.png)


![App Screenshot](https://res.cloudinary.com/dl9ectnzs/image/upload/v1713152018/Screenshot_2024-04-15_090245_cq4cfb.png)

![App Screenshot](https://res.cloudinary.com/dl9ectnzs/image/upload/v1713152017/Screenshot_2024-04-15_090316_tt1z84.png)



## You can use vercel or railway to deploy your blog.
