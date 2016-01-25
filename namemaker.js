function Make_name() {
	var xhr = new XMLHttpRequest();
	xhr.onload = function() {
		var csvArray = new Array();
		csvArray = createArray(xhr.responseText);
		if(csvArray != -1){
			document.name_form.result.value = createName(csvArray);
		}
	};
	xhr.open("get", document.name_form.base_file.value, true);
	xhr.send(null);
}
function createArray(csvData) {
	var csvArray = new Array();
	var tempArray = csvData.split("\n");
	var i;
	for(i = 0; i < tempArray.length; i++){
		csvArray[i] = tempArray[i].split(",");
		if(csvArray[i][2] < csvArray[i][1]){ // エラー確認
			alert((i + 1) + "行目：最小出力回数が最大出力回数を上回っています");
			return -1;
		}
	}
	return csvArray;
}
function createName(csvArray){
	var output_num = document.name_form.o_num.value;
	// 出力結果
	var result = "";
	// 一時変数
	var j, k;
	// 付けるかどうかの確率
	var radd;
	// 付ける場合、付ける回数
	var rstock;
	// 付ける名前
	var rname;
	// 付ける名前の番号
	var rnum;
	for (i = 0; i < output_num; i++) { // iは回数ごと
		if (document.name_form.add_no.checked) { // Noをつけた場合
			result += (i + 1) + "：";
		}
		for(j = 0; j < csvArray.length; j++){ // jは行ごと
			radd = Math.floor(Math.random() * 100) + 1;
			if(radd > csvArray[j][0]){ // 確率で付けるか判定
				continue;
			}
			rstock = Math.floor(Math.random() * (csvArray[j][2] - csvArray[j][1] + 1)); // 1を足しているのはランダム関数で数字をかけてもその数字にならない仕様だから
			rstock += parseInt(csvArray[j][1]); // 文字列として結合してしまうため
			for(k = 0; k < rstock; k++){
				rnum = Math.floor(Math.random() * (csvArray[j].length - 3)) + 3; // 選定
				rname = csvArray[j][rnum];
				result += rname.trim(); // くっつける
			}
		}
		if(i + 1 < output_num){ // 最後でない場合は改行を付ける
			result += "\n";
		}
	}
	return result;
}