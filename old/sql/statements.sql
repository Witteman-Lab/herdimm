CREATE DATABASE `test` /*!40100 DEFAULT CHARACTER SET utf8 */;

CREATE TABLE `test`.`participant` (
  `pid` varchar(100) NOT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `ethnicity` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `test`.`avatar` (
  `isSelf` tinyint(4) DEFAULT NULL,
  `skinColor` varchar(7) DEFAULT NULL,
  `hairColor` varchar(7) DEFAULT NULL,
  `hairtype` tinyint(2) DEFAULT NULL,
  `glasses` tinyint(2) DEFAULT NULL,
  `pid` varchar(100) DEFAULT NULL,
  KEY `pid_idx` (`pid`),
  CONSTRAINT `pid` FOREIGN KEY (`pid`) REFERENCES `pid` (`pid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
	
CREATE TABLE `actions` (
  `timeIn` time NOT NULL,
  `timeOut` time NOT NULL,
  `totalTime` int(11) DEFAULT NULL,
  `action` varchar(25) DEFAULT NULL,
  `target` varchar(25) DEFAULT NULL,
  `pid` varchar(100) DEFAULT NULL,
  KEY `pid_idx` (`pid`),
  CONSTRAINT `pid` FOREIGN KEY (`pid`) REFERENCES `participant` (`pid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;