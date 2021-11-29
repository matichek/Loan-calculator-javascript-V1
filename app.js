// global vars
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const resetBtn = document.getElementById('reset_btn');

// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {

  // hide results

  document.getElementById('results').style.display = "none";
  document.getElementById('loading').style.display = "block";

  // show results 
  setTimeout(calculateResults, 1000); 
  e.preventDefault();

});

// reset fields

resetBtn.addEventListener('click', resetResults);



// Calculate Results
function calculateResults(e){
  console.log('Calculating...');
  // UI Vars
  
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

    // show res
    document.getElementById('results').style.display = "block";
    document.getElementById('loading').style.display = "none";
  } else {
    showError('Please check your numbers');
  }

  
}

function showError(error) {
  // naredimo div

  document.getElementById('loading').style.display = "none";
  document.getElementById('results').style.display = "none";

  // get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  const errorDiv = document.createElement('div');
  // add class
  errorDiv.className = 'alert alert-danger';

  // create text
  errorDiv.appendChild(document.createTextNode(error));

  // insert error above heading
  card.insertBefore(errorDiv, heading);

  // clear error 3s
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}


function resetResults() {
    amount.value = "";
    interest.value = "";
    years.value = "";
    document.getElementById('results').style.display = "none";
}