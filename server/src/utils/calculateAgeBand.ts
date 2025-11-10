export default function calculateAgeBand(dobString: string): string {
  if (!dobString) {
    return "DOB Missing";
  }

  let yearMatch = dobString.match(/(\d{4})$/);
  let year;

  if (yearMatch) {
    year = parseInt(yearMatch[1], 10);
  } else {
    return "Invalid DOB Format";
  }

  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  if (isNaN(age) || age < 0 || age > 120) {
    return "Invalid Age Calculation";
  }

  const bandStart = Math.floor(age / 10) * 10;
  const bandEnd = bandStart + 10; 

  if (age < 18) {
    return `0-18 (Age: ${age} - Minor)`;
  }

  return `${bandStart}-${bandEnd} (Age: ${age})`;
}
