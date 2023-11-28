const fs = require('fs');
console.clear();
let prompt = require('prompt-sync')();

const persons = {
    name: '',
    birthdate: '',
    phonenumber: '',
    email: '',
};

enterPersonalInfo();

function enterPersonalInfo() {
    initializePersonalInfo();

    let choose;
    do {
        console.log(persons);

        choose = prompt("Виберіть, що хочете зробити:\n1 -- змінити, 2 -- видалити,  3 -- додати, 4 -- зберегти, 5 -- вийти: ");

        switch (choose) {
            case '1':
                changeProperty();
                break;
            case '2':
                deleteProperty();
                break;
            case '4':
                saveToFile();
                break;
            default:
               
        }
    } while (choose !== '5');
}

function initializePersonalInfo() {
    let userInputName = prompt("Уведіть ваше прізвище та ім'я : ");
    const [lastName, firstName] = userInputName.split(' ');
    persons.name = `${firstName || 'no name'} ${lastName || 'no surname'}`;

    let userInputEmail = prompt("Уведіть вашу електронну пошту : ");
    persons.email = validateEmail(userInputEmail);

    let userInputPhoneNumber = prompt("Уведіть ваш номер телефону : ");
    persons.phonenumber = validatePhoneNumber(userInputPhoneNumber);

    let userInputBirthdate = prompt("Уведіть ваш день народження через пробіл : ");
    persons.birthdate = validateDate(userInputBirthdate);
}

function changeProperty() {
    const newPropertyName = prompt("Введіть що хочете змінити: ");
    if (persons.hasOwnProperty(newPropertyName)) {
        switch (newPropertyName) {
            case "birthdate":
                persons.birthdate = validateDate(prompt("Введіть нову дату народження: "));
                break;
            case "phonenumber":
                persons.phonenumber = validatePhoneNumber(prompt("Введіть новий номер телефону: "));
                break;
            case "email":
                persons.email = validateEmail(prompt("Введіть нову електронну пошту: "));
                break;
            case "name":
                persons.name = validateName(prompt("Введіть нове ім'я: "));
                break;
            default:
                const newValue = prompt(`Введіть значення для ${newPropertyName}: `);
                persons[newPropertyName] = newValue;
        }
    } else {
        console.log(`Варіант ${newPropertyName} не існує.`);
    }
}

function deleteProperty() {
    const propToDelete = prompt("Введіть назву варіанту, який хочете видалити: ");
    if (persons.hasOwnProperty(propToDelete)) {
        delete persons[propToDelete];
        console.log(`Варіант ${propToDelete} успішно видалений.`);
    } else {
        console.log(`Варіант ${propToDelete} не існує.`);
    }
}

function saveToFile() {
    fs.writeFileSync('persons.txt', JSON.stringify(persons, null, 2));
    console.log('Інформацію збережено у файл persons.txt');
}

function validateName(name) {
    if (name.trim() !== '') {
        return name;
    } else {
        console.log('Неправильне ім\'я. Будь ласка, введіть непорожнє ім\'я.');
        return validateName(prompt("Введіть нове ім'я: "));
    }
}

function validateDate(date) {
    const regex = /^\d{2} \d{2}$/;
    if (regex.test(date)) {
        return date;
    } else {
        console.log('Неправильний формат дати. Будь ласка, введіть дату у форматі "DD MM".');
        return validateDate(prompt("Введіть нову дату народження: "));
    }
}

function validatePhoneNumber(phoneNumber) {
    const regex = /^\d+$/;
    if (regex.test(phoneNumber)) {
        return phoneNumber;
    } else {
        console.log('Неправильний формат номеру телефону. Будь ласка, введіть тільки цифри.');
        return validatePhoneNumber(prompt("Введіть новий номер телефону: "));
    }
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
        return email;
    } else {
        console.log('Неправильний формат електронної пошти. Будь ласка, введіть дійсну електронну пошту.');
        return validateEmail(prompt("Введіть нову електронну пошту: "));
    }
}