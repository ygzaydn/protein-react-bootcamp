# Protein React Bootcamp Week-2 Homework

This repo represents my solution for week-2 homework.

In order to make repo works, first step you have to is to create a ```.env.local``` file and add your keys to it. (I hide my public/private keys for protection issues.)

An example `.env.local` file as follows:

```
REACT_APP_PUBLIC_KEY = xxxxxxxxxxxxx
REACT_APP_PRIVATE_KEY = xxxxxxxxxx
REACT_APP_ENCODED_KEY = xxxxxxxxx
```

> Please note that ENCODED_KEY has to be generated for MarvelAPI. The algoritm to generate it `digest(paste0(ts, privateKey, publicKey), algo="md5")`. I use ts parameter as "1". You can use [this link](https://www.md5hashgenerator.com/) to generate your own key. And please do not proceed before generate `.env.local` file.

After you set your `.env.local` file, next step is to install npm packages with `npm i`. Now you are ready to start.

Some key features that I've add:

-   I have used hash implementation. Every page has different hash value (for page 1: localhost:3000/#1, overall structure localhost:3000/#<pagenumber>). By doing that, I allow users to surf around desired page. (e.g localhost:3000/#53 directly goes to page 53.)
-   I have set sessionStorage to prevent unnecessary fetches.
-   I have used sessionStorage to keep maximum number of elements that API serves us. By doing it, I am able to track maximum number of pages dynamically.
-   I have simulated skeleton loading. When client ask data from server, users will see gray background until operation is successful.
-   I also used Google's firebase hosting service for lazy fingers. :smile: You can reach [the website here](https://bootcampweektwo.web.app)

