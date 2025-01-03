-- 1. Liệt kê MaDatPhong, MaDV, SoLuong của tất cả các dịch vụ có số lượng lớn hơn 3 và nhỏ hơn 10
SELECT MaDatPhong, MaDV, SoLuong
FROM CHI_TIET_SU_DUNG_DICH_VU
WHERE SoLuong > 3 AND SoLuong < 10;


-- 2. Cập nhật dữ liệu trên trường GiaPhong thuộc bảng PHONG tăng lên 10,000 VNĐ so với giá phòng hiện tại,
-- chỉ cập nhật giá phòng của những phòng có số khách tối đa lớn hơn 10.
SELECT * FROM PHONG p 

UPDATE PHONG
SET GiaPhong = GiaPhong + 10000
WHERE SoKhachToiDa > 10;

-- 3. Xóa tất cả những đơn đặt phòng (từ bảng DAT_PHONG) có trạng thái đặt (TrangThaiDat) là “Da huy”.
SELECT * FROM DAT_PHONG dp 

DELETE FROM DAT_PHONG
WHERE TrangThaiDat = 'Da huy';

-- 4. Hiển thị TenKH của những khách hàng có tên bắt đầu là một trong các ký tự “H”, “N”, “M” và có độ dài tối đa là 20 ký tự
SELECT * FROM KHACH_HANG kh 

SELECT TenKH
FROM KHACH_HANG
WHERE (TenKH LIKE 'H%' OR TenKH LIKE 'N%' OR TenKH LIKE 'M%')
  AND LENGTH(TenKH) <= 20;


