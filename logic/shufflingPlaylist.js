 shuffle=  function(arr){
    var curIndex = arr.length , temp , randomIndex;

    while(0 !== curIndex){
        randomIndex = Math.floor(Math.random() * curIndex);
        curIndex -=1;

        temp = arr[curIndex];
        arr[curIndex] = arr[randomIndex];
        arr[randomIndex] = temp;
    }

    return arr;
}

module.exports = shuffle;