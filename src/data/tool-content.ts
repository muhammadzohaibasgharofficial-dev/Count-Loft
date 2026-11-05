/**
 * Count Loft — Template content per calculator (keyed by registry slug).
 * `intro`    → "What this calculator does" section (primary keyword used naturally).
 * `useCases` → "Common use cases" list.
 * Only explanatory, verifiable statements about what each tool computes. No statistics,
 * prices, studies or authority claims. Edit freely.
 */
export interface ToolContent {
  intro: string;
  useCases: string[];
}

export const TOOL_CONTENT: Record<string, ToolContent> = {
  'percentage-calculator': {
    intro: 'The percentage calculator answers the three questions people ask most: what is X% of a number, what percent one number is of another, and what a number becomes after a percentage increase or decrease. Enter the values and the result updates instantly, with the formula shown below the tool.',
    useCases: ['Working out a discount or sale price', 'Checking what share of a budget a single expense represents', 'Adding or removing a percentage such as a service charge or markup', 'Converting a test score (marks obtained out of total marks) into a percentage']
  },
  'bmi-calculator': {
    intro: 'This BMI calculator computes Body Mass Index from your height and weight, which is body weight in kilograms divided by height in metres squared. It then shows which standard BMI category the result falls into and the weight range that corresponds to the "normal" category for your height. BMI is a screening number, not a diagnosis.',
    useCases: ['Getting a quick screening value before a health or fitness conversation', 'Seeing the weight range that matches the normal BMI category for your height', 'Tracking how BMI changes as weight changes over time', 'Comparing results in metric and imperial units without converting by hand']
  },
  'mortgage-calculator': {
    intro: 'The mortgage calculator estimates your monthly home-loan payment from the home price, down payment, interest rate and loan term, and can include property tax and insurance in the monthly total. It uses the standard fixed-rate amortization formula, so the principal-and-interest portion matches what a lender\'s schedule would show for the same inputs.',
    useCases: ['Comparing 15-year and 30-year terms for the same loan amount', 'Seeing how a larger down payment lowers the monthly payment', 'Estimating the full monthly cost including taxes and insurance', 'Checking how much total interest a loan costs over its life']
  },
  'loan-calculator': {
    intro: 'The loan / EMI calculator works out the fixed monthly installment (EMI) for a loan from the amount borrowed, the annual interest rate and the term. It also shows total interest and total repayment, and lists the amortization schedule so you can see how each payment splits between principal and interest.',
    useCases: ['Estimating the monthly installment on a car, personal or education loan', 'Comparing offers with different rates or terms', 'Finding out the total interest you would pay over the full term', 'Planning whether a monthly payment fits your budget before you apply']
  },
  'calorie-calculator': {
    intro: 'The calorie calculator estimates how many calories you burn per day. It starts from your basal metabolic rate (BMR) based on age, sex, height and weight, then multiplies it by an activity factor to get total daily energy expenditure (TDEE). You can then see rough intake targets for maintaining, losing or gaining weight. The numbers are estimates, not medical advice.',
    useCases: ['Estimating a maintenance calorie level to start from', 'Setting a modest calorie deficit or surplus for a weight goal', 'Seeing how changing your activity level changes daily energy needs', 'Understanding the difference between BMR and TDEE']
  },
  'compound-interest-calculator': {
    intro: 'The compound interest calculator projects how a balance grows when interest is added to the principal and then earns interest itself. Enter the starting amount, annual rate, time and compounding frequency, plus optional regular contributions, to see the future value and how much of it is interest.',
    useCases: ['Projecting savings or investment growth over many years', 'Seeing how monthly contributions change the final balance', 'Comparing annual, quarterly and monthly compounding', 'Understanding why starting earlier makes a difference']
  },
  'age-calculator': {
    intro: 'The age calculator finds your exact age in years, months and days from a date of birth, and also in total months, weeks, days and hours. It can additionally show how long until your next birthday. Results are based on the calendar, including leap years.',
    useCases: ['Checking exact age for a form, application or eligibility rule', 'Finding how many days remain until the next birthday', 'Calculating the age of a child in months', 'Working out age on a past or future date']
  },
  'scientific-calculator': {
    intro: 'This scientific calculator evaluates expressions that go beyond basic arithmetic: trigonometric functions, logarithms, exponents, roots, powers and brackets. Type or tap an expression and get the result, with a choice of degrees or radians for trigonometry.',
    useCases: ['Solving homework problems with sine, cosine and tangent', 'Evaluating logarithms and exponentials', 'Checking long expressions with nested brackets', 'Quick engineering or physics arithmetic']
  },
  'fraction-calculator': {
    intro: 'The fraction calculator adds, subtracts, multiplies and divides fractions and mixed numbers, then reduces the answer to its simplest form. It shows the steps (finding a common denominator, cross-multiplying or inverting) so you can follow the method as well as get the answer.',
    useCases: ['Checking fraction homework and showing the working', 'Adding measurements in recipes or woodworking', 'Simplifying a fraction to lowest terms', 'Converting between improper fractions and mixed numbers']
  },
  'gpa-calculator': {
    intro: 'The GPA calculator computes a semester or cumulative grade point average from your courses, grades and credit hours. It supports the common 4.0 scale and weighted scales, so you can see how each course affects the overall figure.',
    useCases: ['Working out a semester GPA after results come out', 'Updating a cumulative GPA by adding a new term', 'Seeing what grades are needed to reach a target GPA', 'Comparing unweighted and weighted results']
  },
  'salary-to-hourly-calculator': {
    intro: 'The salary to hourly calculator converts an annual salary into the equivalent hourly, weekly, biweekly and monthly pay, based on the hours you work per week and weeks per year. It works in reverse too, so you can see what an hourly wage adds up to over a year.',
    useCases: ['Comparing a salaried offer with an hourly job', 'Working out your effective hourly rate for a part-time schedule', 'Estimating biweekly or monthly gross pay', 'Checking how unpaid time off changes yearly earnings']
  },
  'interest-calculator': {
    intro: 'The interest calculator compares simple interest with compound interest on the same deposit. Simple interest is calculated only on the original amount, while compound interest is calculated on the amount plus interest already earned. Enter the principal, rate and term to see both results side by side.',
    useCases: ['Seeing how much extra compounding earns over simple interest', 'Estimating interest on a fixed deposit or savings balance', 'Checking the interest portion of a short-term loan', 'Teaching the difference between the two methods']
  },
  'currency-converter': {
    intro: 'The currency converter changes an amount from one currency to another using the exchange rates stored on the site. Rates are benchmark reference values and may differ from the rate a bank, card or money-transfer service offers, so treat the result as an estimate.',
    useCases: ['Estimating the cost of an overseas purchase', 'Getting a rough idea of travel budgets in another currency', 'Comparing prices listed in different currencies', 'Converting between major currencies and the Pakistani rupee']
  },
  'tip-and-discount-calculator': {
    intro: 'The tip and discount calculator handles two everyday jobs: adding a tip to a restaurant bill and splitting the total between several people, and finding the sale price after a percentage discount. Enter the bill or original price and the percentage to see the amounts.',
    useCases: ['Calculating a tip at a chosen percentage', 'Splitting a bill evenly among a group', 'Finding the final price after a sale discount', 'Seeing how much you save with a markdown']
  },
  'retirement-calculator': {
    intro: 'The retirement calculator estimates how much you may need to have saved by retirement and whether your current savings and contributions are on track. It uses your current age, planned retirement age, savings, contributions, expected return and desired withdrawals. Projections depend entirely on the assumptions you enter and are not a guarantee.',
    useCases: ['Testing how much monthly saving a retirement goal requires', 'Seeing how a different retirement age changes the target', 'Checking how a higher or lower expected return changes the result', 'Estimating a sustainable withdrawal amount from a savings balance']
  },
  'investment-sip-calculator': {
    intro: 'The investment / SIP calculator projects the future value of a Systematic Investment Plan, where a fixed amount is invested at regular intervals. Enter the monthly amount, expected annual return and period to see the invested total, the estimated gains and the projected final value. Real returns vary and are not guaranteed.',
    useCases: ['Estimating what a monthly SIP could grow to over a chosen period', 'Comparing different monthly amounts', 'Seeing how the investment period affects the projected value', 'Separating total money invested from estimated gains']
  },
  'income-tax-calculator': {
    intro: 'The income tax calculator estimates federal income tax, payroll (FICA) withholding and take-home pay from gross annual income and filing status, using bracket-based progressive rates. It is meant for planning and does not replace official tax guidance or a tax return.',
    useCases: ['Estimating net take-home pay from a gross salary', 'Seeing your effective tax rate versus your marginal bracket', 'Comparing single and joint filing status', 'Planning for the impact of a raise or bonus']
  },
  'amortization-calculator': {
    intro: 'The amortization calculator builds a full payment schedule for a fixed-rate loan, showing for every payment how much goes to interest, how much reduces the principal, and the remaining balance. You can model extra payments to see how they shorten the term and reduce total interest.',
    useCases: ['Viewing the month-by-month breakdown of a mortgage or loan', 'Seeing how extra payments cut interest and time', 'Printing or saving a schedule for your records', 'Understanding why early payments are mostly interest']
  },
  'bmr-calculator': {
    intro: 'The BMR calculator estimates your basal metabolic rate, the energy your body uses at rest, from age, sex, height and weight. It uses the Mifflin-St Jeor and Harris-Benedict equations so you can compare the two results. BMR is an estimate and not a medical measurement.',
    useCases: ['Finding the starting point for a calorie plan', 'Comparing the Mifflin-St Jeor and Harris-Benedict estimates', 'Seeing how weight or age changes resting energy use', 'Learning how BMR relates to total daily energy expenditure']
  },
  'body-fat-calculator': {
    intro: 'The body fat calculator estimates body fat percentage with the U.S. Navy circumference method, which uses height and tape measurements of the neck and waist (and hips for women). It is a practical estimate and can differ from clinical methods such as DEXA scans.',
    useCases: ['Tracking changes in body composition over time with the same measuring method', 'Getting an estimate without special equipment', 'Seeing your approximate lean mass and fat mass', 'Complementing BMI, which does not distinguish fat from muscle']
  },
  'pregnancy-due-date-calculator': {
    intro: 'The pregnancy due-date calculator estimates your due date (EDD) from the first day of your last menstrual period and your cycle length, and shows how far along you are. The common rule adds 280 days (40 weeks) to the last period. Only a healthcare provider can confirm dates, usually with an ultrasound.',
    useCases: ['Getting an estimated due date after a positive test', 'Seeing the current gestational week', 'Adjusting the estimate for a longer or shorter cycle', 'Preparing dates to discuss with a doctor or midwife']
  },
  'ovulation-calculator': {
    intro: 'The ovulation / ideal weight calculator estimates your fertile window from the start of your last period and average cycle length, and also gives ideal body weight ranges from height. Cycle-based estimates are approximate because ovulation timing varies from person to person and cycle to cycle.',
    useCases: ['Estimating the likely fertile window for the current cycle', 'Planning around cycle length when it is regular', 'Seeing an ideal weight range for your height', 'Preparing cycle information for a healthcare conversation']
  },
  'percentage-change-calculator': {
    intro: 'The percentage change calculator measures how much a value has increased or decreased relative to its starting point. Enter the old and new values to get the percent change and the absolute difference. The formula is (new − old) ÷ old × 100.',
    useCases: ['Measuring growth or decline in sales, prices or followers', 'Comparing a price now with a price last year', 'Checking a salary increase in percent', 'Understanding the difference between percent change and percentage-point change']
  },
  'square-footage-calculator': {
    intro: 'The square footage / area calculator multiplies length by width to find the area of rooms, walls, yards and floors, and converts the result between square feet and square meters. It is useful as a first step before estimating paint, flooring or concrete.',
    useCases: ['Measuring a room before buying flooring', 'Finding wall area for painting', 'Estimating a yard or plot area', 'Converting between square feet and square meters']
  },
  'concrete-calculator': {
    intro: 'The concrete calculator estimates the volume of concrete needed for slabs, footings and similar shapes from length, width and thickness, and converts it to cubic yards or cubic meters and a number of pre-mix bags. Adding a small allowance for spillage and uneven ground is common practice.',
    useCases: ['Estimating concrete for a patio or garage slab', 'Working out how many pre-mix bags to buy', 'Converting between cubic yards and cubic meters', 'Checking a quantity quoted by a supplier']
  },
  'paint-calculator': {
    intro: 'The paint calculator estimates how much paint a room needs from the wall area, minus doors and windows, plus ceilings if included, and the number of coats. It converts the total area into gallons using the coverage of the paint you plan to use.',
    useCases: ['Deciding how many gallons or litres to buy', 'Subtracting door and window areas from wall area', 'Planning a second coat', 'Comparing quantities for different rooms']
  },
  'tile-calculator': {
    intro: 'The tile calculator works out how many floor or wall tiles you need from the area and tile size, with settings for grout gaps and a waste allowance for cuts and breakage. It rounds up so you can order full tiles.',
    useCases: ['Ordering enough tiles for a floor or backsplash', 'Adding a waste allowance for cuts and breakage', 'Accounting for grout joint width', 'Comparing the number of tiles needed for different tile sizes']
  },
  'length-converter': {
    intro: 'The length converter changes a measurement between inches, feet, yards, miles, millimeters, centimeters, meters and kilometers. Enter a value in any unit and the equivalents are shown, using exact standard conversion factors (for example 1 inch = 2.54 cm).',
    useCases: ['Converting between metric and imperial measurements', 'Checking dimensions in product specifications', 'Travel and distance conversions', 'Homework and engineering unit work']
  },
  'weight-converter': {
    intro: 'The weight converter changes a mass between pounds, ounces, kilograms, grams, metric tonnes and stones. Enter a value in one unit to see all the others at once, using standard conversion factors (for example 1 lb = 0.45359237 kg).',
    useCases: ['Converting body weight between kilograms, pounds and stones', 'Adjusting recipe quantities between grams and ounces', 'Checking shipping or luggage weight limits', 'Converting between metric tonnes and kilograms']
  },
  'temperature-converter': {
    intro: 'The temperature converter changes values between Celsius, Fahrenheit and Kelvin. It uses the standard formulas: °F = °C × 9/5 + 32 and K = °C + 273.15.',
    useCases: ['Reading a weather forecast or oven setting in another scale', 'Science and homework problems that use Kelvin', 'Cooking conversions between Celsius and Fahrenheit', 'Checking the temperature in a foreign recipe or manual']
  },
  'pakistan-income-tax-calculator': {
    intro: 'The Pakistan income tax calculator estimates income tax on a salary using the progressive slab structure published by the Federal Board of Revenue (FBR), and shows the monthly deduction and net pay. Tax rules change, so check the FBR for the latest official slabs before filing.',
    useCases: ['Estimating monthly tax deducted from a salary', 'Seeing which slab your income falls into', 'Comparing take-home pay at different salary levels', 'Planning ahead for a salary change']
  },
  'pakistan-electricity-bill-calculator': {
    intro: 'The Pakistan electricity bill calculator estimates a residential bill from the units consumed using slab-based tariffs, plus adjustments such as the fuel price adjustment (FPA). Actual bills also depend on your DISCO, taxes and any current surcharges, so use the result as an estimate.',
    useCases: ['Estimating next month\'s bill from expected units', 'Seeing how crossing a slab changes the cost', 'Comparing the bill at different usage levels', 'Checking an electricity bill for obvious discrepancies']
  },
  'zakat-calculator': {
    intro: 'The zakat calculator estimates your zakat due, commonly 2.5% of eligible wealth held for a full lunar year above the Nisab threshold. Enter cash, gold, silver and business assets, and subtract eligible liabilities. For a ruling on your own situation, consult a qualified scholar.',
    useCases: ['Estimating annual zakat on savings and assets', 'Checking whether your wealth is above the Nisab', 'Including gold, silver and business inventory', 'Preparing figures before discussing with a scholar']
  },
  'gold-price-calculator': {
    intro: 'The gold price calculator estimates the value of gold jewelry in Pakistan from its weight (in tola or grams), karat purity and making charges. Enter the per-unit gold rate you want to use and the result updates instantly. Market rates change throughout the day, so confirm the current rate with a jeweler.',
    useCases: ['Estimating the value of jewelry before buying or selling', 'Converting between tola and grams', 'Seeing the effect of karat purity on value', 'Including making charges in the total cost']
  },
  'silver-zakat-calculator': {
    intro: 'The silver / zakat-on-gold calculator checks your holdings against the classical Nisab thresholds based on silver or gold and calculates the 2.5% due if you are above it. The silver Nisab used here is 612.36 grams. Scholarly opinions on which standard to use can differ, so confirm with a qualified scholar.',
    useCases: ['Checking whether silver holdings reach the Nisab', 'Comparing the silver and gold Nisab standards', 'Calculating zakat due on jewelry and bullion', 'Updating the calculation when the market price changes']
  },
  'hijri-gregorian-converter': {
    intro: 'The Hijri to Gregorian converter converts a date between the Islamic lunar (Hijri) calendar and the Gregorian calendar. Calendar conversion is arithmetic, so a result can differ by a day from a locally announced date because the Hijri month starts depend on moon sighting.',
    useCases: ['Converting a Hijri date on a document to Gregorian', 'Finding the Gregorian date of an Islamic occasion', 'Converting your birthday between calendars', 'Checking historical dates']
  },
  'ac-tonnage-calculator': {
    intro: 'The AC tonnage / BTU calculator estimates the air conditioner capacity a room needs from its dimensions and conditions such as sun exposure, top-floor roof and number of occupants. One ton of cooling equals 12,000 BTU per hour. Use the result as a guide when comparing models.',
    useCases: ['Choosing between a 1-ton, 1.5-ton and 2-ton AC', 'Adjusting for a top-floor room or sunny windows', 'Converting between BTU and tons', 'Avoiding an AC that is too small or too large for the room']
  },
  'date-difference-calculator': {
    intro: 'The date difference calculator counts the exact number of calendar days, weeks, months and years between two dates, and the number of weekdays (business days) in the period. It handles leap years automatically.',
    useCases: ['Counting days until an event or deadline', 'Working out the length of a contract or project', 'Counting business days between two dates', 'Finding how long ago something happened']
  },
  'time-hours-calculator': {
    intro: 'The time / hours calculator adds and subtracts hours and minutes, which is useful for timesheets and work shifts. It handles the base-60 arithmetic of time so that 1 hour 45 minutes plus 2 hours 30 minutes correctly equals 4 hours 15 minutes.',
    useCases: ['Totalling hours worked in a week', 'Finding the length of a shift with a break', 'Adding durations such as video or travel time', 'Converting hours and minutes to decimal hours for payroll']
  },
  'random-number-generator': {
    intro: 'The random number generator picks random integers within a minimum and maximum you choose, using your browser\'s cryptographic random source. You can generate one or several numbers, which is handy for draws, games and sampling.',
    useCases: ['Drawing a fair winner for a giveaway', 'Picking numbers for games or classroom activities', 'Choosing random samples from a numbered list', 'Generating several numbers in a range at once']
  },
  'standard-deviation-calculator': {
    intro: 'The standard deviation calculator computes the mean, variance and standard deviation of a data set, for either a sample or a whole population. The sample version divides by n − 1 and the population version by n, so choose the one that matches your data.',
    useCases: ['Measuring how spread out a set of values is', 'Statistics homework with step-by-step values', 'Comparing the variability of two data sets', 'Choosing between sample and population formulas']
  },
  'grade-calculator': {
    intro: 'The grade / test calculator converts test scores into a percentage and letter grade, and can work out the score you need on a final exam to reach a target course grade. It uses the weights you enter for each part of the course.',
    useCases: ['Converting marks into a percentage and letter grade', 'Finding the final exam score needed for a target grade', 'Combining weighted coursework and exams', 'Tracking progress during the term']
  }
};

export function getToolContent(slug: string): ToolContent | undefined {
  return TOOL_CONTENT[slug];
}
