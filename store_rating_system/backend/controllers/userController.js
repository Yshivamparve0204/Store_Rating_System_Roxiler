const bcrypt = require("bcryptjs");
const db = require("../config/db");

exports.getDashboardStats =
async (req,res)=>{

 try{

  const [[users]] =
  await db.query(
   "SELECT COUNT(*) totalUsers FROM users"
  );

  const [[stores]] =
  await db.query(
   "SELECT COUNT(*) totalStores FROM stores"
  );

  const [[ratings]] =
  await db.query(
   "SELECT COUNT(*) totalRatings FROM ratings"
  );

  res.json({
   totalUsers: users.totalUsers,
   totalStores: stores.totalStores,
   totalRatings: ratings.totalRatings
  });

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};

exports.addUser =
async (req,res)=>{

 try{

  const {
   name,
   email,
   address,
   password,
   role
  } = req.body;

  const [exists] =
  await db.query(
   "SELECT * FROM users WHERE email=?",
   [email]
  );

  if(exists.length>0){

   return res.status(400).json({
    message:"Email Already Exists"
   });

  }

  const hash =
  await bcrypt.hash(
   password,
   10
  );

  await db.query(
   `INSERT INTO users
   (name,email,address,password,role)
   VALUES(?,?,?,?,?)`,
   [
    name,
    email,
    address,
    hash,
    role
   ]
  );

  res.status(201).json({
   message:"User Created Successfully"
  });

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};

exports.getAllUsers =
async (req,res)=>{

 try{

  const {
   name,
   email,
   address,
   role,
   sort="ASC"
  } = req.query;

  let sql =
  `SELECT
   id,
   name,
   email,
   address,
   role
   FROM users
   WHERE 1=1`;

  const values=[];

  if(name){

   sql += " AND name LIKE ?";
   values.push(`%${name}%`);

  }

  if(email){

   sql += " AND email LIKE ?";
   values.push(`%${email}%`);

  }

  if(address){

   sql += " AND address LIKE ?";
   values.push(`%${address}%`);

  }

  if(role){

   sql += " AND role=?";
   values.push(role);

  }

  sql += ` ORDER BY name ${sort}`;

  const [users] =
  await db.query(sql,values);

  res.json(users);

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};

exports.getUserById =
async (req,res)=>{

 try{

  const {id} = req.params;

  const [user] =
  await db.query(
   `SELECT
    id,
    name,
    email,
    address,
    role
    FROM users
    WHERE id=?`,
   [id]
  );

  if(user.length===0){

   return res.status(404).json({
    message:"User Not Found"
   });

  }

  const result = user[0];

  if(result.role==="OWNER"){

   const [[ownerStore]] =
   await db.query(
    `SELECT
     ROUND(AVG(r.rating),1)
     averageRating
     FROM stores s
     LEFT JOIN ratings r
     ON s.id=r.store_id
     WHERE s.owner_id=?`,
    [id]
   );

   result.averageRating =
   ownerStore.averageRating || 0;

  }

  res.json(result);

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};


