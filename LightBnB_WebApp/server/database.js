const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'lightbnb'
});

pool.connect()

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  // let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  // return Promise.resolve(user);
  return pool.query(`
  SELECT *
  FROM users
  WHERE email = $1
  `, [email])
  .then(res => (res.rows[0])) 

}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT * 
  FROM users
  WHERE id = $1
  `, [id])
  .then(res => res.rows[0]) 
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  //console.log(user)
  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
  let query = {text:'INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *',
              values:[user.name,user.email,user.password]}

  return pool.query(query).then(res => res.rows[0]) 
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id) {
  return pool.query(`
  SELECT d.id,d.title,d.cost_per_night,c.start_date,d.rating
  FROM reservations as c
  JOIN (
  SELECT b.id as id,title,cost_per_night, avg(a.rating) as rating
  FROM property_reviews as a
  JOIN properties as b on b.id = a.property_id
  GROUP BY b.id,title,cost_per_night
  ) as d on d.id = c.property_id
  WHERE c.guest_id = $1 and start_date < now()
  ORDER BY start_date
  LIMIT 10
  `, [guest_id])
  .then(res => res.rows) 
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

// const getAllProperties = function(options, limit = 10) {
//   const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
//   return Promise.resolve(limitedProperties);
// }
// exports.getAllProperties = getAllProperties;


const getAllProperties = function(options, limit = 10) {
  // 1
  let queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += `WHERE owner_id = $${queryParams.length} 
    GROUP BY properties.id
    ORDER BY cost_per_night`;
    console.log(queryString, queryParams);
    return pool.query(queryString, queryParams)
    .then(res => res.rows);
  }
  
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(Number(options.minimum_price_per_night));
    queryString += `AND cost_per_night >= $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(Number(options.maximum_price_per_night));
    queryString += `AND cost_per_night <= $${queryParams.length} `;
  }
  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    queryString += `AND minimum_rating >= $${queryParams.length} `;
  }

  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}

exports.getAllProperties = getAllProperties;






/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  console.log(property)
  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);

  let query = 
  {text:'INSERT INTO properties' +
  '(owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,street,city,province,post_code,country,parking_spaces,number_of_bathrooms,number_of_bedrooms)' +
  'VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *',
  values:[property.owner_id,
  property.title,
  property.description,
  property.thumbnail_photo_url,
  property.cover_photo_url,
  property.cost_per_night,
  property.street,
  property.city,
  property.province,
  property.post_code,
  property.country,
  property.parking_spaces,
  property.number_of_bathrooms,
  property.number_of_bedrooms]}

  return pool.query(query).then(res => (res.rows[0])) 




}
exports.addProperty = addProperty;
