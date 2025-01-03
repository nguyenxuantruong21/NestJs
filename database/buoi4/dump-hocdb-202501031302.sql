/*!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.6.18-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: hocdb
-- ------------------------------------------------------
-- Server version	10.6.18-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `CHI_TIET_SU_DUNG_DICH_VU`
--

DROP TABLE IF EXISTS `CHI_TIET_SU_DUNG_DICH_VU`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CHI_TIET_SU_DUNG_DICH_VU` (
  `MaDatPhong` varchar(20) NOT NULL,
  `MaDV` varchar(20) NOT NULL,
  `SoLuong` int(11) DEFAULT NULL,
  PRIMARY KEY (`MaDatPhong`,`MaDV`),
  KEY `fk_ctsd_dv_madv` (`MaDV`),
  CONSTRAINT `fk_ctsd_dv_madatphong` FOREIGN KEY (`MaDatPhong`) REFERENCES `DAT_PHONG` (`MaDatPhong`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ctsd_dv_madv` FOREIGN KEY (`MaDV`) REFERENCES `DICH_VU_DI_KEM` (`MaDV`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CHI_TIET_SU_DUNG_DICH_VU`
--

LOCK TABLES `CHI_TIET_SU_DUNG_DICH_VU` WRITE;
/*!40000 ALTER TABLE `CHI_TIET_SU_DUNG_DICH_VU` DISABLE KEYS */;
INSERT INTO `CHI_TIET_SU_DUNG_DICH_VU` VALUES ('DP0001','DV001',20),('DP0001','DV002',10),('DP0001','DV003',3),('DP0003','DV003',2),('DP0003','DV004',10);
/*!40000 ALTER TABLE `CHI_TIET_SU_DUNG_DICH_VU` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DAT_PHONG`
--

DROP TABLE IF EXISTS `DAT_PHONG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DAT_PHONG` (
  `MaDatPhong` varchar(20) NOT NULL,
  `MaPhong` varchar(20) DEFAULT NULL,
  `MaKH` varchar(20) DEFAULT NULL,
  `NgayDat` varchar(20) DEFAULT NULL,
  `GioBatDau` varchar(20) DEFAULT NULL,
  `GioKetThuc` varchar(20) DEFAULT NULL,
  `TienDatCoc` double DEFAULT NULL,
  `GhiChu` text DEFAULT NULL,
  `TrangThaiDat` enum('Da dat','Da huy') DEFAULT NULL,
  PRIMARY KEY (`MaDatPhong`),
  KEY `fk_datphong_maphong` (`MaPhong`),
  KEY `fk_datphong_makh` (`MaKH`),
  CONSTRAINT `fk_datphong_makh` FOREIGN KEY (`MaKH`) REFERENCES `KHACH_HANG` (`MaKH`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_datphong_maphong` FOREIGN KEY (`MaPhong`) REFERENCES `PHONG` (`MaPhong`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DAT_PHONG`
--

LOCK TABLES `DAT_PHONG` WRITE;
/*!40000 ALTER TABLE `DAT_PHONG` DISABLE KEYS */;
INSERT INTO `DAT_PHONG` VALUES ('DP0001','P0001','KH0002','26/03/2018','11:00','13:30',100000,'','Da dat'),('DP0003','P0003','KH0002','26/03/2018','20:30','22:15',100000,'','Da dat'),('DP0004','P0004','KH0001','01/04/2018','19:30','21:15',200000,'','Da dat');
/*!40000 ALTER TABLE `DAT_PHONG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DICH_VU_DI_KEM`
--

DROP TABLE IF EXISTS `DICH_VU_DI_KEM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DICH_VU_DI_KEM` (
  `MaDV` varchar(20) NOT NULL,
  `TenDV` varchar(50) DEFAULT NULL,
  `DonViTinh` varchar(20) DEFAULT NULL,
  `DonGia` double DEFAULT NULL,
  PRIMARY KEY (`MaDV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DICH_VU_DI_KEM`
--

LOCK TABLES `DICH_VU_DI_KEM` WRITE;
/*!40000 ALTER TABLE `DICH_VU_DI_KEM` DISABLE KEYS */;
INSERT INTO `DICH_VU_DI_KEM` VALUES ('DV001','Beer','lon',10000),('DV002','Nuoc ngot','lon',8000),('DV003','Trai cay','dia',35000),('DV004','Khan uot','cai',2000);
/*!40000 ALTER TABLE `DICH_VU_DI_KEM` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `KHACH_HANG`
--

DROP TABLE IF EXISTS `KHACH_HANG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `KHACH_HANG` (
  `MaKH` varchar(20) NOT NULL,
  `TenKH` varchar(50) DEFAULT NULL,
  `DiaChi` varchar(50) DEFAULT NULL,
  `SoDT` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`MaKH`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `KHACH_HANG`
--

LOCK TABLES `KHACH_HANG` WRITE;
/*!40000 ALTER TABLE `KHACH_HANG` DISABLE KEYS */;
INSERT INTO `KHACH_HANG` VALUES ('KH0001','Nguyen Van A','Hoa xuan','1111111111'),('KH0002','Nguyen Van B','Hoa hai','1111111112'),('KH0003','Phan Van A','Cam le','1111111113'),('KH0004','Phan Van B','Hoa xuan','1111111114');
/*!40000 ALTER TABLE `KHACH_HANG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PHONG`
--

DROP TABLE IF EXISTS `PHONG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PHONG` (
  `MaPhong` varchar(20) NOT NULL,
  `LoaiPhong` varchar(20) DEFAULT NULL,
  `SoKhachToiDa` int(11) DEFAULT NULL,
  `GiaPhong` double DEFAULT NULL,
  `Mota` text DEFAULT NULL,
  PRIMARY KEY (`MaPhong`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PHONG`
--

LOCK TABLES `PHONG` WRITE;
/*!40000 ALTER TABLE `PHONG` DISABLE KEYS */;
INSERT INTO `PHONG` VALUES ('P0001','Loai 1',20,60000,''),('P0002','Loai 2',25,80000,''),('P0003','Loai 3',15,50000,''),('P0004','Loai 4',20,50000,'');
/*!40000 ALTER TABLE `PHONG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'hocdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-03 13:02:37
