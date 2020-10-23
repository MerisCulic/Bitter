(function () {
    function getBitts() {
        console.log("Occurring every 3 minutes");

        let storeBittsRaw = localStorage.bitts;

        let lastBittId = null;
        let storedBitts = null;

        if (storeBittsRaw) {
            storedBitts = JSON.parse(storeBittsRaw);
            lastBittId = storedBitts[0].id;
        };

        fetch("https://bitter-web-app.herokuapp.com//get-all-bitts?lastid="+lastBittId)
        .then(function(response) {
            return response.text();
        })
        .then(function(text) {
            console.log(text);

            let response = JSON.parse(text);

            if(response.synced) {
                console.log("Synced!");
            } else {
                localStorage.bitts = text;
                storedBitts = JSON.parse(text);
            }

            let container = document.getElementById("bittsContainer");
            container.innerHTML = "";

            for(let bitt of storedBitts) {
                let bittElement = document.createElement("p");
                bittElement.innerHTML = bitt.text + "<br> <small>" + bitt.username + "</small>";

                container.appendChild(bittElement);
            }
        })

        .catch(function(error) {
            console.log("Request failed", error);
        });
    }




    getBitts();

    setInterval(getBitts, 180*1000);
}())
