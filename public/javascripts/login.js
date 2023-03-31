
let btnSubmit = document.getElementById("btn-submit");
let email = document.getElementById("email");
let password = document.getElementById("password");

const loginVerification = async () => {
    try {
        const response = await fetch("/authentication", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        });

        const res = await response.json();

        if(res.error) {
            alert(res.error_description);
            return;
        }
        /** VERIFICATION SUCCESS */
        window.location.href = "/users";
        

    } catch (error) {
      console.log(error);  
    }
}

btnSubmit.onclick = async () => {
    await loginVerification();
}