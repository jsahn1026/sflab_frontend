const selectedDate = document.querySelector(
  '.cl-control.cl-dateinput input'
).value;

const inputElements = document.querySelectorAll(
  '.cl-control.cl-inputbox input'
);
const textAreaElements = document.querySelectorAll(
  '.cl-control.cl-textarea textarea'
);
const selectInputElements = document.querySelectorAll(
  '.cl-text.cl-preventinput div'
);

const peopleCountElement = inputElements[8];
const officeNumberElement = inputElements[11];
const phoneNumberElement = inputElements[12];

const groupNameElement = selectInputElements[1];
const nameElement = selectInputElements[2];

const eventName = textAreaElements[0];
const eventContent = textAreaElements[1];

peopleCountElement.value = 20;
groupNameElement.textContent = '기타';
nameElement.textContent = '박중현';
officeNumberElement.value = '010-7380-0104';
phoneNumberElement.value = '010-7380-0104';
eventName.value = '행사명';
eventContent.value = '행사내용';
