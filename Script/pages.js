//load pages from json data
//compare with project name

var mydata = JSON.parse(data);
if (mydata!=null){
    let mydataString="";
    let urls = window.location.href;
    urls=urls.substring(urls.indexOf('io/')+3,urls.length-1)
    
    //for localurl: urls=urls.substring(urls.indexOf('io/'),urls.indexOf('index')-1)
    urls=urls.replaceAll('-',' ').toLowerCase();
    for(var i=0;i<mydata.length;i++){
        if(mydata[i].title.toLowerCase()==urls){
            mydataString+='<div class="card"><a href="'+mydata[i].url_link+'" target="_blank"><h2>'+mydata[i].title+'</h2></a>'+            
            '<h4>'+mydata[i].body+'</h4><br>';
            if(mydata[i].description!=undefined&&mydata[i].description!='')
                mydataString+='<h5>'+mydata[i].description+'</h5>';
            
            if(mydata[i].env!=undefined&&mydata[i].env!='')
                mydataString+='<h5>'+mydata[i].env+'</h5>';

            if(mydata[i].ref!=undefined&&mydata[i].ref!=''){
                let refs=mydata[i].ref
                let tempref
                tempref=refs.substring(refs.indexOf('http'))
                refs = refs.substring(0,refs.indexOf('http'))
                mydataString+='<h4><a href='+tempref+' target="_blank">'+refs+'</a></h4>';
            } 
            if(mydata[i].ref2!=undefined&&mydata[i].ref2!=''){
                let refs=mydata[i].ref2
                let tempref
                tempref=refs.substring(refs.indexOf('http'))
                refs = refs.substring(0,refs.indexOf('http'))
                mydataString+='<h4><a href='+tempref+' target="_blank">'+refs+'</a></h4>';
            } 
            mydataString+=
            '<h5>'+mydata[i].dataCreate+' by Mike'+'</h5>'+
            '</div>';
        }
    }
    const rightcolumn= document.querySelector('.rightcolumn');
    rightcolumn.insertAdjacentHTML( 'beforeend', mydataString );
    const item_count = document.querySelector('.item-count');
    item_count.insertAdjacentHTML( 'beforeend', mydata.length);
}
        