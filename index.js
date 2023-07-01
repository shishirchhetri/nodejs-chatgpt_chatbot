import openai from './config/openai.js'
import readlineSync from 'readline-sync'
import colors from 'colors'

async function main(){
    console.log(colors.bold.green("Welcome to the Chatbot Program"));
    console.log(colors.bold.green("You can start chatting with the bot here."))

    //for storing the chat history and context of the topic
    const chatHistory = [];

    while (true){
        const userInput = readlineSync.question(colors.yellow('You: '));

        try{
            //message array for iteraton over histroy
            const messages = chatHistory.map(([role,content]) =>({
                role,
                content,
            }));

            //add latest user input hellto message array
            messages.push({role:'user' , content: userInput});

            const completion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [{role:'user', content: userInput}],
            })
    
            const completionText = completion.data.choices[0].message.content;
    
            if(userInput.toLowerCase() === 'exit'){
                console.log(colors.green('Bot: ') + completionText);
                return;
            }
        
            console.log(colors.green('Bot: ')+ completionText);
    
            //update chat hisptry with user imput and assistant's response
            chatHistory.push(['user', userInput]);
            chatHistory.push(['assistant', completionText])

            

            
        }catch(error){
            console.log(colors.red("Error: ") + error);
        }
    
        
    }

}
main()