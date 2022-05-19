(function () {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  //I'm adding this section so I don't have to keep updating this pen every year :-)
  //remove this if you don't need it
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  let nextYear = yyyy + 1;
  let dayMonth = "05/30/";
  let targetDate = dayMonth + yyyy;

  today = mm + "/" + dd + "/" + yyyy;
  if (today > targetDate) {
    targetDate = dayMonth + nextYear;
  }
  //end

  const countDown = new Date(targetDate).getTime();
  const x = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDown - now;

    document.getElementById("days").innerText = prettify(
      Math.floor(distance / day)
    );
    document.getElementById("hours").innerText = prettify(
      Math.floor((distance % day) / hour)
    );
    document.getElementById("minutes").innerText = prettify(
      Math.floor((distance % hour) / minute)
    );
    document.getElementById("seconds").innerText = prettify(
      Math.floor((distance % minute) / second)
    );

    //do something later when date is reached
    if (distance < 0) {
      document.getElementById("headline").innerText = "Holidays, baby!";
      document.getElementById("countdown").style.display = "none";
      document.getElementById("content").style.display = "block";
      clearInterval(x);
    }
    //seconds
  }, 0);
})();

function prettify(number) {
  let ret = "";
  if (number < 10) ret = "0" + number;
  else ret = "" + number;
  return ret;
}
