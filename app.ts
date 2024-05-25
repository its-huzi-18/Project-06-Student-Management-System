#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
// Define the student class 
class Student {
    static counter = 10001;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }
    // Entroll courses method
     enroll_courses(course:string){
      this.courses.push(course);
     }
     // Method of view Blanace
    view_balance(){
        console.log(`${chalk.bold.blueBright(`Balance for ${this.name}: $${this.balance}`)}`);
        
    }
    // Pay the fees
    pay_fees(amount:number){
      this.balance -=amount;
      console.log(`${chalk.bold.green(`$${amount} Fees is sucesssfully paid for ${this.name}`)}`);
      console.log(`Remaining balance is: ${chalk.bold.green(`$${this.balance}`)}`);
      
    }
    // Method to display the Student status
    view_status(){
        console.log(`${chalk.bold.italic.green(`${chalk.white(`${"-".repeat(35)}`)}\nID: ${this.id}\nName: ${this.name}\nCourses: ${this.courses}\nBalance:${this.balance}\n${chalk.white(`${"-".repeat(35)}`)}`)}`);
        
    }
}
// Student Mananager class
class student_Manager{
  students:Student[]

    constructor(){
        this.students = []
    }
    // Methods to add a new array
    add_student(name:string){
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added sucessfully. Student ID:${chalk.bold.blue(`${student.id}`)}`);
        
    }
    enroll_student(student_id:number,course:string){
    let student = this.find_student(student_id);
    if(student){
        student.enroll_courses(course)
        console.log(`${chalk.bold.green(`${student.name} is enrolled in ${chalk.bold.blue(`${course}`)} sucessfully`)}`);
    }
    }
    // find student method
    find_student(student_id:number){
        return this.students.find(std =>std.id === student_id)
    }
    // Method to view student balance 
    view_balance(student_id:number){
    let student = this.find_student(student_id);
    if(student){
        student.view_balance();
    }
    else{
        console.log(`${chalk.bold.red(`Student not found. Plese enter a correct student ID`)}`);
    }
}
// Method to pay the student fees 
pay_fees(student_id: number, amount:number){
    let student = this.find_student(student_id);
    if(student){
        student.pay_fees(amount)
    }else{
       console.log(`${chalk.bold.red(`Student not found. Plese enter a correct student ID`)}`);
    }  
}
// Method to view Student Status
show_status(student_id:number){
    let student = this.find_student(student_id);
    if(student){
        student.view_status();
    }else{
     console.log(`${chalk.bold.red(`Student not found. Plese enter a correct student ID`)}`);    
}
 }
}
// Main Function to run the progrm
async function main(){
console.log(`${chalk.bold.bold.greenBright(`Welcome to 'Governor House' - Student Management System`)}`);
console.log("-".repeat(60));
let studentManager = new student_Manager;
while(true){
    let choice = await inquirer.prompt([
        {
            name:"choice",
            type:"list",
            message:"Select an option",
            choices:[
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
    switch(choice.choice){
        case "Add Student":
            let name_input = await inquirer.prompt([
                {
                    name:"name",
                    type:"input",
                    message:"Enter a Student name"
                }
            ]);
            studentManager.add_student(name_input.name);
            break;
           case "Enroll Student":
            let course_input = await inquirer.prompt([
                {
                    name:"Student_id",
                    type:"number",
                    message:"Enter a Student ID"
                },{
                    name:"course",
                    type:"input",
                    message:"Enter a Course Name"
                }
            ]);
            studentManager.enroll_student(course_input.Student_id,course_input.course)
              break;
              case "View Student Balance":
                let view_Balance = await inquirer.prompt([
                    {
                        name:"Student_id",
                        type:"number",
                        message:"Enter a Student ID"
                    }
                ]);
                studentManager.view_balance(view_Balance.Student_id);
                break;
                case "Pay Fees":
                    let pay_input = await inquirer.prompt([
                        {
                            name:"Student_id",
                            type:"number",
                            message:"Enter a Student ID"
                        },
                        {
                            name:"amount",
                            type:"input",
                            message:"Enter the amount to pay"
                        }
                    ]);
                    studentManager.pay_fees(pay_input.Student_id,pay_input.amount);
                    break;
                    case "Show Status":
                        let status_input = await inquirer.prompt([
                            {
                                name:"Student_id",
                                type:"number",
                                message:"Enter a Student ID"
                            }
                        ]);
                        studentManager.show_status(status_input.Student_id);
                        break;
                        case  "Exit":
                            console.log(`${chalk.bold.italic.red("Exiting...")}`);
                            process.exit();                        
    }
}

}
// Calling main function
main();