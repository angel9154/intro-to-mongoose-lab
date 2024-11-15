const readline = require('readline'); // readline is a module in node.js that provides an interface that interacts with the user in the terminal 
const mongoose = require('mongoose'); 
const Customer = require ( './models/customer.js')

// Connect to MongoDB (add this before the main function)
mongoose.connect()
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Create the readline interface
const rl = readline.createInterface({ // createInterface() sets up a "conversation" between my Node.js program and the user 
    input: process.stdin, // input: process.stdin: is a Node.js built in stream that reads what the user types (from the keyboard).
    output: process.stdout // output: process.stdout: is a node.js built in stream gthat sends responses back to the terminal.
});

// Function to ask questions
function askQuestion(question) { 
    return new Promise((resolve) => { // Promise is an object in JavaScript that represents a future value.
        rl.question(question, (answer) => {  // rl.question is an asynchronous method in the redline interface to generate questions and collect an answers
            resolve(answer);
        });
    });
}

// Main function to run our program
async function main() { //async makes this function asynchronous
    try {
        
        const username = await askQuestion('Insert name here: '); // await is a keyword that can only be used in async function what it does it pauses the funtion until an answer is logged
        
        console.log(`Welcome ${username} to the CRM
What would you like to do?
    1. Create a customer
    2. View all customers
    3. Update a customer
    4. Delete a customer
    5. quit`);

    while (true) {  // Add a loop to keep the program running
        const choice = await askQuestion('Enter your choice (1-5): ');

        if (choice === '1') {
            // Create customer
            const customerName = await askQuestion('Insert customer name: ');
            const customerAge = await askQuestion('Insert customer age: ');
            
            const customerData = {
                name: customerName,
                age: customerAge
            };
            
            try {
                // Create new customer in MongoDB
                const newCustomer = await Customer.create(customerData);
                console.log('New customer saved:', newCustomer);
            } catch (err) {
                console.error('Error saving customer:', err);
            }

            console.log('New customer data:', customerData);
            // Here you would add code to save to MongoDB
            
            // Return to main menu
            console.log('\nReturning to main menu...\n');
            continue;
        } else if (choice === '2') {
            // View all customers
            console.log('All customers:');
            console.log(`id: 658226acdcbecfe9b99d5421 -- Name: Matt, Age: 43
 id: 65825d1ead6cd90c5c430e24 -- Name: Vivienne, Age: 6`);

            // Return to main menu
            console.log('\nReturning to main menu...\n');
            continue;

            } else if (choice === '3') {
            console.log(`Below is a list of customers:
id: 658226acdcbecfe9b99d5421 -- Name: Matt, Age: 43
id: 65825d1ead6cd90c5c430e24 -- Name: Vivienne, Age: 6`);

            const customerId = await askQuestion('Copy and paste the id of the customer you would like to update here: ');
            const newName = await askQuestion('What is the customers new name? ');
            const newAge = await askQuestion('What is the customers new age? ');

            // Here I would add the MongoDB update code
            // Something like:
            // await Customer.findByIdAndUpdate(customerId, { name: newName, age: newAge });
            
            console.log(`Updated customer ${customerId} with new name: ${newName} and new age: ${newAge}`);
       
            console.log('\nReturning to main menu...\n');
                continue;
       
        } else if (choice === '4') {
            // Delete customer
            const customerId = await askQuestion('Enter the ID of the customer you wish to delete: ');
            console.log(`Customer with ID ${customerId} has been deleted`);
            // Here you would add code to delete from MongoDB
            
        } else if (choice === '5') {
            console.log('Goodbye!');
            rl.close();
            return;
        } else {
            console.log('Invalid choice. Please select 1-5');
        } 
 
      }
    } catch (error) {
        console.error('An error occurred:', error);
        rl.close();
    }
 

}

// Run the program
main();



// await is a keyword that can only be used in async function what it does it pauses the funtion until an answer is logged
// createInterface() sets up a "conversation" between your Node.js program and the user, where you can ask questions, receive answers, and send responses.
// learned about readline today 
// readline is a module in node.js that provides an interface that interacts with the user in the terminal 
// it allows me to ask the user questions and then get their answer one line at  time 
// So, in short, readline is like a way for me  to ask questions and listen to what the user types, line by line.
// input: process.stdin: is a Node.js built in stream that reads what the user types (from the keyboard).
// output: process.stdout: is a node.js built in streams sends responses back to the terminal.