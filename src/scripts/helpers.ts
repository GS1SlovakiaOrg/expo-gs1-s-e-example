import { dateString } from "@/types/types";

export function getDateTimeMilisecs() {
  const today = new Date();
  let dd: dateString = today.getDate();
  let mm: dateString = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  let hh: dateString = today.getHours();
  let min: dateString = today.getMinutes();
  const sec = today.getSeconds();
  const ms = today.getMilliseconds();

  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  if (hh < 10) {
    hh = `0${hh}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }

  return `${dd}.${mm}.${yyyy} ${hh}:${min}:${sec}:${ms}`;
}

export function calculateCheckDigit(gs1String: string | number) {
  let calcSum = 0;

  String(gs1String).split("").reverse().forEach((char, index) => {
    if (index % 2 === 0) {
      calcSum += (Number(char) * 3);
    } else {
      calcSum += Number(char);
    }
  })
  const checkDigit = 10 - (calcSum % 10);
  if (checkDigit === 10) {
    return 0;
  } else {
    return checkDigit;
  }
}