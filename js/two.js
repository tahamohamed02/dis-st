function sHhowPopup() {
    const popup = document.getElementById("p2opAlert");
    popup.classList.add("active");

    if (popup.classList.contains("active")) {
        const orderNumberPopup = document.getElementById("oorderNumberPopup");
        const amountPopup = document.getElementById("aamountPopup");
        const descriptionPopup = document.getElementById("dddescriptionPopup");
        orderNumberPopup.textContent = generateRandomOrderNumber();
        amountPopup.textContent = "200"; 
        descriptionPopup.textContent = "برجاء حفظ رقم الاوردر."; 
    }
}

const cl1osePopupButton = document.getElementById("CL2LS");
cl1osePopupButton.addEventListener("click", function () {
            setTimeout(function () {
                const popup = document.getElementById("p2opAlert"); 
                popup.style.display = "none";
            }, 0); 
        });








        let llastClickTime = parseInt(sessionStorage.getItem("lastClickTime")) || 0;
        document.getElementById("s2ubmit").addEventListener("click", function () {
            const currentTime = Date.now();
            if (currentTime - llastClickTime < 1200000) { 
                var eerrorMessage = document.getElementById("errror-message");
                    eerrorMessage.classList.remove("hidden");
                    setTimeout(function () {
                        eerrorMessage.classList.add("hidden");
                    }, 4250);
                return;
            }
            llastClickTime = currentTime;
            sessionStorage.setItem("lastClickTime", llastClickTime.toString());
            const o2rderNumber = document.getElementById("oorderNumberPopup").textContent;
            const a2mount = document.getElementById("aamountPopup").textContent;
            const s2enderNumber = document.querySelector(".rrightNUM").value;
            const s2enderName = document.querySelector(".lleftNAME").value;
            const screenshotFile = document.getElementById("sscreenshot").files[0];
            if (!s2enderNumber || !s2enderName || !screenshotFile) {
                var eerrorMessage = document.getElementById("errror-message");
                eerrorMessage.classList.remove("hidden");
                setTimeout(function () {
                    eerrorMessage.classList.add("hidden");
                }, 4250); 
                return;
            }
            const wwebhookUrl = "https://discord.com/api/webhooks/1151930729631076402/Dg5UwyfacGYvV3hPC6oATEssx0lG9-ER6b8Tj380NPPHYsbBIi0bxzlUJ7xpIKHlk-lz";
            const formData = new FormData();
            formData.append("content",
                `\`\`\`ansi
Order Number: [2;34m[1;34m[1;31m[1;31m[1;31m[1;31m[1;31m[1;31m${o2rderNumber}[0m[1;31m[0m[1;31m[0m[1;31m[0m[1;31m[0m[1;31m[0m[1;34m[0m[2;34m[0m
Amount: [2;31m[1;31m${a2mount} L.E[0m[2;31m[0m
Sender Name: [2;31m[1;31m${s2enderName}[0m[2;31m[0m
Sender Number: [2;31m[1;31m${s2enderNumber}[0m[2;31m[0m\`\`\``);
            if (screenshotFile) {
                formData.append("file", screenshotFile);
            }
        
            fetch(wwebhookUrl, {
                method: "POST",
                body: formData,
            })
            .then(response => {
                if (response.ok) {
                    var ssuccessMessage = document.getElementById("success-message");
                    ssuccessMessage.classList.remove("hidden");
                    setTimeout(function () {
                        ssuccessMessage.classList.add("hidden");
                    }, 10000); 
                    return;
                } else {
                    var eerrorMessage = document.getElementById("errror-message");
                    eerrorMessage.classList.remove("hidden"); 
                    setTimeout(function () {
                        eerrorMessage.classList.add("hidden");
                    }, 4250);
                }
            })
            .catch(error => {
                console.error("error when sending data!",);
            });
        });