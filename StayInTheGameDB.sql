#create database StayInTheGame;

create table usrAccts(
	usrID int not null auto_increment,
    usrName varchar(255) not null,
    firstName varchar(255) not null,
    lastName varchar(255) not null,
    accountTier int not null,
    primary key (usrID, usrName));
    
create table tierOneUsers as select usrID, usrName from usrAccts where accountTier=1;
	
alter table tierOneUsers
    add column tick1 varchar(5) after usrName,
    add column tick2 varchar(5) after usrName,
    add column tick3 varchar(5) after usrName;

create table tierTwoUsers as select usrID, usrName from usrAccts where accountTier=2;
	
alter table tierTwoUsers
    add column tick1 varchar(5) after usrName,
    add column tick2 varchar(5) after usrName,
    add column tick3 varchar(5) after usrName,
    add column tick4 varchar(5) after usrName,
    add column tick5 varchar(5) after usrName;

create table tierThreeUsers as select usrID, usrName from usrAccts where accountTier=3;
	
alter table tierThreeUsers
    add column tick1 varchar(5) after usrName,
    add column tick2 varchar(5) after usrName,
    add column tick3 varchar(5) after usrName,
    add column tick4 varchar(5) after usrName,
    add column tick5 varchar(5) after usrName,
    add column tick6 varchar(5) after usrName,
    add column tick7 varchar(5) after usrName,
    add column tick8 varchar(5) after usrName,
    add column tick9 varchar(5) after usrName,
    add column tick10 varchar(5) after usrName;