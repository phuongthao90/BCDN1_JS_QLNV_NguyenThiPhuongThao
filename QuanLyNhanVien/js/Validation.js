function Validation() {
    //Phương thức
    //kiểm tra ô nhập liệu có bị trống hay không
    this.checkEmpty = function (inputval, spanTK, message) {
        if (inputval.trim() == "") {
            //Không hợp lệ
            document.getElementById(spanTK).innerHTML = message;
            return false;
        } else {
            //hợp lệ
            document.getElementById(spanTK).innerHTML = "";
            return true;
        }
    }
    //kiểm tra TK trùng
    this.checkTK = function (inputval, spanTK, message, mang) {
        //Kiểm tra TK đã tồn tại trong mảng
        var isExist = false;
        isExist = mang.some(function (item) {
            return item.taiKhoan === inputval.trim();
        });
        if (isExist) {
            //không hợp lệ
            document.getElementById(spanTK).innerHTML = message;
            return false;
        } else {
            //hợp lệ
            document.getElementById(spanTK).innerHTML = "";
            return true;
        }
    }
    //Kiểm tra tên
    this.checkName = function (inputval, spanTK, message) {
        // RegExp
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$");
        if (pattern.test(inputval)) {
            //hợp lệ
            document.getElementById(spanTK).innerHTML = "";
            return true;
        } else {
            // không hợp lệ
            document.getElementById(spanTK).innerHTML = message;
            return false;
        }
    }
    //Kiểm tra email
    this.checkEmail = function (inputval, spanTK, message) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputval.match(pattern)) {
            //hợp lệ
            document.getElementById(spanTK).innerHTML = "";
            return true;
        } else {
            // không hợp lệ
            document.getElementById(spanTK).innerHTML = message;
            return false;
        }
    }
    //Kiểm tra mật khẩu
    this.checkPass = function (inputval, spanTK, message) {
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
        if (inputval.match(pattern)) {
            //hợp lệ
            document.getElementById(spanTK).innerHTML = "";
            return true;
        } else {
            // không hợp lệ
            document.getElementById(spanTK).innerHTML = message;
            return false;
        }
    }
    //Kiểm tra ngày làm
    this.checkDate = function (inputval, spanTK, message) {
        var pattern = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
        if (inputval.match(pattern)) {
            //hợp lệ
            document.getElementById(spanTK).innerHTML = "";
            return true;
        } else {
            // không hợp lệ
            document.getElementById(spanTK).innerHTML = message;
            return false;
        }

    }
    //Kiểm tra Lương
    this.checkSalary = function (inputval, spanTK, message) {
        if (inputval >= 1000000 && inputval <= 20000000) {
            //hợp lệ
            document.getElementById(spanTK).innerHTML = "";
            return true;
        } else {
            // không hợp lệ
            document.getElementById(spanTK).innerHTML = message;
            return false;
        }

    }
    //Kiểm tra chức vụ
    this.checkDropdown = function (selTK, spanTK, message) {
        var optIndex = document.getElementById(selTK).selectedIndex;
        // console.log(optIndex);
        if (optIndex != 0) {
            //hợp lệ
            document.getElementById(spanTK).innerHTML = "";
            return true;
        } else {
            // không hợp lệ
            document.getElementById(spanTK).innerHTML = message;
            return false;
        }
    }
    //Kiểm tra giờ làm
    this.checkHour = function (inputval, spanTK, message) {
        if (inputval >= 80 && inputval <= 200) {
            //hợp lệ
            document.getElementById(spanTK).innerHTML = "";
            return true;
        } else {
            // không hợp lệ
            document.getElementById(spanTK).innerHTML = message;
            return false;
        }

    }
}






