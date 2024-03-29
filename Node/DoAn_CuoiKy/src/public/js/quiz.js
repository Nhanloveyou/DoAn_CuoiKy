const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Ai đẹp trai nhất',
    answers: [
      { text: 'Nhân', correct: true },
      { text: 'Vẫn là Nhân :))', correct: true }
    ]
  },
  {
    question: 'Làm sao để master nodejs trong 1 ngày?',
    answers: [
      { text: 'Đốt sách bỏ vô nước uống', correct: false },
      { text: 'Đoán xem', correct: false },
      { text: 'Không thể', correct: true },
      { text: 'Nằm ngủ', correct: false }
    ]
  },
  {
    question: 'Bạn thích học IT không?',
    answers: [
      { text: 'Có', correct: true },
      { text: 'Không', correct: true },
      { text: 'Chán', correct: true },
      { text: 'Mệt', correct: true }
    ]
  },
  {
    question: '1 + 1 = ? (2 )',
    answers: [
      { text: '3', correct: false },
      { text: '11', correct: false },
      { text: '2', correct: false },
      { text: '10', correct: true }
    ]
  }
]