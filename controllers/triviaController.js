const { Question } = require("../DB/models");
const { questionGenerator } = require("../DB/query");

const questionObjFunction = (question) => {
  let options = [];
  if (question.optionA === null) {
    options = ["Yes", "No"];
  } else {
    options = [
      question.answer,
      question.optionA,
      question.optionB,
      question.optionC,
    ];
  }

  options.sort(() => Math.random() - 0.5);

  const questionObj = {
    id: question.id,
    type: question.type,
    question: question.question,
    questionValues: JSON.parse(question.questionValues),
    answer: question.answer,
    options,
    optionA: question.optionA,
    optionB: question.optionB,
    optionC: question.optionC,
    questionAbout: question.questionAbout,
    parameterA: question.parameterA,
    parameterB: question.parameterB,
    rating: question.rating,
    numOfVotes: question.numOfVotes,
  };

  return questionObj;
};

module.exports.generateQuestion_get = async (req, res) => {
  try {
    const question = await questionGenerator();
    res.json(questionObjFunction(question));
  } catch (error) {
    console.log(error);
  }
};

module.exports.savedQuestion_get = async (req, res) => {
  try {
    let savedQuestions = await Question.findAll({});
    savedQuestions = savedQuestions.map((question) => {
      return {
        id: question.id,
        rating: question.rating,
      };
    });
    let sumRank = 0;
    savedQuestions.forEach((question) => {
      sumRank += question.rating;
    });
    questionIdAndPercentage = savedQuestions.map((question) => {
      return {
        id: question.id,
        percentage: Math.floor((question.rating / sumRank) * 100),
      };
    });
    const idArr = [];
    questionIdAndPercentage.forEach((question) => {
      for (let i = 0; i < question.percentage; i++) {
        idArr.push(question.id);
      }
    });
    const randomIndex = Math.floor(Math.random() * idArr.length);
    const question = await Question.findOne({
      where: { id: idArr[randomIndex] },
    });
    const questionObj = questionObjFunction(question.dataValues);
    res.json(questionObj);
  } catch (error) {
    console.log(error);
  }
};
