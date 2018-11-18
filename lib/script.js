
  $( function() {
    $( ".datepicker" ).datepicker({dateFormat: 'dd/mm/yy'});
  } );


function addNewRow()
{
var hiddenRowNo = $('#hiddenRowNo').val();
  var row = '<tr id="rowNo'+hiddenRowNo+'">'
			+'<td><input type="text" class="form-control prod" id="item'+hiddenRowNo+'" placeholder="Description of service or product.."></td>'
			+'<td><input type="number" class="form-control prod" onkeyup="CalculateTotal('+hiddenRowNo+')" id="qty'+hiddenRowNo+'"></td>'
			+'<td><input type="number" class="form-control prod" onkeyup="CalculateTotal('+hiddenRowNo+')" id="rate'+hiddenRowNo+'"></td>'
			+'<td><input type="hidden" class="form-control totalAmt" id="total'+hiddenRowNo+'"><label id="totalLabel'+hiddenRowNo+'" style="color:black"></label></td>'
			+'<td><button class="btn btn-default" onclick="removeRow('+hiddenRowNo+')">X</button></td>'
		    +'</tr>';
			$('#tbody').append(row);
			$('#hiddenRowNo').val(parseInt(hiddenRowNo)+1);
}


function GrandTotalCalculation()
{
var sub_total = 0;
 $('.totalAmt').each(function(){
 if(this.value)
 {
  sub_total = parseFloat(sub_total) + parseFloat(this.value);
 }
 });
 var tax = $('#tax').val();
 if(!tax)
 {
  tax = 0;
 }
 var taxAmt = (parseFloat(sub_total)/100)*tax;
 var grand_total = parseFloat(sub_total)+parseFloat(taxAmt);
 $('#sub_total').val(sub_total);
 $('#grand_total').val(grand_total);
 $('#amount_paid').val("");
 $('#balanceAmt').val("Balance Due");
}

function removeRow(rowNo)
{
  $('#rowNo'+rowNo).remove();
  new GrandTotalCalculation();
}

function CalculateTotal(rowNo)
{
 $('#total'+rowNo).val("");
 $('#totalLabel'+rowNo).html("");
 var qty = $('#qty'+rowNo).val();
 var rate = $('#rate'+rowNo).val();
 if((qty || qty.length>0) && (rate && rate.length>0))
 {
 var total = parseFloat(rate)*parseFloat(qty);
 $('#total'+rowNo).val(total);
  $('#totalLabel'+rowNo).html("$ "+total);
 }
 new GrandTotalCalculation();
}

$(document).ready(function(){
	
$('#tax').keyup(function(){
new GrandTotalCalculation();
})	
	
$('#amount_paid').keyup(function(){
$('#balanceAmt').val("Balance Due");
var grand_total = $('#grand_total').val();
if(parseFloat(grand_total)<parseFloat(this.value))
{
alert("Paid Amount Can't be more than total amount");
$('#amount_paid').val("");
}
else
{
var balanceAmt = parseFloat(grand_total)-parseFloat(this.value);

if(balanceAmt != 'undefined' && !Number.isNaN(balanceAmt))
{
$('#balanceAmt').val("Balance Due $ "+balanceAmt);
}
}
});
});

function PrintInvoice()
{
var count = 0;
$('.prod').each(function(){
if(!this.value)
{
count = count+1;
}
})
if(!$('#billFrom').val() || !$('#billTo').val() || !$('#invoiceId').val() || !$('#date').val() || !$('#dueDate').val() || !$('#amount_paid').val() || !$('#notes').val() || !$('#terms').val() || count>0)
{
alert("Please make sure any field can not  be empty");
}
else{
 window.print();
}
}
