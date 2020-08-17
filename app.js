document.getElementById('loan-form').addEventListener('submit', calculateResults);

function calculateResults(e){
    const amount = document.querySelector('#amount');  

    const interest = document.querySelector('#interest');

    const years = document.querySelector('#years');

    const monthlyPayment = document.querySelector('#monthly-payment');

    const totalPayment = document.querySelector('#total-payment');

    const totalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(amount.value); // principal value

    const calculatedInterest = parseFloat(interest.value)/100/12; // interest rate

    const calculatedPayments = parseFloat(years.value)*12; // number of payments

    // monthly payments

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);

    const monthly = (principal * x * calculatedInterest)/(x-1);

    if(isFinite(monthly)){

        const loader = document.querySelector('#loading');

        const results = document.querySelector('#results');

        loader.style.display = 'block';

        setTimeout(() => {
            loader.style.display = 'none';
            results.style.display = 'block';
        }, 2000);

        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    }else{
        showError();
    }

    e.preventDefault();

    this.reset();
}

function showError(){

    const card = document.querySelector('.card');

    const heading = document.querySelector('.heading');

    const errorContainer = document.createElement('div');

    errorContainer.className = 'alert alert-danger';

    // errorContainer.appendChild(document.createTextNode(error));

    const errorMessage = document.createElement('h4');

    errorMessage.textContent = 'Please check your values';

    // card.appendChild(errorContainer);

    errorContainer.appendChild(errorMessage);

    card.insertBefore(errorContainer, heading);

    // remove error msg after 3s

    setTimeout(() => {
        errorContainer.remove();
    }, 3000);

}