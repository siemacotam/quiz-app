import axios from "axios";

export const apiErrorMessages = {
  0: "Success Returned results successfully",
  1: "No Results Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)",
  2: "Invalid Parameter Contains an invalid parameter. Arguements passed in aren't valid. (Ex. Amount = Five)",
  3: "Token Not Found Session Token does not exist.",
  4: "Token Empty Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.",
  5: "Rate Limit Too many requests have occurred. Each IP can only access the API once every 5 seconds.",
};

export type ResponseCodes = 0 | 1 | 2 | 3 | 4 | 5;

export type QuestionType = "multiple" | "boolean";

export interface Question {
  type: QuestionType;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface ApiResponse {
  response_code: ResponseCodes;
  results: Question[];
}

const API_URL = "https://opentdb.com/api.php";

export const fetchQuestions = async (
  category: string,
  difficulty: string
): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(
      `${API_URL}?amount=10&category=${category}&difficulty=${difficulty}`
    );
    return response.data;
  } catch (error) {
    console.log("err", error);
    return {
      response_code: 5,
      results: [],
    };
  }
};
