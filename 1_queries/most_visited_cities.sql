


SELECT b.city, count(a.id)
FROM reservations as a
JOIN properties as b on b.id = a.property_id
GROUP BY b.city
ORDER BY count(a.id) desc