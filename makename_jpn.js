function Make_name() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
    	createArray(xhr.responseText);
    };
    xhr.open("get", "jpn_lib.csv", true);
    xhr.send(null);
}
function createArray(csvData) {
	var tempArray = csvData.split("\n");
	var firstArray = tempArray[0].split(',');
	var lastArray = tempArray[1].split(',');
    console.log(tempArray);
    var output_num = document.name_form.o_num.value;
	document.name_form.result.value = '';
	var i, j;
    // 乱数命名
	var fname, lname, fnum, lnum;
	for (i = 0; i < output_num; i++) {
		if (document.name_form.add_no.checked) { // Noをつけた場合
			document.name_form.result.value += (i + 1) + '：';
		}
		fname = ""; // 最初のところ
		fnum = Math.floor(Math.random() * firstArray.length);
		fname += firstArray[fnum];
		lname = ""; // 後のところ
		lnum = Math.floor(Math.random() * lastArray.length);
		lname += lastArray[lnum];
		document.name_form.result.value += fname + lname + "\n";
	}
}