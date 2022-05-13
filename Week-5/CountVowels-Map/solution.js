function isVowel(char) {
  return "aeiou".includes(char);
}

function vowelCount(str) {
  const vowelMap = new Map();
  for (let char of str) {
    let lowerCaseChar = char.toLowerCase();
    if (isVowel(lowerCaseChar)) {
      if (vowelMap.has(lowerCaseChar)) {
        vowelMap.set(lowerCaseChar, vowelMap.get(lowerCaseChar) + 1);
      } else {
        vowelMap.set(lowerCaseChar, 1);
      }
    }
  }
  //   console.log(vowelMap);
  return vowelMap;
}

// Below function is created by me
function getVowelCount(str) {
  const map = new Map();

  // convert lower case string to array
  const strArr = str.toLowerCase().split("");

  strArr.forEach((ch) => {
    if ("aeiou".includes(ch)) {
      if (map.get(ch)) {
        map.set(ch, map.get(ch) + 1);
      } else {
        map.set(ch, 1);
      }
    }
  });
  //   console.log(strArr);
  console.log(map);
}

getVowelCount("the lazy fox jumped fell asleep"); // my function
vowelCount("the lazy fox jumped fell asleep"); // existing function
