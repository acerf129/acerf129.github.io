var mydata = JSON.parse(data);
if (mydata!=null){
    let mydataString="";
    for(var i=0;i<mydata.length;i++){
        mydataString+='<div class="card"><a href="'+mydata[i].url_link+'"><h2>'+mydata[i].title+'</h2></a>'+
        '<h3>'+mydata[i].body+'</h3>'+
        '<p>'+mydata[i].dataCreate+'</p></div>'
    }
    const rightcolumn= document.querySelector('.rightcolumn');
    rightcolumn.insertAdjacentHTML( 'beforeend', mydataString );
    const item_count = document.querySelector('.item-count');
    item_count.insertAdjacentHTML( 'beforeend', mydata.length);
}
        