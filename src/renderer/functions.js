import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import {Tanglestash, Errors} from 'tanglestash'

momentDurationFormatSetup(moment);


export default {
    tanglestash(provider, seed) {
        // TODO: Later allow to also be able to use the datatype 'string'
        return new Tanglestash(provider, 'file', seed);
    },
    handleErrors(err) {
        let customErrorMessage = '';
        switch (err.name) {
            case new Errors.IncorrectPasswordError().name:
                customErrorMessage = 'The provided password is not correct!';
                break;
            case new Errors.IncorrectDatatypeError().name:
                customErrorMessage = 'The provided datatype does not exist!';
                break;
            case new Errors.IncorrectTransactionHashError().name:
                customErrorMessage = 'The provided entry-hash is not valid!';
                break;
            case new Errors.NodeOutdatedError().name:
                customErrorMessage = 'The provided node is outdated!';
                break;
            case new Errors.MalformedPersistedDataError().name:
                customErrorMessage = 'The data behind the provided entry-hash is malformed!';
                break;
            default:
                if (err.message.includes('Invalid Response')) {
                    customErrorMessage = 'A connection to the provided node could not be established!';
                } else {
                    customErrorMessage = 'An unidentified error occured!';
                }
                break;
        }
        console.error(customErrorMessage, err);
        return customErrorMessage;
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
