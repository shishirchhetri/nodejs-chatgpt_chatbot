import openai from './config/openai.js'
import readlineSync from 'readline-sync'
import colors from 'colors'

async function main(){
    console.log(colors.bold.green("Welcome to the Chatbot Program"));
    console.log(colors.bold.green("You can start chatting with the bot here."))
}
main()