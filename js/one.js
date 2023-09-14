function generateRandomOrderNumber() {
    const validNumbers = "0123456789"; // الأرقام الصحيحة
    let orderNumber = "";

    for (let i = 0; i < 15; i++) {
        const randomIndex = Math.floor(Math.random() * validNumbers.length);
        orderNumber += validNumbers.charAt(randomIndex);
    }

    return orderNumber;
}

function showPopup() {
    const popup = document.getElementById("popAlert");
    popup.classList.add("active");

    if (popup.classList.contains("active")) {
        const orderNumberPopup = document.getElementById("orderNumberPopup");
        const amountPopup = document.getElementById("amountPopup");
        const descriptionPopup = document.getElementById("descriptionPopup");
        orderNumberPopup.textContent = generateRandomOrderNumber();
        amountPopup.textContent = "100"; 
        descriptionPopup.textContent = "برجاء حفظ رقم الاوردر."; 
    }
}

        let lastClickTime = parseInt(sessionStorage.getItem("lastClickTime")) || 0;
        document.getElementById("submit").addEventListener("click", function () {
            const currentTime = Date.now();
            if (currentTime - lastClickTime < 1200000) { 
                var errorMessage = document.getElementById("error-message");
                    errorMessage.classList.remove("hidden");
                    setTimeout(function () {
                        errorMessage.classList.add("hidden");
                    }, 4250);
                return;
            }
            lastClickTime = currentTime;
            sessionStorage.setItem("lastClickTime", lastClickTime.toString());
            const orderNumber = document.getElementById("orderNumberPopup").textContent;
            const amount = document.getElementById("amountPopup").textContent;
            const senderNumber = document.querySelector(".rightNUM").value;
            const senderName = document.querySelector(".leftNAME").value;
            const screenshotFile = document.getElementById("screenshot").files[0];
            if (!senderNumber || !senderName || !screenshotFile) {
                var errorMessage = document.getElementById("error-message");
                errorMessage.classList.remove("hidden");
                setTimeout(function () {
                    errorMessage.classList.add("hidden");
                }, 4250); 
                return;
            }
            const webhookUrl = "https://discord.com/api/webhooks/1151636236381986837/UIQs5t1qB0aihaYyIhiOvdsAGOTJGjrk5nkK0NbcThf5VEHI4bSiJwEwGAF4a1Y94QZb";
            const formData = new FormData();
            formData.append("content",
                `\`\`\`ansi
Order Number: [2;34m[1;34m[1;31m[1;31m[1;31m[1;31m[1;31m[1;31m${orderNumber}[0m[1;31m[0m[1;31m[0m[1;31m[0m[1;31m[0m[1;31m[0m[1;34m[0m[2;34m[0m
Amount: [2;31m[1;31m${amount} L.E[0m[2;31m[0m
Sender Name: [2;31m[1;31m${senderName}[0m[2;31m[0m
Sender Number: [2;31m[1;31m${senderNumber}[0m[2;31m[0m\`\`\``);
            if (screenshotFile) {
                formData.append("file", screenshotFile);
            }
        
            fetch(webhookUrl, {
                method: "POST",
                body: formData,
            })
            .then(response => {
                if (response.ok) {
                    var successMessage = document.getElementById("success-message");
                    successMessage.classList.remove("hidden");
                    setTimeout(function () {
                        successMessage.classList.add("hidden");
                    }, 10000); 
                    return;
                } else {
                    var errorMessage = document.getElementById("error-message");
                    errorMessage.classList.remove("hidden"); 
                    setTimeout(function () {
                        errorMessage.classList.add("hidden");
                    }, 4250);
                }
            })
            .catch(error => {
                console.error("error when sending data!",);
            });
        });

        const closePopupButton = document.getElementById("CLLS");
        closePopupButton.addEventListener("click", function () {
            setTimeout(function () {
                const popup = document.getElementById("popAlert"); 
                popup.style.display = "none";
            }, 0); 
        });