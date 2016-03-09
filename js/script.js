var banks = [];
var branches = [];
$(document).ready(function(){               
    $.get("http://techm.co.in:3000/api/listbranch",function(data) {
        banks = data;
    });
    
$.get("http://techm.co.in:3000/api/ifsc/SBIN0000138",
                  function(data) {
                      $("#bank_name").html(data[0].BANK);
                      $("#bank_address").html(data[0].BANK);
                      $("#address_line_1").html(data[0].CITY);
                      $("#address_line_2").html(data[0].DISTRICT);
                      $("#address_line_3").html(data[0].ADDRESS);
                      $("#ifsc_code").html(data[0].IFSC);
                  }
               );
    
$("input[type=button]").click(function(){
        $.get("http://techm.co.in:3000/api/getbank/"+$("#ifsc_bank").val()+"/"+$("#ifsc_branch").val(),function(data) {
            $("#bank_name").html(data[0].BANK);
            $("#bank_address").html(data[0].BANK);
            $("#address_line_1").html(data[0].CITY);
            $("#address_line_2").html(data[0].DISTRICT);
            $("#address_line_3").html(data[0].ADDRESS);
            $("#ifsc_code").html(data[0].IFSC);
        });
});

$("#ifsc_bank").focusout(function(){
    $.get("http://techm.co.in:3000/api/bank/"+$("#ifsc_bank").val(),function(data) {
        branches = data;
    });
    
});
});

$("#ifsc_bank").keyup(function(){
   $("#ifsc_bank").autocomplete({
    source: banks,
    minLength: 4
   }); 
});
$("#ifsc_branch").keyup(function(){
   $("#ifsc_branch").autocomplete({
    source: branches,
    minLength: 4
   }); 
});
