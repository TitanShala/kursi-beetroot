/* DETYRA 1 */

var car1 = {
  manufacturer: "BMW",
  model: "X5",
  year: 2010,
  averageSpeed: 80,
};

function displayCarInfo(car) {
  return (
    "Manufacturer: " +
    car.manufacturer +
    " - Model: " +
    car.model +
    " - Year: " +
    car.year +
    " - Average Speed: " +
    car.averageSpeed
  );
}

function getJourneyTime(distance, car) {
  if (!distance || !car) {
    return console.log("Distance and the car should not be null");
  }
  if (distance <= 0) {
    return console.log("Distance should not be lower than 0");
  }

  var time = distance / car.averageSpeed;

  var pauseTime = Math.floor(time / 4);

  console.log(
    "For the distance: " +
      distance +
      " km, " +
      "the car (" +
      displayCarInfo(car) +
      " ), can get in " +
      (time + pauseTime) +
      " hours. " +
      time +
      " hours of driving and " +
      pauseTime +
      " hours pause"
  );
}

getJourneyTime(2000, car1);

/* DETYRA 2 */

var calc1 = {
  vlera1: 20,
  vlera2: 30,
  operatori: "*",
  rezultati: null,
};

function kalkulo(calc) {
  if (!calc.vlera1 || !calc.vlera2) {
    return console.log("Vlera1 or vlera2 should not be null");
  }
  switch (calc.operatori) {
    case "+":
      calc.rezultati = calc.vlera1 + calc.vlera2;
      break;
    case "-":
      calc.rezultati = calc.vlera1 - calc.vlera2;
      break;
    case "*":
      calc.rezultati = calc.vlera1 * calc.vlera2;
      break;
    case "/":
      calc.rezultati = calc.vlera1 / calc.vlera2;
      break;
    default:
      console.log("Operator should be one of the above: +, -, *, /");
      return;
  }
  console.log(
    calc.vlera1 +
      " " +
      calc.operatori +
      " " +
      calc.vlera2 +
      " = " +
      calc.rezultati
  );
}
kalkulo(calc1);

/* DETYRA 3 */

var time1 = {
  seconds: 20,
  minutes: 40,
  hours: 13,
};

function displayTime(time) {
  if (!time) return "Time is null";
  return (
    "Time: " + time.hours + "h/" + time.minutes + "m/" + time.seconds + "s"
  );
}

function addSeconds(time, sec) {
  if (!sec) {
    return "Given parameter is null";
  }

  time.seconds += sec;

  if (time.seconds < 60) {
    return displayTime(time);
  }

  var minutesToAdd = Math.floor(time.seconds / 60);
  time.seconds = time.seconds % 60;
  time.minutes += minutesToAdd;
  return displayTime(time);
}

function addMinutes(time, min) {
  if (!min) {
    return "Given parameter is null";
  }

  time.minutes += min;

  if (time.minutes < 60) {
    return displayTime(time);
  }

  var hoursToAdd = Math.floor(time.minutes / 60);
  time.minutes = time.minutes % 60;
  time.hours += hoursToAdd;
  return displayTime(time);
}

function addHours(time, h) {
  if (!h) {
    return "Given parameter is null";
  }

  time.hours += h;
  if (time.hours < 24) {
    return displayTime(time);
  }
  var hours = Math.floor(time.hours % 24);
  time.hours = hours;
  return displayTime(time);
}

console.log("Time: " + displayTime(time1));
console.log("Time with added seconds: " + addSeconds(time1, 130));
console.log("Time with added minutes: " + addMinutes(time1, 130));
console.log("Time with added hours: " + addHours(time1, 26));
