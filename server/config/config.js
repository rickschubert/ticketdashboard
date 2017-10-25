// Development mode
if (process.env.NODE_ENV !== "PRODUCTION") {
    process.env.PORT = 4000
    process.env.MONGODBINST = ""
    process.env.GITHUB_USERNAME = ""
    process.env.GITHUB_PASSWORD = ""
    process.env.ZENHUB_TOKEN = ""
    process.env.ZENHUB_REPO_ID = ""
}
