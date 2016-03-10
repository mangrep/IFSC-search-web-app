var banks = [];
var branches = [];
var url = "http://techm.co.in:3000/api";
$(document).ready(function(){               
    
    
    // fetch the bank names if not found in localstorage
    
    if(localStorage.getItem("banks") === null){
    $.get("http://techm.co.in:3000/api/listbranch",function(data) {
        banks = data;
        localStorage.setItem("banks",data);
    });
    }else{
        banks = localStorage.getItem("banks").split(',');
    }

    
    $("input[type=button]").click(function(){
        var bank = $("#ifsc_bank").val();
        var branch = $("#ifsc_branch").val();
        if(bank === "" || !banks.contains(bank)){
            clearData();
            $("#ifsc_branch").val("");
            alert("Enter a Valid Bank Name...");
            return false;
        }else if(branch === "" || !branches.contains(branch)){
            clearData();
            alert("Enter a Valid Branch Name...");
            return false;
        }

        if(bank.trim() === "" || branch.trim() === ""){
            clearData();
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
            $("#bank_micr").html(data[0]['MICR CODE']);
        });
    });

    $("#ifsc_bank").focusout(function(){
        $("#ifsc_branch").val("");
        if($("#ifsc_bank").val() === ""){
            $("#ifsc_branch").attr("readonly","readonly");
            clearData();
            return false;
        }else{
            $("#ifsc_branch").removeAttr("readonly");
            clearData();
        }
        $.get(url+"/bank/"+$("#ifsc_bank").val(),function(data) {
            branches = data;
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
});


Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

function clearData(){
    $("#bank_name").html("");
    $("#bank_address").html("");
    $("#address_line_1").html("");
    $("#address_line_2").html("");
    $("#address_line_3").html("");
    $("#ifsc_code").html("");
    $("#bank_micr").html("");
}