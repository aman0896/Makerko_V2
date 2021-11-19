-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: fabhubsdb
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cad_model`
--

DROP TABLE IF EXISTS `cad_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cad_model` (
  `Model_Name` varchar(100) NOT NULL,
  `Model_Path` varchar(100) NOT NULL,
  `Customer_ID` int NOT NULL,
  PRIMARY KEY (`Model_Name`,`Customer_ID`),
  KEY `Customer_ID_idx` (`Customer_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cad_model`
--

LOCK TABLES `cad_model` WRITE;
/*!40000 ALTER TABLE `cad_model` DISABLE KEYS */;
/*!40000 ALTER TABLE `cad_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `Customer_ID` int NOT NULL AUTO_INCREMENT,
  `Email` varchar(100) NOT NULL,
  `First_Name` varchar(60) NOT NULL,
  `Last_Name` varchar(60) NOT NULL,
  `Password` text NOT NULL,
  `Phone_Number` bigint NOT NULL,
  `Address` text NOT NULL,
  `Verified` tinyint NOT NULL,
  `Profile_Image` text,
  PRIMARY KEY (`Customer_ID`,`Email`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `design_request`
--

DROP TABLE IF EXISTS `design_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `design_request` (
  `Request_ID` int NOT NULL AUTO_INCREMENT,
  `Product_Image` text NOT NULL,
  `Product_Sketch` text NOT NULL,
  `Product_Description` text NOT NULL,
  `Customer_ID` int NOT NULL,
  PRIMARY KEY (`Request_ID`,`Customer_ID`),
  KEY `Customer_ID_fk_idx` (`Customer_ID`),
  CONSTRAINT `Customer_ID_fk2` FOREIGN KEY (`Customer_ID`) REFERENCES `customer` (`Customer_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `design_request`
--

LOCK TABLES `design_request` WRITE;
/*!40000 ALTER TABLE `design_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `design_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endpoint_url`
--

DROP TABLE IF EXISTS `endpoint_url`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `endpoint_url` (
  `endpoint` text NOT NULL,
  `auth` varchar(500) NOT NULL,
  `p256dh` text NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`auth`),
  UNIQUE KEY `auth_UNIQUE` (`auth`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endpoint_url`
--

LOCK TABLES `endpoint_url` WRITE;
/*!40000 ALTER TABLE `endpoint_url` DISABLE KEYS */;
/*!40000 ALTER TABLE `endpoint_url` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fabrication_services`
--

DROP TABLE IF EXISTS `fabrication_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fabrication_services` (
  `Service_ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Accepted_Files` text,
  PRIMARY KEY (`Service_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fabrication_services`
--

LOCK TABLES `fabrication_services` WRITE;
/*!40000 ALTER TABLE `fabrication_services` DISABLE KEYS */;
INSERT INTO `fabrication_services` VALUES (1,'3D Printing','.obj, .stl, .step, .iges'),(2,'Laser Cutting','.pdf, .dxf, .jpeg'),(3,'CNC Carving','.step, .stl, .obj'),(4,'CNC Milling','.pdf, .dxf, .jpeg, .step'),(5,'Plasma Cutting','.obj, .stl, .step'),(6,'Sand Casting','.obj, .stl, .step'),(7,'Investment Casting(Lost wax)','.obj, .stl, .step'),(8,'Fiber Glass Resin Casting','.obj, .stl, .step, .jpeg'),(9,'Injection Molding','.obj, .stl, .step'),(10,'Metal Fabrication',' .jpeg, .pdf, .dwg, .iges, .step'),(11,'Sheet Metal Work','.pdf, .dxf, .step, .iges'),(12,'Die/Mold Tooling','.jpeg, .step, .stl, .iges'),(13,'Vacuum Forming','.step, .iges, .stl'),(14,'Garment/Fabric','.dwg, .pdf, .dfx, .jpeg');
/*!40000 ALTER TABLE `fabrication_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feature_project`
--

DROP TABLE IF EXISTS `feature_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feature_project` (
  `Project_ID` int NOT NULL AUTO_INCREMENT,
  `Customer_ID` varchar(200) DEFAULT NULL,
  `Email` varchar(100) NOT NULL,
  `Title` text NOT NULL,
  `Date` text NOT NULL,
  `Fabrication_Process` text NOT NULL,
  `Material` text NOT NULL,
  `Summary` text NOT NULL,
  `Description` text NOT NULL,
  `Files` text NOT NULL,
  `Image` text NOT NULL,
  `PDF_Document` text,
  `Cover_Image` text,
  PRIMARY KEY (`Project_ID`),
  KEY `Customer_ID` (`Customer_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feature_project`
--

LOCK TABLES `feature_project` WRITE;
/*!40000 ALTER TABLE `feature_project` DISABLE KEYS */;
/*!40000 ALTER TABLE `feature_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `Manufacturer_ID` varchar(50) NOT NULL,
  `Latitude` varchar(100) NOT NULL,
  `Longitude` varchar(100) NOT NULL,
  PRIMARY KEY (`Manufacturer_ID`),
  UNIQUE KEY `Manufacturer_ID_UNIQUE` (`Manufacturer_ID`),
  KEY `Manufacturer_ID` (`Manufacturer_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manufacturer`
--

DROP TABLE IF EXISTS `manufacturer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manufacturer` (
  `Manufacturer_ID` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Date` varchar(50) DEFAULT NULL,
  `Company_Name` varchar(60) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Contact_Person` varchar(60) NOT NULL,
  `Phone_Number` bigint NOT NULL,
  `Document_Path` text,
  `Website` varchar(100) DEFAULT NULL,
  `Company_Type` varchar(60) NOT NULL,
  `Address` text,
  `Logo` text,
  `CoverImage` text,
  `Brief_Description` text,
  `Other_Services` text,
  `Additional_Details` text,
  `Delivery` text NOT NULL,
  `Email_Verification` text,
  `Account_Verification` text,
  `Slogan` text,
  `Additional_Images` text,
  PRIMARY KEY (`Manufacturer_ID`,`Email`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturer`
--

LOCK TABLES `manufacturer` WRITE;
/*!40000 ALTER TABLE `manufacturer` DISABLE KEYS */;
/*!40000 ALTER TABLE `manufacturer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materials` (
  `Material_ID` int NOT NULL AUTO_INCREMENT,
  `Material_Name` varchar(100) NOT NULL,
  `Service_ID` int NOT NULL,
  PRIMARY KEY (`Material_ID`,`Service_ID`),
  KEY `Fabrication_Service_idx` (`Service_ID`) /*!80000 INVISIBLE */,
  CONSTRAINT `Fabrication_Service` FOREIGN KEY (`Service_ID`) REFERENCES `fabrication_services` (`Service_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES `materials` WRITE;
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
INSERT INTO `materials` VALUES (1,'PLA',1),(2,'ABS',1),(3,'PETG',1),(4,'TPU Flexible',1),(5,'Resin SLA: Standard, Tough, Castable',1),(6,'MDF',2),(7,'HDF hardboard',2),(8,'Paper',2),(9,'Forex/PVC Foamboard',2),(10,'Acryllic',2),(11,'Textile/Synthetic Leather',2),(12,'Polycarbonate Sheet',2),(13,'PET/PVC Sheet',2),(14,'WPC Board(Wood Plastic Compsite)',3),(15,'MDF',3),(16,'Plywood',3),(17,'Styrofoam',3),(18,'APC Board',3),(19,'Thick Wood',3),(20,'Nylon Sheet',3),(21,'Nylon',4),(22,'Brass',4),(23,'Mild Steel Iron',4),(24,'Die Steel',4),(25,'Aluminium',4),(26,'Mild Steel Plate',5),(27,'Aluminium Sheet',5),(28,'Strainless Steel',5),(29,'Carbon Steel',5),(30,'Aluminium',5),(31,'GI Sheet',5),(32,'Copper Sheet',5),(33,'Brass',6),(34,'Copper',6),(35,'Cast Iron',6),(36,'Aluminium',6),(37,'Mild Steel',6),(38,'Copper',7),(39,'Brass',7),(40,'Silver',7),(41,'Gold',7),(42,'Wax',7),(43,'Special Alloys',7),(44,'Silicon Mold',8),(45,'Resin',8),(46,'Fiber Glass',8),(47,'Polypropylene(PP)',9),(48,'HDPE',9),(49,'LDPE',9),(50,'PVC',9),(51,'Rubber/Flexible',9),(52,'ABS',9),(53,'Nylon',9),(54,'Polycarbonate(PC)',9),(55,'Acryllic',9),(56,'PET',9),(57,'Mild Steel(MS)',10),(58,'Strainless Steel(SS)',10),(59,'Mild Steel(MS)',11),(60,'Strainless Steel(SS)',11),(61,'Galvanised Iron(GI)',11),(62,'Mild Steel Iron',12),(63,'Die Steel',12),(64,'Aluminium',12),(65,'PET Sheet',13),(66,'PETG Sheet',13),(67,'PP Sheet',13),(68,'PVC',14),(69,'Cotton',14),(70,'Coated Rexin',14),(71,'Others',14);
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_specification`
--

DROP TABLE IF EXISTS `order_specification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_specification` (
  `Order_ID` int NOT NULL AUTO_INCREMENT,
  `Order_Type` text NOT NULL,
  `Model_Name` varchar(100) NOT NULL,
  `Fabrication_Service` text NOT NULL,
  `Material` varchar(100) NOT NULL,
  `Thickness` varchar(45) NOT NULL,
  `Quantity` varchar(45) NOT NULL,
  `Model_Path` text NOT NULL,
  `Customer_ID` int NOT NULL,
  `Manufacturer_ID` varchar(50) NOT NULL,
  `Status` varchar(100) NOT NULL,
  `Amount` int DEFAULT NULL,
  `Date` varchar(45) NOT NULL,
  PRIMARY KEY (`Order_ID`,`Model_Name`,`Customer_ID`),
  KEY `Customer_ID_fk_idx` (`Customer_ID`),
  CONSTRAINT `Customer_ID_fk` FOREIGN KEY (`Customer_ID`) REFERENCES `customer` (`Customer_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=358 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_specification`
--

LOCK TABLES `order_specification` WRITE;
/*!40000 ALTER TABLE `order_specification` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_specification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_image`
--

DROP TABLE IF EXISTS `project_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_image` (
  `Image_Name` varchar(100) NOT NULL,
  `Image_Path` varchar(100) NOT NULL,
  `Project_ID` int NOT NULL,
  PRIMARY KEY (`Image_Name`,`Project_ID`),
  KEY `Project_ID_idx` (`Project_ID`),
  CONSTRAINT `Project_ID` FOREIGN KEY (`Project_ID`) REFERENCES `feature_project` (`Project_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_image`
--

LOCK TABLES `project_image` WRITE;
/*!40000 ALTER TABLE `project_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `S.N` int NOT NULL AUTO_INCREMENT,
  `User_ID` varchar(50) NOT NULL,
  `Star_Ratings` double NOT NULL,
  `Manufacturer_ID` varchar(50) NOT NULL,
  PRIMARY KEY (`S.N`),
  KEY `manufacturer_id_fk1_idx` (`Manufacturer_ID`),
  CONSTRAINT `manufacturer_id_fk1` FOREIGN KEY (`Manufacturer_ID`) REFERENCES `manufacturer` (`Manufacturer_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `Service_ID` int NOT NULL,
  `Manufacturer_ID` varchar(50) NOT NULL,
  `Material_Name` text,
  PRIMARY KEY (`Service_ID`,`Manufacturer_ID`),
  KEY `fabricationservice_id` (`Service_ID`),
  CONSTRAINT `company_fabricationservice_ibfk_2` FOREIGN KEY (`Service_ID`) REFERENCES `fabrication_services` (`Service_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'fabhubsdb'
--

--
-- Dumping routines for database 'fabhubsdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-21 10:43:34
