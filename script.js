const toggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
if (toggle && sidebar) {
  toggle.addEventListener('click', () => {
    const open = sidebar.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}
const quiz = document.querySelector('#quiz-form');
if (quiz) {
  quiz.addEventListener('submit', (event) => {
    event.preventDefault();
    const questions = [...quiz.querySelectorAll('.question')];
    let score = 0;
    questions.forEach((question) => {
      const answer = question.dataset.answer;
      const selected = question.querySelector('input:checked');
      const feedback = question.querySelector('.feedback');
      if (selected && selected.value === answer) {
        score++;
        feedback.textContent = 'Correto!';
        feedback.className = 'feedback correct';
      } else {
        const correctLabel = question.querySelector(`input[value="${answer}"]`).parentElement.textContent.trim();
        feedback.textContent = `Resposta correta: ${correctLabel}`;
        feedback.className = 'feedback incorrect';
      }
    });
    const result = document.querySelector('#quiz-result');
    result.textContent = `Você acertou ${score} de ${questions.length} questões (${Math.round(score / questions.length * 100)}%). ${score === questions.length ? 'Excelente trabalho!' : score >= 4 ? 'Muito bem! Revise os pontos que errou.' : 'Continue estudando e tente novamente.'}`;
    result.classList.add('show');
    result.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  quiz.addEventListener('reset', () => {
    quiz.querySelectorAll('.feedback').forEach((item) => { item.textContent = ''; item.className = 'feedback'; });
    const result = document.querySelector('#quiz-result');
    result.textContent = '';
    result.classList.remove('show');
  });
}
