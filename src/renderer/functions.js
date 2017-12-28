import {
    IncorrectPasswordError,
    IncorrentDatatypeError,
    IncorrectTransactionHashError,
    NodeOutdatedError,
} from 'tanglestash'


export default {
    handleErrors(err) {
        // TODO: Switch to modal error messages
        switch (err.name) {
            case new IncorrectPasswordError().name:
                console.error("The provided password is not correct!", err.message);
                break;
            case new IncorrentDatatypeError().name:
                console.error("The provided datatype does not exist!", err.message);
                break;
            case new IncorrectTransactionHashError().name:
                console.error("The provided entry-hash is not valid!", err.message);
                break;
            case new NodeOutdatedError().name:
                console.error("The provided node is outdated!", err.message);
                break;
            default:
                console.error("An unidentified error occured!", err);
                break;
        }
    },
};
