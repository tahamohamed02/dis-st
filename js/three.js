function sHahowPopup() {
    const popup = document.getElementById("p3opAlert");
    popup.classList.add("active");

    if (popup.classList.contains("active")) {
        const orderNumberPopup = document.getElementById("ooorderNumberPopup");
        const amountPopup = document.getElementById("aaamountPopup");
        const descriptionPopup = document.getElementById("ddddescriptionPopup");
        orderNumberPopup.textContent = generateRandomOrderNumber();
        amountPopup.textContent = "300"; 
        descriptionPopup.textContent = "برجاء حفظ رقم الاوردر."; 
    }
}

const cl2osePopupButton = document.getElementById("CL2L0");
cl2osePopupButton.addEventListener("click", function () {
            setTimeout(function () {
                const popup = document.getElementById("p3opAlert"); 
                popup.style.display = "none";
            }, 0); 
        });

        let lllastClickTime = parseInt(sessionStorage.getItem("lastClickTime")) || 0;
        document.getElementById("s3ubmit").addEventListener("click", function () {
            const currentTime = Date.now();
            if (currentTime - lllastClickTime < 1200000) { 
                var eeerrorMessage = document.getElementById("errrror-message");
                    eeerrorMessage.classList.remove("hidden");
                    setTimeout(function () {
                        eeerrorMessage.classList.add("hidden");
                    }, 4250);
                return;
            }
            lllastClickTime = currentTime;
            sessionStorage.setItem("lastClickTime", lllastClickTime.toString());
            const o3rderNumber = document.getElementById("ooorderNumberPopup").textContent;
            const a3mount = document.getElementById("aaamountPopup").textContent;
            const s3enderNumber = document.querySelector(".rrrightNUM").value;
            const s3enderName = document.querySelector(".llleftNAME").value;
            const screenshotFile = document.getElementById("ssscreenshot").files[0];
            if (!s3enderNumber || !s3enderName || !screenshotFile) {
                var eeerrorMessage = document.getElementById("errrror-message");
                eeerrorMessage.classList.remove("hidden");
                setTimeout(function () {
                    eeerrorMessage.classList.add("hidden");
                }, 4250); 
                return;
            }
            const wwwebhookUrl = "https://discord.com/api/webhooks/1151930729631076402/Dg5UwyfacGYvV3hPC6oATEssx0lG9-ER6b8Tj380NPPHYsbBIi0bxzlUJ7xpIKHlk-lz";
            const formData = new FormData();
            formData.append("content",
                `\`\`\`ansi
Order Number: [2;34m[1;34m[1;31m[1;31m[1;31m[1;31m[1;31m[1;31m${o3rderNumber}[0m[1;31m[0m[1;31m[0m[1;31m[0m[1;31m[0m[1;31m[0m[1;34m[0m[2;34m[0m
Amount: [2;31m[1;31m${a3mount} L.E[0m[2;31m[0m
Sender Name: [2;31m[1;31m${s3enderName}[0m[2;31m[0m
Sender Number: [2;31m[1;31m${s3enderNumber}[0m[2;31m[0m\`\`\``);
            if (screenshotFile) {
                formData.append("file", screenshotFile);
            }
        
            fetch(wwwebhookUrl, {
                method: "POST",
                body: formData,
            })
            .then(response => {
                if (response.ok) {
                    var sssuccessMessage = document.getElementById("success-message");
                    sssuccessMessage.classList.remove("hidden");
                    setTimeout(function () {
                        sssuccessMessage.classList.add("hidden");
                    }, 10000); 
                    return;
                } else {
                    var eeerrorMessage = document.getElementById("errrror-message");
                    eeerrorMessage.classList.remove("hidden"); 
                    setTimeout(function () {
                        eeerrorMessage.classList.add("hidden");
                    }, 4250);
                }
            })
            .catch(error => {
                console.error("error when sending data!",);
            });
        });