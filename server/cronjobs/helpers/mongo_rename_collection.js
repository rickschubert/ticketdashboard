const renameCollection = (db, copyCollection, finalCollection) => { // db variable, string, string
    db.collection(finalCollection).drop()
        .then(
            (result) => {
                db.collection(copyCollection).rename(finalCollection)
                    .then((result) => console.log(`${copyCollection} renamed to ${finalCollection}.`))
                    .catch((err) => console.log(`Error in renaming the collection: ${err}`))
            }
        )
        .catch((err) => console.log(`Error in dropping the collection ${finalCollection}: ${err}`))
}

module.exports = renameCollection