//ensures that the right mathematical symbols are displayed and screen readers pronounce them esp minus correctly
export default function setSrDataValue(val) {
  switch (val) {
    case '*':
      return '\u00d7';
    case '/':
      return '\u00f7';
    case '+':
      return '\u002b';
    case '-':
      return '\u2212';
    default:
      if (val.length > 7) return largeResultAsInputScreenValue(val); //only a result can be an input of > 7 characters
      
      if (val.endsWith('.')) val = val.slice(0, -1); //remove trailing decimal point on operands, if present
      return val;
  }
}

function largeResultAsInputScreenValue(result) {
  const maxResultAsInputLength = 9;

  if (result.length <= maxResultAsInputLength) return result;

  //eg 543.576912, -1271.912367
  if (!result.includes('e') && 
      (result.indexOf('.') > 0) && 
      (result.indexOf('.') <= 6) //6 to allow for at least one digit after the decimal point
      ) return `${result.slice(0, maxResultAsInputLength - 1)}…`;
  
  let resultAsExp = result.includes('e') ? result : Number(result).toExponential(); //eg 9000000000, -1234567.91234

  //if, in exponential notation, result used as input is more than the allowed display length, truncate its decimal component such that it can be displayed at the allowed length
  if (resultAsExp.length > maxResultAsInputLength) {
    resultAsExp = resultAsExp.replace(/^(-)?(\d\.)(\d+)(e[+-]?\d{1,2})$/i, (match, p1, p2, p3, p4) => {
      let fixedCharsLength = [p1, p2, p4].join('').length;
      let truncDecimal = `${p3.slice(0, maxResultAsInputLength - fixedCharsLength - 1)}…`;
      return match.replace(p3, truncDecimal);
    });
  }
  return resultAsExp;
}
