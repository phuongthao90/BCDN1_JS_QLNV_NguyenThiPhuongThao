//Biến toàn cục
var dsnv = new DanhSachNhanVien();
var validation = new Validation();


//Hàm rút gọn cú pháp của document.getElementById
function getELE(id) {
    //id: kiểu string
    return document.getElementById(id)
}

//THÊM NHÂN VIÊN
function themNV() {
    //Lấy thông tin từ form
    var taiKhoan = getELE("tknv").value;
    var hoTen = getELE("name").value;
    var email = getELE("email").value;
    var matKhau = getELE("password").value;
    var ngayLam = getELE("datepicker").value;
    var luongCB = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var gioLam = getELE("gioLam").value;

    //console.log(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam);

    //VALIDATION
    getELE("tbTKNV").style.display = "block";
    getELE("tbTen").style.display = "block";
    getELE("tbEmail").style.display = "block";
    getELE("tbMatKhau").style.display = "block";
    getELE("tbNgay").style.display = "block";
    getELE("tbLuongCB").style.display = "block";
    getELE("tbChucVu").style.display = "block";
    getELE("tbGiolam").style.display = "block";

    var isValid = true;

    //Kiểm tra TK 
    isValid &= validation.checkEmpty(taiKhoan, "tbTKNV", "Tài khoản không được để trống!") && validation.checkTK(taiKhoan, "tbTKNV", "Tài khoản bị trùng!", dsnv.mangNV);

    //Kiểm tra tên   
    isValid &= validation.checkEmpty(hoTen, "tbTen", "Tên Nhân Viên không được để trống!") && validation.checkName(hoTen, "tbTen", "Tên Nhân viên phải là ký tự chữ");

    //Kiem tra email   
    isValid &= validation.checkEmpty(email, "tbEmail", "Email không được để trống!") && validation.checkEmail(email, "tbEmail", "Email không đúng định dạng");

    //Kiểm tra pass  
    isValid &= validation.checkEmpty(matKhau, "tbMatKhau", "Mật khẩu không được để trống!") && validation.checkPass(matKhau, "tbMatKhau", "Mật khẩu chưa đúng định dạng");

    //Kiểm tra ngày làm
    isValid &= validation.checkEmpty(ngayLam, "tbNgay", "Ngày làm không được để trống!") && validation.checkPass(matKhau, "tbNgay", "Ngày chưa đúng định dạng");

    //Kiểm tra lương
    isValid &= validation.checkEmpty(luongCB, "tbLuongCB", "Lương không được để trống!") && validation.checkSalary(luongCB, "tbLuongCB", "Nhập lương từ 1.000.000 đến 20.000.000");

    //Kiểm tra chức vụ
    isValid &= validation.checkDropdown("chucvu", "tbChucVu", "Bạn chưa chọn Chức Vụ");

    //Kiểm tra giờ làm
    isValid &= validation.checkEmpty(gioLam, "tbGiolam", "Giờ làm không được để trống!") && validation.checkHour(gioLam, "tbGiolam", "Nhập giờ làm từ 80 đến 200 giờ");

    if (isValid) {
        //Nếu tất cả dữ liệu đều hợp lệ
        //Lưu thông tin vào lớp Nhân Viên
        var nv = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam);
        nv.tongLuong = nv.tinhTongLuong();
        nv.loaiNV = nv.xepLoaiNV();

        //Lưu vào Danh sách Nhân Viên
        dsnv.themNhanVien(nv);
        //console.log(dsnv.mangNV);

        //Lưu xuống local
        setLocalStorage();

        //Hiển thị lên Table
        hienThiTable(dsnv.mangNV);
    }
}
getELE("btnThemNV").onclick = themNV;

//Lưu mảng NV xuống localStorage
function setLocalStorage() {
    localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNV));
}

//Lấy dữ liệu data từ localStorage
function getLocalStorage() {
    //getItem sẽ lấy dữ liệu lên là Json --> cần chuyển qua kiểu mảng
    if (localStorage.getItem("DSNV") != null) {
        dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"));
        hienThiTable(dsnv.mangNV);
    }
}
getLocalStorage();

//HIỂN THỊ DANH SÁCH NHÂN VIÊN
function hienThiTable(mang) {
    var content = "";
    mang.map(function (item, index) {
        content += `<tr>    
                <td>${item.taiKhoan}</td> 
                <td>${item.hoTen}</td>   
                <td>${item.email}</td> 
                <td>${item.ngayLam}</td>   
                <td>${item.chucVu}</td>
                <td>${item.tongLuong}</td>   
                <td>${item.loaiNV}</td>      
                <td>
                    <button class="btn btn-danger" onclick="xoaNV('${item.taiKhoan}')">Xoá</button>

                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="xemChiTiet('${item.taiKhoan}')">Xem</button>
                </td>
            </tr>`
    });
    getELE("tableDanhSach").innerHTML = content;
}

//XOÁ NHÂN VIÊN
function xoaNV(tk) {
    dsnv.xoaNhanVien(tk);
    hienThiTable(dsnv.mangNV);
    setLocalStorage();
}

//HIỂN THỊ CHI TIẾT TỪNG NHÂN VIÊN
function xemChiTiet(tk) {
    var viTri = dsnv.timViTri(tk);
    var nv = dsnv.mangNV[viTri];
    getELE("tknv").disabled = true;

    getELE("tknv").value = nv.taiKhoan;
    getELE("name").value = nv.hoTen;
    getELE("email").value = nv.email;
    getELE("password").value = nv.matKhau;
    getELE("datepicker").value = nv.ngayLam;
    getELE("luongCB").value = nv.luongCB;
    getELE("chucvu").value = nv.chucVu;
    getELE("gioLam").value = nv.gioLam;
}

//CẬP NHẬT NHÂN VIÊN
function capNhatNV() {
    var taiKhoan = getELE("tknv").value;
    var hoTen = getELE("name").value;
    var email = getELE("email").value;
    var matKhau = getELE("password").value;
    var ngayLam = getELE("datepicker").value;
    var luongCB = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var gioLam = getELE("gioLam").value;

    //VALIDATION
    getELE("tbTKNV").style.display = "block";
    getELE("tbTen").style.display = "block";
    getELE("tbEmail").style.display = "block";
    getELE("tbMatKhau").style.display = "block";
    getELE("tbNgay").style.display = "block";
    getELE("tbLuongCB").style.display = "block";
    getELE("tbChucVu").style.display = "block";
    getELE("tbGiolam").style.display = "block";
    var isValid = true;

    //Kiem tra tên   
    isValid &= validation.checkEmpty(hoTen, "tbTen", "Tên Nhân Viên không được để trống!") && validation.checkName(hoTen, "tbTen", "Tên Nhân viên phải là ký tự chữ");

    //Kiem tra email   
    isValid &= validation.checkEmpty(email, "tbEmail", "Email không được để trống!") && validation.checkEmail(email, "tbEmail", "Email không đúng định dạng");

    //Kiem tra pass  
    isValid &= validation.checkEmpty(matKhau, "tbMatKhau", "Mật khẩu không được để trống!") && validation.checkPass(matKhau, "tbMatKhau", "Mật khẩu chưa đúng định dạng");

    //Kiểm tra ngày làm
    isValid &= validation.checkEmpty(ngayLam, "tbNgay", "Ngày làm không được để trống!") && validation.checkPass(matKhau, "tbNgay", "Ngày chưa đúng định dạng");

    //Kiểm tra lương
    isValid &= validation.checkEmpty(luongCB, "tbLuongCB", "Lương không được để trống!") && validation.checkSalary(luongCB, "tbLuongCB", "Nhập lương từ 1.000.000 đến 20.000.000");

    //Kiểm tra chức vụ
    isValid &= validation.checkDropdown("chucvu", "tbChucVu", "Bạn chưa chọn Chức Vụ");

    //Kiểm tra giờ làm
    isValid &= validation.checkEmpty(gioLam, "tbGiolam", "Giờ làm không được để trống!") && validation.checkHour(gioLam, "tbGiolam", "Nhập giờ làm từ 80 đến 200 giờ");

    if (isValid) {

        var nv = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam);
        nv.tongLuong = nv.tinhTongLuong();
        nv.loaiNV = nv.xepLoaiNV();

        dsnv.capNhatNhanVien(nv);
        hienThiTable(dsnv.mangNV);
        setLocalStorage();
    }
}
getELE("btnCapNhat").onclick = capNhatNV;

//TÌM NHÂN VIÊN THEO LOẠI
function timKiemTheoLoaiNV() {
    var tuKhoaTK = getELE("searchName").value;
    var mangKQ = dsnv.timKiem(tuKhoaTK);
    hienThiTable(mangKQ);
}
getELE("btnTimNV").onclick = timKiemTheoLoaiNV;


//ĐÓNG - RESET LẠI FORM
function resetForm() {
    getELE("tbTKNV").style.display = "none";
    getELE("tbTen").style.display = "none";
    getELE("tbEmail").style.display = "none";
    getELE("tbMatKhau").style.display = "none";
    getELE("tbNgay").style.display = "none";
    getELE("tbLuongCB").style.display = "none";
    getELE("tbChucVu").style.display = "none";
    getELE("tbGiolam").style.display = "none";

    getELE("modalForm").reset();
    getELE("tknv").disabled = false;
}
getELE("btnDong").addEventListener("click", resetForm);


