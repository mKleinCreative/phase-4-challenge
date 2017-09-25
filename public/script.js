console.log('hello from the browser JavaScript')
$(document).ready(function(){
    var email,pass;
    $("#submit").click(function(){
        email=$("#email").val();
        pass=$("#password").val();
        $.post("http://localhost:3000/login",{email:email,pass:pass},function(data){
            if(data==='done')
            {
                window.location.href="/albums";
            }
        });
    });
});
