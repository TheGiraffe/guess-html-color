const HTML_COLOR_LIST=["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", 
    "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", 
    "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", 
    "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki", "darkmagenta", 
    "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", 
    "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", 
    "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", 
    "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "grey", 
    "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", 
    "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", 
    "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen", 
    "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", 
    "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", 
    "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", 
    "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", 
    "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", 
    "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", 
    "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", 
    "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"];

var guessCount = 0;
initializeBoard();

function initializeBoard(){
        for (value in HTML_COLOR_LIST){
            const colorName = HTML_COLOR_LIST[value];
            const colorButton = document.createElement("button");
            colorButton.setAttribute("class","colorButton");
            colorButton.setAttribute("disabled","");
            colorButton.id = "b_"+ colorName;
            colorButton.innerHTML = colorName;
            document.getElementById("buttonsContainer").appendChild(colorButton);
        }
    }

function generateColor(){
    const targetIndex = Math.floor(Math.random()*HTML_COLOR_LIST.length);
    const myDiv = document.getElementById("targetColorBox");
    const targetColor = HTML_COLOR_LIST[targetIndex];
    myDiv.style.background = targetColor;
    adjustFontColor(myDiv);
    myDiv.innerHTML = "What Color Is This?";
    setBoard(targetColor);
}

function setBoard(targetColor){
    guessCount = 0;
    document.body.style.background = "#20262b";
    const guessTicker = document.getElementById("guessTicker");
    guessTicker.innerHTML = guessCount.toString();
    const buttons = document.getElementsByClassName("colorButton");
    let buttonIndex = 0;
    for (const button of buttons){
        const colorName = HTML_COLOR_LIST[buttonIndex];
        button.disabled = false;
        button.style.background = "revert";
        button.style.color = "revert";
        button.setAttribute("onclick","guessColor('"+colorName+"', '"+targetColor+"')");
        buttonIndex++;
    }
}

function disableButtons(){
    const buttons = document.getElementsByClassName("colorButton");
    for (const button of buttons){
        button.disabled = true;
    }
}

function adjustFontColor(myDiv){
    const bgCol = window.getComputedStyle(myDiv).backgroundColor;
    bgColEdit = bgCol.replace("rgb(","");
    bgColEdit = bgColEdit.replace(")","");
    bgArr = bgColEdit.split(",");
    // console.log(bgArr);
    const brightness = 0.2126*bgArr[0]+0.7152*bgArr[1]+0.0722*bgArr[2];
    if (brightness < 128){
        myDiv.style.color = "white";
    }else{
        myDiv.style.color = "#20262b";
    }
}

function guessColor(guessedColor, targetColor){
    guessCount += 1;
    const guessTicker = document.getElementById("guessTicker");
    guessTicker.innerHTML = guessCount.toString();
    const guessId = "b_"+ guessedColor;
    const thisButton = document.getElementById(guessId)
    thisButton.style.background = guessedColor;
    const targetColorBox = document.getElementById("targetColorBox");
    correct = false;
    console.log(targetColor);
    adjustFontColor(thisButton);
    if (guessedColor === targetColor){
        correct = true;
        targetColorBox.innerHTML = `Congratulations, you win! The correct HTML color was indeed <strong>${targetColor}</strong>. It only took you ${guessCount.toString()} guesses!`;
        disableButtons();
        document.body.style.background = targetColor;
    }else{
        correct = false;
    }
    console.log(correct);
}
