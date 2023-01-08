import * as InboxSDK from '@inboxsdk/core';

InboxSDK.load(2, "sdk_ez-write-mv3_a2faec26d6").then((sdk) => {
  // the SDK has been loaded, now do something with it!
  sdk.Compose.registerComposeViewHandler((composeView) => {
    // a compose view has come into existence, do something with it!
    console.log("compose view: ", composeView)
    console.log("compose view with get html: ", composeView.getHTMLContent())
    composeView.addButton({
      title: "EZ Write",
      iconUrl:
      "https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365",
      onClick(event) {
        let emailPrompt = composeView.getTextContent(); 
        let newEmail; 
        fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
            'model': 'text-davinci-003',
            'prompt': `${emailPrompt}`,
            'max_tokens': 500,
            'top_p': 1,
            'frequency_penalty': 0,
            'presence_penalty': 0
        })
      }).then(response => response.json())
        .then(data => {
          console.log("data.choices[0].text", data.choices[0].text);
          console.log("data.choices[0]", data.choices[0]);
          newEmail = data.choices[0].text; 
          event.composeView.setBodyText(newEmail); 
      })
      },
    });
  });
});
