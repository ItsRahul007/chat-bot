// Checking the matchs of user's given text
export default function matchetext(msg: string) {
    if (msg.match("joke")) {
      return "Joke";
    }
  
    else if (msg.match(/summary|blog|article/)) {
      return "Article";
    }
  
    else if (msg.match("news")) {
      return "News";
    }
  
    else return "";
};
