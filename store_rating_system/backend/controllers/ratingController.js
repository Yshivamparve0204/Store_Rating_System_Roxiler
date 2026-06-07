const db = require("../config/db");

exports.submitRating =
async (req,res)=>{

 try{

  const {
   storeId,
   rating
  } = req.body;

  const userId = req.user.id;

  if(rating < 1 || rating > 5){

   return res.status(400).json({
    message:"Rating must be between 1 and 5"
   });

  }

  const [existing] =
  await db.query(
   `
   SELECT *
   FROM ratings
   WHERE user_id=?
   AND store_id=?
   `,
   [userId,storeId]
  );

  if(existing.length > 0){

   await db.query(
    `
    UPDATE ratings
    SET rating=?
    WHERE user_id=?
    AND store_id=?
    `,
    [
     rating,
     userId,
     storeId
    ]
   );

   return res.json({
    message:"Rating Updated Successfully"
   });

  }

  await db.query(
   `
   INSERT INTO ratings
   (
    user_id,
    store_id,
    rating
   )
   VALUES(?,?,?)
   `,
   [
    userId,
    storeId,
    rating
   ]
  );

  res.status(201).json({
   message:"Rating Submitted Successfully"
  });

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};

exports.ownerDashboard =
async (req,res)=>{

 try{

  const ownerId =
  req.user.id;

  const [store] =
  await db.query(
   `
   SELECT *
   FROM stores
   WHERE owner_id=?
   `,
   [ownerId]
  );

  if(store.length===0){

   return res.status(404).json({
    message:"Store Not Found"
   });

  }

  const storeId =
  store[0].id;

  const [[average]] =
  await db.query(
   `
   SELECT

   ROUND(
    AVG(rating),
    1
   ) AS averageRating

   FROM ratings

   WHERE store_id=?
   `,
   [storeId]
  );

  const [users] =
  await db.query(
   `
   SELECT

   u.id,
   u.name,
   u.email,
   r.rating

   FROM ratings r

   JOIN users u
   ON r.user_id=u.id

   WHERE r.store_id=?
   `,
   [storeId]
  );

  res.json({

   storeName:
   store[0].name,

   averageRating:
   average.averageRating || 0,

   users

  });

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};

