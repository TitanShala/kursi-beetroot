function whileLoop(endNumber) {
  if (!endNumber) return console.log("Type a number please");
  if (endNumber <= 0) return console.log("Number must be greater than 0");

  let counter = 1;
  while (counter <= endNumber) console.log("While loop: " + counter++);
}

function doWhileLoop(endNumber) {
  if (!endNumber) return console.log("Type a number please");
  if (endNumber <= 0) return console.log("Number must be greater than 0");
  let counter = 1;
  do {
    console.log("Do while loop: " + counter++);
  } while (counter <= endNumber);
}

function forLoop(endNumber) {
  if (!endNumber) return console.log("Type a number please");
  if (endNumber <= 0) return console.log("Number must be greater than 0");

  for (let i = 0; i <= endNumber; i++) console.log("For loop: " + i);
}

function renderEvenNumbers(fistNumber, endNumber) {
  if (fistNumber >= endNumber)
    return console.log("First number must be lower than end number");

  const increment = 2;
  var isFirstNumberOdd = fistNumber % 2 == 0;

  while (fistNumber <= endNumber) {
    if (!isFirstNumberOdd) {
      fistNumber++;
      isFirstNumberOdd = true;
    }

    console.log(fistNumber);
    fistNumber += increment;
  }
}

whileLoop(10);
doWhileLoop(12);
forLoop(16);

renderEvenNumbers(1, 37);
