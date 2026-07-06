(function () {
  "use strict";

  var content = window.LEARNING_CONTENT;
  var storageKey = "powering-intelligence-progress";
  var state = loadState();
  var cardIndex = 0;
  var cardFlipped = false;
  var quizIndex = 0;
  var quizAnswers = [];
  var quizLocked = false;
  var glossaryCategory = "All";
  var game = {
    activeTerms: [],
    current: null,
    mode: "mixed",
    round: 0,
    score: 0,
    streak: 0,
    answered: false,
    totalRounds: 10
  };

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || { completed: [], quizFinished: false, bestScore: 0, bestGameScore: 0 };
    } catch (error) {
      return { completed: [], quizFinished: false, bestScore: 0, bestGameScore: 0 };
    }
  }

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
    updateProgress();
  }

  function updateProgress() {
    var progress = LearningCore.calculateProgress(state.completed, content.lessons.length, state.quizFinished);
    document.getElementById("progress-value").textContent = progress + "%";
    document.getElementById("progress-ring").style.setProperty("--progress", progress + "%");
  }

  function renderLessons() {
    var list = document.getElementById("lesson-list");
    list.innerHTML = content.lessons.map(function (lesson, index) {
      var completed = state.completed.indexOf(lesson.id) !== -1;
      return [
        '<details class="lesson">',
        "<summary>",
        '<span class="lesson-index">0' + (index + 1) + "</span>",
        '<span class="lesson-title">' + lesson.title + "</span>",
        '<span class="lesson-toggle" aria-hidden="true">+</span>',
        "</summary>",
        '<div class="lesson-content">',
        "<div>",
        '<section class="learning-level level-one">',
        '<div class="level-heading"><span>LEVEL 1</span><strong>UNDERSTAND THE IDEA</strong></div>',
        "<h3>" + lesson.headline + "</h3>",
        "<p>" + lesson.body + "</p>",
        '<div class="analogy"><strong>TRY THIS ANALOGY</strong><p>' + lesson.analogy + "</p></div>",
        '<div class="mental-model"><strong>THE STORY IN ONE LINE</strong>' + lesson.model + "</div>",
        "</section>",
        '<section class="learning-level level-two">',
        '<div class="level-heading"><span>LEVEL 2</span><strong>LEARN THE WORDS</strong></div>',
        '<p class="bridge-copy">' + lesson.bridge + "</p>",
        '<div class="term-grid">' + lesson.keyTerms.map(function (item) {
          return '<article class="term-card"><h4>' + item.term + "</h4><p>" + item.meaning + "</p></article>";
        }).join("") + "</div>",
        "</section>",
        '<details class="technical-layer">',
        '<summary><span><b>LEVEL 3</b><strong>OPEN THE TECHNICAL LAYER</strong></span><small>Equations, system map and expert interpretation</small><i aria-hidden="true">+</i></summary>',
        '<section class="expert-layer">',
        '<div class="expert-label"><span>NOW QUANTIFY THE IDEA</span><span>TAKE YOUR TIME</span></div>',
        '<div class="equation-card"><strong>CORE RELATIONSHIP</strong><code>' + lesson.equation + '</code><p>' + lesson.workedExample + "</p></div>",
        '<div class="system-map" aria-label="Technical system map">' + lesson.systemMap.map(function (step, stepIndex) {
          return '<span><small>0' + (stepIndex + 1) + "</small>" + step + "</span>";
        }).join('<i aria-hidden="true">→</i>') + "</div>",
        '<div class="metric-grid">' + lesson.metrics.map(function (metric) {
          return '<div><strong>' + metric.value + "</strong><span>" + metric.label + "</span></div>";
        }).join("") + "</div>",
        '<div class="expert-note"><strong>EXPERT INTERPRETATION</strong><p>' + lesson.expertNote + "</p></div>",
        "</section>",
        "</details>",
        '<button class="complete-button' + (completed ? " completed" : "") + '" data-lesson-id="' + lesson.id + '">' + (completed ? "✓ Lesson complete" : "Mark lesson complete") + "</button>",
        "</div>",
        '<ul class="takeaways">' + lesson.takeaways.map(function (item) { return "<li>" + item + "</li>"; }).join("") + "</ul>",
        "</div>",
        "</details>"
      ].join("");
    }).join("");

    list.querySelectorAll(".complete-button").forEach(function (button) {
      button.addEventListener("click", function () {
        var id = button.dataset.lessonId;
        var position = state.completed.indexOf(id);
        if (position === -1) state.completed.push(id);
        else state.completed.splice(position, 1);
        button.classList.toggle("completed", position === -1);
        button.textContent = position === -1 ? "✓ Lesson complete" : "Mark lesson complete";
        saveState();
      });
    });
  }

  function renderNumbers() {
    document.getElementById("number-grid").innerHTML = content.numbers.map(function (item) {
      return '<article class="number-card"><strong>' + item.value + '<small> ' + item.unit + '</small></strong><h3>' + item.title + "</h3><p>" + item.note + "</p></article>";
    }).join("");
  }

  function renderGlossaryFilters() {
    var categories = ["All"].concat(Array.from(new Set(content.glossary.map(function (item) { return item.category; }))));
    document.getElementById("glossary-filters").innerHTML = categories.map(function (category) {
      return '<button class="glossary-filter' + (category === glossaryCategory ? " active" : "") + '" data-category="' + category + '">' + category + "</button>";
    }).join("");
    document.querySelectorAll(".glossary-filter").forEach(function (button) {
      button.addEventListener("click", function () {
        glossaryCategory = button.dataset.category;
        renderGlossaryFilters();
        renderGlossary();
      });
    });
  }

  function renderGlossary() {
    var query = document.getElementById("glossary-search").value.trim().toLowerCase();
    var matches = content.glossary.filter(function (item) {
      var inCategory = glossaryCategory === "All" || item.category === glossaryCategory;
      var searchable = [item.term, item.category, item.definition, item.formula].join(" ").toLowerCase();
      return inCategory && searchable.indexOf(query) !== -1;
    });
    document.getElementById("glossary-grid").innerHTML = matches.map(function (item) {
      return [
        '<article class="glossary-item">',
        '<div class="glossary-meta"><span>' + item.category + "</span></div>",
        "<h3>" + item.term + "</h3>",
        "<p>" + item.definition + "</p>",
        item.formula ? '<code class="glossary-formula">' + item.formula + "</code>" : "",
        "</article>"
      ].join("");
    }).join("");
    document.getElementById("glossary-empty").hidden = matches.length !== 0;
  }

  function shuffle(items) {
    var copy = items.slice();
    for (var i = copy.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }

  function sampleOptions(correct, pool, labelKey) {
    var options = [correct].concat(shuffle(pool.filter(function (item) {
      return item.term !== correct.term;
    })).slice(0, 3));
    return shuffle(options).map(function (item) {
      return {
        label: item[labelKey],
        term: item.term,
        correct: item.term === correct.term
      };
    });
  }

  function findPairForTerm(term) {
    return content.confusablePairs.find(function (pair) {
      return pair.a === term || pair.b === term;
    });
  }

  function hintForRound() {
    if (!game.current) return "";
    var term = game.current.correctTerm;
    var pair = findPairForTerm(term.term);
    return [
      '<strong>' + term.term + "</strong>",
      "<p>" + term.definition + "</p>",
      '<p><b>Category:</b> ' + term.category + "</p>",
      term.formula ? '<code>' + term.formula + "</code>" : "",
      pair ? '<p><b>Do not confuse it with ' + (pair.a === term.term ? pair.b : pair.a) + ":</b> " + pair.difference + "</p>" : ""
    ].join("");
  }

  function toggleGameHint() {
    var hint = document.getElementById("game-hint");
    hint.innerHTML = hintForRound();
    hint.hidden = !hint.hidden;
  }

  function renderGameSetup() {
    document.getElementById("game-score").textContent = game.score;
    document.getElementById("game-streak").textContent = game.streak;
    document.getElementById("game-round").textContent = game.round + " / " + game.totalRounds;
    document.getElementById("game-best").textContent = state.bestGameScore || 0;
  }

  function startGame() {
    var selected = document.querySelector('input[name="game-mode"]:checked');
    game.mode = selected ? selected.value : "mixed";
    game.activeTerms = shuffle(content.glossary);
    game.round = 0;
    game.score = 0;
    game.streak = 0;
    document.getElementById("game-setup").hidden = true;
    document.getElementById("game-result").hidden = true;
    document.getElementById("game-card").hidden = false;
    nextGameRound();
  }

  function getRoundMode() {
    if (game.mode !== "mixed") return game.mode;
    return ["term", "definition", "confusable"][game.round % 3];
  }

  function nextGameRound() {
    if (game.round >= game.totalRounds) {
      finishGame();
      return;
    }
    var roundMode = getRoundMode();
    var correct = game.activeTerms[game.round % game.activeTerms.length];
    var pair = findPairForTerm(correct.term) || content.confusablePairs[game.round % content.confusablePairs.length];
    var prompt = "";
    var helper = "";
    var options = [];

    game.round += 1;
    game.answered = false;
    document.getElementById("game-hint").hidden = true;
    document.getElementById("game-hint").innerHTML = "";
    document.getElementById("game-feedback").hidden = true;
    document.getElementById("five-box").hidden = true;
    document.getElementById("next-game-round").hidden = true;

    if (roundMode === "definition") {
      prompt = correct.definition;
      helper = "Which term does this definition describe?";
      options = sampleOptions(correct, content.glossary, "term");
    } else if (roundMode === "confusable") {
      correct = content.glossary.find(function (item) { return item.term === pair.a; }) || correct;
      prompt = "Which statement best separates " + pair.a + " from " + pair.b + "?";
      helper = "This mode trains the differences that tend to blur together.";
      options = shuffle([
        { label: pair.difference, term: correct.term, correct: true },
        { label: pair.a + " and " + pair.b + " are interchangeable terms.", term: "swap", correct: false },
        { label: pair.a + " is always measured in TWh, while " + pair.b + " is always measured in MW.", term: "unit", correct: false },
        { label: pair.b + " only matters for software and never for electricity systems.", term: "scope", correct: false }
      ]);
    } else {
      prompt = correct.term;
      helper = "Choose the best explanation.";
      options = sampleOptions(correct, content.glossary, "definition");
    }

    game.current = { correctTerm: correct, mode: roundMode, options: options };
    document.getElementById("game-mode-label").textContent = roundMode.toUpperCase();
    document.getElementById("game-category").textContent = correct.category;
    document.getElementById("game-prompt").textContent = prompt;
    document.getElementById("game-helper").textContent = helper;
    document.getElementById("game-options").innerHTML = options.map(function (option, index) {
      return '<button class="game-option" data-index="' + index + '">' + option.label + "</button>";
    }).join("");
    document.querySelectorAll(".game-option").forEach(function (button) {
      button.addEventListener("click", selectGameAnswer);
    });
    renderGameSetup();
  }

  function fiveBox(term) {
    return [
      { title: "Plain-English hook", body: term.definition },
      { title: "Category", body: term.category },
      { title: "Formula or unit", body: term.formula || "No fixed formula. Learn the role it plays in the system." },
      { title: "Why it matters", body: "This concept helps you reason about energy use, AI infrastructure and power-system impacts." },
      { title: "Say it out loud", body: term.term + " helps me explain " + term.category.toLowerCase() + " in the Energy & AI report." }
    ].map(function (item) {
      return '<article><span>' + item.title + "</span><p>" + item.body + "</p></article>";
    }).join("");
  }

  function selectGameAnswer(event) {
    if (game.answered) return;
    game.answered = true;
    var selected = game.current.options[Number(event.currentTarget.dataset.index)];
    var correct = selected.correct;
    var feedback = document.getElementById("game-feedback");

    if (correct) {
      game.streak += 1;
      game.score += 10 + Math.min(game.streak * 2, 10);
    } else {
      game.streak = 0;
    }

    document.querySelectorAll(".game-option").forEach(function (button) {
      var option = game.current.options[Number(button.dataset.index)];
      button.disabled = true;
      if (option.correct) button.classList.add("correct");
      if (button === event.currentTarget && !option.correct) button.classList.add("incorrect");
    });

    feedback.innerHTML = [
      "<strong>" + (correct ? "Correct." : "Not quite.") + "</strong>",
      "The answer is <b>" + game.current.correctTerm.term + "</b>. " + game.current.correctTerm.definition
    ].join(" ");
    feedback.hidden = false;
    document.getElementById("five-box").innerHTML = fiveBox(game.current.correctTerm);
    document.getElementById("five-box").hidden = false;
    document.getElementById("next-game-round").hidden = false;
    renderGameSetup();
  }

  function finishGame() {
    state.bestGameScore = Math.max(state.bestGameScore || 0, game.score);
    saveState();
    document.getElementById("game-card").hidden = true;
    document.getElementById("game-result").hidden = false;
    document.getElementById("game-result").innerHTML = [
      '<p class="eyebrow">LINGO ROUND COMPLETE</p>',
      "<h3>" + game.score + " points</h3>",
      "<p>Best score: " + state.bestGameScore + ". The strongest next move is to replay in Confusable pairs mode.</p>",
      '<button class="button button-primary" id="play-again">Play again ↻</button>'
    ].join("");
    document.getElementById("game-setup").hidden = false;
    document.getElementById("play-again").addEventListener("click", startGame);
    renderGameSetup();
  }

  function renderCard() {
    var card = content.flashcards[cardIndex];
    document.getElementById("card-label").textContent = cardFlipped ? "ANSWER" : "QUESTION";
    document.getElementById("card-text").textContent = cardFlipped ? card.a : card.q;
    document.querySelector(".flip-hint").textContent = cardFlipped ? "Click to see question" : "Click to reveal";
    document.getElementById("flashcard").classList.toggle("answer", cardFlipped);
    document.getElementById("card-count").textContent = (cardIndex + 1) + " / " + content.flashcards.length;
  }

  function changeCard(direction) {
    cardIndex = (cardIndex + direction + content.flashcards.length) % content.flashcards.length;
    cardFlipped = false;
    renderCard();
  }

  function startQuiz() {
    quizIndex = 0;
    quizAnswers = [];
    quizLocked = false;
    document.querySelector(".quiz-intro").hidden = true;
    document.getElementById("quiz-result").hidden = true;
    document.getElementById("quiz-panel").hidden = false;
    renderQuestion();
  }

  function renderQuestion() {
    var question = content.quiz[quizIndex];
    quizLocked = false;
    document.getElementById("question-number").textContent = "QUESTION " + (quizIndex + 1) + " OF " + content.quiz.length;
    document.getElementById("live-score").textContent = quizAnswers.filter(function (answer, i) { return answer === content.quiz[i].correct; }).length + " CORRECT";
    document.getElementById("quiz-progress-bar").style.width = ((quizIndex + 1) / content.quiz.length * 100) + "%";
    document.getElementById("question-text").textContent = question.question;
    document.getElementById("feedback").hidden = true;
    document.getElementById("next-question").hidden = true;
    document.getElementById("answer-list").innerHTML = question.answers.map(function (answer, index) {
      return '<button class="answer" data-answer="' + index + '">' + String.fromCharCode(65 + index) + ". " + answer + "</button>";
    }).join("");
    document.querySelectorAll(".answer").forEach(function (button) {
      button.addEventListener("click", selectAnswer);
    });
  }

  function selectAnswer(event) {
    if (quizLocked) return;
    quizLocked = true;
    var selected = Number(event.currentTarget.dataset.answer);
    var question = content.quiz[quizIndex];
    quizAnswers.push(selected);
    document.querySelectorAll(".answer").forEach(function (button) {
      var answer = Number(button.dataset.answer);
      button.disabled = true;
      if (answer === question.correct) button.classList.add("correct");
      if (answer === selected && selected !== question.correct) button.classList.add("incorrect");
    });
    var feedback = document.getElementById("feedback");
    feedback.innerHTML = "<strong>" + (selected === question.correct ? "Correct." : "Not quite.") + "</strong> " + question.explanation;
    feedback.hidden = false;
    document.getElementById("next-question").textContent = quizIndex === content.quiz.length - 1 ? "See my result →" : "Next question →";
    document.getElementById("next-question").hidden = false;
  }

  function nextQuestion() {
    if (quizIndex < content.quiz.length - 1) {
      quizIndex += 1;
      renderQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    var score = LearningCore.scoreQuiz(quizAnswers, content.quiz);
    state.quizFinished = true;
    state.bestScore = Math.max(state.bestScore || 0, score);
    saveState();
    document.getElementById("quiz-panel").hidden = true;
    var result = document.getElementById("quiz-result");
    result.hidden = false;
    result.innerHTML = [
      '<p class="eyebrow">YOUR RESULT</p>',
      "<h2>" + score + " / " + content.quiz.length + "</h2>",
      "<h3>" + LearningCore.resultMessage(score, content.quiz.length) + "</h3>",
      "<p>Your best score is " + state.bestScore + ". Retrieval makes the next attempt easier.</p>",
      '<button class="button button-dark" id="retry-quiz">Try again ↻</button>'
    ].join("");
    document.getElementById("retry-quiz").addEventListener("click", startQuiz);
  }

  renderLessons();
  renderNumbers();
  renderGlossaryFilters();
  renderGlossary();
  renderGameSetup();
  renderCard();
  updateProgress();

  document.getElementById("flashcard").addEventListener("click", function () {
    cardFlipped = !cardFlipped;
    renderCard();
  });
  document.getElementById("previous-card").addEventListener("click", function () { changeCard(-1); });
  document.getElementById("next-card").addEventListener("click", function () { changeCard(1); });
  document.getElementById("glossary-search").addEventListener("input", renderGlossary);
  document.getElementById("start-game").addEventListener("click", startGame);
  document.getElementById("next-game-round").addEventListener("click", nextGameRound);
  document.getElementById("show-game-hint").addEventListener("click", toggleGameHint);
  document.getElementById("start-quiz").addEventListener("click", startQuiz);
  document.getElementById("next-question").addEventListener("click", nextQuestion);
})();
