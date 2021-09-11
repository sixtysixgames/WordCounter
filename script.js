/*
Copyright (C) 2021 sixtysixgames

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* 
    Created on : 
    Author     : sixtysixgames
*/


var prefixes = ["a", "an", "ante", "anti", "auto", "bi", "by", "circum", "co", "com", "con", "contra", "contro", "counter", "cyber", "de", "dis", "down", "e", "en", "epi", "ex", "extra", "fore",  "hetero",  "homeo", "homo", "hyper", "hypo", "il", "im", "in", "infra", "inter", "intra", "intro", "ir", "macro", "mega", "meta", "micro", "mid", "mini", "mis", "mono", "multi", "neo", "no", "non", "omni", "over", "out", "para", "post", "pre", "pro", "proto", "pseudo", "re", "self", "semi", "sub", "super", "supra", "sym", "syn", "tele", "therm", "thermo", "trans", "tri", "ultra", "un", "under", "uni", "up"];

function countWords(){
	// The list of prefixes culled from these sources
	//https://dictionary.cambridge.org/grammar/british-grammar/word-formation/prefixes
	//https://www.grammar-monster.com/lessons/hyphens_in_prefixes.htm
	//http://grammartips.homestead.com/hyphens2.html
	//https://www.dailywritingtips.com/the-prevailing-style-for-prefixes-no-hyphens/
	//https://www.thoughtco.com/common-prefixes-in-english-1692724


	var words = document.getElementById("theWords").value.trim();
        if(words == ""){
            return;
        }
	var space = " ";

	// remove single apostrophes to make a single word
	var aposstring = "[\'’]";
	var aposregexp = new RegExp(aposstring, "gi");
	words = words.replace(aposregexp, "");

	// substitute any common hyphenated prefixes to make a single word
	for (index = 0; index < prefixes.length; ++index) {
		var prefix = prefixes[index];
		var replacethis = prefix + "-";
		var pregexp = new RegExp("\\b" + replacethis, "gi");
		words = words.replace(pregexp, prefix);
	}
//alert(words);

	// dates convert to a single word - covers all formats in example
	var datestring = "[0-9]{1,4}[\-\.\/][0-9]{1,2}[\-\.\/][0-9]{1,4}";
	var dateregexp = new RegExp(datestring, "gi");
	words = words.replace(dateregexp, "DATE");

	// numbers convert to a single word - covers all formats in example
  	var numberstring = "[\.,:][0-9]";
	var numberregexp = new RegExp(numberstring, "gi");
	words = words.replace(numberregexp, "X0");

	// substitute punctuation with space
	words = words.replace(/[\W]+/g, space);

	// one final trim before counting
  	words = words.trim();

	var arr = words.split(' ');

	document.getElementById("wordcount").innerHTML = arr.length + " words.";
	document.getElementById("results").innerHTML =  words;
    document.getElementById("resultstable").innerHTML = tableFromArray(arr);
	
	//alert(arr.length + " words.");

    return false;
}

function clearWords(){
	document.getElementById("theWords").value = "";;
}

function tableFromArray(arr){
	var colcount = 0;
	var rowcount = 0;
	var cols = 20;
	var ret = "<table border='1' cellspacing='0'>";
	ret += "<tr><th></th>";
	for(var c = 1; c <= cols; c++){
		ret += "<th>" + c + "</th>";
	}
	ret += "</tr>";
	ret += "<tr>";
	ret += "<th>0</th>";
	for(var i = 0; i < arr.length; i++ ){
		ret += "<td>" + arr[i] + "</td>";
		colcount += 1;
		if(colcount == cols){
			colcount = 0;
			rowcount += cols
			ret += "</tr><tr>";
			ret += "<th>" + rowcount + "</th>";
		}
	}
	ret += "</tr>";
	ret += "</table>";
	return ret;
}
