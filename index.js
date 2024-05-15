#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// STUDENT MANAGMENT SYSTEM
class Student {
    static counter = 1000;
    id;
    name;
    fatherName;
    age;
    gender;
    course = [];
    contact_number;
    balance = Math.floor(Math.random() * 10000);
    constructor(name, contact_number, fatherName, age, gender) {
        this.id = Student.counter++;
        this.name = name;
        this.fatherName = fatherName;
        this.age = age;
        this.gender = gender;
        this.contact_number = contact_number;
    }
    enrollCourse(course) {
        this.course.push(course);
    }
    viewBalance() {
        console.log(chalk.bold(`\n NAME : ${this.name} \n FATHER NAME : ${this.fatherName} \n BALANCE : ${this.balance} \n `));
    }
    payFees(amount) {
        if (this.balance > amount) {
            this.balance = this.balance - amount;
            console.log(chalk.green.bold(`Fees Paid SuccessFully For ${chalk.yellow.bold(this.name)}`));
            console.log(chalk.green.bold(`Your Remaining Balance is ${chalk.yellow.bold(this.balance)}`));
        }
        else {
            console.log(chalk.red.bold("\nInsufficient Balance"));
        }
    }
    showStatus() {
        console.log(chalk.bold(`\n NAME : ${this.name} \n FATHER NAME : ${this.fatherName} \n AGE : ${this.age} \n GENDER : ${this.gender} \n CONTACT NUMBER : ${this.contact_number} \n COURSE : ${this.course} \n BALANCE : ${this.balance}`));
    }
}
class Student_Manager {
    students = [];
    addStudent(name, contact_number, fatherName, age, gender) {
        let student = new Student(name, contact_number, fatherName, age, gender);
        this.students.push(student);
        console.log(chalk.green.bold(`Student ${chalk.yellow.bold(name)} Added SuccessFully . Student ID : ${chalk.yellow.bold(student.id)}`));
    }
    enroll_Course(student_id, course) {
        let studentEnrollCourseIdCheck = this.students.find(std => std.id === student_id);
        if (studentEnrollCourseIdCheck) {
            studentEnrollCourseIdCheck.enrollCourse(course);
            console.log(chalk.green.bold(`${chalk.yellow.bold(course)} Course Enrolled SuccessFully For ${chalk.yellow.bold(studentEnrollCourseIdCheck.name)}`));
        }
        else {
            console.log(chalk.red.bold(`\nStudent Not Found . Please Enter Correct Student Id.`));
        }
    }
    viewStudentBalance(student_id) {
        let studentBalanceIdCheck = this.students.find(std => std.id === student_id);
        if (studentBalanceIdCheck) {
            studentBalanceIdCheck.viewBalance();
        }
        else {
            console.log(chalk.red.bold(`\nStudent Not Found . Please Enter Correct Student Id.`));
        }
    }
    payFees(student_id, amount) {
        let studentPayFeesIdCheck = this.students.find(std => std.id === student_id);
        if (studentPayFeesIdCheck) {
            studentPayFeesIdCheck.payFees(amount);
        }
        else {
            console.log(chalk.red.bold(`\nStudent Not Found . Please Enter Correct Student Id.`));
        }
    }
    showStatus(student_id) {
        let studentStatusIdCheck = this.students.find(std => std.id === student_id);
        if (studentStatusIdCheck) {
            studentStatusIdCheck.showStatus();
        }
        else {
            console.log(chalk.red.bold(`\nStudent Not Found . Please Enter Correct Student Id.`));
        }
    }
}
let condition = true;
console.log(chalk.green.bold.italic.underline("Welcome To Student Managment System"));
console.log("*".repeat(35));
let student_Manager = new Student_Manager();
while (condition) {
    let choices = await inquirer.prompt([
        {
            type: "list",
            name: "answer",
            message: "Select :",
            choices: [
                "Add Student",
                "Enroll Course",
                "View Student Balance",
                "Pay Fees",
                "Show Status",
                "Exit"
            ]
        }
    ]);
    // If-Else Statements
    if (choices.answer === "Add Student") {
        let studentName = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Enter Student Name :"
            }
        ]);
        let stdFatherName = await inquirer.prompt([
            {
                type: "input",
                name: "fatherName",
                message: "Enter Student Father Name :"
            }
        ]);
        let stdAge = await inquirer.prompt([
            {
                type: "number",
                name: "age",
                message: "Enter Student Age :"
            }
        ]);
        let contact = await inquirer.prompt([
            {
                type: "number",
                name: "contact",
                message: "Enter Father's Contact number :"
            }
        ]);
        let stdGender = await inquirer.prompt([
            {
                type: "list",
                name: "gender",
                message: "Select Gender :",
                choices: ["Male", "Female", "Other"]
            }
        ]);
        student_Manager.addStudent(studentName.name, contact.contact, stdFatherName.fatherName, stdAge.age, stdGender.gender);
    }
    else if (choices.answer === "Enroll Course") {
        let StdCourseEnroll = await inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "Enter Student Id :"
            },
            {
                type: "list",
                name: "course",
                message: "Select Course:",
                choices: ["Web Development", "Artificial Intelligence", "Web 3.0", "Metaverse"]
            }
        ]);
        student_Manager.enroll_Course(StdCourseEnroll.id, StdCourseEnroll.course);
    }
    else if (choices.answer === "View Student Balance") {
        let StdViewBalance = await inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "Enter Student Id :"
            }
        ]);
        student_Manager.viewStudentBalance(StdViewBalance.id);
    }
    else if (choices.answer === "Pay Fees") {
        let StdPayFees = await inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "Enter Student Id :"
            },
            {
                type: "number",
                name: "amount",
                message: "Enter Amount :"
            }
        ]);
        student_Manager.payFees(StdPayFees.id, StdPayFees.amount);
    }
    else if (choices.answer === "Show Status") {
        let StdStatus = await inquirer.prompt([
            {
                type: "number",
                name: "id",
                message: "Enter Student Id :"
            }
        ]);
        student_Manager.showStatus(StdStatus.id);
    }
    else if (choices.answer === "Exit") {
        condition = false;
        console.log(chalk.red.bold("\nThank You For Using Student Managment System"));
        break;
    }
}
