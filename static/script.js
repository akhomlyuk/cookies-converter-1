var prettyPrint = true;

function convert () {
    let cookies = [];
    let cookiesInput = document.getElementById('inputCookies');
    let cookiesOutput = document.getElementById('outputCookies');
    let lines = cookiesInput.value.split("\n");

    lines.forEach(function(line, i) {
        var tokens = line.split("\t");

        if (tokens.length == 7) {
            let cookie = {};

            tokens = tokens.map(function(e) { return e.trim(); });

            cookie.domain = tokens[0];
            cookie.httpOnly = tokens[1] === "TRUE";
            cookie.path = tokens[2];
            cookie.secure = tokens[3] === "TRUE";

            let timestamp = tokens[4];
            if (timestamp.length == 17) {
            	timestamp = Math.floor(timestamp / 1000000 - 11644473600);
            }
            cookie.expirationDate = parseInt(timestamp);
            cookie.name = tokens[5];
            cookie.value = tokens[6];
            cookies.push(cookie);
        }    
    });

    if (prettyPrint) {
        cookiesOutput.value = JSON.stringify(cookies, null, 2);
    } else {
        cookiesOutput.value = JSON.stringify(cookies);
    }
    cookiesOutput.focus();
    cookiesInput.value = '';
}