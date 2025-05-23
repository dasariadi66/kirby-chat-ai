//selectors
let emptyQuestionDiv = document.getElementById('emptyQuestion')
let chatHistory = document.getElementById('chatHistory');

// initial state
chatHistory.style.display = 'none'

//Ask question when user presses enter
document.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("askKirby").click();
  }
});

//UI state handling
function displayLoadingState(){
    let loadingMessage = document.createElement('div')
    loadingMessage.id = 'loadingMessage'
    loadingMessage.classList.add('chat-message-loading')
    loadingMessage.textContent = `Kirby is thinking...`
    chatHistory.appendChild(loadingMessage);
}

function hideLoadingState(){
    let loadingState = document.getElementById('loadingMessage')
    chatHistory.removeChild(loadingState)
};
function clearChat(){
    chatHistory.innerHTML = '';
    chatHistory.style.display = 'none';
}

function clearQuestion(){
    document.getElementById('searchInput').value = '';
}

//Performing a call to the LLM
function performSearch() {
    chatHistory.style.display = 'block';
    const query = document.getElementById('searchInput').value;

    //adding user message onto chatbox
    let userMessage = document.createElement('div');
    userMessage.classList.add('chat-message', 'user');
    userMessage.textContent = `You: ${query}`;
    chatHistory.appendChild(userMessage);
    chatHistory.scrollTop = chatHistory.scrollHeight;
    if (!query) {
        userMessage.textContent =  `You: 👻`
        let emptyMessage = document.createElement('div');
        emptyMessage.classList.add('chat-message', 'kirby');
        emptyMessage.textContent = `Kirby says: Poyo! Please ask me something!`;
        chatHistory.appendChild(emptyMessage);
        chatHistory.scrollTop = chatHistory.scrollHeight;

    } else if(query){
        const url = 'https://api.together.xyz/completions';
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer tgp_v1_mnKpT_oYBnVGbs3Yt5b4ZjUh9nWxNkSpx5yFVSLCXTw'
            },
            body: JSON.stringify({
                model: 'mistralai/Mixtral-8x7B-Instruct-v0.1', //LLM
                prompt: `
                <s>[INST] You are Kirby, a friendly video game character from the Nintendo franchise.
                You will answer the following question: ${query}.
                Answer in a super friendly and childlike manner [/INST]`,
                max_tokens: 200,
                stop: ['</s>', '[/INST]'],
                temperature: 0.5,
                top_p: 0.7,
                top_k: 50,
                repetition_penalty: 1,
                n: 1,
            })
        };
    
        fetch(url, options)
            .then(displayLoadingState())
            .then(res => res.json())
            .then(json => {
                const answer = json.choices[0].text; 
                let kirbyMessage = document.createElement('div');
                kirbyMessage.classList.add('chat-message', 'kirby');
                kirbyMessage.textContent = `Kirby says: Poyo! ${answer}`;
                chatHistory.appendChild(kirbyMessage);
                hideLoadingState();
                chatHistory.scrollTop = chatHistory.scrollHeight;
            })
            .catch(err => {
                hideLoadingState();
                console.error(err);

                let errorMessage = document.createElement('div');
                errorMessage.classList.add('chat-message', 'kirby');
                errorMessage.textContent = `Kirby says: Poyo! I am sorry but I am error-ing out right now. Try again later.`;
                chatHistory.appendChild(errorMessage);
                chatHistory.scrollTop = chatHistory.scrollHeight;
            });
    }
    clearQuestion();
}
