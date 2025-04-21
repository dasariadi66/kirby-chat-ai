//selectors
let inputQuery = document.getElementById("searchInput");
let loadingState = document.getElementById('loadingState');
let emptyQuestionDiv = document.getElementById('emptyQuestion')

//Ask question when user presses enter
inputQuery.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("askKirby").click();
  }
});

//UI state handling
function displayLoadingState(){
    loadingState.style.display = 'block'
}

function hideLoadingState(){
    loadingState.style.display = 'none'
};

function showEmptyQuestionReply(){
    emptyQuestionDiv.style.display = 'block'
}

function hideEmptyQuestionReply(){
    emptyQuestionDiv.style.display = 'none';
}

function clearAnswer() {
    document.getElementById('searchResults').innerHTML = ''; 
    document.getElementById('searchResults').style.display = 'none';
}

function clearQuestion(){
    document.getElementById('searchInput').value = '';
}

//Performing a call to the LLM
function performSearch() {
    
    const query = document.getElementById('searchInput').value;
    const resultsContainer = document.getElementById('searchResults');

    if (!query) {
        showEmptyQuestionReply();
    } else if(query){
        hideEmptyQuestionReply();
        displayLoadingState();
        const url = 'https://api.together.xyz/inference';
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer 9fbbe70c4873c734988eb803532f78c191a0cf29b35bc4c8e1f824c6f54b3751'
            },
            body: JSON.stringify({
                model: 'mistralai/Mixtral-8x7B-Instruct-v0.1', //LLM
                prompt: `
                <s>[INST] You are Kirby, a friendly video game character from the Nintendo franchise.
                You will answer the following question: ${query}.
                Answer in a super friendly and childlike manner [/INST]`,
                max_tokens: 512,
                stop: ['</s>', '[/INST]'],
                temperature: 0.7,
                top_p: 0.7,
                top_k: 50,
                repetition_penalty: 1,
                n: 1,
            })
        };
    
        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                hideLoadingState();
                const answer = json.choices[0].text; 
                resultsContainer.style.display = 'block';
                resultsContainer.innerHTML = `<p>Answer: <strong>Poyo! ${answer}. Have a good day poyo!!</strong></p>`; 
            })
            .catch(err => {
                console.error(err);
                resultsContainer.style.display = 'block';
                resultsContainer.innerHTML = `<p><strong>Poyo! I am sorry but I am error-ing out right now. Try again later. Have a good day poyo!!</strong></p>`;
            });
    }
}
