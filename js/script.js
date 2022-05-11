let getJSON = function (url, callback) {

    let xmlhttprequest = new XMLHttpRequest();
    xmlhttprequest.open('GET', url, true);
    xmlhttprequest.responseType = 'json';

    xmlhttprequest.onload = function () {

        let status = xmlhttprequest.status;

        if (status === 200) {
            callback(null, xmlhttprequest.response);
        } else {
            callback(status, xmlhttprequest.response);
        }
    };
    xmlhttprequest.send();
};

function showUniversityJSON(id, data) {
    let html = "";

    for (let key in data) {
        html += "<option>" + data[key].name + "</option>"
    }
    document.getElementById(id).innerHTML = html;
}

function showCitiesJSON(id, data) {
    let html = "";

    for (let key in data) {
        html += "<option>" + data[key].city + "</option>"
    }
    document.getElementById(id).innerHTML = html;
}

getJSON('http://universities.hipolabs.com/search?country=United+Kingdom', function (err, data) {
    if (err != null) {
        console.error(err);
    } else {
        showUniversityJSON('universities', data);
    }
});

let cities = fetch("../cities.json")
    .then(response => {
        return response.json();
    });

async function sort() {
    try {
        const data = await cities;
        let max = data[0];
        data.sort((a, b) => a.city.localeCompare(b.city));
        for (const i in data) {
            if (parseInt(data[i].population) > parseInt(max.population)) {
                max = data[i];
            }
        }
        data.unshift(max);
        showCitiesJSON('cities', data);
    } catch (err) {
        console.log(err);
    }
}

sort();

function changeStatus() {
    let status = document.getElementById('status').innerText;
    let newStatus = prompt('Измените статус', status);
    if (newStatus.length !== 0) {
        document.getElementById('status').innerText = newStatus;
    }
}

function defineMonthName(number) {
    switch (number) {
        case 1:
            return 'января'
        case 2:
            return 'февраля'
        case 3:
            return 'марта'
        case 4:
            return 'апреля'
        case 5:
            return 'мая'
        case 6:
            return 'июня'
        case 7:
            return 'июля'
        case 8:
            return 'августа'
        case 9:
            return 'сентября'
        case 10:
            return 'октября'
        case 11:
            return 'ноября'
        case 12:
            return 'декабря'
    }
}

function verifyPassword() {
    const val = document.getElementById("password").value;
    if (val.length < 5) {
        document.getElementById('invalid-password').innerText = 'Используйте не менее 5 символов';
        document.getElementById('password').style.borderColor = "#FF0000";
    } else {
        document.getElementById('invalid-password').innerText = '';
        document.getElementById('password').style.borderColor = "#999999";
    }
}

function verifyRePassword() {
    const val = document.getElementById("re-password").value;
    const val2 = document.getElementById("password").value;

    if (val !== val2) {
        document.getElementById('invalid-repassword').innerText = 'Пароли не совпадают';
        document.getElementById('re-password').style.borderColor = "#FF0000";
    } else {
        document.getElementById('invalid-repassword').innerText = '';
        document.getElementById('re-password').style.borderColor = "#999999";
    }
}

function verifyEmail() {
    const val = document.getElementById('email').value;
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(val)) {
        document.getElementById('invalid-email').innerText = 'Неверный E-mail';
        document.getElementById('email').style.borderColor = "#FF0000";
    } else {
        document.getElementById('invalid-email').innerText = '';
        document.getElementById('email').style.borderColor = "#999999";
    }
}

function showError(errText, textId, inputId) {
    document.getElementById(textId).innerText = errText;
    document.getElementById(inputId).style.borderColor = "#FF0000";
}

function handleSubmit() {
    let valid = true;
    let password = document.getElementById("password").value;
    let rePassword = document.getElementById("re-password").value;
    let email = document.getElementById("email").value;
    if (password.length === 0) {
        showError('Укажите пароль', 'invalid-password', 'password');
        valid = false;
    }
    if (rePassword.length === 0) {
        showError('Укажите пароль', 'invalid-repassword', 're-password')
        valid = false;
    }
    if (email.length === 0) {
        showError('Укажите E-mail', 'invalid-email', 'email');
        valid = false;
    }
    if (password !== rePassword) {
        document.getElementById('invalid-repassword').innerText = 'Пароли не совпадают';
        document.getElementById('re-password').style.borderColor = "#FF0000";
        valid = false;
    }
    if (password.length < 5) {
        document.getElementById('invalid-password').innerText = 'Используйте не менее 5 символов';
        document.getElementById('password').style.borderColor = "#FF0000";
        valid = false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('invalid-email').innerText = 'Неверный E-mail';
        document.getElementById('email').style.borderColor = "#FF0000";
        valid = false;
    }

    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());

    let date = new Date();
    let datetime = date.getDate() + " "
        + (defineMonthName(date.getMonth() + 1)) + " "
        + date.getFullYear() + " в "
        + date.getHours() + ":"
        + date.getMinutes() + ":"
        + date.getSeconds();
    if (valid) {
        console.log(value);
        document.getElementById('last-submit').innerText = 'последние изменения ' + datetime;
    }
}

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);