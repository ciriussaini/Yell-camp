var counter = 0;
changeBG();
function changeBG(){
    var imgs = [
        "url(/images/camp1.jpg)",
        "url(/images/camp2.jpg)",
        "url(/images/camp3.jpg)",
        "url(/images/camp4.jpg)",
        "url(/images/camp5.jpg)"
      ];
    
    if(counter === imgs.length) 
        {
            counter = 0;
        }
    
    $("ul li").eq(counter+1).css("background-image", imgs[counter]);
    counter++;
}
setInterval(changeBG,5000);
  


