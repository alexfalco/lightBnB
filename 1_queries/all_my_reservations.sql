

--SELECT b.id,b.title,b.cost_per_night, a.start_date, avg(c.rating)
--FROM reservations as a
--JOIN properties as b on b.id = a.property_id
--JOIN property_reviews as c on c.property_id = a.property_id
--GROUP BY b.id


SELECT d.id,d.title,d.cost_per_night,c.start_date,d.rating
FROM reservations as c
JOIN (
SELECT b.id as id,title,cost_per_night, avg(a.rating) as rating
FROM property_reviews as a
JOIN properties as b on b.id = a.property_id
GROUP BY b.id,title,cost_per_night
) as d on d.id = c.property_id
WHERE c.guest_id = 1 and start_date < now()
ORDER BY start_date
LIMIT 10

