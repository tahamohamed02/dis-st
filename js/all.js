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



