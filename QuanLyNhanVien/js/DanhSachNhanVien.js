// Lớp Danh Sách Nhân Viên
function DanhSachNhanVien() {
    this.mangNV = [];
    this.themNhanVien = function (nv) {
        this.mangNV.push(nv);
    }
    //tìm vị trí trong mảng
    this.timViTri = function (tk) {
        var viTri = -1;
        this.mangNV.map(function (item, index) {
            if (item.taiKhoan == tk) {
                viTri = index;
            }
        });
        return viTri;
    }
    this.xoaNhanVien = function (tk) {
        var viTri = this.timViTri(tk);
        if (viTri >= 0) {
            //tìm được
            this.mangNV.splice(viTri, 1);
        } else {
            console.log("Không tìm được")
        }
    }
    this.capNhatNhanVien = function (nv) {
        var viTri = this.timViTri(nv.taiKhoan);
        if (viTri >= 0) {
            //tìm được
            this.mangNV[viTri] = nv;
        } else {
            console.log("Không tìm được")
        }
    }
}

//Tìm kiếm
DanhSachNhanVien.prototype.timKiem = function (tuKhoaTK) {
    var mangKQ = [];
    //Chuyển tuKhoaTK sang chữ thường
    var lowerTK = tuKhoaTK.trim().toLowerCase();
    this.mangNV.map(function (item, index) {
        //chuyển loại NV sang chữ thường
        var loaiThuong = item.loaiNV.trim().toLowerCase();
        var kq = loaiThuong.indexOf(lowerTK);
        if (kq >= 0) {
            mangKQ.push(item);
        }
    });

    return mangKQ;
}