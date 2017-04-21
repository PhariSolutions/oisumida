function showVal(value) {
    // 1m, 15m, 30m, 1h, 2h, 4h, 8h, 12h, 24h, 48h
    let ref = ["1m", "15m", "30m", "1h", "2h", "4h", "8h", "12h", "24h", "48h"];
    document.getElementById("formTTLtext").innerHTML = ref[value];
}

function submitForm() {
    var file = document.querySelector('input[type=file]').files[0];
    post = {
        text: document.getElementById("formText").value,
        b64image: null,
        loc: myLoc,
        ttl: document.getElementById("formTTL").value
    };
    if (file) {
        var reader = new FileReader();
        reader.addEventListener("load", function () {
            post.b64image = reader.result;
            sendNew(post);
            document.getElementById("postForm").reset();
        }, false);
        reader.readAsDataURL(file);
    } else {
        sendNew(post);
        document.getElementById("postForm").reset();
    }
}