 $(function () {
     $("#recBtn" ).click(function() {
        var datatosend = JSON.stringify({
           receiverid: $('#receiverid').val()
        });
        console.log(datatosend);
        //$.post('/list', datatosend, function(result){}, 'json');
        $.ajax({
           type: 'POST',
           data: datatosend,
           contentType: 'application/json',
           url: 'list',
           success: function(data){
               document.getElementById('staticmessage').innerHTML = data;
           }
        });
    });
});

$(document).ready(function() {
   $('#home').addClass("active");
});
