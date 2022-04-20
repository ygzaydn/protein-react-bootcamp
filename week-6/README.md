# Protein React Bootcamp Week-3 Homework

This repo represents my solution for week-3 homework.

In order to make repo works, first step you have to is to create a ```.env.local``` file and add your keys to it. (I hide my public/private keys for protection issues.)

An example `.env.local` file as follows:

```
REACT_APP_PUBLIC_KEY = xxxxxxxxxxxxx
REACT_APP_PRIVATE_KEY = xxxxxxxxxx
REACT_APP_ENCODED_KEY = xxxxxxxxx
```

> Please note that ENCODED_KEY has to be generated for MarvelAPI. The algoritm to generate it `digest(paste0(ts, privateKey, publicKey), algo="md5")`. I use ts parameter as "1". You can use [this link](https://www.md5hashgenerator.com/) to generate your own key. And please do not proceed before generate `.env.local` file.

After you set your `.env.local` file, next step is to install npm packages with `npm i`. Now you are ready to start.

You can reach my solution [here](https://marvelheroes0001.web.app)

## Snapshots

-   Desktop

![desktop](./desktop.gif)

-   Tablet

![tablet](./tablet.gif)

