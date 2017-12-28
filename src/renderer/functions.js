import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format';
import {
    Tanglestash,
    IncorrectPasswordError,
    IncorrentDatatypeError,
    IncorrectTransactionHashError,
    NodeOutdatedError,
} from 'tanglestash'

momentDurationFormatSetup(moment);


export default {
    tanglestash(provider, seed) {
        // TODO: Later allow to also be able to use the datatype 'string'
        return new Tanglestash(provider, 'file', seed);
    },
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
    calculateProgessAndRemainingTime(position, total, markyEntries, timeElapsed) {
        let totalTimeSoFar = 0;
        for (let entry in markyEntries) {
            totalTimeSoFar += parseInt(markyEntries[entry]["duration"]);
        }
        let averageTimePerChunk = (totalTimeSoFar / markyEntries.length);
        let estimatedTotalTime = (averageTimePerChunk * parseInt(total));

        let progressPercentage = parseInt((position / total) * 100);
        let remainingTime = moment.duration((estimatedTotalTime - parseInt(timeElapsed)), 'milliseconds').format('hh:mm:ss', {trim: false});

        return ({
            progressPercentage: isNaN(progressPercentage) ? 0 : progressPercentage,
            remainingTime: remainingTime,
        });
    },
};
