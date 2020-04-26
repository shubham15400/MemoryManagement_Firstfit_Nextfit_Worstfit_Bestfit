
function GUI(blksorig, blks, prss, m, n, ans) {

    var outerstart = '<div id="myProgress">';
    var divend = '</div>';

    for (var i = 0; i < m; ++i) {

        var inner = "";
        var temparr = [];

        for (var j = 0; j < n; ++j) {
            if (ans[j] == i + 1) {
                temparr.push(j);
            }
        }

        for (var j = 0; j < temparr.length; ++j) {

            var prosize = prss[temparr[j]];
            var blocksize = blksorig[i];
            var per = (prosize / blocksize) * 100;
            inner += '<div id="myBar" style="width:' + (per - 1).toString() + '%;">';
            inner += "P" + (temparr[j] + 1).toString();
            inner += divend;
        }

        if (i == 0) {
            document.getElementById("optxt1").innerHTML = outerstart + inner + divend;
        }
        else {
            document.getElementById("optxt1").innerHTML += outerstart + inner + divend;
        }
    }

    for (var i = 0; i < n; ++i) {

        if (i == 0) {
            document.getElementById("optxt2").innerHTML = "Process " + (i + 1).toString() + " of size " + prss[i] + " is allocated to Block " + ans[i] + "<br>";
        }
        else {
            document.getElementById("optxt2").innerHTML += "Process " + (i + 1).toString() + " of size " + prss[i] + " is allocated to Block " + ans[i] + "<br>";
        }
    }

}



function wstfit(blks, prss) {

    var blksorig = [...blks];
    var m = blks.length;
    var n = prss.length;
    var alloc = [];
    var ans = [];

    for (var i = 0; i < n; i++) {
        alloc[i] = -1;
    }

    for (var i = 0; i < n; i++) {
        var high = Math.max(...blks);
        var index = blks.indexOf(high);

        if (high >= prss[i]) {
            alloc[i] = index;
            blks[index] -= prss[i];
        }
    }

    for (var i = 0; i < n; i++) {
        if (alloc[i] == -1) {
            ans[i] = "NA";
        }
        else {
            var x = alloc[i] + 1;
            ans[i] = x.toString();
        }
    }

    GUI(blksorig, blks, prss, m, n, ans);

}



function nxtfit(blks, prss) {

    var blksorig = [...blks];
    var m = blks.length;
    var n = prss.length;
    var alloc = [];
    var ans = [];
    var j = 0;


    for (var i = 0; i < n; i++) {
        alloc[i] = -1;
    }

    for (var i = 0; i < n; i++) {
        var temp = j;
        while (j < m) {
            if (blks[j] >= prss[i]) {
                alloc[i] = j;
                blks[j] -= prss[i];
                break;
            }
            j = (j + 1) % m;
            if (temp == j) {
                break;
            }
        }
    }

    for (var i = 0; i < n; i++) {
        if (alloc[i] == -1) {
            ans[i] = "NA";
        }
        else {
            var x = alloc[i] + 1;
            ans[i] = x.toString();
        }
    }

    GUI(blksorig, blks, prss, m, n, ans);

}



function fstfit(blks, prss) {

    var blksorig = [...blks];
    var m = blks.length;
    var n = prss.length;
    var alloc = [];
    var ans = [];

    for (var i = 0; i < n; ++i) {
        alloc[i] = -1;
    }

    for (var i = 0; i < n; ++i) {
        for (var j = 0; j < m; ++j) {
            if (blks[j] >= prss[i]) {
                alloc[i] = j;
                blks[j] -= prss[i];
                break;
            }
        }
    }

    for (var i = 0; i < n; i++) {
        if (alloc[i] == -1) {
            ans[i] = "NA";
        }
        else {
            var x = alloc[i] + 1;
            ans[i] = x.toString();
        }
    }


    GUI(blksorig, blks, prss, m, n, ans);

}



function bstfit(blks, prss) {

    var blksorig = [...blks];
    var m = blks.length;
    var n = prss.length;
    var alloc = [];
    var ans = [];

    for (var i = 0; i < n; ++i) {
        alloc[i] = -1;
    }

    for (var i = 0; i < n; i++) {

        var prev = -1;
        for (var j = 0; j < m; j++) {
            if (blks[j] >= prss[i]) {
                if (prev == -1)
                    prev = j;
                else if (blks[prev] > blks[j])
                    prev = j;
            }
        }

        if (prev != -1) {
            alloc[i] = prev;
            blks[prev] -= prss[i];
        }
    }

    for (var i = 0; i < n; i++) {
        if (alloc[i] == -1) {
            ans[i] = "NA";
        }
        else {
            var x = alloc[i] + 1;
            ans[i] = x.toString();
        }
    }

    GUI(blksorig, blks, prss, m, n, ans);

}




function arraycall() {

    var arr1 = document.getElementById("bsize").value;
    var arr2 = document.getElementById("psize").value;

    if (arr1 == "") {
        document.getElementById("optxt1").innerHTML = "Please Enter Block Sizes!!";
        return;
    }
    if (arr2 == "") {
        document.getElementById("optxt2").innerHTML = "Please Enter Process Sizes!!";
        return;
    }

    arr1 = arr1.split(",").map(function (i) { return parseInt(i, 10) });
    arr2 = arr2.split(",").map(function (i) { return parseInt(i, 10) });
    var ele = document.getElementById("allfit").value;

    // Next Fit
    if (ele == "nf") {
        nxtfit(arr1, arr2);
    }
    // Worst Fit
    else if (ele == "wf") {
        wstfit(arr1, arr2);
    }
    // First Fit
    else if (ele == "ff") {
        fstfit(arr1, arr2);
    }
    // Best Fit
    else if (ele == "bf") {
        bstfit(arr1, arr2);
    }
    else {
        document.getElementById("optxt1").innerHTML = "Please Select Valid Option!!";
        document.getElementById("optxt2").innerHTML = "Please Select Valid Option!!";
    }

}