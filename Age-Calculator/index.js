const birthdayE1 = document.getElementById("birthday");
const btnE1 = document.getElementById("btn");
const resultE1 = document.getElementById("result");

function calculateAge() {

    const birthdayValue = birthdayE1.value;

    if (birthdayValue === "") {
        alert("Please enter your birthdate");
        return;
    }

    const age = ageCalculate(birthdayValue);

    resultE1.innerText =
        `Your age is ${age} ${age > 1 ? "years" : "year"} old`;
}

function ageCalculate(birthdayValue) {

    const currentDate = new Date();
    const birthDate = new Date(birthdayValue);

    let age =
        currentDate.getFullYear() -
        birthDate.getFullYear();

    const monthDifference =
        currentDate.getMonth() -
        birthDate.getMonth();

    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            currentDate.getDate() < birthDate.getDate()
        )
    ) {
        age--;
    }

    return age;
}

btnE1.addEventListener("click", calculateAge);
