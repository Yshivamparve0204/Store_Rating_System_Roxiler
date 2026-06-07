const db = require("../config/db");

exports.addStore =
async (req,res)=>{

 try{

  const {
   name,
   email,
   address,
   ownerId
  } = req.body;

  const [owner] =
  await db.query(
   "SELECT * FROM users WHERE id=? AND role='OWNER'",
   [ownerId]
  );

  if(owner.length===0){

   return res.status(404).json({
    message:"Store Owner Not Found"
   });

  }

  await db.query(
   `INSERT INTO stores
   (name,email,address,owner_id)
   VALUES(?,?,?,?)`,
   [
    name,
    email,
    address,
    ownerId
   ]
  );

  res.status(201).json({
   message:"Store Added Successfully"
  });

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};

exports.getAllStores =
async (req,res)=>{

 try{

  const {
   search="",
   sort="ASC"
  } = req.query;

  const userId = req.user.id;

  const [stores] =
  await db.query(
   `
   SELECT

   s.id,
   s.name,
   s.email,
   s.address,

   ROUND(
    AVG(r.rating),
    1
   ) AS overallRating,

   (
    SELECT rating
    FROM ratings
    WHERE user_id=?
    AND store_id=s.id
   ) AS userRating

   FROM stores s

   LEFT JOIN ratings r
   ON s.id=r.store_id

   WHERE
   s.name LIKE ?
   OR s.address LIKE ?

   GROUP BY s.id

   ORDER BY s.name ${sort}
   `,
   [
    userId,
    `%${search}%`,
    `%${search}%`
   ]
  );

  res.json(stores);

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};

exports.getStoreById =
async (req,res)=>{

 try{

  const {id} = req.params;

  const [store] =
  await db.query(
   `
   SELECT

   s.id,
   s.name,
   s.email,
   s.address,

   ROUND(
    AVG(r.rating),
    1
   ) AS averageRating

   FROM stores s

   LEFT JOIN ratings r
   ON s.id=r.store_id

   WHERE s.id=?

   GROUP BY s.id
   `,
   [id]
  );

  if(store.length===0){

   return res.status(404).json({
    message:"Store Not Found"
   });

  }

  res.json(store[0]);

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};

