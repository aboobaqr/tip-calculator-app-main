'use strict';

// Percentages
const percentArr = [0.05, 0.1, 0.15, 0.25, 0.5];

// Variables
const tipBtn = [...document.querySelectorAll('.btn')];
const amount = document.querySelector('.disp-amount');
const totalDisplay = document.querySelector('.total-display');
const required = document.querySelector('.required');
const required2 = document.querySelector('.required2');
const customBtn = document.querySelector('.custom');
const resetBtn = document.querySelector('.btn-reset');

// Functions
const calcTip = function (bill, noPeople, percentage) {
  const billPerPerson = bill / noPeople;
  const tip = billPerPerson * percentage;
  return tip.toFixed(2);
};

const calcTotal = function (bill, noPeople, percentage) {
  const billPerPerson = bill / noPeople;
  const total = billPerPerson * percentage + billPerPerson;
  return total.toFixed(2);
};

const formatCur = function (cur) {
  const option = {
    style: 'currency',
    currency: 'USD',
  };
  return new Intl.NumberFormat('en-US', option).format(cur);
};

const displayTip = function (bill, noPeople, percentage) {
  // Display tip
  const tip = +calcTip(bill, noPeople, percentage);
  return (amount.textContent = Number.isFinite(tip) && tip > 0 ? formatCur(tip) : 'Error');
};

const displayTotal = function (bill, noPeople, percentage) {
  // Display total
  const total = +calcTotal(bill, noPeople, percentage);
  return (totalDisplay.textContent =
    Number.isFinite(total) && total > 0 ? formatCur(total) : 'Error');
};

const errorMsg = function (noPeople) {
  // Display error message
  if (noPeople === 0) {
    required.classList.remove('hidden');
    required2.classList.add('hidden');
  } else if(noPeople < 0) {
    required2.classList.remove('hidden');
    required.classList.add('hidden');
  } else {
    required.classList.add('hidden'); 
    required2.classList.add('hidden');
  }
};

// Event handler
tipBtn.forEach(function (btn, i) {
  const percentage = percentArr[i];
  btn.addEventListener('click', function () {
    // Inputs variables
    const bill = Number(document.querySelector('input.bill').value);
    const noPeople = Number(document.querySelector('input.no-people').value);

    displayTip(bill, noPeople, percentage);

    displayTotal(bill, noPeople, percentage);

    errorMsg(noPeople);
  });
});

customBtn.addEventListener('click', function () {
  // Input variables
  const percentage = +window.prompt('Input Tip %') / 100;
  const bill = Number(document.querySelector('input.bill').value);
  const noPeople = Number(document.querySelector('input.no-people').value);

  displayTip(bill, noPeople, percentage);

  displayTotal(bill, noPeople, percentage);

  errorMsg(noPeople);
});

resetBtn.addEventListener('click', function () {
  amount.textContent = totalDisplay.textContent = '0.00';
  document.querySelector('input.no-people').value = 0;
  document.querySelector('input.bill').value = 0;
});
