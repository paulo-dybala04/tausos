$(document).ready(function(){
	AOS.init();
	var btnPublish = $('.publish');

	$('#mode').change(function(){
		$('body').attr('id', $("select[name=mode]").val());
	})

	// on Publish
	btnPublish.click(function(){
		var nama = $("input[name=nama]").val();
		var bio = $("textarea[name=bio").val();
		var mode = $("select[name=mode]").val();
		var wa = $("input[name=wa]").val();
		var fb = $("input[name=fb]").val();
		var ig = $("input[name=ig]").val();
		var tw = $("input[name=tw]").val();
		var yt = $("input[name=yt]").val();


		if(fb.includes('https://')){
			fb = fb.substring(8)
		}

		if(ig.includes('https://')){
			ig = ig.substring(8)
		}

		if(tw.includes('https://')){
			tw = tw.substring(8)
		}

		if(yt.includes('https://')){
			yt = yt.substring(8)
		}

		// account extendsclass.com
		// user = tausos@gmail.com / pw = tausos88

			$.ajax({
				type: "POST",
				url: "https://json.extendsclass.com/bin",
				contentType: "application/json",
				headers: {"Api-key":"3b01aadd-d590-11ea-aef4-0242ac110002","Private":"true"},
				data: JSON.stringify({"nama":nama,"bio":bio,"mode":mode,"wa":wa,"fb":fb,"ig":ig,"tw":tw,"yt":yt}),
				beforeSend: function(){
				  $('.publish').html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`)
				},
				success: function(data){
					var arrayData = JSON.parse(data);
					window.location.href = "user.html?niu=" + arrayData.id.toString()
				}
			})
		
	})

	// -------------------------------------------------------------------------------------------------
	// USER.HTML

	// function get URL PARAMETERS

	var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
	};

	function action(data){
		var arrayUser = JSON.parse(data);

		var bio = arrayUser.bio;
		var mode = arrayUser.mode;
		var waArray = arrayUser.wa;
		var fbArray = arrayUser.fb;
		var igArray = arrayUser.ig;
		var twArray = arrayUser.tw;
		var ytArray = arrayUser.yt;

		$('.bio').text(bio);

		console.log(mode);
		$('body').attr('id', mode);


		if(arrayUser.nama == ""){
			$('.nama').html("User tidak ada");
		}else{
                        $('title').text(arrayUser.nama + " | Sosial Media ");
			$('.nama').text(arrayUser.nama);
		}

		if(arrayUser.wa != ""){
			$(".wa").attr("href", "https://wa.me/" + waArray);
		}else{
			$(".wa").hide();
		}

		if(arrayUser.fb != ""){
			$(".fb").attr("href", "https://" + fbArray);
		}else{
			$(".fb").hide();
		}


		if(arrayUser.ig != ""){
			$(".ig").attr("href", "https://" + igArray);
		}else{
			$(".ig").hide();
		}


		if(arrayUser.tw != ""){
			$(".tw").attr("href", "https://" + twArray);
		}else{
			$(".tw").hide();
		}


		if(arrayUser.yt != ""){
			$(".yt").attr("href", "https://" + ytArray);
		}else{
			$(".yt").hide();
		}
		
		if(arrayUser.wa == "" && arrayUser.fb == "" && arrayUser.ig == "" && arrayUser.tw == "" && arrayUser.yt == ""){
			$('.no-link').show();
		}
	}

	// cek jika ada parameter NIU
	var field = 'niu';
	var url = window.location.href;
	if(url.indexOf('?' + field + '=') != -1){

	 	//Jika Ada
	 	var niu = getUrlParameter('niu');

	 		$.ajax({
			type: "GET",
			url: "https://json.extendsclass.com/bin/" + niu,
			success: function(data){
				action(data);
			}
		});

	}else

		//Jika Tidak Ada

	  console.log('Tidak ada parameter NIU(Nomor Induk User)');


	 // Share Button
	 var url = window.location.href;
	 var waBtn = $('.share-wa');
	 var fbBtn = $('.share-fb');

	 waBtn.attr('href', "whatsapp://send?text=" + url);
	 fbBtn.attr('href', "https://www.facebook.com/sharer/sharer.php?u=" + url);

});
