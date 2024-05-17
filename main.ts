#! /usr/bin/env node

import inquirer from "inquirer";

import chalk from "chalk";


let myBalance = 10000; //dollar


let myPin = 3456;

let pinAnswer = await inquirer.prompt(
    [
        {
            name: "pin",
            message:chalk.yellow("Enter your pin"),
            type: "number"
        },
    ]
);
if (pinAnswer.pin === myPin) {
    console.log (chalk.green(`\n \tCorrect pin code, Login successfully \n`));


    let operationAns = await inquirer.prompt(
        [
            {
                name: "operation",
                message: chalk.yellow("Please select option"),
                type: "list",
                choices: ["withdraw", "Check balance"]
            }
        ]
    );

    console.log(operationAns);

    if (operationAns.operation === "withdraw") {
        let withdrawMethodAns = await inquirer.prompt(
            [
                {
                    name: "method",
                    type: "list",
                    message: chalk.yellow(`Select a withdrawal method`),
                    choices: ["Fast cash", "Enter amount"]
                   
                }
            ]
        );

        if(withdrawMethodAns.method === "Fast cash"){
            let fastCashAns = await inquirer.prompt(
                [
                    {
                        name: "fastCash",
                        type: "list",
                        message: chalk.yellow("Select amount:"),
                        choices: [500,1000, 2000, 5000, 10000, 20000]
                    }
                ]
            )
            if(fastCashAns.fastCash > myBalance){
                console.log(chalk.red("\n\tInsufficient balance\n"));
                
            }
            else{
                myBalance -= fastCashAns.fastCash
                console.log(chalk.green(`\n \t${fastCashAns.fastCash} withdraw successfully \n`));
                console.log(chalk.green(`\n \tYour remaining balance is: ${myBalance}\n`));
                
                
            }
        }

      else if (withdrawMethodAns.method === "Enter amount"){
        let amountAns = await inquirer.prompt(
            [
                {
                    name: "amount",
                    type: "number",
                    message: chalk.yellow("Enter your amount to withdraw:")
                }
            ]
        )
        if(amountAns.amount > myBalance){
            console.log(chalk.red("\n\tInsufficient balance\n"));
            
        }
        else{
            myBalance -= amountAns.amount
            console.log(chalk.green(`\n \t${amountAns.amount} withdraw successfully \n`));
            console.log(chalk.green(`\n \tYour remaining balance is: ${myBalance}\n`));
            
            
        }

      }




    } else if (operationAns.operation === "Check balance") {
        console.log(chalk.green(`\n \tyour balance is: ${myBalance}\n`));

    }
}
else {
    console.log(chalk.red(`\n \tIncorrect pin number \n`));
}




