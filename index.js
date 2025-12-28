const input = document.getElementById("input-value");
const form = document.querySelector(".my-form");
const image = document.getElementById("generated-image");
const prompt_text = document.getElementById('prompt-text');
const imageContainer = document.getElementById("images-visible");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const prompt = input.value.trim();
  console.log(prompt)
    ;


  puter.ai.txt2img(`${prompt}`)
    .then(imageElement => {
      prompt_text.innerText = prompt
      // imageContainer.appendChild(imageElement);
      image.src = imageElement.src
      imageContainer.style.display = "block"
    })
    ;

})