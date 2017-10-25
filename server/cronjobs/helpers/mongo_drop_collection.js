const dropMongoCollection = (db, copyCollection) => {
    return new Promise(
        (resolve, reject) => {
            db.collection(copyCollection).drop()
                .then(
                    (result) => {
                        console.log(`Initial drop of collection ${copyCollection} successful.`)
                    }
                )
                .catch(
                    (err) => {
                        console.log(`Initial drop of collection ${copyCollection} failed.`)
                    }
                )
            resolve(db)
        }
    )
}

module.exports = dropMongoCollection