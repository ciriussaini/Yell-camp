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
        $(this).delay(6000 * index).fadeIn(3800).fadeOut(3900);
        $("li").hide();
    });
}
setInterval(test,30300);


