console.warn('array homework');

function findMinNumber() {
    var array = [15, 3, 7, 2, 10];
    // var min = Math.min(array);
    // var min = Math.min.apply(window, array);
    var min = array[0];
    // for (i = 0; i < array.length; i++) {
    //     var nr = array[i];
    //     if (min > nr) {
    //         min = nr;
    //     }
    // }
    array.forEach(function (nr) {
        if (min > nr) {
            min = nr;
        }
    });
    console.info('min = ', min);
}

findMinNumber();

var repetenti4B = [];
findMinNumber(repetenti4B);

var repetenti7C = [];
findMinNumber(repetenti7C);

// ######## sortare ###############

function sortAsc(array) {
    console.warn('sorting...', array);
    // array.sort();
    for (var j = 0; j < array.length; j++) {
        for (var i = 0; i < array.length - 1 - j; i++) {
            console.info('compare', array[i], array[i + 1]);
            if (array[i] > array[i + 1]) {
                console.info('change...');
                var tmp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = tmp;
            }
        }
        console.info('sorted...', array);
    }
}

sortAsc([1, 2, 3, 4, 5]);
sortAsc([5, 4, 3, 2, 1]);
sortAsc([2, 1, 3, 5, 4]);