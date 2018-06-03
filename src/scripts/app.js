// manifest.json's `run_at` declaration acts as a DOM ready listener
//  when set to "document_end" so the whole script in run only then
const system = getSystem();
let context = getContext();
let App;

// Where the magic will happen
// switch(context){} to load appropriate class here

// We should have a main ChatInterface class that holds all the API communication and logic
//   Extend it with Platform specific classes that handle the frontend logic and whatever else

switch(context) {
  case 'twitch':
    App = new Twitch();

  default:
    // Do nothing;
}

if(App) {
  App.init();
}
