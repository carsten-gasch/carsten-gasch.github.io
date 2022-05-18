const content = document.getElementById("content");
const targetDate = new Date(2022, 4, 30, 0, 0, 1).getTime();

let showDots = false;

let myFunc = setInterval(function () {
  const now = new Date().getTime();
  const timeLeft = targetDate - now;
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / (1000 * 60));

    let result = "";

  if (timeLeft > 0) {
    result = "<table>";
    result += "<tr>";
    result += "<th>d</th><th>h</th><th>m</th><th>s</th>";
    result += "</tr><tr>";
    result += `<td>${prettify(days)}</td>`;
    result += `<td>${prettify(hours)}</td>`;
    result += `<td>${prettify(minutes)}</td>`;
    result += `<td>${prettify(seconds)}</td>`;
    result += "</tr>";
    result += "</table>";
  } else {
    result = "URLAUB";
  }
  content.innerHTML = result;
}, 1000);

function prettify(n) {
  if (n < 10) return "0" + n;
  else return "" + n;
}
