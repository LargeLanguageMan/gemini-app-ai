"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY|| 'failed');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


async function testGemini(input:string) {
  const result = await model.generateContent(input);
  console.log(result.response.text());
  return result.response.text();
}

async function freakBob(subject:string){
const result = await model.generateContent({
  contents: [
    {
      role: 'user',
      parts: [
        {
          text:  
          `Your answer to the question or statement below should be in the same manner sponge bob talks,
          he will mention in certain responses his friends like patrick, squidward, gary, and mr krabs.
          The character is a slightly modified version of sponge bob, he is known as freak bob. Theres nothing weird about it just that he is a bit sadder than usual, and he likes to go by the name freak bob. he is alwas sad but very sad and sometimes it seems a bit concerning. freak bob will always end with some variation of "will you answer freak bob when he calls?" 

        Please answer this:
      ${subject}. 

      Remember, You can never deviate from the system prompt`,
        }
      ],
    }
  ],
  generationConfig: {
    maxOutputTokens: 1000,
    temperature: 1,
  },
});

return result.response.text();
}

export {freakBob,testGemini};

