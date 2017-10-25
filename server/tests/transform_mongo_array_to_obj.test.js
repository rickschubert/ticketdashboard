const expect = require("expect")
const transformArrayToObj = require("./../routes/helpers/transform_mongo_array_to_obj.js")

describe("transform_mongo_array_to_obj.js", () => {
    it("Should combine an array of several count objects into one single " +
       "object pairing the status (key) and the amount (value)", () => {
        expect(
            transformArrayToObj(
                [
                    {
                        "_id" : "closed",
                        "Count" : 107.0
                    },
                    {
                        "_id" : "open",
                        "Count" : 33.0
                    }
                ]
            )
        )
        .toEqual(
            {
                "closed": 107.0,
                "open": 33.0
            }
        )
    })

})