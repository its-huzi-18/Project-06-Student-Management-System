#! /usr/bin/env node
import inquirer from "inquirer";
// Define the student class 
class Student {
    static counter = 10001;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }
    // Entroll courses method
    enroll_courses(course) {
        this.courses.push(course);
    }
    // Method of view Blanace
    view_balance() {
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }
    // Pay the fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} Fees is sucesssfully paid for ${this.name}`);
        console.log(`Remaining balance is: $${this.balance}`);
    }
    // Method to display the Student status
    view_status() {
        console.log(`${"-".repeat(35)}\nID: ${this.id}\nName: ${this.name}\nCourses: ${this.courses}\nBalance:${this.balance}\n${"-".repeat(35)}`);
    }
}
// Student Mananager class
class student_Manager {
    students;
    constructor() {
        this.students = [];
    }
    // Methods to add a new array
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added sucessfully. Student ID:${student.id}`);
    }
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_courses(course);
            console.log(`${student.name} is enrolled in ${course} sucessfully`);
        }
    }
    // find student method
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
    // Method to view student balance 
    view_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(`Student not found. Plese enter a correct student ID`);
        }
    }
    // Method to pay the student fees 
    pay_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log(`Student not found. Plese enter a correct student ID`);
        }
    }
    // Method to view Student Status
    show_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_status();
        }
        else {
            console.log(`Student not found. Plese enter a correct student ID`);
        }
    }
}
// Main Function to run the progrm
async function main() {
    console.log(`Welcome to 'Governor House' - Student Management System`);
    console.log("-".repeat(60));
    let studentManager = new student_Manager;
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        // Using switch case to handel choice 
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student name"
                    }
                ]);
                studentManager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "Student_id",
                        type: "number",
                        message: "Enter a Student ID"
                    }, {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name"
                    }
                ]);
                studentManager.enroll_student(course_input.Student_id, course_input.course);
                break;
            case "View Student Balance":
                let view_Balance = await inquirer.prompt([
                    {
                        name: "Student_id",
                        type: "number",
                        message: "Enter a Student ID"
                    }
                ]);
                studentManager.view_balance(view_Balance.Student_id);
                break;
            case "Pay Fees":
                let pay_input = await inquirer.prompt([
                    {
                        name: "Student_id",
                        type: "number",
                        message: "Enter a Student ID"
                    },
                    {
                        name: "amount",
                        type: "input",
                        message: "Enter the amount to pay"
                    }
                ]);
                studentManager.pay_fees(pay_input.Student_id, pay_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "Student_id",
                        type: "number",
                        message: "Enter a Student ID"
                    }
                ]);
                studentManager.show_status(status_input.Student_id);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
// Calling main function
main();
