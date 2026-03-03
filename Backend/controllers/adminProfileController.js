import Admin from "../models/adminProfileSchema.js"

// Admin Profile Post
export const Admin_profile_Post = async(req,res) => {
try{

  const {email} = req.body
    const existing = await Admin.findOne({adminId: req.userId})

    if(existing){
      return res.status(409).json({msg : 'Profile already exist'})
    }

    const allowedFields = [
      "profileImage",
      "firstName",
      "lastName",
      "bio",
      "about",
      "email",
      "phone",
      "gender",
      "age",
      "location",
      "state",
      "country"
    ]

    const Created = {}
    let isValid = false

    allowedFields.forEach((field) => {
      if(req.body[field]!==undefined){
        Created[field] = req.body[field];
        isValid = true
      }
    })

    if(!isValid){
      return res.status(400).json({msg : 'No valid field selected'})
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{3,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }
      await Admin.create({
        adminId: req.userId,
       ...Created
    })
    res.json({msg : 'Profile created successfully'})
  
  } catch(err){
    res.status(500).json({msg : err.message})
  }
}



// Admin Profile Update
export const Admin_Profile_Update = async(req,res) => {
    try {
      const existing = await Admin.findOne({ adminId: req.userId });
  
      if(!existing){
        return res.status(409).json({msg : 'profile not Found'})
      }
  
    const allowedFields = [
      "profileImage",
      "firstName",
      "lastName",
      "bio",
      "about",
      "email",
      "phone",
      "gender",
      "age",
      "location",
      "state",
      "country"
    ]
  
      const updated = {};
      let isValid = false
      allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          updated[field] = req.body[field];
          isValid = true
        }
      });
  
      if(!isValid){
        return res.status(400).json({msg : 'No valid field selected'})
      }
        await Admin.findOneAndUpdate(
          { adminId: req.userId },
          { $set: updated },
          {new : true}
        );
        return res.json({ msg: "Profile Updated" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
}


// Admin Profile Get
export const Admin_Profile_Get = async (req, res) => {
  try{
      const Admin_Profile_Data = await Admin.findOne({adminId : req.userId})
      if(!Admin_Profile_Data){
        return res.status(404).json({msg : 'Admin Profile Not Found'})
      }
      res.json({
        msg : 'Admin Profile Recieved',
        data : Admin_Profile_Data
      })
    } catch(err){
      res.status(500).json({msg : "Server Error"})
    }
};



// Admin Profile Delete
export const Admin_Profile_Delete = async (req, res) => {
  try {
    const existing = await Admin.findOne({ adminId: req.userId });
    if (!existing) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    const allowedFields = [
      "profileImage",
      "firstName",
      "lastName",
      "bio",
      "about",
      "email",
      "phone",
      "gender",
      "age",
      "location",
      "state",
      "country"
    ]

    const deleted = {};
    let isValid = false;

    allowedFields.forEach((field) => {
      if (req.body[field] === true) {
        deleted[field] = 1;  
        isValid = true;
      }
    });

    if (!isValid) {
      return res.status(409).json({ msg: "No valid field selected" });
    }

    await Admin.findOneAndUpdate(
      { adminId: req.userId },
      { $unset: deleted }
    );

    res.json({ msg: "Admin req field deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};



