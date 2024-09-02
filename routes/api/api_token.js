// Retrieve the OAuth2 access token from Discord's API
function api_token(app) {
    app.post("/api/token", async (req, res) => {
        // Exchange the code for an access token
        const response = await fetch(`https://discord.com/api/oauth2/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                client_id: process.env.DISCORD_CLIENT_ID, // Owner ID
                client_secret: process.env.DISCORD_CLIENT_SECRET, // Owner secret
                grant_type: "authorization_code",
                code: req.body.code,
            }),
        });

        // Retrieve the access_token from the response
        const { access_token } = await response.json();

        // Return the access_token to our client as { access_token: "..."}
        res.send({ access_token });
    });
}

module.exports = api_token;
