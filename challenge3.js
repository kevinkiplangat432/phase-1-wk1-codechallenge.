function netSalaryCalculator(basicSalary, benefits) {
  const grossSalary = basicSalary + benefits;

  // Step 1: Calculate PAYE (Progressive Tax)
  let paye = calculatePAYE(grossSalary);

  // Subtract personal relief (2400/month)
  paye = Math.max(0, paye - 2400);

  // Step 2: SHIF (2.75% of gross)
  const shif = grossSalary * 0.0275;

  // Step 3: NSSF (6% on up to 72,000)
  const pensionablePay = Math.min(grossSalary, 72000);
  const nssf = pensionablePay * 0.06;

  // Step 4: Housing Levy (1.5% of gross)
  const housingLevy = grossSalary * 0.015;

  // Step 5: Net Salary
  const netSalary = grossSalary - (paye + shif + nssf + housingLevy);

  return {
    grossSalary,
    paye,
    shif,
    nssf,
    housingLevy,
    netSalary
  };
}

function calculatePAYE(gross) {
  let tax = 0;
  if (gross <= 24000) {
    tax = gross * 0.1;
  } else if (gross <= 32333) {
    tax = (24000 * 0.1) + ((gross - 24000) * 0.25);
  } else if (gross <= 500000) {
    tax = (24000 * 0.1) + (8333 * 0.25) + ((gross - 32333) * 0.3);
  } else if (gross <= 800000) {
    tax = (24000 * 0.1) + (8333 * 0.25) + (467667 * 0.3) + ((gross - 500000) * 0.325);
  } else {
    tax = (24000 * 0.1) + (8333 * 0.25) + (467667 * 0.3) + (300000 * 0.325) + ((gross - 800000) * 0.35);
  }
  return tax;
}
console.log(netSalaryCalculator(50000, 10000));
