# tanglesta.sh
The Electron app implementing my project [Tanglestash](https://github.com/loehnertz/Tanglestash)


## Download

You can download the application directly from GitHub.
It is available for Windows, macOS and Linux.
Get the latest release v1.0.0 right **[here](https://github.com/loehnertz/tanglesta.sh/releases/tag/v1.0.0)**.


## Usage

After starting the application you might first want to setup your node provider.
This is pre-set to `localhost` which means that you would need to run
[IRI](https://github.com/iotaledger/iri) (the node software) on your own computer.

A tutorial to setup a node can be found here:
https://iota.readme.io/v1.2.0/docs/install-iri or http://iota.partners/

At least for retrieving you could also use a node providing service for the public from here: https://iota.dance/nodes

After setting everything up you can either start retrieving a file that
was persisted in the past using its 'entry-hash' or persist a new file onto the tangle!

Here's an entry-hash to test the application. It's the logo of the app so you need to save it as a `.png` file. It's not encrypted.
```
JJSIJGGRUSBLBMWDVUHRCHRRCMWLB9ZKZPNUMNTRXEDNRRDSMRAURWHAVPCX9RGOXDBSKJSZERIRA9999
```


## Features

- Works on Windows, macOS and Linux
- Persist any data onto the tangle of IOTA
- Retrieve data that was persisted with this module beforehand
- Optionally encrypt your data with a password (via AES)
- Store a string or even a whole file without any prior conversion


## Disclaimer

I know that both the retrieving and persisting to and from the tangle
are painfully slow compared to a traditional HTTP connection.
Keep in mind though that this project is more of a proof-of-concept
rather than a finished product.


License
-------

[MIT](LICENSE)
