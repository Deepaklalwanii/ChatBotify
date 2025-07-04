window.addEventListener('load', () => {
    let inputContanier = document.querySelector('.input-box-container')
    let inputbox = document.querySelector('.input-box');
    let responsewrap = document.querySelector('.data-field');
    let loader = document.querySelector('.spinner');
  
    async function getdata(input_value) {
      const apiKey = 'AIzaSyA6pEaUavJMCQ_6YtlMpWitPcoGsQOfEuk';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
  
      const data = {
        contents: [
          {
            parts: [
              { text: input_value }
            ]
          }
        ]
      }; 
  
      try {
        loader.style.display = 'block';
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        return result.candidates[0].content.parts[0].text;
      } catch (error) {
        console.error('Error:', error);
        return 'Error fetching data';
      } finally{
        loader.style.display = 'none';
      }
    }
  
  let inputButton = document.querySelector('.input-btn');
  inputButton.addEventListener('click', async (e) => {
  e.preventDefault(); 
  const userMessage = inputbox.value.trim();
  if (!userMessage) return;

  // Append user message
  
  responsewrap.innerHTML += `<div class='user-message-container'><div class="message-user"> ${userMessage}</div></div>`;

  const ai_response = await getdata(userMessage);

  // Format AI response
  let formattedResponse = ai_response.replace(/(\*\*)(.*?)\1/g, '<b>$2</b>'); 
  formattedResponse = formattedResponse.replaceAll('*', '&#8226;');

  // Append AI message

  responsewrap.innerHTML += `<div class="ai-message-container"></div><div class="message-ai"> ${formattedResponse}</div></div>`;

  const heading = document.getElementsByClassName('heading')[0];
  const main_conatiner = document.getElementsByClassName('data-field')[0];
  stateHandle();

  if (heading) {
    heading.style.display = 'none';
    main_conatiner.style.display ='block';
    inputbox.value = '';
  }

  // Scroll to bottom
  responsewrap.scrollTop = responsewrap.scrollHeight;
});
  
    function stateHandle() {
      let inputButton = document.querySelector('.input-btn');
      if(document.querySelector(".input-box").value === "") {
        inputButton.disabled = true;
        inputButton.style.backgroundColor = "#676767"
  
      } else {
        inputButton.disabled = false;
        inputButton.style.backgroundColor = "white"
        inputButton.style.Color = "#2f2f2f"
      }
  }
  inputbox.addEventListener('input', stateHandle);
  inputbox.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();  
      inputButton.click(); 
      inputbox.value = '';
    inputbox.style.marginTop = 'auto';
    inputbox.style.marginBottom = '10px';
    inputbox.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  });
  stateHandle();

//for dark & light mode
  const toggleButton = document.getElementById('theme-toggle');
  toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('lightmode');
  });

  
  
});
  