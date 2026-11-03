/**
 * Count Loft — Complete 42 Calculators Registry
 * Single source of truth derived strictly from PRD Section 9 (Tiers 1, 2, and 3).
 */

export interface CalculatorMeta {
  id: number;
  slug: string;
  name: string;
  category: 'finance' | 'health' | 'math' | 'construction' | 'converters' | 'pakistan' | 'islamic';
  tier: 1 | 2 | 3;
  description: string;
  href: string;
  badge?: string;
}

export const CALCULATORS: CalculatorMeta[] = [
  // Tier 1 (14 Tools)
  {
    id: 1,
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'math',
    tier: 1,
    description: 'Calculate percentage of a number, percentage increase/decrease, and relative ratios.',
    href: '/math/percentage-calculator'
  },
  {
    id: 2,
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    category: 'health',
    tier: 1,
    description: 'Calculate Body Mass Index (BMI), category ranges, and healthy weight targets.',
    href: '/health/bmi-calculator'
  },
  {
    id: 3,
    slug: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    category: 'finance',
    tier: 1,
    description: 'Estimate monthly mortgage payments including principal, interest, taxes, and insurance.',
    href: '/finance/mortgage-calculator'
  },
  {
    id: 4,
    slug: 'loan-calculator',
    name: 'Loan / EMI Calculator',
    category: 'finance',
    tier: 1,
    description: 'Calculate monthly loan repayments, interest charges, and view full amortization schedules.',
    href: '/finance/loan-calculator'
  },
  {
    id: 5,
    slug: 'calorie-calculator',
    name: 'Calorie Calculator',
    category: 'health',
    tier: 1,
    description: 'Estimate daily calorie requirements based on BMR, TDEE, and fitness goals.',
    href: '/health/calorie-calculator'
  },
  {
    id: 6,
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    category: 'finance',
    tier: 1,
    description: 'Forecast investment growth over time with regular periodic contributions.',
    href: '/finance/compound-interest-calculator'
  },
  {
    id: 7,
    slug: 'age-calculator',
    name: 'Age Calculator',
    category: 'math',
    tier: 1,
    description: 'Determine exact age in years, months, days, hours, and find upcoming birthdays.',
    href: '/math/age-calculator'
  },
  {
    id: 8,
    slug: 'scientific-calculator',
    name: 'Scientific Calculator',
    category: 'math',
    tier: 1,
    description: 'Evaluate trigonometric, logarithmic, exponential, and algebraic expressions.',
    href: '/math/scientific-calculator'
  },
  {
    id: 9,
    slug: 'fraction-calculator',
    name: 'Fraction Calculator',
    category: 'math',
    tier: 1,
    description: 'Add, subtract, multiply, and divide fractions with step-by-step simplification.',
    href: '/math/fraction-calculator'
  },
  {
    id: 10,
    slug: 'gpa-calculator',
    name: 'GPA Calculator',
    category: 'math',
    tier: 1,
    description: 'Calculate cumulative and semester Grade Point Average on 4.0 or weighted scales.',
    href: '/math/gpa-calculator'
  },
  {
    id: 11,
    slug: 'salary-to-hourly-calculator',
    name: 'Salary to Hourly Calculator',
    category: 'finance',
    tier: 1,
    description: 'Convert annual salary to hourly, weekly, biweekly, and monthly wage equivalents.',
    href: '/finance/salary-to-hourly-calculator'
  },
  {
    id: 12,
    slug: 'interest-calculator',
    name: 'Interest Calculator',
    category: 'finance',
    tier: 1,
    description: 'Compare simple interest versus compound interest across custom deposit terms.',
    href: '/finance/interest-calculator'
  },
  {
    id: 13,
    slug: 'currency-converter',
    name: 'Currency Converter',
    category: 'converters',
    tier: 1,
    description: 'Convert between major global currencies with official benchmark exchange rates.',
    href: '/converters/currency-converter'
  },
  {
    id: 14,
    slug: 'tip-and-discount-calculator',
    name: 'Tip & Discount Calculator',
    category: 'finance',
    tier: 1,
    description: 'Compute bill tips, split totals among guests, and calculate markdown sale prices.',
    href: '/finance/tip-and-discount-calculator'
  },

  // Tier 2 (16 Tools)
  {
    id: 15,
    slug: 'retirement-calculator',
    name: 'Retirement Calculator',
    category: 'finance',
    tier: 2,
    description: 'Determine required nest egg savings and withdrawal rates for retirement security.',
    href: '/finance/retirement-calculator'
  },
  {
    id: 16,
    slug: 'investment-sip-calculator',
    name: 'Investment / SIP Calculator',
    category: 'finance',
    tier: 2,
    description: 'Project returns on Systematic Investment Plans (SIP) and mutual fund deposits.',
    href: '/finance/investment-sip-calculator'
  },
  {
    id: 17,
    slug: 'income-tax-calculator',
    name: 'Income Tax Calculator (US / Global)',
    category: 'finance',
    tier: 2,
    description: 'Estimate effective tax rates, federal brackets, and net take-home paycheck.',
    href: '/finance/income-tax-calculator'
  },
  {
    id: 18,
    slug: 'amortization-calculator',
    name: 'Amortization Calculator',
    category: 'finance',
    tier: 2,
    description: 'Generate full printable debt amortization schedules with extra payment modeling.',
    href: '/finance/amortization-calculator'
  },
  {
    id: 19,
    slug: 'bmr-calculator',
    name: 'BMR Calculator',
    category: 'health',
    tier: 2,
    description: 'Compute Basal Metabolic Rate using Mifflin-St Jeor and Harris-Benedict formulas.',
    href: '/health/bmr-calculator'
  },
  {
    id: 20,
    slug: 'body-fat-calculator',
    name: 'Body Fat Calculator',
    category: 'health',
    tier: 2,
    description: 'Estimate body fat percentage using US Navy circumference tape-measurement methods.',
    href: '/health/body-fat-calculator'
  },
  {
    id: 21,
    slug: 'pregnancy-due-date-calculator',
    name: 'Pregnancy Due-Date Calculator',
    category: 'health',
    tier: 2,
    description: 'Estimate your estimated date of delivery (EDD) and current gestational milestone.',
    href: '/health/pregnancy-due-date-calculator'
  },
  {
    id: 22,
    slug: 'ovulation-calculator',
    name: 'Ovulation / Ideal Weight Calculator',
    category: 'health',
    tier: 2,
    description: 'Track menstrual cycles, fertile windows, and estimate ideal body weight ranges.',
    href: '/health/ovulation-calculator'
  },
  {
    id: 23,
    slug: 'percentage-change-calculator',
    name: 'Percentage Change Calculator',
    category: 'math',
    tier: 2,
    description: 'Calculate relative percent increase, decrease, and absolute variance between numbers.',
    href: '/math/percentage-change-calculator'
  },
  {
    id: 24,
    slug: 'square-footage-calculator',
    name: 'Square Footage / Area Calculator',
    category: 'construction',
    tier: 2,
    description: 'Measure square footage and square meters for rooms, walls, yards, and floors.',
    href: '/construction/square-footage-calculator'
  },
  {
    id: 25,
    slug: 'concrete-calculator',
    name: 'Concrete Calculator',
    category: 'construction',
    tier: 2,
    description: 'Estimate concrete volume in cubic yards, cubic meters, and number of premix bags.',
    href: '/construction/concrete-calculator'
  },
  {
    id: 26,
    slug: 'paint-calculator',
    name: 'Paint Calculator',
    category: 'construction',
    tier: 2,
    description: 'Estimate paint gallons required to cover room walls, doors, and ceilings.',
    href: '/construction/paint-calculator'
  },
  {
    id: 27,
    slug: 'tile-calculator',
    name: 'Tile Calculator',
    category: 'construction',
    tier: 2,
    description: 'Calculate required floor and wall tiles with customizable gap and waste factor allowances.',
    href: '/construction/tile-calculator'
  },
  {
    id: 28,
    slug: 'length-converter',
    name: 'Length Converter',
    category: 'converters',
    tier: 2,
    description: 'Convert between inches, feet, yards, miles, meters, centimeters, and kilometers.',
    href: '/converters/length-converter'
  },
  {
    id: 29,
    slug: 'weight-converter',
    name: 'Weight Converter',
    category: 'converters',
    tier: 2,
    description: 'Convert between pounds, ounces, kilograms, grams, metric tonnes, and stones.',
    href: '/converters/weight-converter'
  },
  {
    id: 30,
    slug: 'temperature-converter',
    name: 'Temperature Converter',
    category: 'converters',
    tier: 2,
    description: 'Instant conversion between Celsius, Fahrenheit, and Kelvin temperature scales.',
    href: '/converters/temperature-converter'
  },

  // Tier 3 (12 Tools: Regional, Islamic & Utility)
  {
    id: 31,
    slug: 'pakistan-income-tax-calculator',
    name: 'Pakistan Income Tax Calculator (FBR)',
    category: 'pakistan',
    tier: 3,
    description: 'Calculate salaried and business income tax for FY 2026-27 under official FBR slabs.',
    href: '/pakistan/income-tax-calculator'
  },
  {
    id: 32,
    slug: 'pakistan-electricity-bill-calculator',
    name: 'Pakistan Electricity Bill Calculator',
    category: 'pakistan',
    tier: 3,
    description: 'Calculate residential electricity bills across all DISCOs with slab tariffs and FPA.',
    href: '/pakistan/electricity-bill-calculator'
  },
  {
    id: 33,
    slug: 'zakat-calculator',
    name: 'Zakat Calculator',
    category: 'islamic',
    tier: 3,
    description: 'Calculate annual 2.5% zakat obligations on cash, gold, silver, and business assets above Nisab.',
    href: '/islamic/zakat-calculator'
  },
  {
    id: 34,
    slug: 'gold-price-calculator',
    name: 'Gold Price Calculator (Pakistan)',
    category: 'pakistan',
    tier: 3,
    description: 'Calculate gold jewelry value by weight (tola, gram), karat purity, and making charges.',
    href: '/pakistan/gold-price-calculator'
  },
  {
    id: 35,
    slug: 'silver-zakat-calculator',
    name: 'Silver / Zakat-on-Gold Variant',
    category: 'islamic',
    tier: 3,
    description: 'Calculate Nisab threshold evaluation using classical silver and gold standards.',
    href: '/islamic/silver-zakat-calculator'
  },
  {
    id: 36,
    slug: 'hijri-gregorian-converter',
    name: 'Hijri to Gregorian Converter',
    category: 'islamic',
    tier: 3,
    description: 'Convert dates between the Islamic lunar Hijri calendar and Gregorian calendar.',
    href: '/islamic/hijri-gregorian-converter'
  },
  {
    id: 37,
    slug: 'ac-tonnage-calculator',
    name: 'AC Tonnage / BTU Calculator',
    category: 'pakistan',
    tier: 3,
    description: 'Determine required air conditioner tonnage and BTU capacity for room dimensions and climate.',
    href: '/pakistan/ac-tonnage-calculator'
  },
  {
    id: 38,
    slug: 'date-difference-calculator',
    name: 'Date / Days-Between Calculator',
    category: 'math',
    tier: 3,
    description: 'Count exact calendar days, business weekdays, and weeks elapsed between two dates.',
    href: '/math/date-difference-calculator'
  },
  {
    id: 39,
    slug: 'time-hours-calculator',
    name: 'Time / Hours Calculator',
    category: 'math',
    tier: 3,
    description: 'Add, subtract, and track clock hours, minutes, and work timesheet durations.',
    href: '/math/time-hours-calculator'
  },
  {
    id: 40,
    slug: 'random-number-generator',
    name: 'Random Number Generator',
    category: 'math',
    tier: 3,
    description: 'Generate cryptographically random integers and lottery picks within custom min/max ranges.',
    href: '/math/random-number-generator'
  },
  {
    id: 41,
    slug: 'standard-deviation-calculator',
    name: 'Standard Deviation Calculator',
    category: 'math',
    tier: 3,
    description: 'Compute sample and population standard deviation, variance, and mean for any dataset.',
    href: '/math/standard-deviation-calculator'
  },
  {
    id: 42,
    slug: 'grade-calculator',
    name: 'Grade / Test Calculator',
    category: 'math',
    tier: 3,
    description: 'Calculate test scores, letter grade equivalents, and score required on final exams.',
    href: '/math/grade-calculator'
  }
];

export const CATEGORIES_CONFIG = [
  {
    slug: 'finance',
    name: 'Finance',
    description: 'Loan, mortgage, interest, retirement, and investment calculation tools.',
    count: CALCULATORS.filter(c => c.category === 'finance').length
  },
  {
    slug: 'health',
    name: 'Health',
    description: 'Body mass index, caloric expenditure, BMR, and fitness trackers.',
    count: CALCULATORS.filter(c => c.category === 'health').length
  },
  {
    slug: 'math',
    name: 'Math',
    description: 'Percentages, scientific math, fractions, age, and statistical analyzers.',
    count: CALCULATORS.filter(c => c.category === 'math').length
  },
  {
    slug: 'construction',
    name: 'Construction',
    description: 'Area, concrete volume, paint coverage, and flooring tile estimators.',
    count: CALCULATORS.filter(c => c.category === 'construction').length
  },
  {
    slug: 'converters',
    name: 'Converters',
    description: 'Real-time currency exchange, length, weight, and temperature conversion.',
    count: CALCULATORS.filter(c => c.category === 'converters').length
  },
  {
    slug: 'pakistan',
    name: 'Pakistan',
    description: 'FBR tax slabs, electricity bill tariff calculation, and local gold rates.',
    count: CALCULATORS.filter(c => c.category === 'pakistan').length
  },
  {
    slug: 'islamic',
    name: 'Islamic',
    description: 'Zakat calculations, Nisab threshold checks, and Hijri lunar calendar conversions.',
    count: CALCULATORS.filter(c => c.category === 'islamic').length
  }
];
