function Make_name() {
	var xhr = new XMLHttpRequest();
	xhr.onload = function() {
		createArray(xhr.responseText);
	};
	xhr.open("get", "jpn_lib.csv", true);
	xhr.send(null);
}
function createArray(csvData) {
	var csvArray = new Array();
	var tempArray = csvData.split("\n");
	var i;
	for(i = 0; i < tempArray.length; i++){
		csvArray[i] = tempArray[i].split(",");
	}
	var output_num = document.name_form.o_num.value;
	document.name_form.result.value = "";
	var j;
	var radd, rname, rnum;
	for (i = 0; i < output_num; i++) { // iは回数ごと
		if (document.name_form.add_no.checked) { // Noをつけた場合
			document.name_form.result.value += (i + 1) + "：";
		}
		for(j = 0; j < csvArray.length; j++){ // jは行ごと
			radd = Math.floor(Math.random() * 100) + 1;
			if(radd > csvArray[j][0]){ // 確率で付けるか判定
				continue;
			}
			rnum = Math.floor(Math.random() * (csvArray[j].length - 1)) + 1; // 選定
			rname = csvArray[j][rnum];
			document.name_form.result.value += rname.trim(); // くっつける
		}
		if(i + 1 < output_num){ // 最後でない場合は改行を付ける
			document.name_form.result.value += "\n";
		}
	}
}