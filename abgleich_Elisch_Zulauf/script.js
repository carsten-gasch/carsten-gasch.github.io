const textElisch = document.getElementById("elischText");
const textZulauf = document.getElementById("zulaufText");
const sectionErgebnis = document.getElementById("ergebnis");

const regexIK = /\b(\d{7}0\d{2})\b/g;
const regexContainerNumber = /\b(\d{7})\b/g;

const regexEmpty = /\b(\d{7}0\d{2})\b(\d{2}\.\d{2}\.\d{4})\b(\d{2}\.\d{2}\.\d{4})\b([L|V])\b(\w{3}U)/g;

textElisch.value = dummyElisch;
textZulauf.value = dummyZulauf;

function abgleichStarten() {
  const datenElisch = textElisch.value;
  const datenZulauf = textZulauf.value;

  let emptyContainers = datenZulauf.match(regexEmpty);
  console.log(emptyContainers);

  const matchElisch = datenElisch.match(regexIK).sort((a, b) => a - b);
  const matchZulauf = datenZulauf.match(regexIK).sort((a, b) => a - b);

  const abgleich = compareMatches(matchElisch, matchZulauf);
  //console.table(abgleich);

  const resultHTML = buildResult(abgleich);
  sectionErgebnis.innerHTML = resultHTML;
}

function compareMatches(elisch, zulauf) {
  let ret = [];
  let combined = [...elisch];
  zulauf.forEach((z) => {
    if (combined.indexOf(z) == -1) {
      combined.push(z);
    }
  });
  combined = combined.filter((item, pos) => {
    return combined.indexOf(item) == pos;
  });

  combined.forEach((c) => {
    let item = {
      IK: c,
      elisch: elisch.indexOf(c) != -1,
      zulauf: zulauf.indexOf(c) != -1,
    };

    ret.push(item);
  });

  return ret;
}

function buildResult(data) {
  let result = `<table>
    <thead>
      <tr>
        <th>IK</th>
        <th>Elisch</th>
        <th>Zulauf</th>
      </tr>
    </thead>
    <tbody>`;
  for (e of data) {
    result += "<tr>";
    result += `<td>${e.IK}</td>
      <td class="elisch-${e.elisch}">${e.elisch ? "" : "nicht "}auf Elisch</td>
      <td class="zulauf-${e.zulauf}">${
      e.zulauf ? "" : "nicht "
    }auf Zulauf</td>`;
    result += "</tr>";
  }

  result += `</tbody>
    </table>`;

  return result;
}
