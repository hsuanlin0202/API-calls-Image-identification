let watermark_text = '只提供XX公司所使用';

$(document).ready(function () {
	
	

    $("#idcard_send").click(function () {
    	$.blockUI({
            message: '<div class="orderblockUI" style="padding:25px;"><br/>資料辨識中...<br/><br/>請勿關閉視窗<br/>或重新整理<br/><br/></div>',
    	});
        var lastUpdatedDateTime = dateMaker();

        var Jdata = JSON.stringify({
            "version": "01.00",
            "username": "leasing",
            "password": "#leasing@test",
            "messageType": "BusinessBaseInformation",
            "lastUpdatedDateTime": lastUpdatedDateTime,
            "file_content": img64
        });

        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/namecard",
            data: Jdata,
            contentType: 'application/json; charset=UTF-8',
            success: function (response) {
                // console.log(response);
            	$.unblockUI();
                name_card_info(response.BusinessCard);
            },
            error: function (e) {
                console.log(e);
            },
            complete: function () {

            }

        })
    });
});

const id_check_f = () => {
	$.blockUI({
        message: '<div class="orderblockUI" style="padding:25px;"><br/>資料辨識中...<br/><br/>請勿關閉視窗<br/>或重新整理<br/><br/></div>',
	});
	var lastUpdatedDateTime = dateMaker();

    var Jdata = JSON.stringify({
        "version": "01.00",
        "username": "leasing",
        "password": "#leasing@test",
        "messageType": "IDCardFrontAnalysis",
        "lastUpdatedDateTime": lastUpdatedDateTime,
        "file_content": img64
    });

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/idcardFront",
        data: Jdata,
        contentType: 'application/json; charset=UTF-8',
        success: function (response) {
            // console.log(response.idCardFront);
        	$.unblockUI();
            if(!response.idCardFront){
            	$("#show1").attr("src", "");
            	$('#id_wordF').css('color','red');
            	$('#id_wordF').html('身分證辨識失敗，請重新上傳');
            	$('#uploadImage1').val('');
            }
            else{
            	$('#id_wordF').hide();
            	id_front_info(response.idCardFront);
            }
        },
        error: function (e) {
            console.log(e);
        },
        complete: function () {

        }

    })
}

const id_check_b = () => {
	$.blockUI({
        message: '<div class="orderblockUI" style="padding:25px;"><br/>資料辨識中...<br/><br/>請勿關閉視窗<br/>或重新整理<br/><br/></div>',
	});
	var lastUpdatedDateTime = dateMaker();

    var Jdata = JSON.stringify({
        "version": "01.00",
        "username": "leasing",
        "password": "#leasing@test",
        "messageType": "IDCardBackAnalysis",
        "lastUpdatedDateTime": lastUpdatedDateTime,
        "file_content": img64
    });

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/idcardBack",
        data: Jdata,
        contentType: 'application/json; charset=UTF-8',
        success: function (response) {
            // console.log(response.idCardBack);
        	$.unblockUI();
            if(!response.idCardBack){
            	$("#show2").attr("src", "");
            	$('#id_wordB').css('color','red');
            	$('#id_wordB').html('身分證辨識失敗，請重新上傳');
            	$('#uploadImage2').val('');
            }
            else{
            	$('#id_wordB').hide();
            	id_back_info(response.idCardBack);
            }
            // name_card_info(response.BusinessCard);
        },
        error: function (e) {
            console.log(e);
        },
        complete: function () {

        }

    })
}

const form_check = () => {
	$.blockUI({
        message: '<div class="orderblockUI" style="padding:25px;"><br/>資料辨識中...<br/><br/>請勿關閉視窗<br/>或重新整理<br/><br/></div>',
	});
	var lastUpdatedDateTime = dateMaker();

    var Jdata = JSON.stringify({
        "version": "01.00",
        "username": "leasing",
        "password": "#leasing@test",
        "messageType": "FourZeroOneAnalysis",
        "lastUpdatedDateTime": lastUpdatedDateTime,
        "file_content": img64
    });

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/form401check",
        data: Jdata,
        contentType: 'application/json; charset=UTF-8',
        success: function (response) {
        	$.unblockUI();
        	if(response.ResultCode == "1000"){
        		form_info(response.fourZeroOneReport);
        	}
        },
        error: function (e) {
            console.log(e);
        },
        complete: function () {

        }

    })
}

const form_info = (data) => {
//	var yy = data.belongYearMonth.year;
//	var sm = data.belongYearMonth.startMonth;
//	var em = data.belongYearMonth.endMonth;
//	sm =(sm > 9 ? '' : '0') + sm;
//	em= (em > 9 ? '' : '0') + em;
	$('#companyNumber').val(data.companyNumber);
	$('#companyName').val(data.companyName);
	$('#yearMonth').val(data.yearMonth);
	$('#subTotalSalesAmount').val(data.subTotalSalesAmount);
	$('#subTotalZeorTaxSalesAmount').val(data.subTotalZeorTaxSalesAmount);
	$('#salesTotal1').val(data.salesTotal1);
	$('#salesTotal2').val(data.salesTotal2);
}

const id_front_info = (data) => {
	var yy = data.dayOfIssue.year;
	var mm = data.dayOfIssue.month;
	var dd = data.dayOfIssue.day;
	mm =(mm > 9 ? '' : '0') + mm;
    dd = (dd > 9 ? '' : '0') + dd;
    
    var byy = data.brithday.year;
	var bmm = data.brithday.month;
	var bdd = data.brithday.day;
	bmm =(bmm > 9 ? '' : '0') + bmm;
    bdd = (bdd > 9 ? '' : '0') + bdd;
    
	$('#name').val(data.name);
	$('#gender').val(data.gender);
	$('#idNum').val(data.id);
	$('#dayOfIssue').val(yy+mm+dd);
	$('#authority').val(data.dayOfIssue.authority);
	$('#brithday').val(byy+bmm+bdd);
}

const id_back_info = (data) => {
	$('#address').val(data.address);
}

const name_card_info = (data) => {
	$('#companyName').val(data.companyName);
	$('#cardAddress').val(data.address);
	$('#cardName').val(data.name);
	$('#cardTitle').val(data.title);
	$('#presidentNo').val(data.presidentNo);
	$('#cardEmail').val(data.email);
	var phone1_inner = '<option value="0">請選擇電話</option>';
	var phone2_inner = '<option value="0">請選擇行動電話</option>';
	if(data.phone.length!=0){
		$('#cardPhone1').show();
		$('#cardPhone2').show();
		for(var i=0; i<data.phone.length; i++){
			if(data.phone[i].length>7){
				if(data.phone[i].slice(0, 2) == "09"){
					phone2_inner = phone2_inner + '<option value=' + data.phone[i] + '>' + data.phone[i] + '</option>';
				}else{
					phone1_inner = phone1_inner + '<option value=' + data.phone[i] + '>' + data.phone[i] + '</option>';
				}
			}
			else{
				$('#extnum').val(data.phone[i]);
				// $('#extension').show();
			}
		}
		$('#cardPhone1').html(phone1_inner);
		$('#cardPhone2').html(phone2_inner);
	}
}

const dateMaker = () => {
    var Today = new Date();
    var yy = Today.getFullYear();
    var mm = Today.getMonth() + 1;
    var dd = Today.getDate();
    var hh = Today.getHours();
    var mim = Today.getMinutes();
    var ss = Today.getSeconds();

    return [yy,
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd,
        (hh > 9 ? '' : '0') + hh,
        (mim > 9 ? '' : '0') + mim,
        (ss > 9 ? '' : '0') + ss
    ].join('');
};

const valueChecker = (inputbox, num, special) => {
    if (special == 0) {
        if ($('#' + inputbox).val() < num) {
            $('#' + inputbox).css("border-color", "red");
            info_check = false;
        } else {
            $('#' + inputbox).css("border-color", "#999999");
            info_check = true;
        }

    } else if (special == 1) {

        var emailRegxp = /[\w-.]+@[\w-]+(.[\w_-]+)+/;
        var email = $('#' + inputbox).val();
        if (emailRegxp.test(email) == true) {
            $('#' + inputbox).css("border-color", "#999999");
            info_check = true;
        } else {
            $('#' + inputbox).css("border-color", "red");
            info_check = false;
        }
    } else if (special == 2) {
        if ($('#' + inputbox).val() != "0") {
            $('#' + inputbox).css("border-color", "#999999");
            info_check = true;
        } else {
            $('#' + inputbox).css("border-color", "red");
            info_check = false;
        }

    }
};

const card_done = () => {
    valueChecker("companyName", 1, 0);
    // valueChecker("presidentNo", 8, 0);
    valueChecker("cardName", 1, 0);
    // valueChecker("cardTitle", 1, 0);
    valueChecker("cardEmail", 0, 1);
    valueChecker("cardAddress", 3, 0);
    valueChecker("cardPhone1", 0, 2);
    valueChecker("cardPhone2", 0, 2);
    if (info_check == true) {
        //alert("資料已上傳");
    }
};



	
	
