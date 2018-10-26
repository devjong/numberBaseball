var 바디 = document.body;

var 숫자후보 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var 숫자배열 = [];

for (var i = 0; i < 4; i += 1) {
    // var 뽑은것 = 숫자후보.pop();   // pop()은 마지막쪽부터 하나씩 나옴  -> 9 8 7 6
    // var 뽑은것 = 숫자후보.shift(); // 앞에서부터 하나씩 나옴      -> 1 2 3 4
    //
    // 숫자배열.push(뽑은것);         // 하나씩 앞에서부터 하나씩 들어감 ->[1], [1,2], [1,2,3], [1 2 3 4]
    // 숫자배열.unshift(뽑은것);     // -> [1], [2, 1], [3,2,1], [4,3,2,1]

    // var 뽑은것 = 숫자후보.splice(5, 2); // 5번쨰위치에서 부터 2개를 뽐아줌, 뽑아진 숫자는 숫자후보에서 사라짐
    // 각각 하나씩 배열로뽑히게됨
    var 뽑은것 = 숫자후보.splice(Math.floor(Math.random() * (9 - i)), 1)[0];  //배열에서 첫번째 위치의 것을 선택 => 숫자
    숫자배열.push(뽑은것);
}

console.log(숫자배열); // 숫자배열.join('')  // -> "2879"

var 결과 = document.createElement("h1");
결과.textContent = '스트라이크 1볼';
바디.append(결과);

var 폼 = document.createElement('form');
바디.append(폼);

var 입력창 = document.createElement('input');
폼.append(입력창);
입력창.type = 'text';
입력창.maxLength = 4;

var 버튼 = document.createElement('button');
버튼.textContent = '입력';
폼.append(버튼);

var 틀린횟수 = 0;
폼.addEventListener('submit', function (e) {
    e.preventDefault();   // 새로고침은 submit의 기본동작임
    var 답 = 입력창.value
    console.log(답, 숫자배열, 답 === 숫자배열);

    if (답 === 숫자배열.join('')) {  // 답이 맞으면
        결과.textContent = '홈런';
        입력창.value = '';
        입력창.focus();

        // 새로운 문제 내기
        숫자후보 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        숫자배열 = [];
        for (var i = 0; i < 4; i += 1) {
            var 뽑은것 = 숫자후보.splice(Math.floor(Math.random() * (9 - i)), 1)[0];  //배열에서 첫번째 위치의 것을 선택 => 숫자
            숫자배열.push(뽑은것);
        }
        틀린횟수 = 0; // 답을 맞췄을 경우 틀릿횟수를 초기화 해줘야 함

    } else { // 답이 틀리면
        // var 답 = '9546'
        // 답[0]           // -> "9"
        // 답[1]           // -> "5"
        // 답[2]           // -> "4"
        // 답.split('')     // -> ["9", "5", "4", "6"]    배열을 문자로 할떄는 join  // 문자를 배열로 만들떄는 split

        var 답배열 = 답.split('');
        var 스트라이크 = 0;
        var 볼 = 0;

        틀린횟수 += 1;
        if(틀린횟수 > 4) {  // 4번 넘게 틀린 경우
            결과.textContent =  '4번 넘게 틀려서 실패! 답은 '+ 숫자배열.join(',')  + '였습니다!';
            입력창.value;
            입력창.focus();

            // 새로운 문제 내기
            숫자후보 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            숫자배열 = [];
            for (var i = 0; i < 4; i += 1) {
                var 뽑은것 = 숫자후보.splice(Math.floor(Math.random() * (9 - i)), 1)[0];  //배열에서 첫번째 위치의 것을 선택 => 숫자
                숫자배열.push(뽑은것);
            }
            틀린횟수 = 0;  // 4번틀리면 새로운 문제를 내고 횟수 초기화
        } else {  // 4번 미만으로 틀린경우
            console.log('답이 틀리면', 답배열);

            for (var i = 0; i < 3; i += 1) {

                // 숫자배열 = [6, 8, 5, 9]
                // 숫자배열,indexOf(6)  // -> 0
                // 숫자배열,indexOf(5)  // -> 2
                // 숫자배열,indexOf(9)  // -> 3  위치를 반환함
                // 숫자배열,indexOf(4)  // -> -1 배열에 존재하지 않으면


                if (Number(답배열[i]) === 숫자배열[i]) {   // <<- 이부분 실수함 답배열은 배열안에 숫자가아닌 문자로 저장되어있음
                    console.log('같은 자리?');
                    스트라이크 += 1;
                } else if (숫자배열.indexOf(Number(답배열[i])) > -1) {
                    console.log('겹치는 숫자?');
                    볼 += 1;
                }
            }
            결과.textContent = 스트라이크 + '스트라이크 ' + 볼 + '볼입니다.';
            입력창.value = '';
            입력창.focus();
        }
        }


});


