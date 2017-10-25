const transformArrayToObj = (prevArray) => {
    let newObj = {}
    prevArray.map(
        (doc) => {
            newObj[doc["_id"]] = doc["Count"]
            return newObj
        }
    )
    return newObj
}

module.exports = transformArrayToObj