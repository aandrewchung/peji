const generateChatGPTResponse = require('./gpt.js');

async function parseStory(story) {
  // GENERATE 4 STORY BULLET POINTS b/c openai limit
  const max_chars = 100; //temp max characters

  const storyPrompt = 
    `You are a helpful bot that takes a story and generates 4 key points. 
    Choose 4 points that would make a good story and be easily drawn for a comic book written for children.
    When writing the points, write them as a description of a comic book image. 
    When referring to a character, refer to them by their name every single time. Do NOT use pronouns."
    Don't say anything else but 4 numbered pts and use simple language. 
    Only include information given in the story.
    DO NOT USE MORE THAN: ` + max_chars + ` NUMBER OF CHARACTERS PER BULLET POINT.

    Format example: 
    "1. The girl ran down the street
    2. The boy ran up the street"

    The story is as follows: ` + story;


  const rawDescription = await generateChatGPTResponse(storyPrompt);
  var descriptionArray = []

  var lines = rawDescription.split("\n");
  for (var i = 0; i < lines.length; i++) {
    descriptionArray.push(lines[i]);
  }

  return {rawDescription, descriptionArray}
}


async function extractPanels(story) {
  
  const {rawDescription, descriptionArray} = await parseStory(story);
  console.log("The descrp arr: ");
  console.log(descriptionArray);
  console.log("\n");
  

  return descriptionArray;
}

module.exports = { extractPanels };


// const story = "At a Pittsburgh Hackathon, Judge John walks around a gymnasium full of computers and people. He sees a group of four college students: Aleks, Andrew, Hugo, and Eric. They created incredible manga comic book project. Hugo and Aleks tell John a story about their project. John looks at the computer and smiles at the amazing comic book. He gives Eric a big high five. Andrew, Hugo, Aleks, and Eric win the hackathon and celebrate.";

// extractPanels(story);