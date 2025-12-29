const input = document.getElementById("input-value");
const form = document.querySelector(".my-form");
const generateBtn = document.getElementById("generateBtn");
const loader = document.getElementById("loader");
const image = document.getElementById("generated-image");
const prompt_text = document.getElementById('prompt-text');
const imageContainer = document.getElementById("images-visible");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const prompt = input.value.trim();
  if (!prompt) return; // Prevent empty prompts
  
  console.log("Generating:", prompt);
  
  // SHOW LOADING
  generateBtn.disabled = true;
  loader.style.display = 'inline-block';
  
  try {
    // Your existing Puter.js API call
    const imageElement = await puter.ai.txt2img(`${prompt}`);
    
    // SUCCESS - Show result
    prompt_text.innerText = `"${prompt}"`;
    image.src = imageElement.src;
    imageContainer.style.display = "block";
    
  } catch (error) {
    console.error("Image generation failed:", error);
    alert("Failed to generate image. Please try again!");
  } finally {
    // ALWAYS hide loader and re-enable button
    loader.style.display = 'none';
    generateBtn.disabled = false;
  }
});