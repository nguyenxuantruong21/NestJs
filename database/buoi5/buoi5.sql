
-- 5. Hiển thị TenKH của tất cả các khách hàng có trong hệ thống, TenKH nào trùng nhau thì chỉ hiển thị một lần
select distinct TenKH 
from KHACH_HANG;

-- 6. Hiển thị MaDV, TenDV, DonViTinh, DonGia của những dịch vụ đi kèm có DonViTinh là “lon” và có DonGia lớn hơn 10,000 VNĐ 
-- hoặc những dịch vụ đi kèm có DonViTinh là “Cai” và có DonGia nhỏ hơn 5,000 VNĐ
select MaDV, TenDV, DonViTinh, DonGia
from DICH_VU_DI_KEM
where (DonViTinh = 'lon' and DonGia > 10000)
   or (DonViTinh = 'cai' and DonGia < 5000);

-- 7. Hiển thị MaDatPhong, MaPhong, LoaiPhong, SoKhachToiDa, GiaPhong, MaKH, TenKH, SoDT, NgayDat, GioBatDau, GioKetThuc, MaDichVu, 
-- SoLuong, DonGia của những đơn đặt phòng có năm đặt phòng là “2016”, “2017” và đặt những phòng có giá phòng > 50,000 VNĐ/ 1 giờ
select * from DAT_PHONG 
join PHONG
	on DAT_PHONG.MaPhong = PHONG.MaPhong
where 
	PHONG.GiaPhong > 0 
	and year(STR_TO_DATE(DAT_PHONG.NgayDat, '%d/%m/%Y')) IN (2016,2017);

-- 8. Hiển thị MaDatPhong, MaPhong, LoaiPhong, GiaPhong, TenKH, NgayDat, TongTienHat, TongTienSuDungDichVu, 
-- TongTienThanhToan tương ứng với từng mã đặt phòng có trong bảng DAT_PHONG. Những đơn đặt phòng nào không 
-- sử dụng dịch vụ đi kèm thì cũng liệt kê thông tin của đơn đặt phòng đó ra


select  
	DP.MaDatPhong, DP.MaPhong, P.LoaiPhong, P.GiaPhong, KH.TenKH, DP.NgayDat ,
   (DP.GioKetThuc - DP.GioBatDau) * P.GiaPhong AS TongTienHat,
	coalesce (sum(DV.DonGia * CT.SoLuong),0) as TongTienSuDungDichVu,
	(
	 (DP.GioKetThuc - DP.GioBatDau) * P.GiaPhong + coalesce (sum(DV.DonGia * CT.SoLuong),0)
	) as TongTienThanhToan
from DAT_PHONG DP
join PHONG P on DP.MaPhong = P.MaPhong
join KHACH_HANG KH on DP.MaKH = KH.MaKH
left join CHI_TIET_SU_DUNG_DICH_VU CT on DP.MaDatPhong = CT.MaDatPhong
left join DICH_VU_DI_KEM DV on CT.MaDV = DV.MaDV
group by DP.MaDatPhong, DP.MaPhong, P.LoaiPhong, P.GiaPhong, KH.TenKH, DP.NgayDat, DP.GioBatDau, DP.GioKetThuc;



-- 9. Hiển thị MaKH, TenKH, DiaChi, SoDT của những khách hàng đã từng đặt phòng karaoke có địa chỉ ở “Hoa xuan”
 select MaKH, TenKH, DiaChi, SoDT 
 from KHACH_HANG 
 where DiaChi = 'Hoa xuan'
 

-- 10. Hiển thị MaPhong, LoaiPhong, SoKhachToiDa, GiaPhong, SoLanDat của những phòng được khách hàng đặt có số lần đặt lớn hơn 2 lần 
-- và trạng thái đặt là “Da dat”
select 
    PHONG.MaPhong, 
    PHONG.LoaiPhong, 
    PHONG.SoKhachToiDa, 
    PHONG.GiaPhong, 
    COUNT(DAT_PHONG.MaPhong) AS SoLanDat
from 
    PHONG
join 
    DAT_PHONG on PHONG.MaPhong = DAT_PHONG.MaPhong
where 
    DAT_PHONG.TrangThaiDat = 'Da dat'
group by
    PHONG.MaPhong, 
    PHONG.LoaiPhong, 
    PHONG.SoKhachToiDa, 
    PHONG.GiaPhong
having 
    count(DAT_PHONG.MaPhong) > 2;



