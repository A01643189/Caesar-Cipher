const readlineSync = require('readline-sync');
const fs = require('fs');
const path = require('path');

function cesarCipher(str, idx) {
    let result = "";
    let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(let letter of str) {
        let index = alphabet.indexOf(letter);
        if(index !== -1) {
            let newIndex = (index + idx) % alphabet.length;
            let newlLetter = alphabet[newIndex];
            result += newlLetter;
            console.log("newLetter", newlLetter);
        }
        console.log("letter", letter);
        console.log("index", index);
    }

    return result;
}

function registerUser () {
    let userName = readlineSync.question("Enter your name: ");
    let password = readlineSync.question("Enter your password: ");
    let passwordCifrada = cesarCipher(password, 7);

    addUser(userName, passwordCifrada);

    console.log('Welcome ', userName);
    console.log('Password ', password);
    console.log('Password Cifrada ', passwordCifrada );
}

function addUser (userName, passwordCifrada) {
    const filePath = path.join(__dirname, 'users.json');
    let users = [];
    fs.readFile(filePath, (err, data) => {
        if(err) {
            users;
        } else {
            users = JSON.parse(data);
        }
        users.push({userName,passwordCifrada});
        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if(err) {
                console.log("Error adding user", err);
            } else {
                console.log("User added successfully");
            }
            
        });
    });
}

function login () {
    let userName = readlineSync.question("Enter your name: ");
    let password = readlineSync.question("Enter your password: ");

    const filePath = path.join(__dirname, 'users.json');

    fs.readFile(filePath, (err, data) => {
        if(err) {
            console.log("Error reading file", err);
        } else {
            for (let userNames of JSON .parse(data)) {
                if(userName == userNames.userName && cesarCipher(password, 7) == userNames.passwordCifrada) {
                    console.log("Welcome ", userName);
                } else{
                    console.log("Invalid user or password");
                }
            }
        }
    });
}

function main() {
    let option = readlineSync.question("1. Register\n2. Login\n");
    if(option == "1") {
        registerUser();
    } else if(option == "2") {
        login();
    } else {
        console.log("Invalid option");
    }
}

main();