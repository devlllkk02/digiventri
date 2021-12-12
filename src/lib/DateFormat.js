export const DateFormat = (getdate) => {
  var newDate = getdate.toString().split(" ");
  // console.log(newDate);

  var day = newDate[0];
  var dayShort;
  var dayLong;

  var month = newDate[1];
  var monthShort;
  var monthLong;
  var monthNumeric;

  var date = newDate[2];
  var year = newDate[3];
  var time = newDate[4];

  //Day Converter
  if (day === "Mon") {
    dayShort = "Mon";
    dayLong = "Monday";
  } else if (day === "Tue") {
    dayShort = "Tue";
    dayLong = "Tuesday";
  } else if (day === "Wed") {
    dayShort = "Wed";
    dayLong = "Wednesday";
  } else if (day === "Thu") {
    dayShort = "Thu";
    dayLong = "Thursday";
  } else if (day === "Fri") {
    dayShort = "Fri";
    dayLong = "Friday";
  } else if (day === "Sat") {
    dayShort = "Sat";
    dayLong = "Saturday";
  } else if (day === "Sun") {
    dayShort = "Sun";
    dayLong = "Sunday";
  }

  //Month Converter
  if (month === "Jan") {
    monthShort = "Jan";
    monthLong = "January";
    monthNumeric = "01";
  } else if (month === "Feb") {
    monthShort = "Feb";
    monthLong = "February";
    monthNumeric = "02";
  } else if (month === "Mar") {
    monthShort = "Mar";
    monthLong = "March";
    monthNumeric = "03";
  } else if (month === "Apr") {
    monthShort = "Apr";
    monthLong = "April";
    monthNumeric = "04";
  } else if (month === "May") {
    monthShort = "May";
    monthLong = "May";
    monthNumeric = "05";
  } else if (month === "Jun") {
    monthShort = "Jun";
    monthLong = "June";
    monthNumeric = "06";
  } else if (month === "Jul") {
    monthShort = "Jul";
    monthLong = "July";
    monthNumeric = "07";
  } else if (month === "Aug") {
    monthShort = "Aug";
    monthLong = "August";
    monthNumeric = "08";
  } else if (month === "Sep") {
    monthShort = "Sep";
    monthLong = "September";
    monthNumeric = "09";
  } else if (month === "Oct") {
    monthShort = "Oct";
    monthLong = "October";
    monthNumeric = "10";
  } else if (month === "Nov") {
    monthShort = "Nov";
    monthLong = "November";
    monthNumeric = "11";
  } else if (month === "Dec") {
    monthShort = "Dec";
    monthLong = "December";
    monthNumeric = "12";
  }
  //Date Suffix
  var suffix;

  if (date == 1) {
    suffix = "st";
  } else if (date == 2) {
    suffix = "nd";
  } else if (date == 3) {
    suffix = "rd";
  } else {
    suffix = "th";
  }

  const dateFinal = {
    year: year,
    month: { short: monthShort, long: monthLong, numeric: monthNumeric },
    date: date,
    day: {
      short: dayShort,
      long: dayLong,
    },
    time: time,
    suffix: suffix,
  };

  return dateFinal;
};
