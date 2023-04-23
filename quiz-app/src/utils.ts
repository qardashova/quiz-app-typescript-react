export function shuffleArray(arr:string[]) : string[] {
    let n:number = arr.length;
    for (let i = n - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

//! What I need:
//? show your answer and the right answer
// if the answer that I choose is the right answer the background should be green if it's not the background shoul be red and also it has to show you the right answer
//?  the  "next question" button
// when I choose one of the answers it should appear and when I click this button it have to direct me to the next question (increase the value of the question number)
//? A state for the current question number
// every time I click the "next question" button it will increase
//? A state for score
// if the answer that wechoosed is the right answer the score should be increased , at the end when we rish the end (if question number = all quesions number) then it have to show us the result of score


export {}