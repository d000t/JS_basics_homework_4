function sort_string_by_nums(str){
    if(str == undefined||str.length==0){
    return '';
    }
    let arr = str.split(' ');
    let box = 0;
    let index;
    let regex = /\d/;
    for (let word of arr) {
        do{
            index = word.match(regex)[0]-1;
            box = arr[index];
            arr[index] = word;
            word = box;
        }while((word.match(regex)[0] -1) != arr.indexOf(word))
    }
    return arr.join(' ');
}
function task1(){
    let str = prompt('type a sentence');
    alert(str);
    alert(sort_string_by_nums(str));
    alert(str);
}
function getRndNumber(min, max){
    min = Math.floor(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function check_board(board, rows, cols){
    let board_column=[];
    let board_row=[];
    let board_diagonally=[];
    let index = 0;
    let have_empty_slots = false;

    for(let i = 1; i <= board.length; i++){
        if (!have_empty_slots){
            have_empty_slots = true;
        }
        board_column.push(board[i - 1][index]);
        if (i/rows == 1){
                if (board_column.length==rows && board_column.every(num_value => {
                    if (num_value == board_column[0] &&(num_value == 1 || num_value == 2)){
                        return true;
                    }
                })){
                    return board_column[0];
                }
            board_column.splice(0, rows);
            index++;
            if (i == 3&&index == 3){break;}
            i=0;
        }
    }
    index=0;
    for(let j = 1; j <= board.length; j++){
        board_row.push(board[index][j - 1]);
        if ((j / cols) == 1){
            if ((board_row.length) == cols && board_row.every(num_value => {
                if (board_row[0] == num_value && (num_value == 1 || num_value == 2)){
                    return true;
                }
            })){
                return board_row[0];
            }
            board_row.splice(0,cols);
            index++;
            if (j == 3 && index == 3){break;}
            j = 0;
        }
    }
    index = 0;
    /*
    for(let i=0;i<board.length;i++) {
        for(let j =i%2; j<board[i].length; j=j+2) {
            board_diagonally.push(arr[i][j]);
        }
    }*/


    /*for (let k = 0; k <= board.length; k++) {
        for (let n = 0; n < board[k].length; n++) {
            //происходит ошибка
            //поставил -1 в двух условиях
            if (k==n||board[k][n]==board[board.length-1][n]||board[k][n]==board[k][board[k].length-1]){
            board_diagonally.push(board[k][n]);}

        }
    }
    if (board_diagonally.every(num_value => {
        if (num_value==1||num_value==2){
            return true;
        }})){
        return board_diagonally[0];
    }*/
    return have_empty_slots == true ? -1 : 0;
}

function task2(){

    // let rows = prompt('Enter number of rows');
    // let cols = prompt('Enter number of columns');
    // alert(`Ok, your board is ${rows}x${cols}`);
    // let board = [cols][rows];
    let board =[[1, 0, 1],
                [1, 1, 0],
                [2, 1, 1]];
    let game_status = check_board(board,3,3);
    alert(JSON.stringify(game_status));
    switch (game_status){
        case -1:{
            game_status = 'The board is not yet finished (there are empty spots)';
            break;
        }
        case 0:{
            game_status = "It's a draw";
            break;
        }
        case 1:{
            game_status = '"X" won';
            break;
        }
        case 2:{
            game_status = '"O" won';
            break;
        }
    }
    alert(game_status);
    alert(JSON.stringify(board));

}
function task3() {
    alert(find_a_chair());
}
function find_a_chair() {
    let people_on_other_meeting = 0;
    let other_room_chairs_amount = 0;
    let other_chairs_free = 0;
    let people_on_meeting = 'X'.repeat(getRndNumber(2,8));
    let people_on_meeting_num = people_on_meeting.length;
    let my_chairs_amount = getRndNumber(1, people_on_meeting_num - 1);
    let my_meeting = [people_on_meeting, my_chairs_amount];
    let needed_chairs_amount = people_on_meeting_num - my_chairs_amount;
    let meeting = [[['XXX', 3], ['XXXXX', 6], ['XXXXXX', 2]], needed_chairs_amount];
    let founded_chairs = [];

    for (const room of meeting[0]) {
        people_on_other_meeting = room[0].length;
        other_room_chairs_amount = room[1];
        other_chairs_free = other_room_chairs_amount - people_on_other_meeting;

        if (other_chairs_free > 0) {
            room[1] = other_room_chairs_amount - other_chairs_free;
            switch (needed_chairs_amount > other_chairs_free) {
                case true: {
                    my_chairs_amount += other_chairs_free;
                    founded_chairs.push(other_chairs_free);
                    needed_chairs_amount-=other_chairs_free;
                    other_chairs_free = 0;
                    break;
                }
                case false: {
                    my_chairs_amount = people_on_meeting_num;
                    founded_chairs.push(needed_chairs_amount);
                    other_chairs_free -= needed_chairs_amount;
                    needed_chairs_amount = 0;
                    alert(JSON.stringify(founded_chairs));
                    return 'Game on';
                }
            }
            room[1] = other_room_chairs_amount + other_chairs_free;
        }
        else{
            founded_chairs.push(0);
        }
        if (meeting[0].indexOf(room) == meeting[0].length-1){
            alert(JSON.stringify(founded_chairs));
            return 'Not enough';
        }
    }
}
function task4(arr){

}
function task5(){
    let bgColor = document.getElementById('bgColor').value;
    let radius = parseInt(document.getElementById('radius').value);
    let canvas = document.getElementById('canvas');
    if (canvas.getContext){
    var ctx = canvas.getContext('2d');
        let pi = Math.PI
        ctx.strokestyle = bgColor;
        ctx.fillStyle = bgColor;
        ctx.arc(250,100,radius ,0,pi*2, false);
        ctx.stroke();
        ctx.fill();
    }
}