import React from 'react'

export const StringReduction = () => {
    //For example: if str is "cab", then "ca" can be reduced to "b" and you get "bb" (you can also reduce it to "cc"). 
    //The reduction is done so the output should be 2. If str is "bcab", "bc" reduces to "a", so you have "aab", then "ab" reduces to "c", 
    //and the final string "ac" is reduced to "b" so the output should be 1
    function stringReduction(str) {
        let count = 0;
        let input = str.split('');
      
        while (true) {
          let i = 0;
          while (i < input.length - 1) {
            if ((input[i] === 'a' && input[i + 1] === 'b') || 
                (input[i] === 'b' && input[i + 1] === 'a')) {
              input.splice(i, 2, 'c');
              count++;
            } else if ((input[i] === 'b' && input[i + 1] === 'c') || 
                       (input[i] === 'c' && input[i + 1] === 'b')) {
              input.splice(i, 2, 'a');
              count++;
            } else if ((input[i] === 'a' && input[i + 1] === 'c') || 
                       (input[i] === 'c' && input[i + 1] === 'a')) {
              input.splice(i, 2, 'b');
              count++;
            } else {
              i++;
            }
          }
      
          if (count === 0) {
            break;
          } else {
            count = 0;
          }
        }
      
        return input.length;
      }
      
  return (
    <>
    {console.log(stringReduction("bcab"))}
    </>
  )
}


// Khởi tạo biến count với giá trị ban đầu là 0. Biến này được sử dụng để đếm số lần thực hiện biến đổi trên chuỗi.

// Sử dụng phương thức split('') trên chuỗi str để chuyển đổi chuỗi thành một mảng các ký tự. Mỗi ký tự trong chuỗi sẽ trở thành một phần tử của mảng.

// Bắt đầu một vòng lặp vô hạn (while (true)) để thực hiện biến đổi lặp đi lặp lại trên mảng input.

// Khởi tạo biến i với giá trị ban đầu là 0. Biến này được sử dụng để duyệt qua các phần tử trong mảng input.

// Trong vòng lặp while, kiểm tra các điều kiện để xác định cách thực hiện biến đổi trên các phần tử của mảng input.

// Nếu hai phần tử liên tiếp là 'a' và 'b' hoặc là 'b' và 'a', thì thay thế chúng bằng 'c' bằng cách sử dụng phương thức splice(). Đồng thời, tăng giá trị của count lên 1.

// Nếu hai phần tử liên tiếp là 'b' và 'c' hoặc là 'c' và 'b', thì thay thế chúng bằng 'a' và tăng giá trị của count lên 1.

// Nếu hai phần tử liên tiếp là 'a' và 'c' hoặc là 'c' và 'a', thì thay thế chúng bằng 'b' và tăng giá trị của count lên 1.

// Trong trường hợp không thỏa mãn bất kỳ điều kiện nào trên, tăng giá trị của i lên 1 để di chuyển đến cặp phần tử tiếp theo trong mảng input.