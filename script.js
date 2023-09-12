// =========================================================
// ------------------------Library--------------------------
// =========================================================

const attribute = {
    '1': 'EARTH',
    '2': 'WATER',
    '4': 'FIRE',
    '8': 'WIND',
    '16': 'LIGHT',
    '32': 'DARK',
    '64': 'DIVINE'
}
const race = {
    '1':'WARRIOR',
    '2':'SPELLCASTER',
    '4':'FAIRY',
    '8':'FIEND',
    '16':'ZOMBIE',
    '32':'MACHINE',
    '64':'AQUA',
    '128':'PYRO',
    '256':'ROCK',
    '512':'WINDBEAST',
    '1024':'PLANT',
    '2048':'INSECT',
    '4096':'THUNDER',
    '8192':'DRAGON',
    '16384':'BEAST',
    '32768':'BEASTWARRIOR',
    '65536':'DINOSAUR',
    '131072':'FISH',
    '262144':'SEASERPENT',
    '524288':'REPTILE',
    '1048576':'PSYCHO',
    '2097152':'DIVINE',
    '4194304':'CREATORGOD',
    '8388608':'WYRM',
    '16777216':'CYBERSE'
}
const type ={
    '2':'Normal Spell Card',
    '130':'Ritual Spell Card',
    '65538':'Quick-play Spell Card',
    '131074':'Continous Spell Card',
    '262146':'Equip Spell Card',
    '524290':'Field Spell Card',
    '4':'Normal Trap Card',
    '131076':'Continous Trap Card',
    '1048580':'Counter Trap Card',
    '17':'Normal Monster',
    '33':'Effect Monster',
    '65':'non-Effect Fusion Monster',
    '97':'Effect Fusion Monster',
    '129':'non-Effect Ritual Monster',
    '161':'Effect Ritual Monster',
    '545':'Spirit Monster',
    '673':'Ritual Spirit Monster',
    '1057':'Union Monster',
    '2081':'Gemini Monster',
    '4113':'Normal tuner Monster',
    '4129':'Effect tuner Monster',
    '4161':'non-Effect Fusion tuner Monster',
    '4193':'Effect Fusion tuner Monster',
    '4257':'Effect Ritual tuner Monster',
    '5153':'Union Tuner Monster',
    '8193':'non-Effect Synchro Monster',
    '8225':'Effect Synchro Monster',
    '12321':'Effect Synchro Tuner Monster',
    '2097185':'Flip Monster',
    '2101281':'Flip Tuner Monster',
    '4194337':'Toon Monster',
    '8388609':'on-Effect XYZ Monster',
    '8388641':'ffect XYZ Monster',
    '16777233':'ormal Pendulum Monster',
    '16777249':'ffect Pendulum Monster',
    '16777313':'ffect Pendulum Fusion Monster',
    '16777377':'ffect Pendulum Ritual Monster',
    '16777761':'ffect Pendulum Spirit Monster',
    '16781329':'ormal Pendulum Tuner Monster',
    '16781345':'Effect Pendulum Tuner Monster',
    '16785441':'Effect Pendulum Synchro Monster',
    '18874401':'Flip Pendulum Monster',
    '25165857':'Effect Pendulum XYZ Monster',
    '33554465':'Special Summon - Monster',
    '33554977':'Special Summon - Spirit Monster',
    '33558561':'Special Summon - Tuner Monster',
    '37748769':'Special Summon - Toon Monster',
    '50331681':'Special Summon - Effect Pendulum Monster',
    '67108865':'non-Effect link Monster',
    '67108897':'Effect link Monster'
}

// =========================================================
// ------------------Search-Function------------------------
// =========================================================

class card{
    constructor(name, id, type, race, attribute, atk, level, def, description){
        this.name = name;
        this.id = id;
        this.type = type;
        this.race = race;
        this.attribute = attribute;
        this.atk = atk;
        this.level = level;
        this.def = def;
        this.description = description;
    }
}

// =========================================================
// ------------------Search-Function------------------------
// =========================================================

let availableKeywords = [];
let availableIDS = [];
var cards_details = [];

fetch('all.json').then(response => response.json()).then(data => {
    for(let i = 0; i < data.length; i++){
        let card_details = new card(data[i].name, data[i].id, data[i].type, data[i].race, data[i].attribute, data[i].atk, data[i].level, data[i].def, data[i].description)
        availableKeywords.push(data[i].name);
        availableIDS.push(data[i].id);
        cards_details.push(card_details);
    }
}
)

const resultBox = document.querySelector('.result-box');
const inputBox = document.querySelector('.input-box');
const cardList = document.querySelector('.card-list');

inputBox.onkeyup = () => {
    let result = [];
    let input = inputBox.value;
    if(input.length){
        result = availableKeywords.filter((keyword) =>{
            return keyword.toLowerCase().includes(input.toLowerCase());
        });
    }
    display(result);
    if(!result.length){
        resultBox.innerHTML = '';
    }
}

function display(result){
    // Add max limit check
    let maxLimit = 30;
    if(result.length > maxLimit) {
        result = result.slice(0, maxLimit);
    }
    
    const content = result.map((list)=>{
        return "<li onclick=selectInput(this)>" + list + `<img src="https://card.yugioh-api.com/${availableIDS[availableKeywords.indexOf(list)]}/image/artwork" style="float:left;">` + "</li>";
    })
    resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

// =========================================================
// -------------------CARD-LIST-ON-SIDE---------------------
// =========================================================

let videosToBeMade = [];

function selectInput(list){
    let cardName = list.innerHTML.split("<img")[0];
    // inputBox.value = cardName;
    if(videosToBeMade.includes(cardName))
    return;
    videosToBeMade.push(cardName);
    let content = "";
    for(let i = 0; i < videosToBeMade.length; i++){
        content += "<li onclick=removeItem(this)>" + videosToBeMade[i] + `<img src="https://card.yugioh-api.com/${availableIDS[availableKeywords.indexOf(videosToBeMade[i])]}/image/artwork" style="float:left;">` + "</li>";
    }
    cardList.innerHTML = "<ul>" + content + "</ul>";
    // resultBox.innerHTML = "";   
}

function removeItem(list){
    let cardName = list.innerHTML.split("<img")[0];
    videosToBeMade.splice(videosToBeMade.indexOf(cardName),1);
    if(!videosToBeMade.length){
        cardList.innerHTML = '';
        return;
    }
    let content = "";
    for(let i = 0; i < videosToBeMade.length; i++){
        content += "<li onclick=removeItem(this)>" + videosToBeMade[i] + `<img src="https://card.yugioh-api.com/${availableIDS[availableKeywords.indexOf(videosToBeMade[i])]}/image/artwork" style="float:left;">` + "</li>";
    }
    cardList.innerHTML = "<ul>" + content + "</ul>";
}

// =========================================================
// -------------------EXPORT-CARD-DETAILS-------------------
// =========================================================

let exportButton = document.querySelector(".export-button");
let cardIds = "";
exportButton.onclick = () => {
    cardIds = getCardIdsFromName(videosToBeMade);
    copyToClipboard(cardIds);
}

function getCardIdsFromName(listOfNames){
    let result = "";
    if(!listOfNames.length){return;}
    for(let i = 0; i < listOfNames.length; i++){
        index = availableKeywords.indexOf(listOfNames[i]);

        result += cards_details[index].id
        if(i != listOfNames.length-1){
            result += "\n"
        }
    }
    return result + "";
}

function copyToClipboard(str) {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}