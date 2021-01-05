function signup() {
    let name = document.getElementById('Sname').value;
    let email = document.getElementById('Semail').value;
    email = email.toLowerCase();
    let password = document.getElementById('Spw').value;

    user = ({ userName: name, userEmail: email, userPassword: password })
    document.getElementById('Sname').value = "";
    document.getElementById('Semail').value = "";
    document.getElementById('Spw').value = "";
    const Http = new XMLHttpRequest();
    const url = 'https://server-class-one.herokuapp.com/signup';
    Http.open("POST", url);
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify(user));

    Http.onreadystatechange = (e) => {
        document.getElementById("res").innerHTML = Http.responseText;
    }
    return false
}

// function login() {
//     let Lemail = document.getElementById('Lemail').value;
//     let Lpw = document.getElementById('Lpw').value;

//     const Http = new XMLHttpRequest();
//     const url = 'http://localhost:3000/login';
//     Http.open("POST", url);
//     Http.setRequestHeader("Content-Type", "application/json");
//     Http.send(JSON.stringify({ email: Lemail, password: Lpw }));
//     document.getElementById('Lemail').value = ""
//     document.getElementById('Lpw').value = ""
//     Http.onreadystatechange = (e) => {
//         document.getElementById('result').innerHTML = Http.responseText;
//     }
// }

// function logout() {
//     const Http = new XMLHttpRequest();
//     const url = 'https://localhost:5000';
//     Http.open("POST", url);
//     Http.setRequestHeader("Content-Type", "application/json");
//     Http.send(JSON.stringify({ email: Lemail, password: Lpw }));
//     document.getElementById('Lemail').value = ""
//     document.getElementById('Lpw').value = ""
//     Http.onreadystatechange = (e) => {
//         document.getElementById('result').innerHTML = Http.responseText;
//     }
// }