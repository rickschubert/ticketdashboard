const expect = require("expect")
const transformMiliseondsToDaysAndHours = require("./../routes/helpers/transform_miliseconds_to_days_and_hours.js")

describe("transform_miliseconds_to_days_and_hours.js", () => {
    it("Should return error when no value is passed in", () => {
        expect(transformMiliseondsToDaysAndHours()).toEqual(
            {error: "No value was given."}
        )
    })

    it("Should return error when string is passed in", ()=> {
        expect(transformMiliseondsToDaysAndHours("hallo")).toEqual(
            {error: "A string was passed in, not a number."}
        )
    })

    it("Should return correctly transformed string giving days, hours, " +
       "minutes and seconds when a number of miliseconds is passed in", () => {
        expect(transformMiliseondsToDaysAndHours(1435134556123)).toEqual(
            "16610:08:29:16"
        )
    })
})