const transformMiliseondsToDaysAndHours = (milliseconds) => {
    if (milliseconds === undefined) {
        return {error: "No value was given."}
    } else if (typeof milliseconds !== "number") {
        return {error: "A string was passed in, not a number."}
    }

    //Get days
    const days = milliseconds / (1000*60*60) / 24
    const absoluteDays = Math.floor(days)
    const d = absoluteDays > 9 ? absoluteDays : `0${absoluteDays}`
    
    //Get remainder from days and convert to hours
    const hours = (days - absoluteDays) * 24
    const absoluteHours = Math.floor(hours)
    const h = absoluteHours > 9 ? absoluteHours : `0${absoluteHours}`
    
    //Get remainder from hours and convert to minutes
    const minutes = (hours - absoluteHours) * 60
    const absoluteMinutes = Math.floor(minutes)
    const m = absoluteMinutes > 9 ? absoluteMinutes : `0${absoluteMinutes}`
    
    //Get remainder from minutes and convert to seconds
    const seconds = (minutes - absoluteMinutes) * 60
    const absoluteSeconds = Math.floor(seconds)
    const s = absoluteSeconds > 9 ? absoluteSeconds : `0${absoluteSeconds}`
    
    return `${d}:${h}:${m}:${s}`
}

module.exports = transformMiliseondsToDaysAndHours