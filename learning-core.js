(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.LearningCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function calculateProgress(completedIds, lessonCount, quizFinished) {
    var lessons = Array.isArray(completedIds) ? completedIds.length : 0;
    var totalUnits = lessonCount + 1;
    var completedUnits = Math.min(lessons, lessonCount) + (quizFinished ? 1 : 0);
    return Math.round((completedUnits / totalUnits) * 100);
  }

  function scoreQuiz(answers, questions) {
    return answers.reduce(function (score, answer, index) {
      return score + (answer === questions[index].correct ? 1 : 0);
    }, 0);
  }

  function resultMessage(score, total) {
    var ratio = score / total;
    if (ratio >= 0.9) return "Grid thinker";
    if (ratio >= 0.7) return "Strong foundation";
    if (ratio >= 0.5) return "The model is forming";
    return "One more pass";
  }

  return {
    calculateProgress: calculateProgress,
    scoreQuiz: scoreQuiz,
    resultMessage: resultMessage
  };
});
