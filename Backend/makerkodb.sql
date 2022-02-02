-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: makerko
-- ------------------------------------------------------
-- Server version	8.0.27

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
  `Bio` text,
  `CoverImage` text,
  PRIMARY KEY (`Customer_ID`,`Email`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (98,'amansainju12@gmail.com','Aman','Shrestha','$2b$10$ntudw6VWTMmUjX2p2wQ..e1slFZS1F2v6w7d7JelbJ3o0o4gQntN2',9843645385,'Bhaktapur',1,'{\"filename\":\"profileImage1639724273449.jpg\",\"filePath\":\"./public/uploads/customer/98/profileImage/profileImage1639724273449.jpg\"}','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','{\"filename\":\"cover1643691995695.jpg\",\"filePath\":\"./public/uploads/customer/98/cover1643691995695.jpg\"}');
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
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `design_request`
--

LOCK TABLES `design_request` WRITE;
/*!40000 ALTER TABLE `design_request` DISABLE KEYS */;
INSERT INTO `design_request` VALUES (83,'./public/uploads/customer/98/design/productFile1641178247319.pdf','./public/uploads/customer/98/design/sketchFile1641178250365.pdf','hellow',98),(84,'./public/uploads/customer/98/design/productFile1641178570734.pdf','./public/uploads/customer/98/design/sketchFile1641178573459.pdf','hlllooo',98);
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
  `Auther_ID` varchar(200) DEFAULT NULL,
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
  KEY `Customer_ID` (`Auther_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feature_project`
--

LOCK TABLES `feature_project` WRITE;
/*!40000 ALTER TABLE `feature_project` DISABLE KEYS */;
INSERT INTO `feature_project` VALUES (89,'fd8af40f00de353b64211ddaf4c821f9','ram.zenertech@gmail.com','Protechnepal Face Shield','2021-11-1','CNC, Injection Molding, Laser Cutting, Sewing','Polypropylene, APET Plastic, Elastic Band','<p>Reusable Face Shield for COVID-19 protection: Clear, Comfortable and Reusable</p>','<p><strong>Need for Innovation:</strong></p><p>In times of global pandemic like the COVID-19, shortages of PPE and essential medical items are apparent. The spread of deadly virus engulfed entire world at the same time - leaving behind the conventional aid supply chain disrupted. In the first phase of COVID-19, many countries including Nepal was hit worst with the shortage of PPEs and other essential items.&nbsp;</p><p><strong>Collaboration for Innovation:</strong></p><p>Protechnepal initiative, a consortium of maker companies, designers, medical volunteers and innovation center initiated the local production of face shield with the available raw materials and resources. Er. Ram Chandra Thapa and Er. Nilesh Pradhan, inspired from other 3D printing response group in Europe designed and iterated several versions of faceshield in Nepal. The engineering team was backed by the talented medical professionals and volunteers like Dr. Roshina Thapa and her team. The medical professionals provided user feedback on each iterations made and that helped designers come with a near to perfect Nepali face shield.&nbsp;</p><p><strong>Prototyping with 3D Additive Manufacturing:</strong></p><p>The product development process was made easy with the use of 3D Printing process at Zener Technologies. With 3D printing, the transition time from idea and design to a functional prototype was shortened to 3 days. The demand for first phase of PPE distribution was fulfilled by outsourcing production - Ten 3D printing hubs joined to make around 150 face shields per day. 3D printers used were Tiertime UP BOX+ and UP300, Creality Ender and CR10 mini, Qidi and Prusa 3D printers, and the materials used were PLA, ABS and PETG 3D filaments. Each frame took around 1 hr 15mins of print time and consumed 40gram material. These 3D printed faceshields were distributed to different hospitals based on necessity by the National Innovation Center and medical volunteers.</p><p><strong>Scaling Production with Die, mold and Injection Molding:</strong></p><p>As time passed by, COVID-19 infections hit a record number every new day and the lockdown was made more strict and the supplychain seized throughout the country. The critical shortage of PPEs was faced throughout the world and the Mahabir Pun led National Innovation Center announced the continuous unlimited distribution of PPEs for the frontline medics. To meet high demand and to address such gaps in supply chain, the decision was made to transition the production process from make-on-demand 3D printing process to mass-production injection molding process.&nbsp;</p><p>Mold for injection molding process was made with 3-axis CNC milling process near Swayambhu and further assembly and testing at a machine shop at Balaju. The process took around 12 days to prepare fully functional mold for face shield. Then, a plastic factory in Baniyatar, that used to produce kitchenware items and was closed due to COVID was outsourced to produce frames for face shield. With injection molding, up to 1200 face shields were manufactured in 12 hours. The material for frame was medical grade polypropylene - both reusable with proper disinfection and recyclable upon use.</p><p><strong>Crowd manufacturing of PPE components:</strong></p><p>A complete set of Face shield requires several other components such as transparent visor, elastic band and packaging. To meet the surging demand, production of transparent visor was outsourced to 3 laser cutting centers in Kathmandu by sharing common designs to each of them. The clear plastics were PVC, PET, APET and Polycarbonate (PC) often found as binding material in stationary shops. Elastic band was made at 2 local garment workshop at Thamel. All the components were collected, cleaned, assembled, disinfected and packaged at Zener\'s facility at Kupondole.</p><p><strong>Distributed manufacturing and collaborative distribution network:</strong></p><p>Protech Nepal initiative was able to produce and distribute thousands of PPEs per day using distributed local manufacturing approach and the distribution to reach different parts of Nepal was possible with their extensive network of partners like the National Innovation Center, Medical Professionals groups/societies and the medical volunteers working hard for the cause. This protech nepal developed faceshield PPE is an example that proves the effectiveness of collaborative local distributed manufacturing in resource constrained places like Nepal.&nbsp;</p><p>More on Protech Nepal Initiative: https://protechnepal.org/</p>','[{\"fileName\":\"ppe_use-hp.jpeg\",\"filePath\":\"/uploads/customer/99/FeatureProject/projectUploads/ppe_use-hp1635616561420.jpeg\"},{\"fileName\":\"WhatsApp Image 2020-10-14 at 16.29.29.jpeg\",\"filePath\":\"/uploads/customer/99/FeatureProject/projectUploads/WhatsApp1635616561420.29\"},{\"fileName\":\"FSfoamcut.jpeg\",\"filePath\":\"/uploads/customer/99/FeatureProject/projectUploads/FSfoamcut1635616561420.jpeg\"},{\"fileName\":\"FSmaking.jpeg\",\"filePath\":\"/uploads/customer/99/FeatureProject/projectUploads/FSmaking1635616561420.jpeg\"},{\"fileName\":\"SAVE_20200428_111112.jpg\",\"filePath\":\"/uploads/customer/99/FeatureProject/projectUploads/SAVE_20200428_1111121635616561421.jpg\"},{\"fileName\":\"SAVE_20200428_111100.jpg\",\"filePath\":\"/uploads/customer/99/FeatureProject/projectUploads/SAVE_20200428_1111001635616561421.jpg\"}]','{\"fileName\":\"protechimage1600264254.jpg\",\"filePath\":\"/uploads/customer/99/FeatureProject/projectMainPhoto/protechimage1600264254.jpg\",\"oldFileName\":\"protechimage1600264254.jpg\"}','{\"fileName\":\"Protechnepal1635616771921.pdf\",\"filePath\":\"/uploads/customer/99/FeatureProject/pdfUploads/Protechnepal1635616771921.pdf\"}','{\"fileName\":\"cover.jpg\",\"filePath\":\"./public/uploads/maker/fd8af40f00de353b64211ddaf4c821f9/feature_project/89/cover.jpg\"}'),(90,'fd8af40f00de353b64211ddaf4c821f9','ram.zenertech@gmail.com','Protective Goggles','2021-11-1','CNC, Injection Molding, Laser Cutting, Sewing','PVC, Polycarbonate (PC), Elastic band','<p>Full cover protective goggles - Clear, impact resistant and comfortable flexible fit around face.</p>','<p><strong>Need for Innovation:</strong></p><p>In times of global pandemic like the COVID-19, shortages of PPE and essential medical items are apparent. The spread of deadly virus engulfed entire world at the same time - leaving behind the conventional aid supply chain disrupted. In the first phase of COVID-19, many countries including Nepal was hit worst with the shortage of PPEs and other essential items.&nbsp;</p><p>More on Protechnepal Goggles: https://protechnepal.org/product/protective-goggles</p>','[{\"fileName\":\"IMG_20200713_174820.jpg\",\"filePath\":\"/uploads/customer/99/FeatureProject/projectUploads/IMG_20200713_1748201635789126383.jpg\"},{\"fileName\":\"IMG_20200713_174534.jpg\",\"filePath\":\"/uploads/customer/99/FeatureProject/projectUploads/IMG_20200713_1745341635789126384.jpg\"},{\"fileName\":\"goggle-12.jpg\",\"filePath\":\"/uploads/customer/99/FeatureProject/projectUploads/goggle-121635789126384.jpg\"},{\"fileName\":\"IMG_20200713_223329.jpg\",\"filePath\":\"/uploads/customer/99/FeatureProject/projectUploads/IMG_20200713_2233291635789126384.jpg\"},{\"fileName\":\"goggle-33.jpg\",\"filePath\":\"/uploads/customer/99/FeatureProject/projectUploads/goggle-331635789126384.jpg\"}]','{\"fileName\":\"goggle-25.jpg\",\"filePath\":\"/uploads/customer/99/FeatureProject/projectMainPhoto/goggle-25.jpg\",\"oldFileName\":\"goggle-25.jpg\"}','{\"fileName\":\"Protechnepal-org-Overview-16003217901635789463279.pdf\",\"filePath\":\"/uploads/customer/99/FeatureProject/pdfUploads/Protechnepal-org-Overview-16003217901635789463279.pdf\"}','{\"fileName\":\"cover.jpg\",\"filePath\":\"./public/uploads/maker/fd8af40f00de353b64211ddaf4c821f9/feature_project/90/cover.jpg\"}');
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
INSERT INTO `location` VALUES ('fd8af40f00de353b64211ddaf4c821f9','27.664539331625363','85.43118879190943');
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
INSERT INTO `manufacturer` VALUES ('fd8af40f00de353b64211ddaf4c821f9','aman.promech@gmail.com','12/17/2021','3D Innovation','$2b$10$Y7VFlgTdbd9699o7FzSbDuqQx1Rb3RuCezQeLmXsES93KxUyMHfcm','Aman',9851202020,NULL,'www.3dinnovation.com','Bhaktapur','Individual/Hobbyist','{\"filename\":\"profileImage1642145336930.jpg\",\"filePath\":\"./public/uploads/maker/fd8af40f00de353b64211ddaf4c821f9/profileImage/profileImage1642145336930.jpg\"}','{\"filename\":\"cover1643353292240.jpg\",\"filePath\":\"./public/uploads/maker/fd8af40f00de353b64211ddaf4c821f9/cover1643353292240.jpg\"}','We offer the perfect gift giving solution. We specialize in custom laser-etched 3D crystals keepsakes that are beautiful, unique and \'from the heart\'.','[{\"serviceName\":\"Pattern Making\",\"materials\":[\"Wood\",\"Aluminium\"]},{\"serviceName\":\"Heat Treatment\",\"materials\":[\"Cast Iron\",\"Steel\"]},{\"serviceName\":\"Powder Coating\",\"materials\":[\"Enamel Colors\",\"Paints\"]},{\"serviceName\":\"Sand Blasting\",\"materials\":[\"Cast Iron\",\"Steel\",\"Metal Alloys\"]}]','We offer the perfect gift giving solution. We specialize in custom laser-etched 3D crystals keepsakes that are beautiful, unique and \'from the heart\'.','All Nepal','Verified','Verified','To promote technological growth in Nepal and to contribute in future technological advancement of the world.','[{\"fileName\":\"multipleImage1642131791002.jpg\",\"filePath\":\"./public/uploads/maker/fd8af40f00de353b64211ddaf4c821f9/multipleImage/multipleImage1642131791002.jpg\"},{\"fileName\":\"multipleImage1641528542242.jpg\",\"filePath\":\"./public/uploads/maker/fd8af40f00de353b64211ddaf4c821f9/multipleImage/multipleImage1641528542242.jpg\"},{\"fileName\":\"multipleImage1641528542244.jpg\",\"filePath\":\"./public/uploads/maker/fd8af40f00de353b64211ddaf4c821f9/multipleImage/multipleImage1641528542244.jpg\"},{\"fileName\":\"multipleImage1641528542245.jpg\",\"filePath\":\"./public/uploads/maker/fd8af40f00de353b64211ddaf4c821f9/multipleImage/multipleImage1641528542245.jpg\"},{\"fileName\":\"multipleImage1641528542247.jpg\",\"filePath\":\"./public/uploads/maker/fd8af40f00de353b64211ddaf4c821f9/multipleImage/multipleImage1641528542247.jpg\"}]');
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
  `Customer_ID` varchar(50) NOT NULL,
  `Manufacturer_ID` varchar(50) NOT NULL,
  `Status` varchar(100) NOT NULL,
  `Amount` int DEFAULT NULL,
  `Date` varchar(45) NOT NULL,
  PRIMARY KEY (`Order_ID`,`Model_Name`),
  KEY `Customer_ID_fk_idx` (`Customer_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=373 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_specification`
--

LOCK TABLES `order_specification` WRITE;
/*!40000 ALTER TABLE `order_specification` DISABLE KEYS */;
INSERT INTO `order_specification` VALUES (369,'Check Design,Request Quotation','file1640576306765.pdf','Laser Cutting','MDF','123','123','./public/uploads/customer/98/file/file1640576306765.pdf','98','fd8af40f00de353b64211ddaf4c821f9','pending',0,'1640576341422'),(370,'Request Prototype','file1640600304233.pdf','Laser Cutting','MDF','0.1','500','./public/uploads/customer/98/file/file1640600304233.pdf','98','fd8af40f00de353b64211ddaf4c821f9','completed',0,'1640600327288'),(371,'Request Quotation','file1640600394323.pdf','Laser Cutting','MDF','0.1','500','./public/uploads/customer/98/file/file1640600394323.pdf','98','fd8af40f00de353b64211ddaf4c821f9','building',0,'1640600397536'),(372,'Request Prototype','file1643190753892.jpeg','Laser Cutting','MDF','123','1','./public/uploads/maker/fd8af40f00de353b64211ddaf4c821f9/file/file1643190753892.jpeg','fd8af40f00de353b64211ddaf4c821f9','fd8af40f00de353b64211ddaf4c821f9','pending',0,'1643190762645');
/*!40000 ALTER TABLE `order_specification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `Project_ID` varchar(200) NOT NULL,
  `Author_ID` varchar(200) DEFAULT NULL,
  `Publish_Date` varchar(100) DEFAULT NULL,
  `Production_Details` text,
  `Title` text,
  `Cover_Image` text,
  `Description` text,
  `PdfDocument` text,
  `Gallary` text,
  `Content` text,
  PRIMARY KEY (`Project_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES ('98442125','98','1642069407665','3d printing, Metal , plastic, Wood','Sample Project 1','{\"filename\":\"coverImage1642673890348.jpg\",\"filePath\":\"./public/uploads/customer/98/feature_project/98442125/coverImage1642673890348.jpg\"}','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum','{\"filename\":\"pdfFile1642069407566.pdf\",\"filePath\":\"./public/uploads/customer/98/feature_project/98442125/pdfFile1642069407566.pdf\"}','[{\"filePath\":\"./public/uploads/customer/98/feature_project/98442125/gallery/gallery1643084348203.jpg\",\"fileName\":\"gallery1643084348203.jpg\"},{\"filePath\":\"./public/uploads/customer/98/feature_project/98442125/gallery/gallery1643084348208.jpg\",\"fileName\":\"gallery1643084348208.jpg\"},{\"filePath\":\"./public/uploads/customer/98/feature_project/98442125/gallery/gallery1643084348213.jpg\",\"fileName\":\"gallery1643084348213.jpg\"},{\"filePath\":\"./public/uploads/customer/98/feature_project/98442125/gallery/gallery1643084348216.jpg\",\"fileName\":\"gallery1643084348216.jpg\"},{\"filePath\":\"./public/uploads/customer/98/feature_project/98442125/gallery/gallery1643084348217.jpg\",\"fileName\":\"gallery1643084348217.jpg\"},{\"filePath\":\"./public/uploads/customer/98/feature_project/98442125/gallery/gallery1643084348217.jpg\",\"fileName\":\"gallery1643084348217.jpg\"},{\"filePath\":\"./public/uploads/customer/98/feature_project/98442125/gallery/gallery1643084348303.jpg\",\"fileName\":\"gallery1643084348303.jpg\"},{\"filePath\":\"./public/uploads/customer/98/feature_project/98442125/gallery/gallery1643084348303.jpeg\",\"fileName\":\"gallery1643084348303.jpeg\"},{\"fileName\":\"gallery1643085866263.png\",\"filePath\":\"./public/uploads/customer/98/feature_project/98442125/gallery/gallery1643085866263.png\"}]','[{\"content_title\":\"Sub Topic 1\",\"content_image\":{\"filename\":\"contentImage1643085814759.jpg\",\"filePath\":\"./public/uploads/customer/98/feature_project/98442125/contentImage/contentImage1643085814759.jpg\"},\"image_position\":{\"direction\":\"left\",\"value\":\"left\"},\"content_details\":\"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum\"},{\"content_details\":\"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum\",\"image_position\":{\"direction\":\"left\",\"value\":\"left\"},\"content_image\":{\"filename\":\"contentImage1642069407637.jpg\",\"filePath\":\"./public/uploads/customer/98/feature_project/98442125/contentImage/contentImage1642069407637.jpg\"},\"content_title\":\"Sub Topic 2\"},{\"content_title\":\"Sub Topic -3\",\"content_image\":{\"filename\":\"contentImage1642665828601.jpeg\",\"filePath\":\"./public/uploads/customer/98/feature_project/98442125/contentImage/contentImage1642665828601.jpeg\"},\"image_position\":{\"direction\":\"right\",\"value\":\"right\"},\"content_details\":\"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum\"}]'),('fd8af40f00de353b64211ddaf4c821f9929100','fd8af40f00de353b64211ddaf4c821f9','1642495618211','Dummy Text,','Lorem Ipsum','{\"filename\":\"coverImage1642495618087.jpg\",\"filePath\":\"./public/uploads/maker/fd8af40f00de353b64211ddaf4c821f9/feature_project/fd8af40f00de353b64211ddaf4c821f9929100/coverImage1642495618087.jpg\"}','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','{\"filename\":\"pdfFile1642495618091.pdf\",\"filePath\":\"./public/uploads/maker/fd8af40f00de353b64211ddaf4c821f9/feature_project/fd8af40f00de353b64211ddaf4c821f9929100/pdfFile1642495618091.pdf\"}','[{\"filePath\":\"./public/uploads/maker/fd8af40f00de353b64211ddaf4c821f9/feature_project/fd8af40f00de353b64211ddaf4c821f9929100/gallery/gallery1643084534943.jpg\",\"fileName\":\"gallery1643084534943.jpg\"},{\"filePath\":\"./public/uploads/maker/fd8af40f00de353b64211ddaf4c821f9/feature_project/fd8af40f00de353b64211ddaf4c821f9929100/gallery/gallery1643084534948.jpg\",\"fileName\":\"gallery1643084534948.jpg\"},{\"filePath\":\"./public/uploads/maker/fd8af40f00de353b64211ddaf4c821f9/feature_project/fd8af40f00de353b64211ddaf4c821f9929100/gallery/gallery1643084534953.jpg\",\"fileName\":\"gallery1643084534953.jpg\"},{\"filePath\":\"./public/uploads/maker/fd8af40f00de353b64211ddaf4c821f9/feature_project/fd8af40f00de353b64211ddaf4c821f9929100/gallery/gallery1643084534973.jpeg\",\"fileName\":\"gallery1643084534973.jpeg\"},{\"filePath\":\"./public/uploads/maker/fd8af40f00de353b64211ddaf4c821f9/feature_project/fd8af40f00de353b64211ddaf4c821f9929100/gallery/gallery1643084534975.jpg\",\"fileName\":\"gallery1643084534975.jpg\"},{\"filePath\":\"./public/uploads/maker/fd8af40f00de353b64211ddaf4c821f9/feature_project/fd8af40f00de353b64211ddaf4c821f9929100/gallery/gallery1643084535028.jpg\",\"fileName\":\"gallery1643084535028.jpg\"},{\"filePath\":\"./public/uploads/maker/fd8af40f00de353b64211ddaf4c821f9/feature_project/fd8af40f00de353b64211ddaf4c821f9929100/gallery/gallery1643084964912.jpg\",\"fileName\":\"gallery1643084964912.jpg\"}]','[{\"content_title\":\"Lorem Ipsum is dummy word\",\"content_image\":{\"filename\":\"contentImage1642495618098.jpg\",\"filePath\":\"./public/uploads/maker/fd8af40f00de353b64211ddaf4c821f9/feature_project/fd8af40f00de353b64211ddaf4c821f9929100/contentImage/contentImage1642495618098.jpg\"},\"image_position\":{\"direction\":\"right\",\"value\":\"right\"},\"content_details\":\"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\"},{\"content_title\":\"Sub Content 2\",\"content_image\":{\"filename\":\"contentImage1642663412029.jpg\",\"filePath\":\"./public/uploads/maker/fd8af40f00de353b64211ddaf4c821f9/feature_project/fd8af40f00de353b64211ddaf4c821f9929100/contentImage/contentImage1642663412029.jpg\"},\"image_position\":{\"direction\":\"left\",\"value\":\"left\"},\"content_details\":\"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\"},{\"content_title\":\"Sub Content 3\",\"content_image\":{\"filename\":\"contentImage1642663771379.jpg\",\"filePath\":\"./public/uploads/maker/fd8af40f00de353b64211ddaf4c821f9/feature_project/fd8af40f00de353b64211ddaf4c821f9929100/contentImage/contentImage1642663771379.jpg\"},\"image_position\":{\"direction\":\"right\",\"value\":\"right\"},\"content_details\":\"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\"}]');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
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
INSERT INTO `services` VALUES (1,'fd8af40f00de353b64211ddaf4c821f9','[{\"selectedMaterial\":{\"Material_ID\":1,\"Material_Name\":\"PLA\",\"Service_ID\":1},\"thickness\":\"-\",\"costUnit\":{\"value\":3,\"label\":\"Minute\"},\"unitRate\":\"2.5\",\"MoQ\":\"5\",\"leadTime\":\"2 days\"},{\"selectedMaterial\":{\"Material_ID\":2,\"Material_Name\":\"ABS\",\"Service_ID\":1},\"thickness\":\"-\",\"costUnit\":{\"value\":3,\"label\":\"Minute\"},\"unitRate\":\"2.5\",\"MoQ\":\"5\",\"leadTime\":\"2 days\"}]'),(2,'fd8af40f00de353b64211ddaf4c821f9','[{\"selectedMaterial\":{\"Material_ID\":1,\"Material_Name\":\"PLA\",\"Service_ID\":1},\"thickness\":\"-\",\"costUnit\":{\"value\":3,\"label\":\"Minute\"},\"unitRate\":\"2.5\",\"MoQ\":\"5\",\"leadTime\":\"2 days\"},{\"selectedMaterial\":{\"Material_ID\":2,\"Material_Name\":\"ABS\",\"Service_ID\":1},\"thickness\":\"-\",\"costUnit\":{\"value\":3,\"label\":\"Minute\"},\"unitRate\":\"2.5\",\"MoQ\":\"5\",\"leadTime\":\"2 days\"}]');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-02 10:17:27
