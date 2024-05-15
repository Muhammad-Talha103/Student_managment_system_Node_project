#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var inquirer_1 = __importDefault(require("inquirer"));
var chalk_1 = __importDefault(require("chalk"));
// STUDENT MANAGMENT SYSTEM
var Student = /** @class */ (function () {
    function Student(name, contact_number, fatherName, age, gender) {
        this.course = [];
        this.balance = Math.floor(Math.random() * 10000);
        this.id = Student.counter++;
        this.name = name;
        this.fatherName = fatherName;
        this.age = age;
        this.gender = gender;
        this.contact_number = contact_number;
    }
    Student.prototype.enrollCourse = function (course) {
        this.course.push(course);
    };
    Student.prototype.viewBalance = function () {
        console.log(chalk_1["default"].bold("\n NAME : " + this.name + " \n FATHER NAME : " + this.fatherName + " \n BALANCE : " + this.balance + " \n "));
    };
    Student.prototype.payFees = function (amount) {
        if (this.balance > amount) {
            this.balance = this.balance - amount;
            console.log(chalk_1["default"].green.bold("Fees Paid SuccessFully For " + chalk_1["default"].yellow.bold(this.name)));
            console.log(chalk_1["default"].green.bold("Your Remaining Balance is " + chalk_1["default"].yellow.bold(this.balance)));
        }
        else {
            console.log(chalk_1["default"].red.bold("\nInsufficient Balance"));
        }
    };
    Student.prototype.showStatus = function () {
        console.log(chalk_1["default"].bold("\n NAME : " + this.name + " \n FATHER NAME : " + this.fatherName + " \n AGE : " + this.age + " \n GENDER : " + this.gender + " \n CONTACT NUMBER : " + this.contact_number + " \n COURSE : " + this.course + " \n BALANCE : " + this.balance));
    };
    Student.counter = 1000;
    return Student;
}());
var Student_Manager = /** @class */ (function () {
    function Student_Manager() {
        this.students = [];
    }
    Student_Manager.prototype.addStudent = function (name, contact_number, fatherName, age, gender) {
        var student = new Student(name, contact_number, fatherName, age, gender);
        this.students.push(student);
        console.log(chalk_1["default"].green.bold("Student " + chalk_1["default"].yellow.bold(name) + " Added SuccessFully . Student ID : " + chalk_1["default"].yellow.bold(student.id)));
    };
    Student_Manager.prototype.enroll_Course = function (student_id, course) {
        var studentEnrollCourseIdCheck = this.students.find(function (std) { return std.id === student_id; });
        if (studentEnrollCourseIdCheck) {
            studentEnrollCourseIdCheck.enrollCourse(course);
            console.log(chalk_1["default"].green.bold(chalk_1["default"].yellow.bold(course) + " Course Enrolled SuccessFully For " + chalk_1["default"].yellow.bold(studentEnrollCourseIdCheck.name)));
        }
        else {
            console.log(chalk_1["default"].red.bold("\nStudent Not Found . Please Enter Correct Student Id."));
        }
    };
    Student_Manager.prototype.viewStudentBalance = function (student_id) {
        var studentBalanceIdCheck = this.students.find(function (std) { return std.id === student_id; });
        if (studentBalanceIdCheck) {
            studentBalanceIdCheck.viewBalance();
        }
        else {
            console.log(chalk_1["default"].red.bold("\nStudent Not Found . Please Enter Correct Student Id."));
        }
    };
    Student_Manager.prototype.payFees = function (student_id, amount) {
        var studentPayFeesIdCheck = this.students.find(function (std) { return std.id === student_id; });
        if (studentPayFeesIdCheck) {
            studentPayFeesIdCheck.payFees(amount);
        }
        else {
            console.log(chalk_1["default"].red.bold("\nStudent Not Found . Please Enter Correct Student Id."));
        }
    };
    Student_Manager.prototype.showStatus = function (student_id) {
        var studentStatusIdCheck = this.students.find(function (std) { return std.id === student_id; });
        if (studentStatusIdCheck) {
            studentStatusIdCheck.showStatus();
        }
        else {
            console.log(chalk_1["default"].red.bold("\nStudent Not Found . Please Enter Correct Student Id."));
        }
    };
    return Student_Manager;
}());
var condition = true;
console.log(chalk_1["default"].green.bold.italic.underline("Welcome To Student Managment System"));
console.log("*".repeat(35));
var student_Manager = new Student_Manager();
while (condition) {
    var choices = await inquirer_1["default"].prompt([
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
        var studentName = await inquirer_1["default"].prompt([
            {
                type: "input",
                name: "name",
                message: "Enter Student Name :"
            }
        ]);
        var stdFatherName = await inquirer_1["default"].prompt([
            {
                type: "input",
                name: "fatherName",
                message: "Enter Student Father Name :"
            }
        ]);
        var stdAge = await inquirer_1["default"].prompt([
            {
                type: "number",
                name: "age",
                message: "Enter Student Age :"
            }
        ]);
        var contact = await inquirer_1["default"].prompt([
            {
                type: "number",
                name: "contact",
                message: "Enter Father's Contact number :"
            }
        ]);
        var stdGender = await inquirer_1["default"].prompt([
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
        var StdCourseEnroll = await inquirer_1["default"].prompt([
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
        var StdViewBalance = await inquirer_1["default"].prompt([
            {
                type: "number",
                name: "id",
                message: "Enter Student Id :"
            }
        ]);
        student_Manager.viewStudentBalance(StdViewBalance.id);
    }
    else if (choices.answer === "Pay Fees") {
        var StdPayFees = await inquirer_1["default"].prompt([
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
        var StdStatus = await inquirer_1["default"].prompt([
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
        console.log(chalk_1["default"].red.bold("\nThank You For Using Student Managment System"));
        break;
    }
}
