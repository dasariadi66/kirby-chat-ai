function performSearch() {
    const query = document.getElementById('searchInput').value;
    const resultsContainer = document.getElementById('searchResults');

    if (!query) {
        alert('Please enter your question');
        resultsContainer.innerHTML = '';
        return;
    }

    const url = 'https://api.together.xyz/inference';
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer 9fbbe70c4873c734988eb803532f78c191a0cf29b35bc4c8e1f824c6f54b3751'
        },
        body: JSON.stringify({
            model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
            prompt: `<s>[INST] ${query}. Answer in a super friendly and childlike manner [/INST]`,
            max_tokens: 512,
            stop: ['</s>', '[/INST]'],
            temperature: 0.7,
            top_p: 0.7,
            top_k: 50,
            repetition_penalty: 1,
            n: 1
        })
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            const answer = json.choices[0].text; 
            resultsContainer.style.display = 'block';
            resultsContainer.innerHTML = `<p>Answer: <strong>Hello poyo! ${answer}. Have a good day poyo!!</strong></p>`; 
        })
        .catch(err => {
            console.error(err);
            resultsContainer.style.display = 'block';
            resultsContainer.innerHTML = `<p>An error occurred while fetching the data.</p>`;
        });
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = ''; 
    resultsContainer.style.display = 'none';
    resultsContainer.innerHTML = '';
}
