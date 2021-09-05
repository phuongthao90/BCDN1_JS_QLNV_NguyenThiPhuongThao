function NhanVien(tk, hoTen, email, mk, ngayLam, luongCB, chucvu, gioLam) {
    this.taiKhoan = tk;
    this.hoTen = hoTen;
    this.email = email;
    this.matKhau = mk;
    this.ngayLam = ngayLam;
    this.luongCB = luongCB;
    this.chucVu = chucvu;
    this.gioLam = gioLam;
    this.tongLuong = 0;
    this.loaiNV = "";

    this.tinhTongLuong = function () {
        if (this.chucVu == "Sếp") {
            this.tongLuong = this.luongCB * 3;
        } else if (this.chucVu == "Trưởng phòng") {
            this.tongLuong = this.luongCB * 2;
        } else if (this.chucVu == "Nhân viên") {
            this.tongLuong = this.luongCB;
        }
        return this.tongLuong;
    }
    this.xepLoaiNV = function () {
        if (this.gioLam >= 192) {
            this.loaiNV = "Xuất Sắc";
        } else if (this.gioLam >= 176) {
            this.loaiNV = "Giỏi";
        } else if (this.gioLam >= 160) {
            this.loaiNV ="Khá";
        } else if (this.gioLam < 160 && this.gioLam >= 0) {
            this.loaiNV ="Trung Bình";
        }
        return this.loaiNV;
    }
    
}