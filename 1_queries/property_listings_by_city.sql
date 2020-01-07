
SELECT a.id,a.title,a.cost_per_night,b.rating
FROM properties as a
JOIN (SELECT property_id, avg(rating) as rating
FROM property_reviews 
GROUP BY property_id) as b on a.id = b.property_id

WHERE a.city like '%Vancouver%' AND b.rating > 4
ORDER BY cost_per_night 
LIMIT 10



  