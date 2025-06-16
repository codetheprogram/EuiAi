import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import  OpenAI  from 'openai'


dotenv.config()

const configuration = new OpenAI({
  apiKey: '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',
});

const openai = new OpenAI(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;
  
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `${prompt}`,
    //   messages: [
    //     { role: "developer", content: "You are a helpful assistant." },
    //     {
    //         role: "user",
    //         content: "Write a haiku about recursion in programming.",
    //     },
    // ],
      temperature: 0, 
      max_tokens: 4000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0 
    });

    res.status(200).send({
      bot: response.choices[0].text
    }); 

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))