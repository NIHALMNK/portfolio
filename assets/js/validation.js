const nam = document.getElementById("inpname");
const ema = document.getElementById("inpemail");
const proj = document.getElementById("inpproject");
const msg = document.getElementById("inpmsg");
const but = document.getElementById("sub-btn");

const n1 = document.getElementById("n1");
const n2 = document.getElementById("n2");
const n3 = document.getElementById("n3");
const n4 = document.getElementById("n4");


// main-funtion
but.addEventListener("click", function rep(e) {
    e.preventDefault();
    validi();
});







function validi() {
    const nameregex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let isValid = true;
    proj.value = proj.value.trim();
    msg.value = msg.value.trim();

    if (proj.value.length < 5) {
        n3.style.border = "solid 2px red";
        isValid = false;
        alert("Project title is too short ....!");
    } else {
        n3.style.border = "solid 2px blue";
    }

    if (!emailregex.test(ema.value)) {
        n2.style.border = "solid 2px red";
        isValid = false;
        alert("email error");
    } else {
        n2.style.border = "solid 2px blue";
    }

    if (!nameregex.test(nam.value)) {
        n1.style.border = "solid 2px red";
        isValid = false;
        alert("Name error");
    } else {
        n1.style.border = "solid 2px blue";
    }

    if (msg.value.length < 10) {
        n4.style.border = "solid 2px red";
        isValid = false;
        alert("MSG title is too short ....!");
    } else {
        n4.style.border = "solid 2px blue";
    }

    // Load submit.js if validation is successful
    if (isValid) {
        const form = document.getElementById("form");
        const result = document.getElementById("result");

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        result.innerHTML = "Please wait...";

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: json,
        })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = "Form submitted successfully";
                } else {
                    console.log(response);
                    result.innerHTML = json.message;
                }
            })
            .catch((error) => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
            })
            .then(function () {
                form.reset();
                setTimeout(() => {
                    result.innerText = "Send Message";
                }, 3000);
            });
    }
}
