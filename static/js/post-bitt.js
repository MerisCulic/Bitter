(function () {
    let bittSubmit = document.getElementById("bittSubmit");

    bittSubmit.addEventListener("click", function(){
        let username = document.getElementById("usernameBittInput").value;
        let text = document.getElementById("textBittArea").value;

        let jsonData = JSON.stringify({"username": username, "text": text});

        fetch("https://bitter-web-app.herokuapp.com/create-bitt", {
                method: 'post',
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: jsonData
            })
            .then(response => response.json())
            .then(function (bitt) {
                let container = document.getElementById("bittsContainer");

                let bittElement = document.createElement("p");
                bittElement.innerHTML = bitt.text + "<br> <small>" + bitt.username + "</small>";

                container.prepend(bittElement);

                let storedBitts = JSON.parse(localStorage.bitts);
                storedBitts.unshift(bitt);
                localStorage.bitts = JSON.stringify(storedBitts);

                document.getElementById("createBittModal").click();
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
    });

}())