const readline = require('readline'); // readline is a module in node.js that provides an interface that interacts with the user in the terminal 
const mongoose = require('mongoose');  // this is importing the mongoose library 
const Customer = require ( './models/customer.js') // this is extracting data frim customer.js
require('dotenv').config();  // this is checking if dotenv exist and .config() is a method used to read the file in .env
// Connect to MongoDB (add this before the main function)
mongoose.connect(process.env.MONGDB_URI) // this is extracting my URI from my env for my mongodb data base 
    
    .catch(err => console.error('Could not connect to MongoDB', err)); // this is looking for erros and catching them, if catched it will print the error message. err is an error object 
// Create the readline interface
const rl = readline.createInterface({ // createInterface() sets up a "conversation" between my Node.js program and the user 
    input: process.stdin, // input: process.stdin: is a Node.js built in stream that reads what the user types (from the keyboard).
    output: process.stdout // output: process.stdout: is a node.js built in stream gthat sends responses back to the terminal.
});

// Function to ask questions
function askQuestion(question) { // this is saying return the future answer that it will be receiving when the question is asked later in the future
    return new Promise((resolve) => { // Promise is an object in JavaScript that represents a future value.
        rl.question(question, (answer) => {  // rl.question is an asynchronous method in the readline interface to generate questions and collect an answers
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
                const newCustomer = await Customer.create(customerData); // this is the database method to create data and store it into my MONGODB database 
                console.log('New customer saved:', newCustomer);
            } catch (err) {
                console.error('Error saving customer:', err);
            }

           
           
            // Return to main menu
            console.log('\nReturning to main menu...\n');
            continue; // continue will continue the loop of going back to the main menu compared to return it will exit the loop completly and stop the program
                
        } else if (choice === '2') {
            // View all customers
            const showCustomers = async () => {
                try {
                  // Query to find all customers and only return the 'name' and 'age' fields
                  const customers = await Customer.find({}, { name: 1, age: 1 });
              
                  // Log the result
                  console.log('All customers:', customers);
                } catch (error) {
                  console.error('Error fetching customers:', error);
                }
              };
              
              // Wrapper function to call showCustomers
              const showAllCustomers = async () => {
                console.log('Showing all customers');
                await showCustomers();
              };
              
              // Call the showAllCustomers function
              showAllCustomers();
              // Return to main menu
            console.log('\nReturning to main menu...\n');
            continue;

            // THIS CODE IS DEAD DID NOT WORK 
                    // const showCustomers = async () => {
                    //     const customers = await customer.find({}) // THIS FIRST ATTEMP DID NOT WORK 
                    //     console.log('All customers', customers );
                    // };

                    // const showAllCustomers = async () => {
                    //     console.log('shwoing all customers');
                    //     await findCustomer();
                    // };

            } else if (choice === '3') {
            
const updateCustomer = async (customerId, newName, newAge) => {
    try {
      // Use findByIdAndUpdate to find the customer by their ID and update the name and age
      const updatedCustomer = await Customer.findByIdAndUpdate(
        customerId,   // The customer ID to update
        { name: newName, age: newAge }, // Fields to update
        { new: true }  // Option to return the updated document
      );
  
      if (!updatedCustomer) {
        console.log('Customer not found!');
        return;
      }
  
      console.log('Updated Customer:', updatedCustomer);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };



            const customerId = await askQuestion('Copy and paste the id of the customer you would like to update here: ');
            const newName = await askQuestion('What is the customers new name? ');
            const newAge = await askQuestion('What is the customers new age? ');
            updateCustomer(customerId, newName, newAge);
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
            const deleteCustomer = async (customerId) => {
                try {
                  // Use findByIdAndDelete to find and delete the customer by their ID
                  const deletedCustomer = await Customer.findByIdAndDelete(customerId);
              
                  if (!deletedCustomer) {
                    console.log('Customer not found!');
                    return;
                  }
              
                  console.log('Deleted Customer:', deletedCustomer);
                } catch (error) {
                  console.error('Error deleting customer:', error);
                }
              };
              deleteCustomer(customerId);

        } else if (choice === '5') {
            console.log('Goodbye!');
            rl.close();
            await mongoose.connection.close();  // Close MongoDB connection
            console.log('MongoDB connection closed');
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