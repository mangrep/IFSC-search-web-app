var banks = [];
var branches = [];
var url = "http://techm.co.in:3000/api";
$(document).ready(function(){               
    
    //$("#ifsc_branch").attr("readonly","readonly");
    
    $.get("http://techm.co.in:3000/api/listbranch",function(data) {
        banks = data;
    });

    
    
  $("#bank_name").html();
  $("#bank_address").html();
  $("#address_line_1").html();
  $("#address_line_2").html();
  $("#address_line_3").html();
  $("#ifsc_code").html();
    
$("input[type=button]").click(function(){
    var bank = $("#ifsc_bank").val();
    var branch = $("#ifsc_branch").val();
    if(bank.trim() === "" || branch.trim() === ""){
        alert("Enter Datails");
        return false;
    }
        $.get(url+"/getbank/"+bank+"/"+branch,function(data) {
            $("#bank_name").html(data[0].BANK);
            $("#bank_address").html(data[0].BANK);
            $("#address_line_1").html(data[0].CITY);
            $("#address_line_2").html(data[0].DISTRICT);
            $("#address_line_3").html(data[0].ADDRESS);
            $("#ifsc_code").html(data[0].IFSC);
            $("#micr_code").html(data[0]['MICR CODE']);
        });
});

$("#ifsc_bank").focusout(function(){
    /*if($("#ifsc_bank").val() === ""){
        $("#ifsc_branch").attr("readonly","readonly");
        return false;
    }else{
        $("#ifsc_branch")..removeAttr("readonly");
    }*/
    $.get(url+"/bank/"+$("#ifsc_bank").val(),function(data) {
        branches = data;
    });
    
});
});

$("#ifsc_bank").keyup(function(){
   $("#ifsc_bank").autocomplete({
    source: banks,
    minLength: 2
   }); 
});
$("#ifsc_branch").keyup(function(){
   $("#ifsc_branch").autocomplete({
    source: branches,
    minLength: 2
   }); 
});
