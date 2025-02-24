import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env

function main() {
  const myVariable = process.env.MY_VARIABLE;
  const userid = process.env.USER_ID;

  if (myVariable) {
    console.log(`MY_VARIABLE: ${myVariable}`);
  }
  if (userid) {
    console.log(`USER_ID: ${userid}`);
  } 
  console.log('Hello, world!');
}

main();