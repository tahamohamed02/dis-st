document.addEventListener("DOMContentLoaded", function () {
    const userNameInput = document.getElementById("user-name");
    const userImageInput = document.getElementById("user-image"); 
    const feedbackText = document.getElementById("feedback-text");
    const submitButton = document.getElementById("submit-feedback");
    const successMessage = document.getElementById("success-message"); 
    const webhookURL = 'https://discord.com/api/webhooks/1151930729631076402/Dg5UwyfacGYvV3hPC6oATEssx0lG9-ER6b8Tj380NPPHYsbBIi0bxzlUJ7xpIKHlk-lz';

    submitButton.addEventListener("click", function () {
        const userName = userNameInput.value.trim();
        const feedback = feedbackText.value.trim();
        const currentTime = new Date().getTime(); 
        const formattedTime = new Date().toLocaleString(); 


        if (userName === "" || feedback === "") {
            errorMessage.textContent = 'قم بملء الحقول.';
            errorMessage.classList.remove("hidden");
            setTimeout(function () {
        errorMessage.classList.add("hidden");
    }, 3000);
            return;
        }

        const lastFeedbackTime = localStorage.getItem('lastFeedbackTime');

        if (lastFeedbackTime) {
            const elapsedTime = currentTime - parseInt(lastFeedbackTime);
            const hoursElapsed = elapsedTime / (1000 * 3600); 

            if (hoursElapsed < 0) {
                errorMessage.textContent = 'لقد قمت بإرسال رأيك اليوم بالفعل. حاول مره أخري لاحقًا';
                errorMessage.classList.remove("hidden");
                setTimeout(function () {
        errorMessage.classList.add("hidden");
    }, 3000);
                return;
            }
        }

        localStorage.setItem('lastFeedbackTime', currentTime.toString());

        if (userName !== "" && feedback !== "") {
            const message = {
                content: "",
                embeds: [
                    {
                        author: {
                            name: userName, 
                            icon_url: "https://cdn.discordapp.com/attachments/1151636213124562994/1151729185241452544/ds.png", 
                        },
                        description: `**${feedback}**`,
                        thumbnail: {
                            url: "https://cdn.discordapp.com/attachments/1151636213124562994/1151729185241452544/ds.png",
                        },
                        
                        color: 0x102753,
                        footer: {
                            text: `${formattedTime}`, 
                        },
                    },
                ],
            };
            fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            })
                .then(response => response.text())
                .then(result => {
                    console.log(result);
                    successMessage.classList.remove("hidden");
                    setTimeout(function() {
                        successMessage.classList.add("hidden");
                    }, 5000); 
                })
                .catch(error => console.error('حدث خطأ: ', error));
            userNameInput.value = "";
            feedbackText.value = "";
        }
    });
});





function submitForm() {
    var currentTime = new Date().getTime();
    var lastSubmissionTime = localStorage.getItem("lastSubmissionTime");
    if (lastSubmissionTime && currentTime - lastSubmissionTime < 1200000) {
        var eerrorMessage = document.getElementById("errror-message");
        eerrorMessage.classList.remove("hidden");
        setTimeout(function () {
            eerrorMessage.classList.add("hidden");
        }, 4250);
        return;
    }

    localStorage.setItem("lastSubmissionTime", currentTime);
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var fileInput = document.getElementById("file");
    var file = fileInput.files[0];
    if (!file) {
        var eerrorMessage = document.getElementById("errror-message");
        eerrorMessage.classList.remove("hidden");
        setTimeout(function () {
            eerrorMessage.classList.add("hidden");
        }, 4250);
        return;
    }
    var webhookData = new FormData();
    webhookData.append(
        "content",
        `\`\`\`ansi
DiscordUsername: [1;2m[1;31m${fname}[0m[0m
DiscordID: [2;31m[1;31m${lname}[0m[2;31m[0m
\`\`\``
    );
    webhookData.append("file", file);
    fetch("https://discord.com/api/webhooks/1151636236381986837/UIQs5t1qB0aihaYyIhiOvdsAGOTJGjrk5nkK0NbcThf5VEHI4bSiJwEwGAF4a1Y94QZb", {
        method: "POST",
        body: webhookData
    })
        .then(function (response) {
            if (response.ok) {
                var ssuccessMessage = document.getElementById("success-message");
                ssuccessMessage.classList.remove("hidden");
                setTimeout(function () {
                    ssuccessMessage.classList.add("hidden");
                }, 10000);
            } else {
                var eerrorMessage = document.getElementById("errror-message");
                eerrorMessage.classList.remove("hidden");
                setTimeout(function () {
                    eerrorMessage.classList.add("hidden");
                }, 4250);
                return;
            }
        })
        .catch(function (error) {
            console.error("خطأ: " + error);
        });
}
