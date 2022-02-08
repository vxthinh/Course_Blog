module.exports = {
    mutipleMongooseToObject(mongoogse) {
        return mongoogse.map(mongoogse => mongoogse.toObject());
    },
    mongoogseToObject(mongoogse) {
        return mongoogse ? mongoogse.toObject() : mongoogse;
    }
};