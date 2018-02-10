# tanglesta.sh
The Electron application implementing my project [Tanglestash](https://github.com/loehnertz/Tanglestash)


## Download

You can download the application directly from GitHub.
It is available for Windows, macOS and Linux.
Get the latest release v2.1.0 right **[here](https://github.com/loehnertz/tanglesta.sh/releases/tag/v2.1.0)**.


## Features

- Works on Windows, macOS and Linux
- Persist any data onto the tangle of IOTA
- Retrieve data that was persisted with this application beforehand
- Optionally encrypt your data with a password (via AES)
- Store a whole file without any prior conversion


## Screenshots

### Retrieving:
![Retrieving screen](https://i.imgur.com/99eTfbo.png)

### Persisting:
![Persisting screen](https://i.imgur.com/rgmsvs5.png)

### Settings:
![Settings screen](https://i.imgur.com/xv1jfrh.png)


## Usage

After starting the application you might first want to setup your node provider.\
This is pre-set to `localhost` which means that you would need to run
[IRI](https://github.com/iotaledger/iri) (the node software) on your own computer.\
A tutorial to setup a node can be found here:
https://iota.readme.io/v1.2.0/docs/install-iri or http://iota.partners/ \
\
Although, the easier way is to use a node providing service for the public from here: https://iota.dance/nodes \
After setting everything up you can either start retrieving a file that
was persisted in the past using its `Entry Hash` or persist a new file onto the tangle!\
\
Here's an `Entry Hash` to test the application. It's an image so you need to save it as a `.jpg` file. It's not encrypted.
```
XEBWUNJA9LJDZCEFYDIMU9VGYCUYXMZTWYCKQIYSBGJMDRMPERCWQMHXYXQQSQGMWQVWSQCWOCBG99999
```


## Disclaimer

I know that primarily the persisting to the tangle is painfully slow compared to a traditional HTTP upload.\
Keep in mind though that this project is more of a proof-of-concept rather than a finished product.\
The reason that it takes so long is mainly the current speed of the PoW, which might get faster in the future with new techniques.


## License

[MIT](LICENSE)


## Donations

If you like this application and want to support it, you can of course donate some IOTA 😊 \
`QIFKUOEQBCEV9NKFWDBTQYBHLFFORLVKDQSYDSZQQMKTCBLBFDQMJWIOUDH9DLZXVKGNQGKLSAJCQQMEDESLCTHGZD`
