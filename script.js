/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function selezione(event)
{


const risp = event.currentTarget;
const quest = risp.dataset.questionId;
const id = risp.dataset.choiceId;
reset(quest);



//cambio la checkbox
const checkbox = risp.querySelector('.checkbox');
checkbox.src = 'images/checked.png';

// aggiungo le classi alle risposte
const contenitore = event.currentTarget;
contenitore.classList.add('sel');

for (const cont of opzioni)
{
if (quest === cont.dataset.questionId && id !== cont.dataset.choiceId)
cont.classList.add('nonsel');

aggiungiRisposta(quest,id);


if(check())
{
    let risultato;
    let bottone = document.querySelector('button')
    remListener();
    risultato = RESULTS_MAP[risFinale()];
    let title = risultato.title;
    let text = risultato.contents;
    mostraris(title,text);
    bottone.addEventListener('click',resetall)

}





}

}

function risFinale()
{
    for (let i=0; i<rispDate.length;i++)
    {
        if (rispDate[0] === rispDate[1])
        return rispDate[0];
        else if (rispDate[1] === rispDate[2] )
        return rispDate[1];
        else if (rispDate[2] === rispDate[0])
        return rispDate[2];
        else if (rispDate[0] !== rispDate[1] && rispDate[1] !== rispDate[2]
            && rispDate[0] !== rispDate[2])
            return rispDate[0];
            
    }
}

function mostraris(title, contents)
{

 
 let block = document.querySelector('#ris');
 block.classList.add('mostra');
 block.classList.remove('nascondi')
 let titolo = block.querySelector('#titolo');
 let testo = block.querySelector('#contenuto');

 titolo.innerHTML = '';
 titolo.textContent = title;
 testo.innerHTML='';
 testo.textContent= contents;


}

function resetall()
{
    //resetto lo stato delle risposte 
    for( const opz of opzioni)
{
    opz.addEventListener('click',selezione);
    opz.classList.remove('sel')
    opz.classList.remove('nonsel')
    let checkbox = opz.querySelector('.checkbox')
            checkbox.src = 'images/unchecked.png';

}
// resetto l'array booleano
    for (let i =0;i< statorisp.length;i++)
    statorisp[i]=false;
// nascondo in risultato finale
    let block = document.querySelector('#ris');
    block.classList.remove('mostra');
    block.classList.add('nascondi')

}


function reset (quest)
{
  
    
    for (const box of opzioni)
    {   
        if (quest === box.dataset.questionId){ 
        box.classList.remove('sel')
        let checkbox = box.querySelector('.checkbox')
            checkbox.src = 'images/unchecked.png';
        box.classList.remove('nonsel')
        }
    }
}

function aggiungiRisposta(quest,id)
{
    if(quest === 'one'){
    rispDate.splice(0,1,id); 
    statorisp[0] = true}
    else if (quest === 'two'){
    rispDate.splice(1,1,id);
    statorisp[1] = true}
    else if(quest ==='three') {
    rispDate.splice(2,1,id);
    statorisp[2] = true}
  
}

function check()
{


    if (statorisp[0] && statorisp[1] && statorisp[2])
    return true;
    else
    return false;

}

function remListener ()
{
    for(const box of opzioni)
    box.removeEventListener('click',selezione);
}

const statorisp = [false,false,false];
const rispDate = [];
const opzioni = [];
const boxes = document.querySelectorAll('.choice-grid div');
for( const box of boxes)
{
    box.addEventListener('click',selezione);
    box.classList.add('neutro');
    opzioni.push(box);
}
