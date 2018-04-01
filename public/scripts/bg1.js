    var imgs = [
        "url(/images/camp1.jpg)",
        "url(/images/camp2.jpg)",
        "url(/images/camp3.jpg)",
        "url(/images/camp4.jpg)",
        "url(/images/camp5.jpg)"
      ];
for(var i=0;i<imgs.length;i++)    
{
 $("ul li").eq(i).css("background-image", imgs[i]);   
}
test();
function test(){
    $("li").each(function(index) {
        
        $(this).delay(3000 * index).fadeIn(3000).fadeOut(2000);
    });
    $("li").hide();
}
setInterval(test,15900);


