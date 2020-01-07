
INSERT INTO users (name,email)
VALUES ('Alex','afalco02@gmail.com'), 
('Bob','bob@gmail.com'), ('Carole','carole@gmail.com');


INSERT INTO properties (
owner_id,title,description,thumbnail_photo_url,cover_photo_url,
cost_per_night ,street,parking_spaces,number_of_bathrooms,
number_of_bedrooms,country,city,province,post_code,active
)
VALUES (1,'title1','description1','www.1.com','www.11.com',25,'3525 perras',
2,3,3,'Canada','Montreal','Quebec','j3y7s2',true),

(2,'title2','description2','www.2.com','www.22.com',45,'35 perras',
2,4,3,'Canada','Montreal','Quebec','j3y7s2',true),

(3,'title3','description3','www.3.com','www.33.com',54,'3 perras',
5,3,3,'Canada','Montreal','Quebec','j3y7s2',true);


INSERT INTO reservations (
  start_date,end_date,property_id,guest_id)
VALUES ('2019-01-01', '2019-03-03',1,1),
('2019-01-01', '2019-03-03',3,1),
('2019-01-01', '2019-03-03',2,1);

INSERT INTO rates (
start_date,end_date,cost_per_night,property_id)
VALUES ('2018-01-01', '2019-01-01', 34, 2),
('2018-01-01', '2019-01-01', 54, 1),
('2019-02-01', '2019-12-12', 44, 2);



INSERT INTO  property_reviews (guest_id,reservation_id,property_id,rating,message)
VALUES (1,2,2,5,'message1'),(2,1,1,4,'message2'),(2,1,1,3,'message3');



INSERT INTO  guest_reviews (guest_id,owner_id,reservation_id,rating,message)
VALUES (1,2,2,4,'message1'),(2,1,1,4,'message3'),(3,1,1,4,'message3')



